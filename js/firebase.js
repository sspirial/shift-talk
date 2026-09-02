// Optional Firebase integration. The app remains fully usable when this module
// cannot initialize, has no network, or has no runtime configuration.

import { enqueueOutbox, loadOutbox, removeOutbox } from "./store.js";
import defaultConfig from "./firebase-config.js";

const SDK_VERSION = "12.1.0";
const FIREBASE_BASE = `https://www.gstatic.com/firebasejs/${SDK_VERSION}`;

let services = null;

export async function initFirebase(config = globalThis.SHIFT_TALK_FIREBASE_CONFIG || defaultConfig) {
  if (services || !config || !config.apiKey || !config.projectId) return services;
  try {
    const [{ initializeApp }, authApi, firestoreApi, aiApi, remoteConfigApi] = await Promise.all([
      import(`${FIREBASE_BASE}/firebase-app.js`),
      import(`${FIREBASE_BASE}/firebase-auth.js`),
      import(`${FIREBASE_BASE}/firebase-firestore.js`),
      import(`${FIREBASE_BASE}/firebase-ai.js`),
      import(`${FIREBASE_BASE}/firebase-remote-config.js`),
    ]);
    const app = initializeApp(config);
    const auth = authApi.getAuth(app);
    const db = firestoreApi.initializeFirestore(app, {
      localCache: firestoreApi.persistentLocalCache({ tabManager: firestoreApi.persistentMultipleTabManager() }),
    });
    const ai = aiApi.getAI(app);
    const remoteConfig = remoteConfigApi.getRemoteConfig(app);
    remoteConfig.settings = { minimumFetchIntervalMillis: 3600000, fetchTimeoutMillis: 5000 };
    services = { app, auth, db, ai, remoteConfig, authApi, firestoreApi, aiApi, remoteConfigApi };
    return services;
  } catch (error) {
    console.warn("[shift-talk] Firebase unavailable; staying local-only", error);
    return null;
  }
}

export async function signInAnonymouslyIfConfigured() {
  const state = await initFirebase();
  if (!state) return null;
  const current = state.auth.currentUser;
  if (current) return current;
  const result = await state.authApi.signInAnonymously(state.auth);
  return result.user;
}

export async function linkGoogleAccount() {
  const state = await initFirebase();
  if (!state || !state.auth.currentUser) return null;
  const provider = new state.authApi.GoogleAuthProvider();
  const result = await state.authApi.linkWithPopup(state.auth.currentUser, provider);
  return result.user;
}

export function getFirebaseServices() {
  return services;
}

export function firebaseSdkVersion() {
  return SDK_VERSION;
}

function userPath(uid, collection, id) {
  return id ? `users/${uid}/${collection}/${id}` : `users/${uid}/${collection}`;
}

// Pulls immutable events first, then drains locally queued writes. Any failure
// is returned to the caller; the local store remains authoritative offline.
export async function syncWithFirebase(localEvents = []) {
  const state = await initFirebase();
  if (!state) return { events: localEvents, synced: 0 };
  const user = await signInAnonymouslyIfConfigured();
  if (!user) return { events: localEvents, synced: 0 };

  const { collection, doc, getDocs, setDoc } = state.firestoreApi;
  const remoteSnapshot = await getDocs(collection(state.db, userPath(user.uid, "events", "")));
  const remoteEvents = remoteSnapshot.docs.map(item => item.data());
  let synced = 0;
  for (const item of loadOutbox()) {
    if (!item || !item.id || !item.value) continue;
    const target = item.kind === "event" ? "events"
      : item.kind === "card" ? "cards" : item.kind === "quarantine" ? "quarantine" : null;
    if (!target) continue;
    await setDoc(doc(state.db, userPath(user.uid, target, item.id)), item.value, { merge: false });
    removeOutbox([item.id]);
    synced++;
  }
  return { events: [...localEvents, ...remoteEvents], synced };
}
