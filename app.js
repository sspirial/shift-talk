// ─────────────────────────────────────────────────────────────────────────────
//  APP.JS — Garment Industry Chinese Learning App
//  Includes: Vocabulary, Flashcards, Grammar, Listening Lab, Quiz, Phrasebook
// ─────────────────────────────────────────────────────────────────────────────

// ── State ──────────────────────────────────────────────────────────────────
const State = {
  currentView: 'home',
  learnedWords: new Set(JSON.parse(localStorage.getItem('learnedWords') || '[]')),
  completedLessons: new Set(JSON.parse(localStorage.getItem('completedLessons') || '[]')),
  streak: parseInt(localStorage.getItem('streak') || '0'),
  lastVisit: localStorage.getItem('lastVisit') || null,

  fc: { cards: [], index: 0, category: 'all', flipped: false },

  quiz: {
    questions: [], index: 0, score: 0,
    type: 'cn-to-en', count: 10, category: 'all', answered: false,
  },

  phraseCategory: 'all',

  grammar: {
    activeLesson: null,
    exerciseState: {},  // lessonId -> { answers: [] }
  },

  listen: {
    activeSet: null,
    exerciseIndex: 0,
    score: 0,
    answered: false,
    rate: 0.8,
    currentAudio: null,
  },
};

// ── Utilities ──────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getCategoryColor(catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  return cat ? cat.color : '#7c6aff';
}

function getCategoryName(catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  return cat ? cat.name : catId;
}

function getFilteredVocab(catId) {
  if (catId === 'all') return VOCABULARY;
  return VOCABULARY.filter(w => w.cat === catId);
}

function saveState() {
  localStorage.setItem('learnedWords', JSON.stringify([...State.learnedWords]));
  localStorage.setItem('completedLessons', JSON.stringify([...State.completedLessons]));
}

function updateStreak() {
  const today = new Date().toDateString();
  const last = State.lastVisit;
  if (last === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  State.streak = (last === yesterday) ? State.streak + 1 : 1;
  localStorage.setItem('streak', State.streak);
  localStorage.setItem('lastVisit', today);
}

// ── View Navigation ─────────────────────────────────────────────────────────

function switchView(viewId) {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewId);
  });
  document.querySelectorAll('.view').forEach(v => {
    v.classList.toggle('active', v.id === `view-${viewId}`);
  });
  State.currentView = viewId;
  document.getElementById('main-nav').classList.remove('open');

  if (viewId === 'home')       renderHome();
  if (viewId === 'vocabulary') renderVocabulary();
  if (viewId === 'flashcards') renderFlashcardsView();
  if (viewId === 'grammar')    renderGrammarView();
  if (viewId === 'listening')  renderListeningView();
  if (viewId === 'quiz')       renderQuizStart();
  if (viewId === 'phrasebook') renderPhrasebook();
}

// ── HOME VIEW ───────────────────────────────────────────────────────────────

function renderHome() { renderStats(); }

function renderStats() {
  document.getElementById('stat-total').textContent     = VOCABULARY.length;
  document.getElementById('stat-categories').textContent = CATEGORIES.length;
  document.getElementById('stat-learned').textContent   = State.learnedWords.size;
  document.getElementById('stat-streak').textContent    = State.streak;
}

// ── VOCABULARY VIEW ──────────────────────────────────────────────────────────

let activeVocabCat = 'all';
let searchQuery = '';

function renderVocabulary() {
  renderCategoryTabs();
  renderCategoryFilter();
  renderWordGrid();
}

function renderCategoryTabs() {
  const tabsEl = document.getElementById('category-tabs');
  tabsEl.querySelectorAll('.cat-tab:not([data-cat="all"])').forEach(el => el.remove());
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-tab';
    btn.dataset.cat = cat.id;
    btn.textContent = `${cat.emoji} ${cat.name}`;
    btn.onclick = () => {
      activeVocabCat = cat.id;
      tabsEl.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderWordGrid();
    };
    tabsEl.appendChild(btn);
  });
  document.querySelector('.cat-tab[data-cat="all"]').onclick = () => {
    activeVocabCat = 'all';
    tabsEl.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
    tabsEl.querySelector('[data-cat="all"]').classList.add('active');
    renderWordGrid();
  };
}

function renderCategoryFilter() {
  const sel = document.getElementById('category-filter');
  if (sel.options.length <= 1) {
    CATEGORIES.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = `${cat.emoji} ${cat.name}`;
      sel.appendChild(opt);
    });
  }
  sel.onchange = () => {
    activeVocabCat = sel.value;
    document.querySelectorAll('.cat-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === activeVocabCat);
    });
    renderWordGrid();
  };
}

