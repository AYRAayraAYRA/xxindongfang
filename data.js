// 联系老师（学习规划老师）— 两位老师都可以咨询
const CONTACTS = [
  { name: "洋洋老师", role: "学习规划老师", qr: "assets/contact/yangyang.jpg" },
  { name: "李老师",   role: "学习规划老师", qr: "assets/contact/li.jpg" }
];

// 苏州园区新东方初中英语 师资数据
// CAMPUS_GROUPS：用师资分组（共享老师的校区合并为一组）
const CAMPUS_GROUPS = [
  {
    id: "wangdun",
    name: "旺墩路",
    crown: true,                  // 旺墩路加皇冠标识
    area: "湖东",
    areaEn: "HUDONG",
    intro: "园区老牌校区 · 初中 / 高中皆设 · 大班 + 小班 全班型",
    campuses: [
      {
        id: "wangdun_main",
        name: "旺墩路校区",
        classTypes: ["大班 15-24人", "小班 6-10人"],
        address: "江苏省苏州市苏州工业园区旺墩路 135 号融盛商务中心东门 2 楼",
        qr: "assets/qr/旺墩路.png"
      }
    ],
    teacherIds: ["liuchenghong", "wangyueyue", "baiwei"]
  },
  {
    id: "zjxfz",
    name: "兆佳巷 / 方洲",
    area: "湖东",
    areaEn: "HUDONG",
    intro: "兆佳巷与方洲校区 · 师资共享 · 大班教学",
    campuses: [
      {
        id: "zhaojiaxiang",
        name: "兆佳巷校区",
        classTypes: ["大班 15-24人"],
        address: "苏州市工业园区方洲路与钟南街交叉口兆佳巷邻里中心 F3",
        qr: "assets/qr/兆佳巷校区.png"
      },
      {
        id: "fangzhou",
        name: "方洲校区",
        classTypes: ["大班 15-24人"],
        address: "湖东方洲（详细地址请咨询客服）",
        qr: null
      }
    ],
    teacherIds: ["chengsenyang", "guoyaya", "dailihua", "yangyadi"]
  },
  {
    id: "fhxh",
    name: "凤凰广场 / 星海",
    area: "湖西",
    areaEn: "HUXI",
    intro: "凤凰广场与星海校区 · 师资共享 · 大班 + 小班",
    campuses: [
      {
        id: "fenghuang",
        name: "凤凰广场校区",
        classTypes: ["大班 15-24人"],
        address: "苏州市工业园区苏州大道西 158 号凤凰文化广场 2 楼",
        qr: "assets/qr/凤凰广场.png"
      },
      {
        id: "xinghai",
        name: "星海校区",
        classTypes: ["小班 6-10人"],
        address: "苏州市工业园区苏雅路 318 号赛格数码广场二楼新东方办公室",
        qr: "assets/qr/星海校区.png"
      }
    ],
    teacherIds: ["wangjiayi", "jiangmin", "mahaifeng"]
  }
];

// 每位老师的好评图片，按分类组织
// 路径：assets/teachers/<id>/reviews/<category>/<filename>
const REVIEW_CATEGORIES = {
  exam:     { label: "中考高分", icon: "🏆" },
  progress: { label: "进步案例", icon: "📈" },
  daily:    { label: "日常沟通", icon: "💬" },
  general:  { label: "学员好评", icon: "★"  }
};

