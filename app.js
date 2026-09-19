const STORAGE_KEY = 'campus-opportunity-hub-events';
const FAVORITES_KEY = 'campus-opportunity-hub-favorites';

const baseActivities = [
  { id: 'A01', title: '蓝桥杯程序设计校内训练营', source: '校内公告', sourceType: 'official', audience: '全校学生', location: '线上/校内', timeText: '报名截止：9月24日 18:00', deadline: '2026-09-24 18:00', tags: ['编程', '竞赛', '训练'], fit: 88, trust: 91, risk: '低', state: '报名中', need: '提交报名表及自我介绍', detail: '校内训练营面向全校学生开放，重点提升程序设计基础与竞赛能力。活动会结合讲解和实战训练，并安排导师答疑。' },
  { id: 'A02', title: 'AI应用入门公开课', source: '计算机学院', sourceType: 'college', audience: '全校学生', location: '计算机学院教学楼', timeText: '9月19日19:00', deadline: '2026-09-19 19:00', tags: ['AI', '公开课', '新生'], fit: 84, trust: 86, risk: '低', state: '报名中', need: '现场签到 + 报名表', detail: '课程面向零基础学生，讲解 AI 应用基础、常见工具和实践路径，适合对 AI 感兴趣的新生入门。' },
  { id: 'A03', title: '大学生创新创业项目团队招募', source: '校内项目组', sourceType: 'official', audience: '面向全校学生', location: '线上/项目组', timeText: '9月22日截止', deadline: '2026-09-22 23:59', tags: ['创业', '项目', '招募'], fit: 80, trust: 82, risk: '中', state: '报名中', need: '提交项目意向与自我介绍', detail: '项目组招募对标创新创业项目，鼓励跨专业组队，参与创意方案筛选和后续项目推进。' },
  { id: 'A04', title: '数学建模竞赛经验分享会', source: '校内直播', sourceType: 'official', audience: '不限专业', location: '线上直播', timeText: '直播已结束，预计9月20日更新资料', deadline: '2026-09-20 12:00', tags: ['建模', '竞赛', '经验'], fit: 78, trust: 80, risk: '中', state: '已更新', need: '在线观看回放或联系主办方', detail: '分享会总结了往年竞赛经验，适合想参加建模比赛的学生了解题型和时间安排。' },
  { id: 'A05', title: '校园公益志愿服务活动', source: '校内公益', sourceType: 'official', audience: '全校学生', location: '校内/社区', timeText: '9月27日8:30—17:00', deadline: '2026-09-26 18:00', tags: ['公益', '志愿服务', '校园'], fit: 87, trust: 89, risk: '低', state: '报名中', need: '线上报名，需现场签到', detail: '为校内社区提供志愿服务，适合希望参与校园公益和团队协作的学生。' },
  { id: 'A06', title: 'Web开发零基础学习小组', source: '校内学习小组', sourceType: 'official', audience: '零基础学生', location: '校内', timeText: '9月23日起每周三19:30', deadline: '2026-09-23 19:30', tags: ['零基础', '前端', '学习'], fit: 90, trust: 83, risk: '低', state: '报名中', need: '加入学习小组微信群', detail: '以零基础入门为主，围绕 HTML/CSS/JS 展开学习和练习，适合有志于前端方向的同学。' },
  { id: 'A07', title: 'AI创新应用挑战赛', source: '校内赛事', sourceType: 'official', audience: '2—4人组队', location: '校内申报', timeText: '9月21日18:00前完成校内意向申报', deadline: '2026-09-21 18:00', tags: ['AI', '比赛', '创新'], fit: 82, trust: 88, risk: '中', state: '报名中', need: '团队报名并提交创意方向', detail: '本赛事鼓励结合 AI 技术与校园场景发明新型应用场景，适合对 AI 产品有想法的学生参与。' },
  { id: 'A08', title: '校园软件项目组招募', source: '校内项目组', sourceType: 'official', audience: '大一、大二学生', location: '线上/校内', timeText: '长期招募，满员即止', deadline: '长期招募', tags: ['软件', '开发', '项目'], fit: 81, trust: 79, risk: '中', state: '报名中', need: '发送简历或作品链接', detail: '校内软件项目组长期招募，适合喜欢编程与协作开发的学生加入真实开发流程。' },
  { id: 'A09', title: '程序设计训练营补充通知', source: '校内公告', sourceType: 'official', audience: '已报名同学', location: '实验楼A402', timeText: '首次训练改为9月20日17:30', deadline: '2026-09-20 17:30', tags: ['编程', '通知', '训练营'], fit: 73, trust: 92, risk: '低', state: '已更新', need: '查看群通知并按时到场', detail: '补充通知明确了训练营时间调整与入场规则，请已报名同学及时关注群消息。' },
  { id: 'A10', title: '前端开发经验交流会', source: '校内活动', sourceType: 'official', audience: '全校学生', location: 'A201/线上直播', timeText: '9月19日15:00—16:30', deadline: '2026-09-19 15:00', tags: ['前端', '分享会', '技术'], fit: 83, trust: 85, risk: '低', state: '报名中', need: '提前扫码预约或现场签到', detail: '由前端开发者分享从入门到项目实践的经验，适合有学习意愿但缺乏方向的学生。' },
  { id: 'A11', title: '大学生科研入门分享会', source: '校内活动', sourceType: 'official', audience: '全校学生', location: '校内', timeText: '9月21日19:00—20:30', deadline: '2026-09-21 18:00', tags: ['科研', '分享会', '学习'], fit: 86, trust: 88, risk: '低', state: '报名中', need: '报名二维码或现场登记', detail: '介绍科研入门方法、导师选择思路和创新项目规划，适合希望提前了解科研机会的学生。' },
  { id: 'A12', title: '全国高校计算机能力挑战赛', source: '全国赛事', sourceType: 'official', audience: '本科生', location: '线上/校内', timeText: '10月5日23:59报名截止', deadline: '2026-10-05 23:59', tags: ['比赛', '计算机', '全国'], fit: 85, trust: 90, risk: '中', state: '报名中', need: '队伍报名与赛前训练', detail: '全国性赛事，覆盖代码编程与算法能力，适合计算机方向学生深入参赛。' },
  { id: 'A13', title: '科研助理招募', source: '科研组', sourceType: 'college', audience: '大二及以上学生', location: '校内实验室', timeText: '9月21日截止报名，每周安排实习', deadline: '2026-09-21 18:00', tags: ['科研', '实验室', '实习'], fit: 76, trust: 84, risk: '中', state: '报名中', need: '发送个人简历与研究方向说明', detail: '实验室长期招募科研助理，适合对研究方向和技术积累感兴趣的学生参与。' },
  { id: 'A14', title: 'Git与GitHub零基础工作坊', source: '学院活动', sourceType: 'college', audience: '大一新生', location: '校内', timeText: '9月21日19:00—20:30，限40人', deadline: '2026-09-21 18:00', tags: ['Git', 'GitHub', '零基础'], fit: 92, trust: 84, risk: '低', state: '报名中', need: '登记姓名和联系信息', detail: '工作坊从 Git 基础命令入门，帮助新生快速建立协作和项目版本管理意识。' },
  { id: 'A15', title: 'AI应用创意挑战', source: '校内赛事', sourceType: 'official', audience: '个人或团队', location: '线上/校内', timeText: '9月23日23:59前提交创意方案', deadline: '2026-09-23 23:59', tags: ['AI', '创意', '挑战赛'], fit: 88, trust: 86, risk: '低', state: '报名中', need: '提交创意方案文档', detail: '鼓励学生用 AI 技术解决真实校园问题，适合希望快速积累作品经验的同学。' },
  { id: 'A16', title: '校园摄影志愿者招募', source: '学生/社团', sourceType: 'student', audience: '全校学生', location: '校内', timeText: '长期招募，活动摄影', deadline: '长期招募', tags: ['摄影', '志愿'], fit: 68, trust: 65, risk: '中', state: '报名中', need: '联系活动负责人', detail: '需要有基础摄影能力的学生协助校内活动摄影，适合有时间参与的同学。' },
  { id: 'A17', title: 'Python程序设计学习资料合集', source: '校内资料发布', sourceType: 'official', audience: '全校学生', location: '网盘共享', timeText: '资料长期开放', deadline: '长期开放', tags: ['Python', '资料', '学习'], fit: 74, trust: 81, risk: '低', state: '报名中', need: '通过网盘链接获取资料', detail: '资料合集覆盖基础语法、项目练习和常见题型，适合作为自学入口。' },
  { id: 'A18', title: '网络安全兴趣交流小组', source: '校内社团', sourceType: 'college', audience: '感兴趣学生', location: '校内', timeText: '首次交流9月19日19:30', deadline: '2026-09-19 19:30', tags: ['网络安全', '交流', '社团'], fit: 79, trust: 78, risk: '中', state: '报名中', need: '联系社团负责人', detail: '适合想了解网络安全与渗透基础的学生，通过分享和交流建立学习小组。' },
  { id: 'A19', title: '学生创新项目路演观摩', source: '学生组织', sourceType: 'student', audience: '全校学生', location: '校内', timeText: '9月20日14:30', deadline: '2026-09-20 14:00', tags: ['项目', '路演', '创新'], fit: 70, trust: 72, risk: '中', state: '报名中', need: '前往现场观摩或联系组织方', detail: '本次路演可帮助学生了解创新项目评审思路，适合对创业和项目实践感兴趣的同学观摩���' },
  { id: 'A20', title: '创新创业项目团队补充说明', source: '校内招募', sourceType: 'official', audience: '已投递者', location: '线上', timeText: '开发方向名额已满，启动补充申请', deadline: '2026-09-20 12:00', tags: ['创业', '团队', '说明'], fit: 77, trust: 90, risk: '低', state: '已更新', need: '查收邮件并补充资料', detail: '针对已投递学生进行补充说明，说明开发方向名额和后续流程安排。' },
  { id: 'A21', title: '计算机学院AI产品设计分享会', source: '计算机学院', sourceType: 'college', audience: '全校学生', location: '明德楼B203', timeText: '9月20日19:00', deadline: '2026-09-20 18:00', tags: ['AI', '产品', '设计'], fit: 85, trust: 86, risk: '低', state: '报名中', need: '扫码报名或现场签到', detail: '围绕 AI 产品设计的思路、用户分析和竞品比较展开分享，适合对产品方向感兴趣的同学。' },
  { id: 'A22', title: '学生发起｜周末羽毛球约球', source: '学生个人发布', sourceType: 'student', audience: '6—8人', location: '待确认', timeText: '9月20日16:00，AA制', deadline: '2026-09-20 16:00', tags: ['运动', '社交', '羽毛球'], fit: 58, trust: 56, risk: '高', state: '报名中', need: '联系发布者确认地点', detail: '活动由学生发起，需自行确认场地与安排，时间和地点仍存在不确定性。' },
  { id: 'A23', title: '学生发起｜AI工具交流搭子招募', source: '学生个人发布', sourceType: 'student', audience: '零基础可参加', location: '地理待定', timeText: '拟于9月22日开始', deadline: '2026-09-22 12:00', tags: ['AI', '搭子', '学习'], fit: 62, trust: 58, risk: '高', state: '报名中', need: '联系发布者确认时间地点', detail: '该活动作为学习交流搭子存在较多不确定信息，建议优先核实时间和具体安排。' },
  { id: 'A24', title: '学生发起｜“校园兼职福利分享”', source: '学生个人发布', sourceType: 'student', audience: '全校学生', location: '未提供', timeText: '称“零门槛兼职信息分享”', deadline: '未注明', tags: ['兼职', '福利', '分享'], fit: 55, trust: 52, risk: '高', state: '风险信息', need: '请先核实真实性和来源', detail: '信息来源较弱，缺少明确时间、地点和真实发布群体信息，建议谨慎对待。' },
  { id: 'A25', title: '学生发起｜数码新品体验交流', source: '学生个人发布', sourceType: 'student', audience: '技术交流', location: '未注明', timeText: '活动时间、地点均未明确', deadline: '未注明', tags: ['数码', '体验', '交流'], fit: 57, trust: 49, risk: '高', state: '风险信息', need: '先确认主办者和活动真实性', detail: '活动时间、地点和组织信息均未明确，建议不要在未核实前支付或报名。' },
  { id: 'A26', title: '外国语学院校园语言角', source: '外国语学院', sourceType: 'college', audience: '全校学生', location: '校内', timeText: '9月21日15:00，自由交流', deadline: '2026-09-21 15:00', tags: ['语言', '交流', '校园'], fit: 76, trust: 82, risk: '低', state: '报名中', need: '现场报名或前往参加', detail: '适合想提升语言表达和交流能力的学生参与，活动氛围轻松自由。' },
];