function filterByCategory(catId) {
  activeVocabCat = catId;
  document.querySelectorAll('.cat-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === catId);
  });
  const sel = document.getElementById('category-filter');
  if (sel) sel.value = catId;
  renderWordGrid();
}

function renderWordGrid() {
  const grid = document.getElementById('vocab-grid');
  let words = getFilteredVocab(activeVocabCat);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    words = words.filter(w =>
      w.cn.includes(q) || w.py.toLowerCase().includes(q) || w.en.toLowerCase().includes(q)
    );
  }
  if (words.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:rgba(200,190,255,0.4)">No words found.</div>`;
    return;
  }
  grid.innerHTML = words.map((word, i) => {
    const color = getCategoryColor(word.cat);
    const catName = getCategoryName(word.cat);
    const learned = State.learnedWords.has(word.id);
    return `
      <div class="word-card ${learned ? 'learned' : ''}" style="animation-delay:${i*0.03}s" onclick="openWordModal(${word.id})">
        <div class="word-cat-badge" style="background:${color}22;color:${color};border:1px solid ${color}44">${catName}</div>
        <div class="word-chinese">${word.cn}</div>
        <div class="word-pinyin">${word.py}</div>
        <div class="word-english">${word.en}</div>
      </div>`;
  }).join('');
}

// ── WORD MODAL ───────────────────────────────────────────────────────────────

let currentModalWordId = null;

function openWordModal(wordId) {
  const word = VOCABULARY.find(w => w.id === wordId);
  if (!word) return;
  currentModalWordId = wordId;
  const color = getCategoryColor(word.cat);
  document.getElementById('modal-chinese').textContent = word.cn;
  document.getElementById('modal-pinyin').textContent  = word.py;
  document.getElementById('modal-english').textContent = word.en;
  document.getElementById('modal-category').innerHTML =
    `<span style="background:${color}22;color:${color};padding:0.3rem 0.8rem;border-radius:100px;font-size:0.75rem;font-weight:700">${getCategoryName(word.cat)}</span>`;
  if (word.example) {
    document.getElementById('modal-example-cn').textContent    = word.example.cn;
    document.getElementById('modal-example-pinyin').textContent = word.example.py;
    document.getElementById('modal-example-en').textContent    = word.example.en;
    document.querySelector('.modal-example-section').style.display = '';
    document.querySelector('.modal-divider').style.display = '';
  } else {
    document.querySelector('.modal-example-section').style.display = 'none';
    document.querySelector('.modal-divider').style.display = 'none';
  }
  const markBtn = document.getElementById('modal-mark-known');
  const isLearned = State.learnedWords.has(wordId);
  markBtn.textContent = isLearned ? 'Unmark as Learned' : 'Mark as Learned ✓';
  markBtn.style.color = isLearned ? '#ff6b6b' : '';
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  currentModalWordId = null;
}

// ── FLASHCARDS ───────────────────────────────────────────────────────────────

function renderFlashcardsView() {
  const sel = document.getElementById('fc-category');
  if (sel.options.length <= 1) {
    CATEGORIES.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = `${cat.emoji} ${cat.name}`;
      sel.appendChild(opt);
    });
  }
  sel.onchange = () => { State.fc.category = sel.value; initFlashcards(); };
  initFlashcards();
}

function initFlashcards() {
  State.fc.cards = shuffle(getFilteredVocab(State.fc.category));
  State.fc.index = 0;
  State.fc.flipped = false;
  updateFlashcard();
}

function updateFlashcard() {
  const { cards, index } = State.fc;
  if (!cards.length) return;
  const card = cards[index];
  const pct = (index / cards.length) * 100;
  document.getElementById('fc-progress-fill').style.width = pct + '%';
  document.getElementById('fc-progress-text').textContent = `${index + 1} / ${cards.length}`;
  document.getElementById('fc-cat-label').textContent  = getCategoryName(card.cat);
  document.getElementById('fc-chinese').textContent    = card.cn;
  document.getElementById('fc-pinyin').textContent     = card.py;
  document.getElementById('fc-english').textContent    = card.en;
  document.getElementById('fc-example').textContent    = card.example ? card.example.cn : '';
  document.getElementById('fc-example-pinyin').textContent = card.example ? card.example.py : '';
  document.getElementById('flashcard-inner').classList.remove('flipped');
  State.fc.flipped = false;
}

function flipCard() {
  State.fc.flipped = !State.fc.flipped;
  document.getElementById('flashcard-inner').classList.toggle('flipped', State.fc.flipped);
}

