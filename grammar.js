// ─────────────────────────────────────────────────────────────────────────────
//  GRAMMAR.JS — Chinese Grammar Lessons for Garment Factory Workers
//  14 lessons covering essential Mandarin sentence patterns
// ─────────────────────────────────────────────────────────────────────────────

const GRAMMAR_LESSONS = [

  // ─── LESSON 1 ────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Basic Word Order",
    subtitle: "Subject → Verb → Object",
    icon: "🔤",
    concept: `Chinese sentence structure is similar to English: Subject first, then Verb, then Object (SVO). Unlike English, there's no conjugation — the verb stays the same regardless of who does it. This is great news for you!`,
    pattern: {
      formula: "Subject + Verb + Object",
      pinyin: "Zhǔyǔ + Dòngcí + Bīnyǔ",
      note: "The verb never changes form. 我做 / 你做 / 他做 all use the same 做."
    },
    examples: [
      { cn: "我 检查 衣服。",    py: "Wǒ jiǎnchá yīfu.",    en: "I inspect the clothes.", breakdown: ["我 = I", "检查 = inspect", "衣服 = clothes"] },
      { cn: "她 熨烫 衬衫。",    py: "Tā yùntàng chènshān.", en: "She irons the shirt.", breakdown: ["她 = she", "熨烫 = iron", "衬衫 = shirt"] },
      { cn: "组长 检查 质量。",  py: "Zǔzhǎng jiǎnchá zhìliàng.", en: "The team leader checks quality.", breakdown: ["组长 = team leader", "检查 = check", "质量 = quality"] },
      { cn: "工人 操作 机器。",  py: "Gōngrén cāozuò jīqì.", en: "The worker operates the machine.", breakdown: ["工人 = worker", "操作 = operate", "机器 = machine"] },
    ],
    key_words: [
      { cn: "我", py: "wǒ", en: "I / me" },
      { cn: "你", py: "nǐ", en: "you" },
      { cn: "他/她", py: "tā", en: "he / she" },
      { cn: "我们", py: "wǒmen", en: "we / us" },
      { cn: "做", py: "zuò", en: "do / make" },
      { cn: "检查", py: "jiǎnchá", en: "inspect / check" },
    ],
    exercises: [
      {
        type: "fill",
        prompt: "I sew the garment. → 我 ___ 衣服。",
        choices: ["车缝", "检查", "包装", "裁剪"],
        answer: "车缝",
        explanation: "车缝 (chēféng) means 'to sew (industrially)'. The structure is 我 + verb + object."
      },
      {
        type: "fill",
        prompt: "The worker packs the finished product. → 工人 ___ 成品。",
        choices: ["包装", "裁剪", "熨烫", "停机"],
        answer: "包装",
        explanation: "包装 (bāozhuāng) means 'to pack/package'. Worker (工人) is the subject, finished product (成品) is the object."
      },
      {
        type: "build",
        prompt: "Rearrange these words: 'She cuts the fabric.'",
        words: ["面料", "裁剪", "她"],
        answer: ["她", "裁剪", "面料"],
        english: "她 裁剪 面料。",
        py: "Tā cáijiǎn miànliào."
      },
      {
        type: "build",
        prompt: "Rearrange: 'The team leader checks quality.'",
        words: ["质量", "组长", "检查"],
        answer: ["组长", "检查", "质量"],
        english: "组长 检查 质量。",
        py: "Zǔzhǎng jiǎnchá zhìliàng."
      }
    ]
  },

  // ─── LESSON 2 ────────────────────────────────────────────────────────────
  {
    id: 2,
    title: "是 (shì) — To Be",
    subtitle: "Identifying and classifying things",
    icon: "🟰",
    concept: `是 (shì) is the Chinese equivalent of "is / am / are". It links a subject to an identity, category, or description. Negate it with 不是 (bù shì) to say "is not". You'll use this constantly to identify fabric types, styles, and defects.`,
    pattern: {
      formula: "Subject + 是 + Noun/Identity",
      pinyin: "Zhǔyǔ + shì + míngcí",
      note: "是 does NOT link adjectives — don't say 这个是好. For adjectives, see Lesson 5."
    },
    examples: [
      { cn: "这 是 棉布。",         py: "Zhè shì mián bù.",         en: "This is cotton fabric.", breakdown: ["这 = this", "是 = is", "棉布 = cotton fabric"] },
      { cn: "我 是 新来的工人。",   py: "Wǒ shì xīn lái de gōngrén.", en: "I am a new worker.", breakdown: ["我 = I", "是 = am", "新来的工人 = new worker"] },
      { cn: "这件 不是 次品。",     py: "Zhè jiàn bù shì cìpǐn.",   en: "This piece is not a defective item.", breakdown: ["这件 = this piece", "不是 = is not", "次品 = defective item"] },
      { cn: "这个面料 是 涤纶吗？", py: "Zhège miànliào shì dílún ma?", en: "Is this fabric polyester?", breakdown: ["这个面料 = this fabric", "是 = is", "涤纶 = polyester", "吗 = question particle"] },
    ],
    key_words: [
      { cn: "是", py: "shì", en: "is / am / are" },
      { cn: "不是", py: "bù shì", en: "is not / am not" },
      { cn: "这", py: "zhè", en: "this" },
      { cn: "那", py: "nà", en: "that" },
      { cn: "这个", py: "zhège", en: "this one" },
      { cn: "那个", py: "nàge", en: "that one" },
    ],
    exercises: [
      {
        type: "fill",
        prompt: "This is the sample. → 这 ___ 样品。",
        choices: ["是", "有", "在", "要"],
        answer: "是",
        explanation: "是 (shì) connects 'this' to its identity 'sample'. This is a classic Subject + 是 + Noun pattern."
      },
      {
        type: "fill",
        prompt: "I am not the team leader. → 我 ___ 组长。",
        choices: ["不是", "没有", "不要", "不在"],
        answer: "不是",
        explanation: "不是 (bù shì) negates 是. 我不是组长 = I am not the team leader."
      },
      {
        type: "build",
        prompt: "Rearrange: 'This is polyester fabric.'",
        words: ["涤纶", "这", "是", "面料"],
        answer: ["这", "是", "涤纶", "面料"],
        english: "这 是 涤纶面料。",
        py: "Zhè shì dílún miànliào."
      },
      {
        type: "build",
        prompt: "Rearrange: 'That is not a defect.'",
        words: ["不是", "那", "缺陷"],
        answer: ["那", "不是", "缺陷"],
        english: "那 不是 缺陷。",
        py: "Nà bù shì quēxiàn."
      }
    ]
  },

  // ─── LESSON 3 ────────────────────────────────────────────────────────────
  {
    id: 3,
    title: "有 (yǒu) — Have / There is",
    subtitle: "Possession and existence",
    icon: "📦",
    concept: `有 (yǒu) covers two things English uses different verbs for: "to have" (possession) and "there is/are" (existence). Negate with 没有 (méiyǒu) — never 不有. This is essential for reporting defects, checking stock, and describing garments.`,
    pattern: {
      formula: "Subject + 有 + Object",
      pinyin: "Zhǔyǔ + yǒu + bīnyǔ",
      note: "To negate: use 没有, NOT 不有. This is one of the few verbs that negates with 没."
    },
    examples: [
      { cn: "这件衣服 有 污渍。",   py: "Zhè jiàn yīfu yǒu wūzì.",   en: "This garment has a stain.", breakdown: ["这件衣服 = this garment", "有 = has", "污渍 = stain"] },
      { cn: "仓库 有 物料。",       py: "Cāngkù yǒu wùliào.",         en: "There are materials in the warehouse.", breakdown: ["仓库 = warehouse", "有 = there are", "物料 = materials"] },
      { cn: "这里 没有 针。",       py: "Zhèlǐ méiyǒu zhēn.",         en: "There are no needles here.", breakdown: ["这里 = here", "没有 = there are no", "针 = needles"] },
      { cn: "我们 有 问题。",       py: "Wǒmen yǒu wèntí.",           en: "We have a problem.", breakdown: ["我们 = we", "有 = have", "问题 = problem"] },
    ],
    key_words: [
      { cn: "有", py: "yǒu", en: "have / there is" },
      { cn: "没有", py: "méiyǒu", en: "don't have / there isn't" },
      { cn: "这里", py: "zhèlǐ", en: "here" },
      { cn: "那里", py: "nàlǐ", en: "there" },
      { cn: "仓库", py: "cāngkù", en: "warehouse" },
      { cn: "问题", py: "wèntí", en: "problem" },
    ],
    exercises: [
      {
        type: "fill",
        prompt: "This batch has a problem. → 这批货 ___ 问题。",
        choices: ["有", "是", "在", "要"],
        answer: "有",
        explanation: "有 (yǒu) expresses possession/existence. 这批货有问题 = This batch has a problem."
      },
      {
        type: "fill",
        prompt: "There is no thread. → ___ 线了。",
        choices: ["没有", "不是", "不要", "不在"],
        answer: "没有",
        explanation: "没有 (méiyǒu) negates 有. Never use 不有. 没有线了 = There's no thread left."
      },
      {
        type: "build",
        prompt: "Rearrange: 'This garment has a defect.'",
        words: ["缺陷", "这件衣服", "有"],
        answer: ["这件衣服", "有", "缺陷"],
        english: "这件衣服 有 缺陷。",
        py: "Zhè jiàn yīfu yǒu quēxiàn."
      },
      {
        type: "build",
        prompt: "Rearrange: 'The warehouse doesn't have material.'",
        words: ["物料", "仓库", "没有"],
        answer: ["仓库", "没有", "物料"],
        english: "仓库 没有 物料。",
        py: "Cāngkù méiyǒu wùliào."
      }
    ]
  },

  // ─── LESSON 4 ────────────────────────────────────────────────────────────
  {
    id: 4,
    title: "Negation — 不 and 没",
    subtitle: "Two ways to say 'no'",
    icon: "❌",
    concept: `Chinese has two main negation words and you must use the right one. 不 (bù) is used for present habits, general facts, adjectives, and future intentions. 没 (méi) is used for past events that didn't happen, and always with 有. Getting this right sounds much more natural.`,
    pattern: {
      formula: "不 + Verb/Adjective  (general/present/future)\n没 + 有  OR  没 + Verb  (past — it didn't happen)",
      pinyin: "bù + V/Adj   /   méi + yǒu OR V",
      note: "Note: 不 changes tone to bú before 4th-tone syllables (不是 bú shì, 不对 bú duì)"
    },
    examples: [
      { cn: "这个 不合格。",         py: "Zhège bù hégé.",             en: "This doesn't pass (QC).", breakdown: ["不 = not", "合格 = pass/acceptable"] },
      { cn: "我 不是 组长。",        py: "Wǒ bù shì zǔzhǎng.",         en: "I am not the team leader.", breakdown: ["不是 = am not"] },
      { cn: "我 没有 做完。",        py: "Wǒ méiyǒu zuò wán.",         en: "I haven't finished.", breakdown: ["没有 = haven't", "做完 = finished doing"] },
      { cn: "机器 没 修好。",        py: "Jīqì méi xiū hǎo.",          en: "The machine wasn't fixed properly.", breakdown: ["没 = didn't (past)", "修好 = fixed properly"] },
    ],
    key_words: [
      { cn: "不", py: "bù / bú", en: "not (general/future)" },
      { cn: "没", py: "méi", en: "not (past/with 有)" },
      { cn: "不合格", py: "bù hégé", en: "doesn't pass / non-conforming" },
      { cn: "不对", py: "bú duì", en: "incorrect / wrong" },
      { cn: "没做完", py: "méi zuò wán", en: "didn't finish" },
      { cn: "没问题", py: "méi wèntí", en: "no problem" },
    ],
    exercises: [
      {
        type: "fill",
        prompt: "The collar isn't flat (right now). → 领子 ___ 平。",
        choices: ["不", "没", "没有", "是不"],
        answer: "不",
        explanation: "不 (bù) negates a current state or adjective. 领子不平 = The collar is not flat."
      },
      {
        type: "fill",
        prompt: "I haven't inspected it yet (past action didn't happen). → 我 ___ 检查。",
        choices: ["没", "不", "是", "要"],
        answer: "没",
        explanation: "没 (méi) negates a past action. 我没检查 = I didn't (haven't) inspect(ed) it."
      },
      {
        type: "fill",
        prompt: "This size is wrong. → 这个尺寸 ___ 对。",
        choices: ["不", "没", "没有", "不是"],
        answer: "不",
        explanation: "不对 (bù duì) = incorrect/wrong. Used for current states, not past events."
      },
      {
        type: "build",
        prompt: "Rearrange: 'The thread hasn't run out.'",
        words: ["用完", "线", "没"],
        answer: ["线", "没", "用完"],
        english: "线 没 用完。",
        py: "Xiàn méi yòng wán."
      }
    ]
  },

  // ─── LESSON 5 ────────────────────────────────────────────────────────────
  {
    id: 5,
    title: "Adjectives & 很 (hěn)",
    subtitle: "Describing quality and appearance",
    icon: "🎨",
    concept: `In Chinese, adjectives directly precede nouns (like English). But when an adjective acts as a predicate ('X IS adjective'), it doesn't need 是 — instead it usually takes 很 (hěn), which technically means 'very' but in plain statements is just a structural filler. 太...了 means 'too much'.`,
    pattern: {
      formula: "Subject + 很 + Adjective  (statement)\nSubject + 太 + Adjective + 了  (too much)",
      pinyin: "Zhǔyǔ + hěn + xíngróngcí",
      note: "很 before an adjective doesn't always mean 'very' — in neutral statements it just makes the sentence grammatically complete."
    },
    examples: [
      { cn: "这个面料 很 薄。",      py: "Zhège miànliào hěn báo.",    en: "This fabric is thin.", breakdown: ["很 = (is/very)", "薄 = thin"] },
      { cn: "这条线 太 短 了。",     py: "Zhè tiáo xiàn tài duǎn le.", en: "This thread is too short.", breakdown: ["太 = too", "短 = short", "了 = emphasis"] },
      { cn: "缝份 太 宽 了。",       py: "Féngfèn tài kuān le.",        en: "The seam allowance is too wide.", breakdown: ["缝份 = seam allowance", "太...了 = too..."] },
      { cn: "这件衣服 很 整齐。",    py: "Zhè jiàn yīfu hěn zhěngqí.", en: "This garment is very neat.", breakdown: ["整齐 = neat/tidy"] },
    ],
    key_words: [
      { cn: "很", py: "hěn", en: "very / (predicate marker)" },
      { cn: "太...了", py: "tài...le", en: "too... (excessive)" },
      { cn: "薄", py: "báo", en: "thin (fabric)" },
      { cn: "厚", py: "hòu", en: "thick (fabric)" },
      { cn: "宽", py: "kuān", en: "wide / too wide" },
      { cn: "窄", py: "zhǎi", en: "narrow / too narrow" },
      { cn: "平", py: "píng", en: "flat / smooth" },
      { cn: "整齐", py: "zhěngqí", en: "neat / tidy" },
    ],
    exercises: [
      {
        type: "fill",
        prompt: "The collar is too short. → 领子 太 短 ___。",
        choices: ["了", "的", "吗", "过"],
        answer: "了",
        explanation: "太...了 is the fixed structure for 'too + adjective'. 太短了 = too short."
      },
      {
        type: "fill",
        prompt: "This fabric is very thick. → 这个面料 ___ 厚。",
        choices: ["很", "太", "是", "有"],
        answer: "很",
        explanation: "很 (hěn) links the subject to an adjective predicate. Even when not meaning 'very', it's needed here."
      },
      {
        type: "build",
        prompt: "Rearrange: 'The seam allowance is too narrow.'",
        words: ["了", "太", "缝份", "窄"],
        answer: ["缝份", "太", "窄", "了"],
        english: "缝份 太 窄 了。",
        py: "Féngfèn tài zhǎi le."
      },
      {
        type: "build",
        prompt: "Rearrange: 'This stitch is very neat.'",
        words: ["很", "这条缝线", "整齐"],
        answer: ["这条缝线", "很", "整齐"],
        english: "这条缝线 很 整齐。",
        py: "Zhè tiáo féng xiàn hěn zhěngqí."
      }
    ]
  },

  // ─── LESSON 6 ────────────────────────────────────────────────────────────
  {
    id: 6,
    title: "Questions — 吗 and 呢",
    subtitle: "Asking yes/no and follow-up questions",
    icon: "❓",
    concept: `Chinese makes questions in two elegant ways. Add 吗 (ma) to the end of any statement to turn it into a yes/no question — no word order change needed! 呢 (ne) asks a follow-up 'and what about...?' question. There's also the A-not-A pattern: verb + 不 + verb = do you or don't you?`,
    pattern: {
      formula: "Statement + 吗？  →  Yes/No Question\nTopic + 呢？  →  'What about X?'\nVerb + 不 + Verb？  →  'Do you or don't you?'",
      pinyin: "jùzi + ma / A + bù + A",
      note: "To answer yes: repeat the verb. To answer no: 不 + verb."
    },
    examples: [
      { cn: "今天加班 吗？",          py: "Jīntiān jiābān ma?",          en: "Are we working overtime today?", breakdown: ["今天 = today", "加班 = overtime", "吗 = ?"] },
      { cn: "这件合格 吗？",          py: "Zhè jiàn hégé ma?",           en: "Does this piece pass?", breakdown: ["合格 = pass", "吗 = ?"] },
      { cn: "你 做完 没有？",         py: "Nǐ zuò wán méiyǒu?",          en: "Have you finished or not?", breakdown: ["做完 = finished", "没有 = or not?"] },
      { cn: "你们 呢？",              py: "Nǐmen ne?",                    en: "What about you (all)?", breakdown: ["你们 = you (plural)", "呢 = and...?"] },
    ],
    key_words: [
      { cn: "吗", py: "ma", en: "yes/no question particle" },
      { cn: "呢", py: "ne", en: "what about...? / and?" },
      { cn: "什么", py: "shénme", en: "what?" },
      { cn: "哪里", py: "nǎlǐ", en: "where?" },
      { cn: "几个", py: "jǐ gè", en: "how many?" },
      { cn: "多少", py: "duōshao", en: "how much / how many?" },
    ],
    exercises: [
      {
        type: "fill",
        prompt: "Is this batch OK? → 这批货合格 ___？",
        choices: ["吗", "呢", "了", "的"],
        answer: "吗",
        explanation: "吗 (ma) at the end of a statement makes it a yes/no question. No word order change needed."
      },
      {
        type: "fill",
        prompt: "How many pieces are in this order? → 这个订单有 ___ 件？",
        choices: ["多少", "什么", "哪里", "几"],
        answer: "多少",
        explanation: "多少 (duōshao) asks 'how many/much' for larger numbers or quantities. 多少件 = how many pieces."
      },
      {
        type: "build",
        prompt: "Rearrange: 'Is this fabric cotton?'",
        words: ["吗", "棉", "这个面料", "是"],
        answer: ["这个面料", "是", "棉", "吗"],
        english: "这个面料 是 棉 吗？",
        py: "Zhège miànliào shì mián ma?"
      },
      {
        type: "build",
        prompt: "Rearrange: 'Where is the sample?'",
        words: ["样品", "在", "哪里"],
        answer: ["样品", "在", "哪里"],
        english: "样品 在 哪里？",
        py: "Yàngpǐn zài nǎlǐ?"
      }
    ]
  },

  // ─── LESSON 7 ────────────────────────────────────────────────────────────
  {
    id: 7,
    title: "Measure Words (量词)",
    subtitle: "Counting garments, fabric, and equipment",
    icon: "🔢",
    concept: `In Chinese, you can't say 'three garments' directly — you must use a measure word between the number and the noun: Number + Measure Word + Noun. Each type of noun has its own measure word. In the garment industry, you'll use a core set repeatedly.`,
    pattern: {
      formula: "Number + Measure Word + Noun",
      pinyin: "Shùzì + Liàngcí + Míngcí",
      note: "The measure word 个 (gè) is a safe generic fallback when you don't know the specific one, but use proper ones to sound professional."
    },
    examples: [
      { cn: "三 件 衬衫",      py: "sān jiàn chènshān",   en: "three shirts",          breakdown: ["三 = three", "件 = MW for garments", "衬衫 = shirts"] },
      { cn: "两 批 货",        py: "liǎng pī huò",        en: "two batches of goods",  breakdown: ["两 = two", "批 = MW for batches", "货 = goods"] },
      { cn: "一 台 缝纫机",    py: "yī tái féngrènjī",    en: "one sewing machine",    breakdown: ["一 = one", "台 = MW for machines", "缝纫机 = sewing machine"] },
      { cn: "五 卷 面料",      py: "wǔ juǎn miànliào",   en: "five rolls of fabric",  breakdown: ["五 = five", "卷 = MW for rolls", "面料 = fabric"] },
    ],
    key_words: [
      { cn: "件", py: "jiàn", en: "MW — garments (shirts, jackets…)" },
      { cn: "条", py: "tiáo", en: "MW — trousers, belts, zippers (long things)" },
      { cn: "批", py: "pī", en: "MW — batches / lots" },
      { cn: "台", py: "tái", en: "MW — machines, equipment" },
      { cn: "卷", py: "juǎn", en: "MW — rolls (of fabric, thread)" },
      { cn: "根", py: "gēn", en: "MW — needles, thin sticks" },
      { cn: "个", py: "gè", en: "MW — general (safe fallback)" },
      { cn: "箱", py: "xiāng", en: "MW — boxes / cartons" },
    ],
    exercises: [
      {
        type: "fill",
        prompt: "Five shirts → 五 ___ 衬衫",
        choices: ["件", "条", "台", "批"],
        answer: "件",
        explanation: "件 (jiàn) is the measure word for upper-body garments and general clothing. 五件衬衫 = five shirts."
      },
      {
        type: "fill",
        prompt: "Two pairs of trousers → 两 ___ 裤子",
        choices: ["条", "件", "台", "卷"],
        answer: "条",
        explanation: "条 (tiáo) is used for trousers, belts, zippers — anything long and flexible. 两条裤子 = two pairs of trousers."
      },
      {
        type: "fill",
        prompt: "Three sewing machines → 三 ___ 缝纫机",
        choices: ["台", "件", "条", "卷"],
        answer: "台",
        explanation: "台 (tái) counts machines and equipment. 三台缝纫机 = three sewing machines."
      },
      {
        type: "build",
        prompt: "Rearrange: 'This batch has 500 pieces.'",
        words: ["500件", "这批", "有"],
        answer: ["这批", "有", "500件"],
        english: "这批 有 500件。",
        py: "Zhè pī yǒu 500 jiàn."
      }
    ]
  },

  // ─── LESSON 8 ────────────────────────────────────────────────────────────
  {
    id: 8,
    title: "要 (yào) — Need / Want / Will",
    subtitle: "The most useful modal verb on the factory floor",
    icon: "⚡",
    concept: `要 (yào) is one of the hardest-working words in Chinese. In context it means 'need to', 'want to', or signals a future action ('will'). On the factory floor, it's often used in instructions — 'The collar NEEDS to be pressed flat.' Negate with 不要 (don't) or 不需要 (don't need to).`,
    pattern: {
      formula: "Subject + 要 + Verb + Object",
      pinyin: "Zhǔyǔ + yào + dòngcí + bīnyǔ",
      note: "不要 = 'don't!' (a command/instruction). 不需要 = 'don't need to' (no necessity)."
    },
    examples: [
      { cn: "领子 要 烫平。",          py: "Lǐngzi yào tàng píng.",       en: "The collar needs to be ironed flat.", breakdown: ["领子 = collar", "要 = needs to", "烫平 = iron flat"] },
      { cn: "我 要 去 领料。",         py: "Wǒ yào qù lǐng liào.",        en: "I need to go get materials.", breakdown: ["要 = need/will", "去 = go", "领料 = collect materials"] },
      { cn: "不要 在这里 吃东西。",    py: "Bú yào zài zhèlǐ chī dōngxi.", en: "Don't eat here.", breakdown: ["不要 = don't", "在这里 = here", "吃东西 = eat food"] },
      { cn: "出货 前 要 全检。",       py: "Chūhuò qián yào quánjiǎn.",    en: "Before shipment, there must be a full inspection.", breakdown: ["出货前 = before shipment", "要 = must", "全检 = full inspection"] },
    ],
    key_words: [
      { cn: "要", py: "yào", en: "need to / want to / will" },
      { cn: "不要", py: "bú yào", en: "don't! (command)" },
      { cn: "需要", py: "xūyào", en: "need (more formal)" },
      { cn: "不需要", py: "bù xūyào", en: "don't need to" },
      { cn: "去", py: "qù", en: "go" },
      { cn: "来", py: "lái", en: "come" },
    ],
    exercises: [
      {
        type: "fill",
        prompt: "The hem needs to be folded. → 下摆 ___ 折叠。",
        choices: ["要", "是", "有", "在"],
        answer: "要",
        explanation: "要 (yào) expresses necessity in instructions. 下摆要折叠 = The hem needs to be folded."
      },
      {
        type: "fill",
        prompt: "Don't touch the machine! → ___ 摸机器！",
        choices: ["不要", "没有", "不是", "不在"],
        answer: "不要",
        explanation: "不要 (bú yào) as a command means 'don't!' It's direct and clear — perfect for safety instructions."
      },
      {
        type: "build",
        prompt: "Rearrange: 'I need to go to the warehouse.'",
        words: ["仓库", "我", "去", "要"],
        answer: ["我", "要", "去", "仓库"],
        english: "我 要 去 仓库。",
        py: "Wǒ yào qù cāngkù."
      },
      {
        type: "build",
        prompt: "Rearrange: 'Thread ends must be trimmed.'",
        words: ["要", "线头", "剪干净"],
        answer: ["线头", "要", "剪干净"],
        english: "线头 要 剪干净。",
        py: "Xiàntóu yào jiǎn gānjìng."
      }
    ]
  },

  // ─── LESSON 9 ────────────────────────────────────────────────────────────
  {
    id: 9,
    title: "Location with 在 (zài)",
    subtitle: "Where things are and where actions happen",
    icon: "📍",
    concept: `在 (zài) expresses location — "X is at/in/on Y". It can be a verb ('to be at') or a preposition before another verb ('doing something at a place'). Pair it with location words like 这里 (here), 那里 (there), or place names. For 'where', use 哪里 (nǎlǐ).`,
    pattern: {
      formula: "Subject + 在 + Location  (existence at a place)\nSubject + 在 + Location + Verb  (action at a place)",
      pinyin: "Zhǔyǔ + zài + dìdiǎn",
      note: "在 comes BEFORE the place word. Place words go BEFORE the verb when used as a preposition."
    },
    examples: [
      { cn: "物料 在 仓库。",          py: "Wùliào zài cāngkù.",          en: "The materials are in the warehouse.", breakdown: ["物料 = materials", "在 = are in", "仓库 = warehouse"] },
      { cn: "我 在 整烫部门 工作。",   py: "Wǒ zài zhěngtàng bùmén gōngzuò.", en: "I work in the pressing department.", breakdown: ["在 = at", "整烫部门 = pressing dept.", "工作 = work"] },
      { cn: "样品 在 哪里？",          py: "Yàngpǐn zài nǎlǐ?",           en: "Where is the sample?", breakdown: ["样品 = sample", "在 = is at", "哪里 = where"] },
      { cn: "组长 不在。",             py: "Zǔzhǎng bú zài.",              en: "The team leader is not here/around.", breakdown: ["组长 = team leader", "不在 = not here"] },
    ],
    key_words: [
      { cn: "在", py: "zài", en: "at / in / on (location)" },
      { cn: "不在", py: "bú zài", en: "not here / not around" },
      { cn: "这里", py: "zhèlǐ", en: "here" },
      { cn: "那里", py: "nàlǐ", en: "there" },
      { cn: "哪里", py: "nǎlǐ", en: "where?" },
      { cn: "上面", py: "shàngmiàn", en: "above / on top" },
      { cn: "旁边", py: "pángbiān", en: "beside / next to" },
    ],
    exercises: [
      {
        type: "fill",
        prompt: "The needle is on the table. → 针 ___ 桌子上。",
        choices: ["在", "是", "有", "要"],
        answer: "在",
        explanation: "在 (zài) expresses location. 针在桌子上 = The needle is on the table. (桌子上 = on the table)"
      },
      {
        type: "fill",
        prompt: "Where is the team leader? → 组长 在 ___？",
        choices: ["哪里", "这里", "什么", "怎么"],
        answer: "哪里",
        explanation: "哪里 (nǎlǐ) means 'where'. Place it after 在 to ask 'Where is...?'"
      },
      {
        type: "build",
        prompt: "Rearrange: 'I work in the finishing department.'",
        words: ["工作", "整烫部门", "我", "在"],
        answer: ["我", "在", "整烫部门", "工作"],
        english: "我 在 整烫部门 工作。",
        py: "Wǒ zài zhěngtàng bùmén gōngzuò."
      },
      {
        type: "build",
        prompt: "Rearrange: 'The finished product is in the warehouse.'",
        words: ["在", "成品", "仓库"],
        answer: ["成品", "在", "仓库"],
        english: "成品 在 仓库。",
        py: "Chéngpǐn zài cāngkù."
      }
    ]
  },

  // ─── LESSON 10 ───────────────────────────────────────────────────────────
  {
    id: 10,
    title: "了 (le) — Completed Actions",
    subtitle: "Marking what's done",
    icon: "✅",
    concept: `了 (le) has two main uses. After a verb, it marks a completed action — like the English past tense. At the end of a sentence, it signals a change of state or a new situation. On the factory floor you'll hear it constantly: 做完了 (done!), 机器坏了 (machine broke!), 线用完了 (thread ran out!).`,
    pattern: {
      formula: "Verb + 了  (completed action)\nSentence + 了  (change of state / new situation)",
      pinyin: "dòngcí + le",
      note: "了 does NOT always mean past tense. 我明天做了再说 uses 了 in a future context."
    },
    examples: [
      { cn: "我 检查 完 了。",        py: "Wǒ jiǎnchá wán le.",          en: "I've finished inspecting.", breakdown: ["检查 = inspect", "完 = finished/complete", "了 = completion marker"] },
      { cn: "机器 坏 了。",           py: "Jīqì huài le.",               en: "The machine broke (and it's now broken).", breakdown: ["机器 = machine", "坏 = broken", "了 = change of state"] },
      { cn: "线 用完 了。",           py: "Xiàn yòng wán le.",            en: "The thread has run out.", breakdown: ["线 = thread", "用完 = used up", "了 = completed"] },
      { cn: "这批货 检查 好 了。",    py: "Zhè pī huò jiǎnchá hǎo le.",  en: "This batch has been fully checked.", breakdown: ["检查好 = completely checked", "了 = done"] },
    ],
    key_words: [
      { cn: "了", py: "le", en: "completion / change of state marker" },
      { cn: "做完了", py: "zuò wán le", en: "finished doing" },
      { cn: "坏了", py: "huài le", en: "broke / broken now" },
      { cn: "好了", py: "hǎo le", en: "done! / OK! / fixed!" },
      { cn: "用完了", py: "yòng wán le", en: "used up / ran out" },
      { cn: "已经", py: "yǐjīng", en: "already" },
    ],
    exercises: [
      {
        type: "fill",
        prompt: "The machine is broken now. → 机器 坏 ___。",
        choices: ["了", "吗", "的", "过"],
        answer: "了",
        explanation: "了 after an adjective/verb at the end of a sentence signals a change of state. 坏了 = 'has broken / is now broken'."
      },
      {
        type: "fill",
        prompt: "I've already finished. → 我 已经 做完 ___。",
        choices: ["了", "吗", "呢", "也"],
        answer: "了",
        explanation: "已经...了 = 'already done'. 我已经做完了 = I've already finished."
      },
      {
        type: "build",
        prompt: "Rearrange: 'The ironing is done.'",
        words: ["了", "熨烫", "好"],
        answer: ["熨烫", "好", "了"],
        english: "熨烫 好 了。",
        py: "Yùntàng hǎo le."
      },
      {
        type: "build",
        prompt: "Rearrange: 'This batch has been packed.'",
        words: ["包装", "了", "这批货", "好"],
        answer: ["这批货", "包装", "好", "了"],
        english: "这批货 包装 好 了。",
        py: "Zhè pī huò bāozhuāng hǎo le."
      }
    ]
  },

  // ─── LESSON 11 ───────────────────────────────────────────────────────────
  {
    id: 11,
    title: "Time Words & Sequence",
    subtitle: "Talking about when things happen",
    icon: "⏰",
    concept: `In Chinese, time expressions go BEFORE the verb — the opposite of many European languages. This feels natural once you know it: think of it as setting the scene first. Time words for sequence (first, then, finally) are essential for giving and following instructions on the production floor.`,
    pattern: {
      formula: "Subject + Time Word + Verb + Object",
      pinyin: "Zhǔyǔ + shíjiān + dòngcí + bīnyǔ",
      note: "先...然后...最后 = First...then...finally. This three-step pattern is perfect for explaining a process."
    },
    examples: [
      { cn: "今天 我们 要 加班。",         py: "Jīntiān wǒmen yào jiābān.",       en: "Today we need to work overtime.", breakdown: ["今天 = today", "时间词 before verb"] },
      { cn: "先 检查，然后 包装。",        py: "Xiān jiǎnchá, rán hòu bāozhuāng.", en: "First inspect, then pack.", breakdown: ["先 = first", "然后 = then"] },
      { cn: "出货 前 要 全检。",           py: "Chūhuò qián yào quánjiǎn.",        en: "Before shipping, do a full inspection.", breakdown: ["出货前 = before shipping", "前 = before"] },
      { cn: "做完 后，放 到 这里。",       py: "Zuò wán hòu, fàng dào zhèlǐ.",     en: "After finishing, put it here.", breakdown: ["做完后 = after finishing", "后 = after"] },
    ],
    key_words: [
      { cn: "今天", py: "jīntiān", en: "today" },
      { cn: "明天", py: "míngtiān", en: "tomorrow" },
      { cn: "现在", py: "xiànzài", en: "now" },
      { cn: "先", py: "xiān", en: "first" },
      { cn: "然后", py: "rán hòu", en: "then / after that" },
      { cn: "最后", py: "zuìhòu", en: "finally / last" },
      { cn: "之前", py: "zhīqián", en: "before" },
      { cn: "之后", py: "zhīhòu", en: "after" },
    ],
    exercises: [
      {
        type: "fill",
        prompt: "First iron, then pack. → ___ 熨烫，然后包装。",
        choices: ["先", "后", "再", "前"],
        answer: "先",
        explanation: "先...然后 = first...then. 先 sets up the first action in a sequence."
      },
      {
        type: "fill",
        prompt: "We are working overtime today. → 今天 我们 要 ___。",
        choices: ["加班", "休息", "出货", "检查"],
        answer: "加班",
        explanation: "加班 (jiābān) = to work overtime. Time word 今天 comes before the verb in Chinese."
      },
      {
        type: "build",
        prompt: "Rearrange: 'After finishing, report to the team leader.'",
        words: ["组长", "做完后", "告诉"],
        answer: ["做完后", "告诉", "组长"],
        english: "做完后 告诉 组长。",
        py: "Zuò wán hòu gàosù zǔzhǎng."
      },
      {
        type: "build",
        prompt: "Rearrange: 'Tomorrow we will ship the goods.'",
        words: ["出货", "我们", "明天", "要"],
        answer: ["明天", "我们", "要", "出货"],
        english: "明天 我们 要 出货。",
        py: "Míngtiān wǒmen yào chūhuò."
      }
    ]
  },

  // ─── LESSON 12 ───────────────────────────────────────────────────────────
  {
    id: 12,
    title: "Comparison with 比 (bǐ)",
    subtitle: "More than, less than, different from",
    icon: "⚖️",
    concept: `To compare two things in Chinese, use A 比 B + adjective. This is much simpler than English — no 'more than' needed; just put the adjective after 比 B and it automatically means 'more'. For 'the same as', use 一样 (yīyàng). For 'not the same', 不一样 (bù yīyàng).`,
    pattern: {
      formula: "A + 比 + B + Adjective\nA + 和 + B + 一样 + Adjective",
      pinyin: "A + bǐ + B + xíngróngcí",
      note: "Don't add 更 (more) after 比 — 比 already implies 'more'. Exception: 比...更 adds extra emphasis."
    },
    examples: [
      { cn: "这件 比 样品 短。",       py: "Zhè jiàn bǐ yàngpǐn duǎn.",    en: "This piece is shorter than the sample.", breakdown: ["比 = than", "样品 = sample", "短 = short"] },
      { cn: "今天的产量 比 昨天 多。", py: "Jīntiān de chǎnliàng bǐ zuótiān duō.", en: "Today's output is more than yesterday's.", breakdown: ["产量 = output", "比 = than", "多 = more"] },
      { cn: "这件 和 样品 一样 长。",  py: "Zhè jiàn hé yàngpǐn yīyàng cháng.", en: "This piece is the same length as the sample.", breakdown: ["和...一样 = same as"] },
      { cn: "这两件 不一样。",         py: "Zhè liǎng jiàn bù yīyàng.",     en: "These two pieces are different.", breakdown: ["不一样 = not the same / different"] },
    ],
    key_words: [
      { cn: "比", py: "bǐ", en: "than (comparison)" },
      { cn: "一样", py: "yīyàng", en: "the same" },
      { cn: "不一样", py: "bù yīyàng", en: "different / not the same" },
      { cn: "更", py: "gèng", en: "even more (extra emphasis)" },
      { cn: "多", py: "duō", en: "more / many" },
      { cn: "少", py: "shǎo", en: "fewer / less" },
      { cn: "长", py: "cháng", en: "long" },
      { cn: "短", py: "duǎn", en: "short" },
    ],
    exercises: [
      {
        type: "fill",
        prompt: "This piece is wider than the sample. → 这件 ___ 样品 宽。",
        choices: ["比", "和", "是", "有"],
        answer: "比",
        explanation: "比 (bǐ) introduces a comparison. A + 比 + B + adjective = A is more [adj] than B."
      },
      {
        type: "fill",
        prompt: "These two pieces are not the same. → 这两件 ___。",
        choices: ["不一样", "不合格", "不好", "没有"],
        answer: "不一样",
        explanation: "不一样 (bù yīyàng) = not the same / different. Very useful in QC when flagging inconsistencies."
      },
      {
        type: "build",
        prompt: "Rearrange: 'Today's output is more than yesterday.'",
        words: ["多", "今天的产量", "昨天", "比"],
        answer: ["今天的产量", "比", "昨天", "多"],
        english: "今天的产量 比 昨天 多。",
        py: "Jīntiān de chǎnliàng bǐ zuótiān duō."
      },
      {
        type: "build",
        prompt: "Rearrange: 'This seam is too narrow compared to the sample.'",
        words: ["窄", "比", "样品", "这个缝份"],
        answer: ["这个缝份", "比", "样品", "窄"],
        english: "这个缝份 比 样品 窄。",
        py: "Zhège féngfèn bǐ yàngpǐn zhǎi."
      }
    ]
  },

  // ─── LESSON 13 ───────────────────────────────────────────────────────────
  {
    id: 13,
    title: "能 and 可以 — Can / May",
    subtitle: "Ability and permission",
    icon: "💪",
    concept: `两 modal verbs cover 'can' in Chinese. 能 (néng) expresses physical ability or possibility. 可以 (kěyǐ) expresses permission or possibility in terms of rules. On the factory floor, both are common: 这个可以出货吗？(Can this be shipped?) / 我能做这个吗？(Am I able to do this?). Negate with 不能 (cannot/must not).`,
    pattern: {
      formula: "Subject + 能/可以 + Verb + Object",
      pinyin: "Zhǔyǔ + néng / kěyǐ + dòngcí",
      note: "不能 is strong — 'cannot / must not'. 不可以 is softer — 'not allowed to'. Use 不能 for safety rules."
    },
    examples: [
      { cn: "这批货 可以 出货 吗？",      py: "Zhè pī huò kěyǐ chūhuò ma?",   en: "Can this batch be shipped?", breakdown: ["可以 = can/may", "出货 = ship out"] },
      { cn: "我 能 做 这个工序 吗？",     py: "Wǒ néng zuò zhège gōngxù ma?", en: "Can I do this operation?", breakdown: ["能 = able to", "工序 = operation"] },
      { cn: "这里 不能 吸烟。",           py: "Zhèlǐ bù néng xīyān.",          en: "No smoking here. (You cannot smoke here.)", breakdown: ["不能 = cannot/must not", "吸烟 = smoke"] },
      { cn: "次品 不可以 出货。",         py: "Cìpǐn bù kěyǐ chūhuò.",         en: "Defective items may not be shipped.", breakdown: ["不可以 = not allowed to", "出货 = ship"] },
    ],
    key_words: [
      { cn: "能", py: "néng", en: "can (ability/possibility)" },
      { cn: "可以", py: "kěyǐ", en: "can / may (permission)" },
      { cn: "不能", py: "bù néng", en: "cannot / must not" },
      { cn: "不可以", py: "bù kěyǐ", en: "not allowed to" },
      { cn: "会", py: "huì", en: "can (learned skill)" },
      { cn: "工序", py: "gōngxù", en: "operation / process step" },
    ],
    exercises: [
      {
        type: "fill",
        prompt: "Can this be shipped? → 这批货 ___ 出货吗？",
        choices: ["可以", "要", "是", "有"],
        answer: "可以",
        explanation: "可以 (kěyǐ) asks about permission/possibility. 可以出货吗 = Can it be shipped? (Is it allowed/ready?)"
      },
      {
        type: "fill",
        prompt: "You must not touch the finished goods! → 成品 ___ 随便动！",
        choices: ["不能", "没有", "不是", "不要"],
        answer: "不能",
        explanation: "不能 (bù néng) expresses a strong prohibition. 不能随便动 = must not touch casually."
      },
      {
        type: "build",
        prompt: "Rearrange: 'I can do this operation.'",
        words: ["这个工序", "我", "做", "能"],
        answer: ["我", "能", "做", "这个工序"],
        english: "我 能 做 这个工序。",
        py: "Wǒ néng zuò zhège gōngxù."
      },
      {
        type: "build",
        prompt: "Rearrange: 'Defective items cannot be shipped out.'",
        words: ["不能", "出货", "次品"],
        answer: ["次品", "不能", "出货"],
        english: "次品 不能 出货。",
        py: "Cìpǐn bù néng chūhuò."
      }
    ]
  },

  // ─── LESSON 14 ───────────────────────────────────────────────────────────
  {
    id: 14,
    title: "把 (bǎ) — The Action Structure",
    subtitle: "Acting ON an object to change its state",
    icon: "🎯",
    concept: `把 (bǎ) is a special structure that emphasizes what happens TO an object. It moves the object before the verb: 把 + Object + Verb + Result. Use it when you want to say you did something to something and achieved a result — like 'iron the collar flat' or 'put the goods in the warehouse'. Very common in factory instructions!`,
    pattern: {
      formula: "Subject + 把 + Object + Verb + Result",
      pinyin: "Zhǔyǔ + bǎ + bīnyǔ + dòngcí + jiéguǒ",
      note: "The verb in 把 sentences MUST have a result or complement after it. You cannot just say 我把衣服检查 — you must say 我把衣服检查好 (finished checking)."
    },
    examples: [
      { cn: "把 领子 烫 平。",           py: "Bǎ lǐngzi tàng píng.",          en: "Iron the collar flat.", breakdown: ["把 = (marks object)", "领子 = collar", "烫 = iron", "平 = flat (result)"] },
      { cn: "把 成品 放 到 仓库。",      py: "Bǎ chéngpǐn fàng dào cāngkù.", en: "Put the finished goods into the warehouse.", breakdown: ["把 = marks object", "放 = put", "到 = (to, direction)", "仓库 = warehouse"] },
      { cn: "我 把 衣服 检查 好 了。",   py: "Wǒ bǎ yīfu jiǎnchá hǎo le.",   en: "I've finished checking the clothes.", breakdown: ["把 = marks 衣服 as object", "检查好 = checked completely"] },
      { cn: "请 把 线头 剪 干净。",      py: "Qǐng bǎ xiàntóu jiǎn gānjìng.", en: "Please trim the thread ends clean.", breakdown: ["请 = please", "把 = marks object", "剪干净 = trim cleanly"] },
    ],
    key_words: [
      { cn: "把", py: "bǎ", en: "object marker (把 structure)" },
      { cn: "放到", py: "fàng dào", en: "put into / place in" },
      { cn: "做好", py: "zuò hǎo", en: "do well / finish properly" },
      { cn: "烫平", py: "tàng píng", en: "iron flat" },
      { cn: "剪干净", py: "jiǎn gānjìng", en: "trim cleanly" },
      { cn: "折好", py: "zhé hǎo", en: "fold neatly" },
    ],
    exercises: [
      {
        type: "fill",
        prompt: "Put the sample on the table. → 把 样品 ___ 桌子上。",
        choices: ["放到", "做好", "检查", "烫平"],
        answer: "放到",
        explanation: "放到 (fàng dào) = put into/onto. 把样品放到桌子上 = Put the sample onto the table."
      },
      {
        type: "fill",
        prompt: "Iron the collar flat. → ___ 领子 烫平。",
        choices: ["把", "让", "是", "在"],
        answer: "把",
        explanation: "把 introduces the object before the verb. 把领子烫平 = (Take the collar and) iron it flat."
      },
      {
        type: "build",
        prompt: "Rearrange: 'Please fold the clothes neatly.'",
        words: ["折好", "请", "把", "衣服"],
        answer: ["请", "把", "衣服", "折好"],
        english: "请 把 衣服 折好。",
        py: "Qǐng bǎ yīfu zhé hǎo."
      },
      {
        type: "build",
        prompt: "Rearrange: 'Put the defective items in that box.'",
        words: ["次品", "把", "放到", "那个箱子里"],
        answer: ["把", "次品", "放到", "那个箱子里"],
        english: "把 次品 放到 那个箱子里。",
        py: "Bǎ cìpǐn fàng dào nàge xiāngzi lǐ."
      }
    ]
  },

];
