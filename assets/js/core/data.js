// assets/js/core/data.js
// 【核心数据文件】整个大屏的所有静态数据都在这里
// 页面上的文字、图表、颜色、诗词、民俗 100% 来自这个文件

// ==========================================
// 一、二十四节气完整数据集（数组，0~23 共24个）
// ==========================================
window.solarTerms = [
  // 0 立春
  {name:'立春',pinyin:'LI CHUN',date:'02.04',season:'spring',temp:2,rain:15,folk:['咬春','打春'],agri:'耕地',poem:'一到立春先有雪，阳气潜回万木知。',color:'#C3E88D',color2:'#FFE4E1',hou:['东风解冻','蛰虫始振','鱼陟负冰'],advice:'宜舒展筋骨，尝新芽。',north:'冰消雪融，麦田返青较迟',south:'柳芽初绽，油菜花渐盛'},
  
  // 1 雨水
  {name:'雨水',pinyin:'YU SHUI',date:'02.19',season:'spring',temp:5,rain:35,folk:['接寿','回娘家'],agri:'选种',poem:'好雨知时节，当春乃发生。',color:'#A7E3C1',color2:'#D8F3DC',hou:['獭祭鱼','鸿雁来','草木萌动'],advice:'宜护脾胃，备春耕。',north:'积雪消融，河冰渐开',south:'春雨连绵，草木萌动'},
  
  // 2 惊蛰
  {name:'惊蛰',pinyin:'JING ZHE',date:'03.05',season:'spring',temp:10,rain:45,folk:['吃梨','打小人'],agri:'春灌',poem:'微雨众卉新，一雷惊蛰始。',color:'#B5E48C',color2:'#F1FA8C',hou:['桃始华','仓庚鸣','鹰化为鸠'],advice:'宜早睡早起，防春困。',north:'蛰虫初动，桃花未盛',south:'雷声渐起，桃李始华'},
  
  // 3 春分
  {name:'春分',pinyin:'CHUN FEN',date:'03.20',season:'spring',temp:14,rain:50,folk:['竖蛋','吃春菜'],agri:'播种',poem:'仲春初九日，春色正中分。',color:'#AED581',color2:'#FFF1A8',hou:['玄鸟至','雷乃发声','始电'],advice:'宜踏青，保持阴阳平衡。',north:'春麦返青，燕归渐近',south:'百花繁盛，茶园萌芽'},
  
  // 4 清明
  {name:'清明',pinyin:'QING MING',date:'04.04',season:'spring',temp:16,rain:55,folk:['祭祖','踏青'],agri:'采茶',poem:'清明时节雨纷纷，路上行人欲断魂。',color:'#9CCC65',color2:'#C8E6C9',hou:['桐始华','田鼠化为鴽','虹始见'],advice:'宜慎终追远，少食寒凉。',north:'梨花始开，草色渐浓',south:'桃李盛放，新茶开采'},
  
  // 5 谷雨（默认显示）
  {name:'谷雨',pinyin:'GU YU',date:'04.20',season:'spring',temp:18,rain:62,folk:['赏牡丹','喝茶'],agri:'水稻插秧',poem:'落花落尽且深藏，最是清明谷雨前。',color:'#C3E88D',color2:'#E9FFC2',hou:['萍始生','鸣鸠拂其羽','戴胜降于桑'],advice:'宜饮谷雨茶，赏牡丹。',north:'牡丹盛放，春播加快',south:'雨生百谷，秧苗入田'},
  
  // 6 立夏
  {name:'立夏',pinyin:'LI XIA',date:'05.05',season:'summer',temp:22,rain:70,folk:['称人','斗蛋'],agri:'锄草',poem:'立夏渐知春已去，雨余更见绿方成。',color:'#FFB4A2',color2:'#87CEEB',hou:['蝼蝈鸣','蚯蚓出','王瓜生'],advice:'宜养心，午间小憩。',north:'槐花初放，麦苗拔节',south:'稻田返青，湿热渐显'},
  
  // 7 小满
  {name:'小满',pinyin:'XIAO MAN',date:'05.20',season:'summer',temp:25,rain:75,folk:['祭车神','动三车'],agri:'管水',poem:'夜莺啼绿柳，皓月醒高楼。',color:'#FF9F80',color2:'#BDE0FE',hou:['苦菜秀','靡草死','麦秋至'],advice:'宜清热祛湿，不贪满。',north:'小麦灌浆，籽粒渐满',south:'江河水满，梅雨初临'},
  
  // 8 芒种
  {name:'芒种',pinyin:'MANG ZHONG',date:'06.05',season:'summer',temp:28,rain:80,folk:['送花神','安苗'],agri:'抢种',poem:'五月芒种到，农家收麦忙。',color:'#FF8A65',color2:'#90CAF9',hou:['螳螂生','鵙始鸣','反舌无声'],advice:'宜防暑，珍惜农时。',north:'麦收繁忙，夏播紧接',south:'梅雨绵密，稻禾旺长'},
  
  // 9 夏至
  {name:'夏至',pinyin:'XIA ZHI',date:'06.21',season:'summer',temp:31,rain:85,folk:['吃面','消暑'],agri:'防旱',poem:'昼晷已云极，宵漏自此长。',color:'#FF7043',color2:'#80DEEA',hou:['鹿角解','蜩始鸣','半夏生'],advice:'宜静心避暑，清淡饮食。',north:'日照最长，麦收收尾',south:'蝉鸣荷开，雨热同期'},
  
  // 10 小暑
  {name:'小暑',pinyin:'XIAO SHU',date:'07.07',season:'summer',temp:33,rain:82,folk:['食新','晾晒'],agri:'抗旱',poem:'倏忽温风至，因循小暑来。',color:'#EF5350',color2:'#81D4FA',hou:['温风至','蟋蟀居宇','鹰始鸷'],advice:'宜防暑湿，少熬夜。',north:'暑热增强，作物需水',south:'湿热交蒸，稻花渐香'},
  
  // 11 大暑
  {name:'大暑',pinyin:'DA SHU',date:'07.22',season:'summer',temp:36,rain:78,folk:['饮伏茶','烧伏香'],agri:'防虫',poem:'赤日几时过，清风无处寻。',color:'#FF6B6B',color2:'#87CEEB',hou:['腐草为萤','土润溽暑','大雨时行'],advice:'宜补水，避烈日。',north:'伏热当令，防旱防涝',south:'雷雨频繁，湿热极盛'},
  
  // 12 立秋
  {name:'立秋',pinyin:'LI QIU',date:'08.07',season:'autumn',temp:28,rain:60,folk:['贴秋膘','啃秋'],agri:'收割',poem:'一叶落知天下秋。',color:'#FFF3B0',color2:'#D2B48C',hou:['凉风至','白露降','寒蝉鸣'],advice:'宜润燥，慢补秋膘。',north:'昼热夜凉，早熟作物收获',south:'暑气未退，晚稻抽穗'},
  
  // 13 处暑
  {name:'处暑',pinyin:'CHU SHU',date:'08.23',season:'autumn',temp:26,rain:55,folk:['放河灯','吃鸭子'],agri:'晾晒',poem:'离离暑云散，袅袅凉风起。',color:'#FFE082',color2:'#D7CCC8',hou:['鹰乃祭鸟','天地始肃','禾乃登'],advice:'宜早睡，收敛心神。',north:'暑退风凉，禾谷登场',south:'台风仍扰，稻田防涝'},
  
  // 14 白露
  {name:'白露',pinyin:'BAI LU',date:'09.07',season:'autumn',temp:22,rain:45,folk:['喝白露茶','酿酒'],agri:'秋播',poem:'露从今夜白，月是故乡明。',color:'#FFF176',color2:'#E6C79C',hou:['鸿雁来','玄鸟归','群鸟养羞'],advice:'宜添衣，饮温茶。',north:'晨露渐白，秋播准备',south:'桂香初起，秋茶采摘'},
  
  // 15 秋分
  {name:'秋分',pinyin:'QIU FEN',date:'09.22',season:'autumn',temp:18,rain:40,folk:['吃秋菜','送秋牛'],agri:'秋收',poem:'金气秋分，风清露冷。',color:'#FFEE58',color2:'#D2B48C',hou:['雷始收声','蛰虫坯户','水始涸'],advice:'宜登高赏月，平补。',north:'玉米谷物集中收获',south:'秋菜上市，稻谷渐黄'},
  
  // 16 寒露
  {name:'寒露',pinyin:'HAN LU',date:'10.08',season:'autumn',temp:15,rain:30,folk:['登高','饮菊花酒'],agri:'播麦',poem:'寒露惊秋晚，朝看菊渐黄。',color:'#FDD835',color2:'#C9A66B',hou:['鸿雁来宾','雀入大水为蛤','菊有黄华'],advice:'宜护足保暖，赏菊。',north:'露冷霜近，冬麦播种',south:'菊黄蟹肥，秋意渐浓'},
  
  // 17 霜降
  {name:'霜降',pinyin:'SHUANG JIANG',date:'10.23',season:'autumn',temp:12,rain:25,folk:['吃柿子','登高'],agri:'翻耕',poem:'霜降水痕收，浅碧鳞鳞露远洲。',color:'#FFE066',color2:'#C2A878',hou:['豺乃祭兽','草木黄落','蛰虫咸俯'],advice:'宜防燥寒，吃熟柿。',north:'初霜显现，草木凋黄',south:'昼暖夜凉，柿果成熟'},
  
  // 18 立冬
  {name:'立冬',pinyin:'LI DONG',date:'11.07',season:'winter',temp:8,rain:20,folk:['补冬','吃饺子'],agri:'冬储',poem:'细雨生寒未有霜，庭前木叶半青黄。',color:'#DCEAF7',color2:'#FFFFFF',hou:['水始冰','地始冻','雉入大水为蜃'],advice:'宜早卧晚起，温补。',north:'水面初冰，冬藏开始',south:'秋色未尽，入冬较缓'},
  
  // 19 小雪
  {name:'小雪',pinyin:'XIAO XUE',date:'11.22',season:'winter',temp:4,rain:15,folk:['腌肉','吃糍粑'],agri:'冬灌',poem:'荷尽已无擎雨盖，菊残犹有傲霜枝。',color:'#CFE0F2',color2:'#F7F7F7',hou:['虹藏不见','天气上升','闭塞成冬'],advice:'宜藏阳，少辛辣。',north:'小雪初临，土壤封冻',south:'腌腊渐起，湿冷增强'},
  
  // 20 大雪
  {name:'大雪',pinyin:'DA XUE',date:'12.07',season:'winter',temp:1,rain:10,folk:['赏雪','进补'],agri:'积肥',poem:'大雪飞鹅毛，冬耕不等劳。',color:'#B6CBE1',color2:'#FFFFFF',hou:['鹖鴠不鸣','虎始交','荔挺出'],advice:'宜御寒，适度进补。',north:'积雪增多，田间休整',south:'冷雨频繁，农田蓄水'},
  
  // 21 冬至
  {name:'冬至',pinyin:'DONG ZHI',date:'12.21',season:'winter',temp:-2,rain:5,folk:['吃汤圆','祭祖'],agri:'防寒',poem:'天时人事日相催，冬至阳生春又来。',color:'#A9BCD0',color2:'#F0F4F8',hou:['蚯蚓结','麋角解','水泉动'],advice:'宜团圆，养藏阳气。',north:'严寒加深，河湖封冻',south:'寒潮南下，汤圆团聚'},
  
  // 22 小寒
  {name:'小寒',pinyin:'XIAO HAN',date:'01.05',season:'winter',temp:-5,rain:8,folk:['探梅','腊八粥'],agri:'积肥',poem:'小寒时节，梅花吐蕊。',color:'#94A3B8',color2:'#E8EEF6',hou:['雁北乡','鹊始巢','雉始雊'],advice:'宜防寒，食粥暖胃。',north:'寒气极盛，冰雪稳定',south:'梅花吐蕊，湿冷明显'},
  
  // 23 大寒
  {name:'大寒',pinyin:'DA HAN',date:'01.20',season:'winter',temp:-8,rain:5,folk:['尾牙祭','除旧'],agri:'修整',poem:'大寒到顶点，日后天渐暖。',color:'#E8EEF6',color2:'#FFFFFF',hou:['鸡始乳','征鸟厉疾','水泽腹坚'],advice:'宜除旧布新，静待春归。',north:'冰封雪积，农具修整',south:'岁末除旧，花木待春'}
];

// ==========================================
// 二、南北地区配置数据（用于切换南北展示）
// ==========================================
window.regionProfiles = {
  // 北方地区配置
  north:{
    label:'华夏·北方',       // 显示名称
    tempOffset:-2,           // 温度偏移：比平均低2度
    rainFactor:.82,          // 降水系数：平均的82%
    activeOffset:-4,         // 物候延迟
    lag:8,                   
    desc:'北方物候略迟，昼夜温差更明显。' // 描述文字
  },
  // 南方地区配置
  south:{
    label:'华夏·南方',
    tempOffset:3,            // 温度高3度
    rainFactor:1.22,         // 降水多22%
    activeOffset:8,
    lag:-6,
    desc:'南方雨水丰沛，花木萌动更早。'
  }
};