function nextCard() {
  if (State.fc.index < State.fc.cards.length - 1) { State.fc.index++; updateFlashcard(); }
}
function prevCard() {
  if (State.fc.index > 0) { State.fc.index--; updateFlashcard(); }
}

// ══════════════════════════════════════════════════════════════════════════════
//  GRAMMAR VIEW
// ══════════════════════════════════════════════════════════════════════════════

function renderGrammarView() {
  renderLessonList();
  // If a lesson was open, keep it; otherwise show landing
  if (State.grammar.activeLesson) {
    openLesson(State.grammar.activeLesson);
  } else {
    document.getElementById('grammar-landing').classList.remove('hidden');
    document.getElementById('grammar-lesson').classList.add('hidden');
  }
}

function renderLessonList() {
  const list = document.getElementById('lesson-list');
  list.innerHTML = GRAMMAR_LESSONS.map(lesson => {
    const done = State.completedLessons.has(lesson.id);
    const active = State.grammar.activeLesson === lesson.id;
    return `
      <div class="lesson-item ${active ? 'active' : ''}" onclick="openLesson(${lesson.id})" id="lesson-item-${lesson.id}">
        <span class="lesson-num">${lesson.id}</span>
        <span class="lesson-icon">${lesson.icon}</span>
        <div class="lesson-info">
          <div class="lesson-title">${lesson.title}</div>
          <div class="lesson-sub">${lesson.subtitle}</div>
        </div>
        ${done ? '<span class="lesson-done">✓</span>' : ''}
      </div>`;
  }).join('');
}

function openLesson(lessonId) {
  const lesson = GRAMMAR_LESSONS.find(l => l.id === lessonId);
  if (!lesson) return;
  State.grammar.activeLesson = lessonId;

  // Update sidebar active state
  document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));
  const item = document.getElementById(`lesson-item-${lessonId}`);
  if (item) { item.classList.add('active'); item.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }

  // Hide landing, show lesson
  document.getElementById('grammar-landing').classList.add('hidden');
  const lessonEl = document.getElementById('grammar-lesson');
  lessonEl.classList.remove('hidden');

  // Init exercise state for this lesson if not already
  if (!State.grammar.exerciseState[lessonId]) {
    State.grammar.exerciseState[lessonId] = { answers: new Array(lesson.exercises.length).fill(null) };
  }

  lessonEl.innerHTML = buildLessonHTML(lesson);
  attachExerciseListeners(lesson);
}

function buildLessonHTML(lesson) {
  const prevId = lesson.id > 1 ? lesson.id - 1 : null;
  const nextId = lesson.id < GRAMMAR_LESSONS.length ? lesson.id + 1 : null;

  return `
    <div class="lesson-content">
      <div class="lesson-breadcrumb">
        Grammar <span>›</span> Lesson ${lesson.id} of ${GRAMMAR_LESSONS.length}
      </div>
      <div class="lesson-main-title">${lesson.icon} ${lesson.title}</div>
      <div class="lesson-main-sub">${lesson.subtitle}</div>

      <div class="lesson-concept">${lesson.concept}</div>

      <div class="pattern-box">
        <div class="pattern-label">Pattern</div>
        <div class="pattern-formula">${lesson.pattern.formula}</div>
        <div class="pattern-pinyin">${lesson.pattern.pinyin}</div>
        <div class="pattern-note">💡 ${lesson.pattern.note}</div>
      </div>

      <div class="examples-section">
        <div class="section-subheader">Examples — Factory Floor Context</div>
        ${lesson.examples.map(ex => `
          <div class="example-card">
            <div class="example-cn">${ex.cn}</div>
            <div class="example-py">${ex.py}</div>
            <div class="example-en">${ex.en}</div>
            <div class="example-breakdown">
              ${ex.breakdown.map(b => `<span class="breakdown-tag">${b}</span>`).join('')}
            </div>
          </div>`).join('')}
      </div>

      <div class="examples-section">
        <div class="section-subheader">Key Words</div>
        <div class="keywords-grid">
          ${lesson.key_words.map(kw => `
            <div class="keyword-card">
              <div class="keyword-cn">${kw.cn}</div>
              <div class="keyword-py">${kw.py}</div>
              <div class="keyword-en">${kw.en}</div>
            </div>`).join('')}
        </div>
      </div>

      <div class="exercises-section">
        <div class="exercises-title">Practice Exercises</div>
        <div class="exercises-sub">Complete all exercises to mark this lesson done</div>
        ${lesson.exercises.map((ex, i) => buildExerciseHTML(ex, i, lesson.id)).join('')}
      </div>

      <div class="lesson-nav">
        ${prevId ? `<button class="btn btn-ghost" onclick="openLesson(${prevId})">← Lesson ${prevId}</button>` : '<span></span>'}
        ${nextId ? `<button class="btn btn-primary" onclick="openLesson(${nextId})">Lesson ${nextId} →</button>` : `<button class="btn btn-primary" onclick="switchView('listening')">Try Listening Lab →</button>`}
      </div>
    </div>`;
}