const state = {
  source: 'all',
  status: 'all',
  search: '',
  freshmanOnly: false,
  lowRiskOnly: false,
  sortBy: 'priority',
};

const els = {
  activityList: document.getElementById('activityList'),
  recommendSection: document.getElementById('recommendSection'),
  filterSummary: document.getElementById('filterSummary'),
  searchInput: document.getElementById('searchInput'),
  sortSelect: document.getElementById('sortSelect'),
  detailModal: document.getElementById('detailModal'),
  detailContent: document.getElementById('detailContent'),
  publishBtn: document.getElementById('publishBtn'),
  publishModal: document.getElementById('publishModal'),
  publishForm: document.getElementById('publishForm'),
  todaySummary: document.getElementById('todaySummary'),
  freshmanOnly: document.getElementById('freshmanOnly'),
  lowRiskOnly: document.getElementById('lowRiskOnly'),
  resetFiltersBtn: document.getElementById('resetFiltersBtn'),
  heroTotal: document.getElementById('heroTotal'),
  heroFresh: document.getElementById('heroFresh'),
  heroLowRisk: document.getElementById('heroLowRisk'),
  favoritesList: document.getElementById('favoritesList'),
  clearFavoritesBtn: document.getElementById('clearFavoritesBtn'),
};

const localEvents = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    return [];
  }
};

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  } catch (error) {
    return [];
  }
}