const REVIEWS_BY_TEACHER = {
  "liuchenghong": {
    "general": ["ppt_1.png", "ppt_2.png", "ppt_3.png", "IMG_2144.JPG", "IMG_2145.JPG", "IMG_2146.JPG"]
  },
  "wangyueyue": {
    "exam":     ["IMG_9359.JPG","IMG_9360.JPG","IMG_9361.JPG","IMG_9362.JPG","IMG_9363.JPG","IMG_9364.JPG","IMG_9365.JPG","IMG_9366.JPG","IMG_9367.JPG"],
    "progress": ["IMG_9353.JPG","IMG_9354.JPG","IMG_9355.JPG","IMG_9356.JPG","IMG_9357.JPG","IMG_9358.JPG","WecomSave_2d6bd55639bdf41e4f8f208ba80b6b5f.JPG","WecomSave_6b5c403a40d6e1a6be98770f40672686.JPG","WecomSave_a3887b30543b9f0a8953500b12122fcf.JPG","WecomSave_ae3a587a1a2a046860021ee0da305028.JPG","WecomSave_e1089f26fd498a11e2b6562a76e5ee50.JPG","WecomSave_f9177afb6bc9d93921b4d8a1b02ca0ec.JPG"],
    "daily":    ["IMG_9304.JPG","IMG_9305.JPG","IMG_9306.JPG","IMG_9307.JPG","IMG_9308.JPG","IMG_9309.JPG","IMG_9310.JPG","IMG_9311.JPG","IMG_9312.JPG","IMG_9313.JPG","IMG_9314.JPG","IMG_9315.JPG","IMG_9316.JPG","IMG_9317.JPG","IMG_9318.JPG","IMG_9319.JPG","IMG_9320.JPG","IMG_9321.JPG","IMG_9322.JPG","IMG_9323.JPG","IMG_9324.JPG","IMG_9325.JPG","IMG_9326.JPG","IMG_9327.JPG","IMG_9328.JPG","IMG_9329.JPG","IMG_9330.JPG","IMG_9331.JPG","IMG_9332.JPG"],
    "general":  ["ppt_1.png"]
  },
  "baiwei": {
    "general": ["ppt_1.png", "ppt_2.png", "ppt_3.png", "提分.png", "提分2.png", "提分3.png"]
  },
  "chengsenyang": { "general": ["review_1.png","review_2.png","review_3.png"] },
  "dailihua":     { "general": ["review_1.png","review_2.jpeg","review_3.jpeg"] },
  "guoyaya":      { "general": ["review_1.png","review_2.png","review_3.png"] },
  "jiangmin":     { "general": ["review_1.jpeg","review_2.jpeg","review_3.jpeg","review_4.jpeg","review_5.png","review_6.png"] },
  "mahaifeng":    { "general": ["review_1.png","review_2.png","review_3.png"] },
  "wangjiayi":    { "general": ["review_1.jpeg","review_2.jpeg","review_3.jpeg","review_4.jpeg","review_5.jpeg","review_6.jpeg","review_7.png"] },
  "yangyadi":     { "general": ["review_1.jpeg","review_2.png","review_3.png","review_4.png","review_5.png"] }
};