function buildExerciseHTML(ex, index, lessonId) {
  const exId = `ex-${lessonId}-${index}`;
  if (ex.type === 'fill') {
    return `
      <div class="exercise-block" id="${exId}">
        <div class="exercise-num">Exercise ${index + 1} — Fill in the blank</div>
        <div class="exercise-prompt">${ex.prompt}</div>
        <div class="ex-choices">
          ${ex.choices.map(choice => `
            <button class="ex-choice-btn" data-ex="${exId}" data-choice="${choice}" onclick="answerFill('${exId}', '${choice}', '${ex.answer.replace(/'/g,"\\'")}', ${index}, ${lessonId})">
              ${choice}
            </button>`).join('')}
        </div>
        <div class="ex-feedback" id="${exId}-feedback">${ex.explanation}</div>
      </div>`;
  }
  if (ex.type === 'build') {
    const shuffled = shuffle([...ex.words]);
    return `
      <div class="exercise-block" id="${exId}">
        <div class="exercise-num">Exercise ${index + 1} — Arrange the sentence</div>
        <div class="exercise-prompt">${ex.prompt}</div>
        <div class="build-target" id="${exId}-target">
          <span class="build-placeholder">Click words below to place them here…</span>
        </div>
        <div class="word-tiles" id="${exId}-tiles">
          ${shuffled.map((word, wi) => `
            <button class="word-tile" id="${exId}-tile-${wi}" data-word="${word}" onclick="placeTile('${exId}', ${wi}, '${word}', ${JSON.stringify(ex.answer).replace(/'/g,"\\'")} )">
              ${word}
            </button>`).join('')}
        </div>
        <div class="build-actions">
          <button class="btn btn-sm btn-ghost" onclick="resetBuild('${exId}', ${JSON.stringify(shuffled).replace(/'/g,"\\'")})">↺ Reset</button>
          <button class="btn btn-sm btn-primary" onclick="checkBuild('${exId}', ${JSON.stringify(ex.answer)}, ${JSON.stringify(ex.english)}, ${index}, ${lessonId})">Check ✓</button>
        </div>
        <div class="ex-feedback" id="${exId}-feedback">
          Answer: <strong>${ex.english}</strong><br><em>${ex.py}</em>
        </div>
      </div>`;
  }
  return '';
}

// Exercise logic — fill
function answerFill(exId, choice, correctAnswer, exIndex, lessonId) {
  const btns = document.querySelectorAll(`[data-ex="${exId}"]`);
  btns.forEach(b => {
    b.disabled = true;
    if (b.dataset.choice === correctAnswer) b.classList.add('correct');
    else if (b.dataset.choice === choice && choice !== correctAnswer) b.classList.add('wrong');
  });
  const feedback = document.getElementById(`${exId}-feedback`);
  feedback.style.display = 'block';
  checkLessonCompletion(lessonId, exIndex, choice === correctAnswer);
}

// Exercise logic — sentence builder
const buildState = {}; // exId -> { placed: [] }

function placeTile(exId, tileIndex, word, answerArr) {
  if (!buildState[exId]) buildState[exId] = { placed: [] };
  const s = buildState[exId];

  const tile = document.getElementById(`${exId}-tile-${tileIndex}`);
  if (tile.classList.contains('used')) return;

  s.placed.push({ word, tileIndex });
  tile.classList.add('used');
  renderBuildTarget(exId);
}

function renderBuildTarget(exId) {
  const s = buildState[exId] || { placed: [] };
  const target = document.getElementById(`${exId}-target`);
  if (s.placed.length === 0) {
    target.innerHTML = '<span class="build-placeholder">Click words below to place them here…</span>';
    return;
  }
  target.innerHTML = s.placed.map((item, i) =>
    `<button class="word-tile placed" onclick="removePlaced('${exId}', ${i})">${item.word}</button>`
  ).join('');
}

function removePlaced(exId, placedIndex) {
  const s = buildState[exId];
  if (!s) return;
  const item = s.placed[placedIndex];
  s.placed.splice(placedIndex, 1);
  const tile = document.getElementById(`${exId}-tile-${item.tileIndex}`);
  if (tile) tile.classList.remove('used');
  renderBuildTarget(exId);
}