function setFavorites(items) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const next = favorites.includes(id) ? favorites.filter((value) => value !== id) : [...favorites, id];
  setFavorites(next);
  renderFavorites();
  renderActivities();
}

function clearFavorites() {
  setFavorites([]);
  renderFavorites();
  renderActivities();
}

function persistEvents(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function mergeEvents() {
  const saved = localEvents();
  return [...saved, ...baseActivities].map((item) => ({
    ...item,
    sourceType: item.sourceType || 'student',
    trust: typeof item.trust === 'number' ? item.trust : 70,
    fit: typeof item.fit === 'number' ? item.fit : 70,
    risk: item.risk || '中',
    tags: Array.isArray(item.tags) ? item.tags : [],
  }));
}

function parseDate(value) {
  if (!value || value === '长期招募' || value === '长期开放' || value === '未注明') return null;
  const normalized = String(value)
    .replace(/年|月|日/g, '-')
    .replace(/时/g, ':')
    .replace(/分/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const match = normalized.match(/(\d{4})-(\d{1,2})-(\d{1,2})\s*(\d{1,2}:\d{2})?/);
  if (match) {
    const [, y, m, d, t = '00:00'] = match;
    return new Date(`${y}-${m}-${d}T${t}:00`);
  }

  const alt = normalized.match(/(\d{1,2})月(\d{1,2})日\s*(\d{1,2}:\d{2})?/);
  if (alt) {
    const [, mm, dd, t = '00:00'] = alt;
    const year = '2026';
    return new Date(`${year}-${mm}-${dd}T${t}:00`);
  }

  return null;
}

function getPriorityScore(item) {
  let score = item.fit + item.trust;

  if (item.risk === '高') score -= 22;
  if (item.risk === '中') score -= 8;

  const deadline = parseDate(item.deadline);
  const now = new Date('2026-09-19T10:00:00');
  if (deadline && deadline > now) {
    const diffHours = (deadline - now) / (1000 * 60 * 60);
    if (diffHours < 10) score += 12;
    if (diffHours < 24) score += 8;
  }

  if (item.sourceType === 'official' || item.sourceType === 'college') score += 10;
  if (item.state === '风险信息') score -= 20;
  if (item.state === '候补可入场') score -= 6;
  if (item.fit >= 85 && item.trust >= 84) score += 10;

  return Math.max(20, Math.min(100, score));
}

function byState(item) {
  const stateName = item.state || '报名中';
  const now = new Date('2026-09-19T10:00:00');
  const deadline = parseDate(item.deadline);

  if (stateName === '风险信息') return 'review';
  if (stateName === '已结束' || stateName === '已更新') return 'review';
  if (deadline && deadline <= now) return 'urgent';
  if (item.sourceType === 'student' && (item.risk === '中' || item.risk === '高')) return 'review';
  return 'active';
}

function getFilteredActivities() {
  const acts = mergeEvents().map((item) => ({
    ...item,
    priority: getPriorityScore(item),
    stateType: byState(item),
    tags: Array.isArray(item.tags) ? item.tags : [],
  }));

  const filtered = acts.filter((item) => {
    const itemTags = Array.isArray(item.tags) ? item.tags : [];
    const textMatch = !state.search || `${item.title} ${itemTags.join(' ')} ${item.detail || ''}`.toLowerCase().includes(state.search.toLowerCase());
    const sourceMatch = state.source === 'all' || item.sourceType === state.source || (state.source === 'official' && item.sourceType === 'college');
    const statusMatch = state.status === 'all' || item.stateType === state.status;
    const freshmanMatch = !state.freshmanOnly || (item.fit >= 80 || (item.audience || '').includes('新生') || itemTags.includes('零基础'));
    const lowRiskMatch = !state.lowRiskOnly || item.risk === '低';
    return textMatch && sourceMatch && statusMatch && freshmanMatch && lowRiskMatch;
  });

  filtered.sort((a, b) => {
    if (state.sortBy === 'time') {
      const dateA = parseDate(a.deadline) || parseDate(a.startAt) || new Date('2100-01-01');
      const dateB = parseDate(b.deadline) || parseDate(b.startAt) || new Date('2100-01-01');
      return dateA - dateB;
    }
    if (state.sortBy === 'trust') {
      return b.trust - a.trust;
    }
    return b.priority - a.priority;
  });

  return filtered;
}

function updateChipState(groupName, value) {
  const buttons = document.querySelectorAll(`[data-${groupName}]`);
  buttons.forEach((button) => {
    button.classList.toggle('active', button.dataset[groupName] === value);
  });
}

function createBadge(item) {
  const typeClass = item.sourceType === 'official' ? 'official' : item.sourceType === 'college' ? 'college' : 'student';
  const riskClass = item.risk === '高' ? 'critical' : item.risk === '低' ? 'safe' : 'student';
  return `
    <div class="badge-row">
      <span class="badge ${typeClass}">${item.sourceType === 'official' ? '官方' : item.sourceType === 'college' ? '学院' : '学生'}</span>
      <span class="badge ${riskClass}">${item.risk === '高' ? '高风险' : item.risk === '低' ? '低风险' : '待确认'}</span>
    </div>
  `;
}

function buildActivityCard(item) {
  const deadlineText = item.deadline && item.deadline !== '长期招募' && item.deadline !== '长期开放' ? `截止：${item.deadline}` : '长期开放';
  const favoriteActive = getFavorites().includes(item.id) ? 'active' : '';
  const tags = Array.isArray(item.tags) ? item.tags.slice(0, 3) : [];

  return `
    <article class="activity-card" data-id="${item.id}">
      <div class="card-top">
        <div>
          <div class="badge-row">${createBadge(item)}</div>
        </div>
        <div class="score-pill">${Math.round(item.priority)}</div>
      </div>

      <h3 class="card-title">${item.title}</h3>

      <div class="card-meta">
        <div class="meta-line"><span>📅</span><strong>${item.timeText}</strong></div>
        <div class="meta-line"><span>📍</span><span>${item.location}</span></div>
        <div class="meta-line"><span>👥</span><span>${item.audience}</span></div>
        <div class="meta-line"><span>⚑</span><span>${deadlineText}</span></div>
      </div>

      <div class="badge-row">
        ${tags.map((tag) => `<span class="badge student">${tag}</span>`).join('')}
      </div>

      <div class="card-footer">
        <span class="badge ${item.fit >= 80 ? 'safe' : 'student'}">适配度 ${item.fit}</span>
        <div class="action-bar">
          <button class="favorite-btn ${favoriteActive}" type="button" data-favorite-toggle="${item.id}">${getFavorites().includes(item.id) ? '已收藏' : '收藏'}</button>
          <button class="link-btn" type="button" data-open-detail="${item.id}">查看详情</button>
        </div>
      </div>
    </article>
  `;
}

function renderRecommend() {
  const acts = getFilteredActivities().slice(0, 3);
  if (!acts.length) {
    els.recommendSection.innerHTML = '';
    return;
  }

  els.recommendSection.innerHTML = `
    <div class="recommend-wrap">
      ${acts.map((item) => `
        <article class="recommend-card">
          <h3>${item.title}</h3>
          <p>${Array.isArray(item.tags) && item.tags[0] ? item.tags[0] : '校园机会'} · ${item.source}</p>
          <p class="meta-line">${item.timeText}</p>
          <button class="link-btn" type="button" data-open-detail="${item.id}">查看细节</button>
        </article>
      `).join('')}
    </div>
  `;
}

function renderSummary() {
  const acts = getFilteredActivities();
  const officialCount = acts.filter((item) => item.sourceType === 'official' || item.sourceType === 'college').length;
  const freshCount = acts.filter((item) => item.fit >= 80).length;
  const riskCount = acts.filter((item) => item.risk === '高').length;

  els.todaySummary.innerHTML = `
    <div class="summary-card">
      <h3>匹配结果</h3>
      <strong>${acts.length}</strong>
    </div>
    <div class="summary-card">
      <h3>适合新生</h3>
      <strong>${freshCount}</strong>
    </div>
    <div class="summary-card">
      <h3>官方/学院</h3>
      <strong>${officialCount}</strong>
    </div>
    <div class="summary-card">
      <h3>高风险提醒</h3>
      <strong>${riskCount}</strong>
    </div>
  `;
}

function renderFilterSummary() {
  const acts = getFilteredActivities();
  const parts = [];

  if (state.search) parts.push(`关键词：${state.search}`);
  if (state.source !== 'all') parts.push(`来源：${state.source === 'official' ? '官方' : state.source === 'college' ? '学院' : '学生'}`);
  if (state.status !== 'all') parts.push(`状态：${state.status === 'active' ? '报名中' : state.status === 'urgent' ? '即将截止' : '待确认'}`);
  if (state.freshmanOnly) parts.push('适合新生');
  if (state.lowRiskOnly) parts.push('低风险');

  if (!parts.length) {
    els.filterSummary.innerHTML = '<div class="filter-summary-empty">已展示全部机会，共 ' + acts.length + ' 条</div>';
    return;
  }

  els.filterSummary.innerHTML = '<div class="filter-summary-badge">已筛选：' + parts.join(' · ') + '（' + acts.length + ' 条）</div>';
}

function updateHeroStats() {
  const acts = getFilteredActivities();
  const total = acts.length;
  const fresh = acts.filter((item) => item.fit >= 80).length;
  const lowRisk = acts.filter((item) => item.risk === '低').length;

  els.heroTotal.textContent = String(total);
  els.heroFresh.textContent = String(fresh);
  els.heroLowRisk.textContent = String(lowRisk);
}

function renderFavorites() {
  const favorites = getFavorites();
  const allEvents = mergeEvents();
  const selected = allEvents.filter((item) => favorites.includes(item.id));

  if (!selected.length) {
    els.favoritesList.innerHTML = '<p class="empty-favorites">暂无收藏，点击卡片上的“收藏”即可加入待办。</p>';
    return;
  }

  els.favoritesList.innerHTML = selected.slice(0, 5).map((item) => `
    <div class="favorite-item">
      <span>${item.title}</span>
      <button type="button" data-open-detail="${item.id}">查看</button>
    </div>
  `).join('');
}

function renderActivities() {
  const filtered = getFilteredActivities();
  renderRecommend();
  renderSummary();
  renderFilterSummary();
  updateHeroStats();
  renderFavorites();

  if (!filtered.length) {
    els.activityList.innerHTML = '<div class="empty-state">暂无符合筛选条件的内容，试试调整关键词或筛选条件。</div>';
    return;
  }

  els.activityList.innerHTML = filtered.map(buildActivityCard).join('');
}

function renderDetail(item) {
  const favoriteActive = getFavorites().includes(item.id) ? 'active' : '';
  const riskBox = item.risk === '高'
    ? '<div class="warning-box">此信息较为不完整或风险较高，建议先确认主办方、时间和场地，再决定是否报名。</div>'
    : item.risk === '中'
      ? '<div class="warning-box">该信息存在部分不确定信息，建议优先核对时间、地点或审核规则后再行动。</div>'
      : '<div class="warning-box">该信息较完整，适合优先考虑参与。</div>';

  els.detailContent.innerHTML = `
    <div class="detail-body">
      <div class="detail-header">
        <div class="badge-row">${createBadge(item)}</div>
        <h3>${item.title}</h3>
      </div>

      ${riskBox}

      <div class="detail-grid">
        <div class="detail-block">
          <h4>时间</h4>
          <p>${item.timeText}</p>
        </div>
        <div class="detail-block">
          <h4>地点</h4>
          <p>${item.location}</p>
        </div>
        <div class="detail-block">
          <h4>适用对象</h4>
          <p>${item.audience}</p>
        </div>
        <div class="detail-block">
          <h4>参与方式</h4>
          <p>${item.need}</p>
        </div>
      </div>

      <div class="detail-block">
        <h4>详细说明</h4>
        <p>${item.detail}</p>
      </div>

      <div class="detail-block">
        <h4>信息评分</h4>
        <p>适配度：${item.fit} / 100，可信度：${item.trust} / 100，风险：${item.risk}</p>
      </div>

      <div class="action-bar">
        <button class="favorite-btn ${favoriteActive}" type="button" data-favorite-toggle="${item.id}">${getFavorites().includes(item.id) ? '已收藏' : '收藏此活动'}</button>
      </div>
    </div>
  `;
  els.detailModal.classList.remove('hidden');
  els.detailModal.setAttribute('aria-hidden', 'false');
}

function closeModal(modalElement) {
  modalElement.classList.add('hidden');
  modalElement.setAttribute('aria-hidden', 'true');
}

function resetFilters() {
  state.search = '';
  state.source = 'all';
  state.status = 'all';
  state.freshmanOnly = false;
  state.lowRiskOnly = false;
  state.sortBy = 'priority';

  els.searchInput.value = '';
  els.freshmanOnly.checked = false;
  els.lowRiskOnly.checked = false;
  els.sortSelect.value = 'priority';
  updateChipState('source', 'all');
  updateChipState('status', 'all');
  renderActivities();
}

function bindEvents() {
  els.searchInput.addEventListener('input', (e) => {
    state.search = e.target.value.trim();
    renderActivities();
  });

  document.querySelectorAll('[data-source]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.source = btn.dataset.source;
      updateChipState('source', state.source);
      renderActivities();
    });
  });

  document.querySelectorAll('[data-status]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.status = btn.dataset.status;
      updateChipState('status', state.status);
      renderActivities();
    });
  });

  els.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderActivities();
  });

  els.freshmanOnly.addEventListener('change', (e) => {
    state.freshmanOnly = e.target.checked;
    renderActivities();
  });

  els.lowRiskOnly.addEventListener('change', (e) => {
    state.lowRiskOnly = e.target.checked;
    renderActivities();
  });

  els.resetFiltersBtn.addEventListener('click', resetFilters);
  els.clearFavoritesBtn.addEventListener('click', clearFavorites);

  document.addEventListener('click', (e) => {
    const detailButton = e.target.closest('[data-open-detail]');
    if (detailButton) {
      const item = mergeEvents().find((entry) => entry.id === detailButton.dataset.openDetail);
      if (item) renderDetail(item);
    }

    const favoriteToggle = e.target.closest('[data-favorite-toggle]');
    if (favoriteToggle) {
      toggleFavorite(favoriteToggle.dataset.favoriteToggle);
    }

    if (e.target.matches('[data-close="true"]')) {
      closeModal(els.detailModal);
      closeModal(els.publishModal);
    }
  });

  document.getElementById('closeModalBtn').addEventListener('click', () => closeModal(els.detailModal));
  document.getElementById('closePublishBtn').addEventListener('click', () => closeModal(els.publishModal));
  document.getElementById('cancelPublishBtn').addEventListener('click', () => closeModal(els.publishModal));

  els.publishBtn.addEventListener('click', () => {
    els.publishModal.classList.remove('hidden');
    els.publishModal.setAttribute('aria-hidden', 'false');
  });

  els.publishForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('newTitle').value.trim();
    const source = document.getElementById('newSource').value;
    const timeText = document.getElementById('newTime').value.trim();
    const location = document.getElementById('newLocation').value.trim() || '待定';
    const audience = document.getElementById('newAudience').value.trim() || '全校学生';
    const deadline = document.getElementById('newDeadline').value.trim() || '未注明';
    const description = document.getElementById('newDescription').value.trim();
    const contact = document.getElementById('newContact').value.trim() || '见详情';
    const tagsText = document.getElementById('newTags').value.trim();

    if (!title || !timeText || !description) {
      alert('标题、时间和详细说明不能为空。');
      return;
    }

    const tags = tagsText ? tagsText.split(/[，,\s]+/).filter(Boolean) : ['学生发布'];

    const newEvent = {
      id: `U${Date.now()}`,
      title,
      source,
      sourceType: source === '学院发布' ? 'college' : source === '社团发布' ? 'official' : 'student',
      audience,
      location,
      timeText,
      deadline,
      startAt: '2026-09-19 00:00',
      tags,
      fit: 75,
      trust: 60,
      risk: '中',
      state: '报名中',
      need: '联系发布者：' + contact,
      detail: `${description} 联系方式：${contact}`,
    };

    const existing = localEvents();
    existing.unshift(newEvent);
    persistEvents(existing);

    els.publishForm.reset();
    closeModal(els.publishModal);
    renderActivities();
  });
}

function init() {
  bindEvents();
  renderActivities();
}

init();