const TEACHERS = [
  {
    id: "liuchenghong", name: "刘成宏", subject: "初中英语", grades: "7-9年级",
    role: "初中英语教师", years: "5年", groupId: "wangdun",
    photo: "assets/teachers/liuchenghong/photo.jpeg",
    motto: "坚信教学是师生共同成长的过程。",
    education: "区域行远班专职任课教师",
    certificates: ["高中英语教师资格证", "专业英语八级", "CATTI 三级口译 + 笔译"],
    achievements: [
      "新东方江苏省域赛课英语组第一",
      "曾获季度优秀教师及年度优秀教师称号",
      "区域行远班专职任课教师",
      "所带学员成功进入苏高中、星海中学",
      "教学时长 10000+，教龄 5 年"
    ],
    tags: ["江苏省域赛课第一", "行远班专职", "苏高中/星海"]
  },
  {
    id: "wangyueyue", name: "王月月", subject: "初中英语", grades: "7-9年级",
    role: "初中英语教师", years: "5年", groupId: "wangdun",
    photo: "assets/teachers/wangyueyue/photo.jpeg",
    motto: "育人者先育己，是为智；正人者先正己，是为德；智德兼备者，方为师。",
    education: "英语师范",
    certificates: ["中学英语教师资格证", "英语专业八级"],
    achievements: [
      "苏州新东方 FY2023、FY2024 苏州学校优秀教师",
      "新东方集团初中段教师赛课「特等奖」",
      "区域行远班专职任课教师",
      "所带学员成功进入苏高中、星海中学",
      "教学时长 10000+，教龄 5 年"
    ],
    tags: ["集团赛课特等奖", "连续两年优秀教师", "行远班专职"]
  },
  {
    id: "baiwei", name: "白伟", subject: "初中英语", grades: "7-9年级",
    role: "智慧学习部产品设计师", years: "11年", groupId: "wangdun",
    photo: "assets/teachers/baiwei/photo.jpeg",
    motto: "兴趣是最好的老师，理解是最深的记忆。",
    education: "海外本硕连读 · 优秀毕业生",
    teachingStyle: "幽默风趣，探究英语本质；熟悉初高中及国外考试体系，明确学习出口。",
    certificates: [
      "高中英语教师资格证",
      "TKT 剑桥大学英语教学能力证书",
      "ACT（美国高考）官方培训师",
      "ETS（托福）认证培训师"
    ],
    achievements: [
      "新东方中考产品研发负责人",
      "新东方初中前最高班型「壮志」产品负责人",
      "入选新东方「高潜力人才培养计划」",
      "曾担任雅思教研组长 / 国际学科经理",
      "参与设计出版《中考英语写作满分突破》《中考英语语法满分突破》",
      "累计教学课时 15000h+，教授学员 6500 人次+",
      "海外留学工作五年，本硕连读，获优秀毕业生称号"
    ],
    tags: ["中考产品研发负责人", "11 年教龄", "ACT/ETS 认证培训师"]
  },
  {
    id: "chengsenyang", name: "成森阳", subject: "初中英语", grades: "7-9年级",
    role: "智慧空间初中英语教师", years: "4年", groupId: "zjxfz",
    photo: "assets/teachers/chengsenyang/photo.jpeg",
    motto: "守得云开见月明，任何的失利都会变成前进的动力！",
    education: "陕西师范大学",
    teachingStyle: "因材施教、循循善诱；体贴细心、风趣幽默、关心学生。",
    certificates: ["初中英语教师资格证", "英语专业四级", "英语专业八级"],
    achievements: [
      "苏州新东方学校教师风采大赛一等奖",
      "新东方苏州学校智慧学习部优秀教师",
      "苏州新东方学校智慧学习部明星教师",
      "苏州新东方学校智慧学习部最受家长信任奖",
      "授课时长 2500+",
      "所带学生成功进入星海中学、苏高中、西附纳米班"
    ],
    tags: ["教师风采大赛一等奖", "最受家长信任奖", "苏高中/星海/西附"]
  },
  {
    id: "guoyaya", name: "郭娅娅", subject: "初中英语", grades: "7-9年级",
    role: "托管 & 智慧空间初中英语教师", years: "4年", groupId: "zjxfz",
    photo: "assets/teachers/guoyaya/photo.jpeg",
    motto: "Believe in your struggle, it is shaping your strength. — 相信你的努力，它正在铸就你的坚韧。",
    education: "英语专业八级",
    teachingStyle: "寓教于乐、关注学生；因材施教、细致入微。",
    certificates: ["初级中学英语资格证", "英语专业八级", "英语专业四级"],
    achievements: [
      "新东方苏州学校智慧学习部优秀教师",
      "苏州新东方学校「教师技能大赛」一等奖",
      "苏州新东方学校智慧学习部实力教师",
      "苏州新东方学校智慧学习部最受家长信任奖",
      "授课学员 1300+，授课时长 2000+",
      "所带学生成功进入星海中学、苏高中、园三"
    ],
    tags: ["教师技能大赛一等奖", "实力教师", "苏高中/星海/园三"]
  },
  {
    id: "dailihua", name: "代丽华", subject: "初中英语", grades: "7-9年级",
    role: "智慧学习初中英语老师", years: "4年", groupId: "zjxfz",
    photo: "assets/teachers/dailihua/photo.jpeg",
    teachingStyle: "关注学生、亦师亦友、亲切自然、风趣幽默、循循善诱、寓教于乐。",
    certificates: ["高中英语教师资格证", "英语专八、专四证书", "高级家庭教育指导证书"],
    achievements: [
      "新东方 FY25 Q1「优秀教师」",
      "园区教师年度赛课一等奖",
      "学习机项目英语组优秀教师",
      "安徽省第三届翻译大赛优秀奖",
      "擅于因材施教，对江苏省初中英语新课标有较深入研究",
      "对江苏省、全国历年的中考经典题型如数家珍"
    ],
    tags: ["年度赛课一等奖", "课标研究专家", "高级家庭教育指导师"]
  },
  {
    id: "yangyadi", name: "杨亚迪", subject: "初中英语", grades: "7-9年级",
    role: "智慧空间初中英语教师", years: "5年+", groupId: "zjxfz",
    photo: "assets/teachers/yangyadi/photo.jpeg",
    motto: "你走过的路，每一步都算数。",
    education: "本科",
    teachingStyle: "善于启发式教学，寓教于乐，注重学生全面发展，在提升英语成绩的同时注重学生学习习惯与英语思维的养成。",
    certificates: ["初中英语教师资格证", "专业英语八级"],
    achievements: [
      "公校任职期间获得校级赛课一等奖",
      "园区优秀教师，2025 年功底测第一名",
      "广受家长和学生喜爱",
      "累计授课课时 5000+，善于发现学生的闪光点",
      "多位学生考入重点四星高中：苏高中、星海、新实等",
      "对各区考卷有详细的分类和总结，有一套对学生英语成绩提升行之有效的方法"
    ],
    tags: ["园区优秀教师", "功底测第一", "苏高中/星海/新实"]
  },
  {
    id: "wangjiayi", name: "汪嘉仪", subject: "初中英语", grades: "7-9年级",
    role: "托管初中英语教师", years: "5年", groupId: "fhxh",
    photo: "assets/teachers/wangjiayi/photo.jpeg",
    education: "苏州大学（211）",
    teachingStyle: "授课幽默风趣，培养孩子学习兴趣，引导孩子形成良好的思维习惯、学习习惯。精准把控考试重点、难点，对各题型及语法板块引导孩子形成解题思路，举一反三。",
    certificates: ["CET-4", "CET-6", "考研英语（一）86 分（客观部分满分）"],
    achievements: [
      "集团优秀教师奖",
      "苏州新东方「实力教师奖」",
      "英语组优秀教师奖",
      "苏州园区授课经验 5 年，教授学生 1400+，授课时长 2000+",
      "对整个初中的教材和知识点非常熟悉，所带多名学生考入苏州中学、星海实验中学",
      "针对基础薄弱学员平均一学期提分 15-25 分",
      "高分段学员稳定处于年级前列"
    ],
    tags: ["集团优秀教师", "实力教师奖", "提分 15-25 分/学期"]
  },
  {
    id: "jiangmin", name: "蒋敏", subject: "初中英语", grades: "7-9年级",
    role: "初中英语教师 / 英语产品设计师 / 产品研发组长", years: "7年", groupId: "fhxh",
    photo: "assets/teachers/jiangmin/photo.jpeg",
    teachingStyle: "教学风格亲切自然，循循善诱；善于总结各类题型做题思路及技巧，用理科的思维学习英语。",
    certificates: ["高中英语教师资格证", "剑桥英语教学能力 TKT 认证（M1-3）", "英语口译证书", "托福 ITP"],
    achievements: [
      "曾任 1 对 1 青少英语教研高级专员 / 交付组长",
      "F24 财年 Q1 学习机托管卓越教师",
      "F24 财年「最佳导师」称号",
      "F24 & FY25 财年优秀共产党员",
      "F24 财年优秀员工奖、优秀教学团队奖",
      "北京学校 & 苏州学校联合研发优秀个人 & 最佳小组一等奖",
      "苏州新东方初中出版物产品设计师 & 产品研发组长",
      "参与设计出版《必学必练 · 英语》，参与设计初中英语三年四季产品体系",
      "累计授课时 8000+，初三生占比约 80%",
      "多名学生考入苏高中、南师大附中、西交附中等名校",
      "帮助多名学生参加匡班、南师大附中等自招考试"
    ],
    tags: ["产品研发组长", "8000+ 课时", "苏高中/南师附/西交附"]
  },
  {
    id: "mahaifeng", name: "马海峰", subject: "初中英语", grades: "7-9年级",
    role: "初中英语教师", years: "4年+", groupId: "fhxh",
    photo: "assets/teachers/mahaifeng/photo.jpeg",
    motto: "The limits of your language are the limits of your world. — 语言观决定世界观。",
    teachingStyle: "教学亲和力高、易接受，行课过程时刻关注学生学习情况，以通俗易懂的语言为学生答疑解惑；以学生为中心，让学生全身心投入课程，充分调动好奇心与积极性。",
    certificates: ["英语教师资格证", "剑桥国际英语教师资格证", "CET-4", "CET-6"],
    achievements: [
      "FY24 秋季新东方江苏省域优秀教师",
      "英语趣配音比赛冠军",
      "曾执教高考毕业生，冲刺阶段提分 10+",
      "近一年内 5 人成绩提升 30+ 分，10 人提升 20+ 分，10 人提升 10+ 分",
      "授课学员数 1000+，累计授课时长 2300+"
    ],
    tags: ["江苏省域优秀教师", "提分明显", "趣配音冠军"]
  }
];