function resetBuild(exId, shuffled) {
  buildState[exId] = { placed: [] };
  renderBuildTarget(exId);
  shuffled.forEach((word, wi) => {
    const tile = document.getElementById(`${exId}-tile-${wi}`);
    if (tile) tile.classList.remove('used');
  });
  const target = document.getElementById(`${exId}-target`);
  if (target) target.classList.remove('correct', 'wrong');
  const feedback = document.getElementById(`${exId}-feedback`);
  if (feedback) feedback.style.display = 'none';
}

function checkBuild(exId, answerArr, englishStr, exIndex, lessonId) {
  const s = buildState[exId] || { placed: [] };
  const userAnswer = s.placed.map(p => p.word);
  const correct = JSON.stringify(userAnswer) === JSON.stringify(answerArr);

  const target = document.getElementById(`${exId}-target`);
  target.classList.remove('correct', 'wrong');
  target.classList.add(correct ? 'correct' : 'wrong');

  const tiles = document.querySelectorAll(`#${exId}-tiles .word-tile`);
  tiles.forEach(t => t.disabled = true);

  const feedback = document.getElementById(`${exId}-feedback`);
  feedback.style.display = 'block';
  if (!correct) {
    feedback.innerHTML = `Not quite. Correct order: <strong>${answerArr.join(' ')}</strong><br>${englishStr}`;
  }
  checkLessonCompletion(lessonId, exIndex, correct);
}

function checkLessonCompletion(lessonId, exIndex, wasCorrect) {
  const es = State.grammar.exerciseState[lessonId];
  if (!es) return;
  es.answers[exIndex] = wasCorrect;
  const lesson = GRAMMAR_LESSONS.find(l => l.id === lessonId);
  if (!lesson) return;
  const allDone = es.answers.every(a => a !== null);
  if (allDone && !State.completedLessons.has(lessonId)) {
    State.completedLessons.add(lessonId);
    saveState();
    renderLessonList(); // update sidebar checkmarks
  }
}

function attachExerciseListeners() { /* onclick in HTML is sufficient */ }

// ══════════════════════════════════════════════════════════════════════════════
//  LISTENING LAB
// ══════════════════════════════════════════════════════════════════════════════

// TTS engine
function getChineseVoice() {
  const voices = window.speechSynthesis.getVoices();
  return voices.find(v => v.lang === 'zh-CN')
      || voices.find(v => v.lang.startsWith('zh'))
      || null;
}

function speakChinese(text, rate) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = rate || State.listen.rate;
  utterance.pitch = 1.0;
  const voice = getChineseVoice();
  if (voice) utterance.voice = voice;

  // Animate wave
  const wave = document.getElementById('audio-wave');
  if (wave) {
    wave.classList.add('playing');
    utterance.onend = () => wave.classList.remove('playing');
    utterance.onerror = () => wave.classList.remove('playing');
  }
  window.speechSynthesis.speak(utterance);
}

function checkTTSSupport() {
  const dot  = document.getElementById('tts-dot');
  const text = document.getElementById('tts-status');
  if (!('speechSynthesis' in window)) {
    dot.className = 'tts-dot bad';
    text.textContent = 'Audio not supported in this browser. Try Chrome or Edge.';
    return false;
  }
  // Voices may load async
  const setOk = () => {
    const v = getChineseVoice();
    if (v) {
      dot.className = 'tts-dot ok';
      text.textContent = `Audio ready — Chinese voice: ${v.name}`;
    } else {
      dot.className = 'tts-dot bad';
      text.textContent = 'No Chinese voice found. Install a zh-CN voice or try Chrome.';
    }
  };
  if (window.speechSynthesis.getVoices().length) {
    setOk();
  } else {
    window.speechSynthesis.onvoiceschanged = setOk;
  }
  return true;
}

function renderListeningView() {
  checkTTSSupport();
  showListenSets();
}

function showListenSets() {
  window.speechSynthesis.cancel();
  document.getElementById('listen-set-select').classList.remove('hidden');
  document.getElementById('listen-exercise').classList.add('hidden');
  document.getElementById('listen-result').classList.add('hidden');

  const grid = document.getElementById('listen-sets-grid');
  grid.innerHTML = LISTENING_SETS.map(set => `
    <div class="listen-set-card" onclick="startListenSet('${set.id}')">
      <div class="listen-set-icon">${set.icon}</div>
      <div class="listen-set-level" style="background:${set.levelColor}22;color:${set.levelColor};border:1px solid ${set.levelColor}44">
        ${set.level}
      </div>
      <div class="listen-set-title">${set.title}</div>
      <div class="listen-set-desc">${set.description}</div>
      <div class="listen-set-count">${set.exercises.length} exercises</div>
    </div>`).join('');
}

