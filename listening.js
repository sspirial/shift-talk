// ─────────────────────────────────────────────────────────────────────────────
//  LISTENING.JS — Listening Comprehension Exercises
//  All audio is generated via Web Speech API (zh-CN TTS)
//  Exercise types:
//    "mc-en"   → Hear Chinese, pick correct English meaning
//    "mc-cn"   → Hear Chinese, pick which Chinese text matches what you heard
//    "tf"      → Hear a statement, decide True or False about what was said
//    "fill"    → Hear a sentence with a blank, pick the missing word
// ─────────────────────────────────────────────────────────────────────────────

const LISTENING_SETS = [

  // ───────────────────────────────────────────────────────────────────────────
  //  SET 1 — SINGLE WORDS  (beginner)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "words-basic",
    title: "Single Words",
    level: "Beginner",
    levelColor: "#06d6a0",
    description: "Hear a word, identify what it means. Core factory vocabulary.",
    icon: "🔤",
    exercises: [
      {
        audio: "面料",
        py: "miànliào",
        type: "mc-en",
        question: "What word did you hear?",
        choices: ["Thread", "Fabric / Material", "Needle", "Zipper"],
        answer: "Fabric / Material",
        reveal: { cn: "面料", py: "miànliào", en: "Fabric / Material" }
      },
      {
        audio: "质量",
        py: "zhìliàng",
        type: "mc-en",
        question: "What did you hear?",
        choices: ["Production output", "Warehouse", "Quality", "Inspection"],
        answer: "Quality",
        reveal: { cn: "质量", py: "zhìliàng", en: "Quality" }
      },
      {
        audio: "缝纫机",
        py: "féngrèn jī",
        type: "mc-en",
        question: "What piece of equipment was named?",
        choices: ["Iron", "Sewing machine", "Overlocker", "Cutting blade"],
        answer: "Sewing machine",
        reveal: { cn: "缝纫机", py: "féngrèn jī", en: "Sewing machine" }
      },
      {
        audio: "组长",
        py: "zǔzhǎng",
        type: "mc-en",
        question: "Who is being referred to?",
        choices: ["Quality inspector", "Pattern maker", "Team leader", "New worker"],
        answer: "Team leader",
        reveal: { cn: "组长", py: "zǔzhǎng", en: "Team leader / Supervisor" }
      },
      {
        audio: "加班",
        py: "jiābān",
        type: "mc-en",
        question: "What does this word mean?",
        choices: ["Day shift", "Overtime", "Break time", "Production target"],
        answer: "Overtime",
        reveal: { cn: "加班", py: "jiābān", en: "Overtime / Work overtime" }
      },
      {
        audio: "缺陷",
        py: "quēxiàn",
        type: "mc-en",
        question: "What is being described?",
        choices: ["Sample", "Defect", "Batch", "Standard"],
        answer: "Defect",
        reveal: { cn: "缺陷", py: "quēxiàn", en: "Defect" }
      },
      {
        audio: "熨烫",
        py: "yùntàng",
        type: "mc-en",
        question: "What operation is this?",
        choices: ["Cutting", "Sewing", "Ironing / Pressing", "Packing"],
        answer: "Ironing / Pressing",
        reveal: { cn: "熨烫", py: "yùntàng", en: "Ironing / Pressing" }
      },
      {
        audio: "棉",
        py: "mián",
        type: "mc-en",
        question: "What fabric type was mentioned?",
        choices: ["Polyester", "Silk", "Cotton", "Nylon"],
        answer: "Cotton",
        reveal: { cn: "棉", py: "mián", en: "Cotton" }
      },
      {
        audio: "不合格",
        py: "bù hégé",
        type: "mc-en",
        question: "What QC verdict was given?",
        choices: ["Passed inspection", "Needs repair", "Failed / Non-conforming", "Send to warehouse"],
        answer: "Failed / Non-conforming",
        reveal: { cn: "不合格", py: "bù hégé", en: "Fail / Non-conforming" }
      },
      {
        audio: "交货期",
        py: "jiāohuòqī",
        type: "mc-en",
        question: "What is being discussed?",
        choices: ["Production output", "Delivery deadline", "Night shift", "Material request"],
        answer: "Delivery deadline",
        reveal: { cn: "交货期", py: "jiāohuòqī", en: "Delivery deadline" }
      },
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  //  SET 2 — SHORT PHRASES  (intermediate)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "phrases-core",
    title: "Short Phrases",
    level: "Intermediate",
    levelColor: "#ffd166",
    description: "Two- to four-word factory phrases. Listen and identify the meaning.",
    icon: "💬",
    exercises: [
      {
        audio: "今天加班吗",
        py: "Jīntiān jiābān ma?",
        type: "mc-en",
        question: "What is being asked?",
        choices: [
          "What time does the shift start?",
          "Are we working overtime today?",
          "How many pieces today?",
          "Is the machine broken?"
        ],
        answer: "Are we working overtime today?",
        reveal: { cn: "今天加班吗？", py: "Jīntiān jiābān ma?", en: "Are we working overtime today?" }
      },
      {
        audio: "这个不合格，要返修",
        py: "Zhège bù hégé, yào fǎnxiū.",
        type: "mc-en",
        question: "What instruction was given?",
        choices: [
          "This is acceptable, move on.",
          "Put this in the finished goods pile.",
          "This doesn't pass; it needs repair.",
          "Check the sample again."
        ],
        answer: "This doesn't pass; it needs repair.",
        reveal: { cn: "这个不合格，要返修。", py: "Zhège bù hégé, yào fǎnxiū.", en: "This doesn't pass; it needs repair." }
      },
      {
        audio: "线用完了",
        py: "Xiàn yòng wán le.",
        type: "mc-en",
        question: "What has happened?",
        choices: [
          "The machine is broken.",
          "The thread has run out.",
          "The needle broke.",
          "The bobbin is loose."
        ],
        answer: "The thread has run out.",
        reveal: { cn: "线用完了。", py: "Xiàn yòng wán le.", en: "The thread has run out." }
      },
      {
        audio: "缝份太窄了",
        py: "Féngfèn tài zhǎi le.",
        type: "mc-en",
        question: "What is the problem?",
        choices: [
          "The hem is too long.",
          "The seam allowance is too narrow.",
          "The collar is not flat.",
          "The thread colour is wrong."
        ],
        answer: "The seam allowance is too narrow.",
        reveal: { cn: "缝份太窄了。", py: "Féngfèn tài zhǎi le.", en: "The seam allowance is too narrow." }
      },
      {
        audio: "样品在哪里",
        py: "Yàngpǐn zài nǎlǐ?",
        type: "mc-en",
        question: "What is being asked?",
        choices: [
          "Is the sample acceptable?",
          "Where is the sample?",
          "Who has the sample?",
          "When will the sample arrive?"
        ],
        answer: "Where is the sample?",
        reveal: { cn: "样品在哪里？", py: "Yàngpǐn zài nǎlǐ?", en: "Where is the sample?" }
      },
      {
        audio: "机器坏了，找技术员",
        py: "Jīqì huài le, zhǎo jìshùyuán.",
        type: "mc-en",
        question: "What should you do after hearing this?",
        choices: [
          "Stop production and take a break.",
          "Get the technician — the machine is broken.",
          "Check the thread and continue sewing.",
          "Report the defect to the QC inspector."
        ],
        answer: "Get the technician — the machine is broken.",
        reveal: { cn: "机器坏了，找技术员。", py: "Jīqì huài le, zhǎo jìshùyuán.", en: "The machine is broken; get the technician." }
      },
      {
        audio: "先检查，然后包装",
        py: "Xiān jiǎnchá, rán hòu bāozhuāng.",
        type: "mc-en",
        question: "In what order should you do things?",
        choices: [
          "Pack first, then inspect.",
          "Inspect first, then pack.",
          "Iron first, then inspect.",
          "Pack and inspect at the same time."
        ],
        answer: "Inspect first, then pack.",
        reveal: { cn: "先检查，然后包装。", py: "Xiān jiǎnchá, rán hòu bāozhuāng.", en: "First inspect, then pack." }
      },
      {
        audio: "这件比样品短",
        py: "Zhè jiàn bǐ yàngpǐn duǎn.",
        type: "mc-en",
        question: "What is wrong with this piece?",
        choices: [
          "It's wider than the sample.",
          "It's shorter than the sample.",
          "It's longer than the sample.",
          "The colour doesn't match the sample."
        ],
        answer: "It's shorter than the sample.",
        reveal: { cn: "这件比样品短。", py: "Zhè jiàn bǐ yàngpǐn duǎn.", en: "This piece is shorter than the sample." }
      },
      {
        audio: "今天的目标是五百件",
        py: "Jīntiān de mùbiāo shì wǔbǎi jiàn.",
        type: "mc-en",
        question: "What is today's production target?",
        choices: ["300 pieces", "400 pieces", "500 pieces", "600 pieces"],
        answer: "500 pieces",
        reveal: { cn: "今天的目标是500件。", py: "Jīntiān de mùbiāo shì 500 jiàn.", en: "Today's target is 500 pieces." }
      },
      {
        audio: "这批货可以出货吗",
        py: "Zhè pī huò kěyǐ chūhuò ma?",
        type: "mc-en",
        question: "What is being asked?",
        choices: [
          "When will the goods be packed?",
          "Can this batch be shipped?",
          "How many pieces are in this batch?",
          "Is this batch defective?"
        ],
        answer: "Can this batch be shipped?",
        reveal: { cn: "这批货可以出货吗？", py: "Zhè pī huò kěyǐ chūhuò ma?", en: "Can this batch be shipped?" }
      },
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  //  SET 3 — SUPERVISOR INSTRUCTIONS  (intermediate)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "supervisor-commands",
    title: "Supervisor Instructions",
    level: "Intermediate",
    levelColor: "#ffd166",
    description: "Common instructions from a Chinese supervisor. Listen and respond correctly.",
    icon: "📢",
    exercises: [
      {
        audio: "把领子烫平",
        py: "Bǎ lǐngzi tàng píng.",
        type: "mc-en",
        question: "What are you being told to do?",
        choices: [
          "Sew the collar on.",
          "Remove the collar.",
          "Iron the collar flat.",
          "Check the collar alignment."
        ],
        answer: "Iron the collar flat.",
        reveal: { cn: "把领子烫平。", py: "Bǎ lǐngzi tàng píng.", en: "Iron the collar flat." }
      },
      {
        audio: "线头要剪干净",
        py: "Xiàntóu yào jiǎn gānjìng.",
        type: "mc-en",
        question: "What must be done?",
        choices: [
          "Change the thread colour.",
          "Thread ends must be trimmed cleanly.",
          "The thread is running low — restock.",
          "Tie off the loose ends."
        ],
        answer: "Thread ends must be trimmed cleanly.",
        reveal: { cn: "线头要剪干净。", py: "Xiàntóu yào jiǎn gānjìng.", en: "Thread ends must be trimmed cleanly." }
      },
      {
        audio: "出货前要全检",
        py: "Chūhuò qián yào quánjiǎn.",
        type: "mc-en",
        question: "When must a full inspection happen?",
        choices: [
          "After packing",
          "At the start of the shift",
          "Before shipment",
          "Only when the buyer requests it"
        ],
        answer: "Before shipment",
        reveal: { cn: "出货前要全检。", py: "Chūhuò qián yào quánjiǎn.", en: "Before shipment, do a full inspection." }
      },
      {
        audio: "按样品重新做",
        py: "Àn yàngpǐn chóngxīn zuò.",
        type: "mc-en",
        question: "What instruction is this?",
        choices: [
          "Compare this with the sample.",
          "Redo it according to the sample.",
          "The sample needs to be updated.",
          "Send the sample to quality control."
        ],
        answer: "Redo it according to the sample.",
        reveal: { cn: "按样品重新做。", py: "Àn yàngpǐn chóngxīn zuò.", en: "Redo it according to the sample." }
      },
      {
        audio: "把成品放到仓库",
        py: "Bǎ chéngpǐn fàng dào cāngkù.",
        type: "mc-en",
        question: "Where should the finished goods go?",
        choices: [
          "Send them to QC inspection.",
          "Put them in the warehouse.",
          "Load them for immediate shipment.",
          "Return them to the production line."
        ],
        answer: "Put them in the warehouse.",
        reveal: { cn: "把成品放到仓库。", py: "Bǎ chéngpǐn fàng dào cāngkù.", en: "Put the finished goods into the warehouse." }
      },
      {
        audio: "不要随便动成品",
        py: "Bú yào suíbiàn dòng chéngpǐn.",
        type: "mc-en",
        question: "What are you being warned about?",
        choices: [
          "Don't damage the finished goods.",
          "Don't touch the finished goods casually.",
          "Don't mix finished goods with semi-finished ones.",
          "Don't pack the finished goods yet."
        ],
        answer: "Don't touch the finished goods casually.",
        reveal: { cn: "不要随便动成品。", py: "Bú yào suíbiàn dòng chéngpǐn.", en: "Don't casually touch the finished goods." }
      },
      {
        audio: "这里有色差，换批次",
        py: "Zhèlǐ yǒu sèchā, huàn pīcì.",
        type: "mc-en",
        question: "What is the problem and what should you do?",
        choices: [
          "There's a stain here — clean it.",
          "There's a colour difference here — change the batch.",
          "The fabric is the wrong type — swap it out.",
          "The colour faded — reject the whole order."
        ],
        answer: "There's a colour difference here — change the batch.",
        reveal: { cn: "这里有色差，换批次。", py: "Zhèlǐ yǒu sèchā, huàn pīcì.", en: "There's a colour difference here; change the batch." }
      },
      {
        audio: "今天效率不高，要加快速度",
        py: "Jīntiān xiàolǜ bù gāo, yào jiākuài sùdù.",
        type: "mc-en",
        question: "What is the supervisor saying?",
        choices: [
          "Today's quality is not good enough.",
          "Today's efficiency is low — speed up.",
          "Today's target has been reached.",
          "Today we will stop early."
        ],
        answer: "Today's efficiency is low — speed up.",
        reveal: { cn: "今天效率不高，要加快速度。", py: "Jīntiān xiàolǜ bù gāo, yào jiākuài sùdù.", en: "Today's efficiency is not high; speed up." }
      },
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  //  SET 4 — TRUE / FALSE  (intermediate–advanced)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "true-false",
    title: "True or False",
    level: "Advanced",
    levelColor: "#ff6b6b",
    description: "Listen to a factory sentence. Decide if the statement about it is TRUE or FALSE.",
    icon: "✅",
    exercises: [
      {
        audio: "这件衣服有污渍，不合格",
        py: "Zhè jiàn yīfu yǒu wūzì, bù hégé.",
        type: "tf",
        question: "TRUE or FALSE: This garment passed quality control.",
        answer: "FALSE",
        choices: ["TRUE", "FALSE"],
        reveal: { cn: "这件衣服有污渍，不合格。", py: "Zhè jiàn yīfu yǒu wūzì, bù hégé.", en: "This garment has a stain; it doesn't pass." }
      },
      {
        audio: "我在整烫部门工作",
        py: "Wǒ zài zhěngtàng bùmén gōngzuò.",
        type: "tf",
        question: "TRUE or FALSE: The speaker works in the pressing / finishing department.",
        answer: "TRUE",
        choices: ["TRUE", "FALSE"],
        reveal: { cn: "我在整烫部门工作。", py: "Wǒ zài zhěngtàng bùmén gōngzuò.", en: "I work in the pressing/finishing department." }
      },
      {
        audio: "这批货明天出货",
        py: "Zhè pī huò míngtiān chūhuò.",
        type: "tf",
        question: "TRUE or FALSE: This batch ships today.",
        answer: "FALSE",
        choices: ["TRUE", "FALSE"],
        reveal: { cn: "这批货明天出货。", py: "Zhè pī huò míngtiān chūhuò.", en: "This batch ships tomorrow." }
      },
      {
        audio: "次品不能出货",
        py: "Cìpǐn bù néng chūhuò.",
        type: "tf",
        question: "TRUE or FALSE: Defective items can be shipped if there are not many.",
        answer: "FALSE",
        choices: ["TRUE", "FALSE"],
        reveal: { cn: "次品不能出货。", py: "Cìpǐn bù néng chūhuò.", en: "Defective items cannot be shipped." }
      },
      {
        audio: "这件比样品长两厘米",
        py: "Zhè jiàn bǐ yàngpǐn cháng liǎng lí mǐ.",
        type: "tf",
        question: "TRUE or FALSE: This piece is exactly the same length as the sample.",
        answer: "FALSE",
        choices: ["TRUE", "FALSE"],
        reveal: { cn: "这件比样品长两厘米。", py: "Zhè jiàn bǐ yàngpǐn cháng liǎng lí mǐ.", en: "This piece is 2cm longer than the sample." }
      },
      {
        audio: "仓库没有物料了，要去领料",
        py: "Cāngkù méiyǒu wùliào le, yào qù lǐng liào.",
        type: "tf",
        question: "TRUE or FALSE: Someone needs to go to the warehouse to collect materials.",
        answer: "TRUE",
        choices: ["TRUE", "FALSE"],
        reveal: { cn: "仓库没有物料了，要去领料。", py: "Cāngkù méiyǒu wùliào le, yào qù lǐng liào.", en: "There's no material in the warehouse; need to go collect some." }
      },
      {
        audio: "今天不加班，六点下班",
        py: "Jīntiān bù jiābān, liù diǎn xià bān.",
        type: "tf",
        question: "TRUE or FALSE: There is overtime today.",
        answer: "FALSE",
        choices: ["TRUE", "FALSE"],
        reveal: { cn: "今天不加班，六点下班。", py: "Jīntiān bù jiābān, liù diǎn xià bān.", en: "No overtime today; clocking out at 6." }
      },
      {
        audio: "这个面料是棉涤混纺",
        py: "Zhège miànliào shì mián dí hùnfǎng.",
        type: "tf",
        question: "TRUE or FALSE: This fabric is pure cotton.",
        answer: "FALSE",
        choices: ["TRUE", "FALSE"],
        reveal: { cn: "这个面料是棉涤混纺。", py: "Zhège miànliào shì mián dí hùnfǎng.", en: "This fabric is a cotton-polyester blend." }
      },
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  //  SET 5 — FILL IN WHAT YOU HEARD  (advanced)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "fill-heard",
    title: "Fill What You Heard",
    level: "Advanced",
    levelColor: "#ff6b6b",
    description: "A sentence is spoken with one key word. Choose the correct Chinese word you heard.",
    icon: "🎯",
    exercises: [
      {
        audio: "这件衣服有缺陷",
        py: "Zhè jiàn yīfu yǒu quēxiàn.",
        type: "mc-cn",
        question: "Which Chinese word did you hear meaning the problem with this garment?",
        choices: ["污渍", "缺陷", "色差", "跳针"],
        answer: "缺陷",
        reveal: { cn: "这件衣服有缺陷。", py: "Zhè jiàn yīfu yǒu quēxiàn.", en: "This garment has a defect. (缺陷 = defect)" }
      },
      {
        audio: "领子要熨烫",
        py: "Lǐngzi yào yùntàng.",
        type: "mc-cn",
        question: "Which garment part was mentioned?",
        choices: ["袖口", "领子", "下摆", "口袋"],
        answer: "领子",
        reveal: { cn: "领子要熨烫。", py: "Lǐngzi yào yùntàng.", en: "The collar needs ironing. (领子 = collar)" }
      },
      {
        audio: "今天的产量没有达标",
        py: "Jīntiān de chǎnliàng méiyǒu dá biāo.",
        type: "mc-cn",
        question: "Which word means 'output / production volume'?",
        choices: ["交货期", "产量", "效率", "订单"],
        answer: "产量",
        reveal: { cn: "今天的产量没有达标。", py: "Jīntiān de chǎnliàng méiyǒu dá biāo.", en: "Today's output didn't meet the target. (产量 = output)" }
      },
      {
        audio: "这个面料是涤纶的",
        py: "Zhège miànliào shì dílún de.",
        type: "mc-cn",
        question: "What fabric type was mentioned?",
        choices: ["棉", "涤纶", "氨纶", "丝绸"],
        answer: "涤纶",
        reveal: { cn: "这个面料是涤纶的。", py: "Zhège miànliào shì dílún de.", en: "This fabric is polyester. (涤纶 = polyester)" }
      },
      {
        audio: "把次品单独放在那边",
        py: "Bǎ cìpǐn dāndú fàng zài nà biān.",
        type: "mc-cn",
        question: "Which word describes the items being separated?",
        choices: ["成品", "半成品", "次品", "样品"],
        answer: "次品",
        reveal: { cn: "把次品单独放在那边。", py: "Bǎ cìpǐn dāndú fàng zài nà biān.", en: "Put the defective items separately over there. (次品 = defective items)" }
      },
      {
        audio: "请用卷尺量一下袖长",
        py: "Qǐng yòng juǎnchǐ liáng yīxià xiù cháng.",
        type: "mc-cn",
        question: "What tool was mentioned?",
        choices: ["标尺", "卷尺", "剪刀", "熨斗"],
        answer: "卷尺",
        reveal: { cn: "请用卷尺量一下袖长。", py: "Qǐng yòng juǎnchǐ liáng yīxià xiù cháng.", en: "Please use the measuring tape to measure the sleeve length. (卷尺 = measuring tape)" }
      },
      {
        audio: "这批货的缝份是一厘米",
        py: "Zhè pī huò de féngfèn shì yī lí mǐ.",
        type: "mc-cn",
        question: "Which construction term did you hear?",
        choices: ["下摆", "缝份", "褶子", "省道"],
        answer: "缝份",
        reveal: { cn: "这批货的缝份是1厘米。", py: "Zhè pī huò de féngfèn shì yī lí mǐ.", en: "The seam allowance for this batch is 1cm. (缝份 = seam allowance)" }
      },
      {
        audio: "我不懂，请再说一遍",
        py: "Wǒ bù dǒng, qǐng zài shuō yībiàn.",
        type: "mc-en",
        question: "What is the speaker saying?",
        choices: [
          "I understand, thank you.",
          "I don't understand; please say it again.",
          "Please speak more slowly.",
          "Can you write it down?"
        ],
        answer: "I don't understand; please say it again.",
        reveal: { cn: "我不懂，请再说一遍。", py: "Wǒ bù dǒng, qǐng zài shuō yībiàn.", en: "I don't understand; please say it again." }
      },
    ]
  },
];