// 全校口碑（不绑定到具体老师的整体好评）
const REVIEWS_GLOBAL = {
  results: [
    { src: "assets/reviews/能提分/全校第一.png", caption: "全校第一" },
    { src: "assets/reviews/能提分/年级第二.png", caption: "年级第二" },
    { src: "assets/reviews/能提分/班级第三.png", caption: "班级第三" },
    { src: "assets/reviews/能提分/分班考考试成功.png", caption: "分班考成功" }
  ],
  parentFeedback: [
    "assets/reviews/老师好/single.png",
    "assets/reviews/老师好/single2.png",
    "assets/reviews/老师好/single3.png",
    "assets/reviews/老师好/single4.png",
    "assets/reviews/老师好/single5.png",
    "assets/reviews/老师好/single6.png",
    "assets/reviews/老师好/ca0b024c14771e48e73bd573a4647e.jpg",
    "assets/reviews/老师好/lQDPJwVQc66mFePNBQDNAz6wsEX7jaVH34gIyfi-XhghAA_830_1280.jpg",
    "assets/reviews/老师好/lQLPKd1E02DsrUfNBY7NBSawBQCA9hugtv4I1bKZXX6oAA_1318_1422.png",
    "assets/reviews/能提分/0515ecef76651e5d85ce6bbf279c1f.jpg",
    "assets/reviews/能提分/718724f907f89526a5135889b1f860.jpg",
    "assets/reviews/能提分/AC5CD461-5558-475D-A9C8-D193EDDD0895.png",
    "assets/reviews/能提分/ff2f8a4a4d136c923cb817e949222e.jpg",
    "assets/reviews/能提分/lQDPJwHC9QnflePNBQDNA0mwOyjNueN9WkkIyfi-XhsDAA_841_1280.jpg",
    "assets/reviews/能提分/lQDPJxOGbkHAFePNBQDNA1GwMl3m5pthMxAIyfi-XiAYAA_849_1280.jpg",
    "assets/reviews/能提分/lQDPKeEsXEZhFePNBQDNApWwl5cQg0_Aya0Iyfi-XiwFAA_661_1280.jpg",
    "assets/reviews/能提分/lQLPJwYOiVQQaQvNBXLNBiSwkap48u0D6EIJBA37CWKUAQ_1572_1394.png"
  ],
  method: [
    "assets/reviews/模式好/single.png",
    "assets/reviews/模式好/single2.png"
  ]
};