function startListenSet(setId) {
  const set = LISTENING_SETS.find(s => s.id === setId);
  if (!set) return;
  State.listen.activeSet = set;
  State.listen.exerciseIndex = 0;
  State.listen.score = 0;
  State.listen.answered = false;

  document.getElementById('listen-set-select').classList.add('hidden');
  document.getElementById('listen-result').classList.add('hidden');
  document.getElementById('listen-exercise').classList.remove('hidden');

  document.getElementById('listen-ex-title').textContent = set.title;
  renderListenExercise();
}

function renderListenExercise() {
  const set = State.listen.activeSet;
  const idx = State.listen.exerciseIndex;
  const ex  = set.exercises[idx];
  State.listen.answered = false;

  // Counter + progress
  document.getElementById('listen-ex-counter').textContent = `${idx + 1} / ${set.exercises.length}`;
  const pct = (idx / set.exercises.length) * 100;
  document.getElementById('listen-ex-prog-fill').style.width = pct + '%';

  // Question
  document.getElementById('listen-question-text').textContent = ex.question;

  // Hide reveal
  const revealEl = document.getElementById('listen-reveal');
  revealEl.classList.add('hidden');

  // Build choices
  const choicesEl = document.getElementById('listen-choices');
  if (ex.type === 'tf') {
    choicesEl.innerHTML = ['TRUE', 'FALSE'].map(opt => `
      <button class="listen-choice-btn tf-btn" onclick="answerListen('${opt}', '${ex.answer}')">
        ${opt === 'TRUE' ? '✅ TRUE' : '❌ FALSE'}
      </button>`).join('');
  } else {
    choicesEl.innerHTML = ex.choices.map(choice => {
      const safe = choice.replace(/'/g, "\\'");
      const answerSafe = ex.answer.replace(/'/g, "\\'");
      return `<button class="listen-choice-btn" onclick="answerListen('${safe}', '${answerSafe}')">${choice}</button>`;
    }).join('');
  }

  // Auto-play audio
  setTimeout(() => speakChinese(ex.audio), 400);
}

function answerListen(chosen, correct) {
  if (State.listen.answered) return;
  State.listen.answered = true;

  const isCorrect = chosen === correct;
  if (isCorrect) State.listen.score++;

  // Highlight choices
  document.querySelectorAll('.listen-choice-btn').forEach(btn => {
    btn.disabled = true;
    const label = btn.textContent.trim();
    const cleanLabel = label.replace(/^[✅❌]\s*/, '');
    if (cleanLabel === correct || label === correct) btn.classList.add('correct');
    else if ((cleanLabel === chosen || label.includes(chosen)) && !isCorrect) btn.classList.add('wrong');
  });

  // Show reveal
  const set = State.listen.activeSet;
  const ex  = set.exercises[State.listen.exerciseIndex];
  const revealEl = document.getElementById('listen-reveal');
  const headerEl = document.getElementById('reveal-header');
  headerEl.textContent = isCorrect ? '✅ Correct!' : '❌ Not quite';
  headerEl.className = `reveal-header ${isCorrect ? 'correct-header' : 'wrong-header'}`;
  document.getElementById('reveal-cn').textContent = ex.reveal.cn;
  document.getElementById('reveal-py').textContent = ex.reveal.py;
  document.getElementById('reveal-en').textContent = ex.reveal.en;
  revealEl.classList.remove('hidden');
}

function nextListenExercise() {
  const set = State.listen.activeSet;
  State.listen.exerciseIndex++;
  if (State.listen.exerciseIndex >= set.exercises.length) {
    showListenResult();
  } else {
    renderListenExercise();
  }
}

function showListenResult() {
  window.speechSynthesis.cancel();
  document.getElementById('listen-exercise').classList.add('hidden');
  document.getElementById('listen-result').classList.remove('hidden');

  const score = State.listen.score;
  const total = State.listen.activeSet.exercises.length;
  const pct = Math.round((score / total) * 100);

  document.getElementById('lr-score-num').textContent = score;
  document.getElementById('lr-score-den').textContent = `/ ${total}`;

  let emoji = '😤', msg = 'Keep listening! It gets easier with repetition.';
  if (pct >= 90) { emoji = '🏆'; msg = 'Outstanding! Your listening comprehension is excellent.'; }
  else if (pct >= 70) { emoji = '🎉'; msg = 'Great work! You\'re picking up the factory floor register fast.'; }
  else if (pct >= 50) { emoji = '👂'; msg = 'Good effort. Play the audio again and focus on the key words.'; }

  document.getElementById('lr-emoji').textContent = emoji;
  document.getElementById('lr-msg').textContent = msg;
}

// ── QUIZ ─────────────────────────────────────────────────────────────────────

function renderQuizStart() {
  const sel = document.getElementById('quiz-category');
  if (sel.options.length <= 1) {
    CATEGORIES.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = `${cat.emoji} ${cat.name}`;
      sel.appendChild(opt);
    });
  }
}

function startQuiz() {
  const catSel = document.getElementById('quiz-category').value;
  let pool = getFilteredVocab(catSel);
  if (pool.length < 4) {
    alert('Not enough words in this category. Select "All Categories".');
    return;
  }
  const shuffled = shuffle(pool);
  State.quiz.questions = shuffled.slice(0, Math.min(State.quiz.count, shuffled.length));
  State.quiz.index = 0;
  State.quiz.score = 0;
  State.quiz.category = catSel;

  document.getElementById('quiz-start').classList.add('hidden');
  document.getElementById('quiz-result').classList.add('hidden');
  document.getElementById('quiz-game').classList.remove('hidden');
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const { questions, index, type } = State.quiz;
  const question = questions[index];
  document.getElementById('quiz-counter').textContent = `Q ${index + 1} / ${questions.length}`;
  document.getElementById('quiz-score').textContent = State.quiz.score;
  document.getElementById('quiz-progress-fill').style.width = `${(index / questions.length) * 100}%`;

  const qLabel = document.getElementById('quiz-q-label');
  const qMain  = document.getElementById('quiz-question');
  const qPy    = document.getElementById('quiz-pinyin');

  if (type === 'cn-to-en') {
    qLabel.textContent = 'What does this mean in English?';
    qMain.className = 'quiz-question';
    qMain.textContent = question.cn;
    qPy.textContent = question.py;
  } else {
    qLabel.textContent = 'How do you say this in Chinese?';
    qMain.className = 'quiz-question is-english';
    qMain.textContent = question.en;
    qPy.textContent = '';
  }

  const allWords = getFilteredVocab(State.quiz.category);
  const wrongChoices = shuffle(allWords.filter(w => w.id !== question.id)).slice(0, 3);
  const choices = shuffle([question, ...wrongChoices]);

  document.getElementById('quiz-choices').innerHTML = choices.map(choice => {
    const label = type === 'cn-to-en' ? choice.en : choice.cn;
    return `<button class="choice-btn" onclick="answerQuiz(${choice.id}, ${question.id})">${label}</button>`;
  }).join('');
  State.quiz.answered = false;
}

function answerQuiz(chosenId, correctId) {
  if (State.quiz.answered) return;
  State.quiz.answered = true;
  const correct = chosenId === correctId;
  if (correct) State.quiz.score++;

  document.querySelectorAll('.choice-btn').forEach(btn => { btn.disabled = true; });
  const type = State.quiz.type;
  const word = VOCABULARY.find(w => w.id === correctId);
  const correctLabel = type === 'cn-to-en' ? word.en : word.cn;

  document.querySelectorAll('.choice-btn').forEach(btn => {
    if (btn.textContent.trim() === correctLabel) btn.classList.add('correct');
    else if (!correct && btn === event.target) btn.classList.add('wrong');
  });

  setTimeout(() => {
    State.quiz.index++;
    if (State.quiz.index >= State.quiz.questions.length) showQuizResult();
    else renderQuizQuestion();
  }, 1500);
}

function showQuizResult() {
  document.getElementById('quiz-game').classList.add('hidden');
  document.getElementById('quiz-result').classList.remove('hidden');
  const score = State.quiz.score;
  const total = State.quiz.questions.length;
  const pct = Math.round((score / total) * 100);
  document.getElementById('result-score-num').textContent = score;
  document.getElementById('result-score-den').textContent = `/ ${total}`;
  let emoji = '😞', msg = 'Keep practicing! Review the vocabulary and try again.';
  if (pct >= 90) { emoji = '🏆'; msg = 'Excellent! You really know your garment industry Chinese!'; }
  else if (pct >= 70) { emoji = '🎉'; msg = 'Great job! You\'re getting really good at this.'; }
  else if (pct >= 50) { emoji = '👍'; msg = 'Good effort! A bit more practice and you\'ll nail it.'; }
  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-msg').textContent = msg;
}

// ── PHRASEBOOK ───────────────────────────────────────────────────────────────

function renderPhrasebook() {
  const catEl = document.getElementById('phrase-categories');
  catEl.innerHTML = `<button class="phrase-cat-btn active" onclick="filterPhrases('all', this)">All</button>` +
    PHRASE_CATEGORIES.map(c => `
      <button class="phrase-cat-btn" onclick="filterPhrases('${c.id}', this)">${c.emoji} ${c.label}</button>`).join('');
  filterPhrases('all', catEl.querySelector('[onclick*="all"]'));
}

function filterPhrases(cat, btn) {
  document.querySelectorAll('.phrase-cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const phrases = cat === 'all' ? PHRASEBOOK : PHRASEBOOK.filter(p => p.cat === cat);
  document.getElementById('phrase-list').innerHTML = phrases.map(p => `
    <div class="phrase-item">
      <div class="phrase-cn">${p.cn}</div>
      <div class="phrase-pinyin">${p.py}</div>
      <div class="phrase-en">${p.en}</div>
      <div class="phrase-situation">${p.situation}</div>
    </div>`).join('');
}

// ── EVENT LISTENERS ──────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  updateStreak();

  // Nav
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  // Hamburger
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('main-nav').classList.toggle('open');
  });

  // Vocab search
  document.getElementById('vocab-search').addEventListener('input', e => {
    searchQuery = e.target.value.trim();
    renderWordGrid();
  });

  // Modal
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });
  document.getElementById('modal-mark-known').addEventListener('click', () => {
    if (!currentModalWordId) return;
    if (State.learnedWords.has(currentModalWordId)) State.learnedWords.delete(currentModalWordId);
    else State.learnedWords.add(currentModalWordId);
    saveState();
    const isLearned = State.learnedWords.has(currentModalWordId);
    const markBtn = document.getElementById('modal-mark-known');
    markBtn.textContent = isLearned ? 'Unmark as Learned' : 'Mark as Learned ✓';
    markBtn.style.color = isLearned ? '#ff6b6b' : '';
    renderWordGrid(); renderStats();
  });
  document.getElementById('modal-add-fc').addEventListener('click', () => { closeModal(); switchView('flashcards'); });

  // Flashcard
  document.getElementById('flashcard').addEventListener('click', flipCard);
  document.getElementById('flashcard').addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(); }
    if (e.key === 'ArrowRight') nextCard();
    if (e.key === 'ArrowLeft')  prevCard();
  });
  document.getElementById('fc-next').addEventListener('click', nextCard);
  document.getElementById('fc-prev').addEventListener('click', prevCard);
  document.getElementById('fc-shuffle').addEventListener('click', initFlashcards);
  document.getElementById('fc-hard').addEventListener('click', () => nextCard());
  document.getElementById('fc-ok').addEventListener('click', () => nextCard());
  document.getElementById('fc-easy').addEventListener('click', () => {
    const card = State.fc.cards[State.fc.index];
    if (card) { State.learnedWords.add(card.id); saveState(); renderStats(); }
    nextCard();
  });

  // Quiz
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      State.quiz.type = btn.dataset.type;
    });
  });
  document.querySelectorAll('.count-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      State.quiz.count = parseInt(btn.dataset.count);
    });
  });
  document.getElementById('start-quiz').addEventListener('click', startQuiz);
  document.getElementById('quiz-retry').addEventListener('click', () => {
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-start').classList.remove('hidden');
  });

  // Listening Lab buttons
  document.getElementById('audio-play-btn').addEventListener('click', () => {
    const set = State.listen.activeSet;
    if (!set) return;
    const ex = set.exercises[State.listen.exerciseIndex];
    if (ex) speakChinese(ex.audio);
  });
  document.getElementById('audio-replay').addEventListener('click', () => {
    const set = State.listen.activeSet;
    if (!set) return;
    const ex = set.exercises[State.listen.exerciseIndex];
    if (ex) speakChinese(ex.audio);
  });
  document.querySelectorAll('.speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      State.listen.rate = parseFloat(btn.dataset.rate);
    });
  });
  document.getElementById('listen-next-btn').addEventListener('click', nextListenExercise);
  document.getElementById('listen-back').addEventListener('click', showListenSets);
  document.getElementById('lr-retry').addEventListener('click', () => {
    startListenSet(State.listen.activeSet.id);
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // Init
  renderHome();
  renderQuizStart();
});

// Close mobile nav on outside click
document.addEventListener('click', e => {
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('hamburger');
  if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove('open');
  }
});
