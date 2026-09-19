const STORAGE_KEY = 'campus-opportunity-hub-events';
const FAVORITES_KEY = 'campus-opportunity-hub-favorites';

const baseActivities = [
  { id: 'A01', title: '蓝桥杯程序设计校内训练营', source: '校内公告', sourceType: 'official', audience: '全校学生', location: '线上/校内', timeText: '报名截止：9月24日 23:59', deadline: '2026-9-24 23:59', startAt: '2026-09-20 19:00', fit: 92, trust: 92, risk: '低', state: '报名中', need: '填写报名表并提交个人信息', detail: '适合希望提升编程能力的学生，针对 C/C++ 与算法基础进行强化训练。', tags: ['编程', '算法', '训练营'] },
  { id: 'A02', title: 'AI应用入门公开课', source: '计算机学院', sourceType: 'college', audience: '全校学生', location: '计算机学院教学楼', timeText: '9月19日19:00', deadline: '2026-9-20 18:00', startAt: '2026-09-19 19:00', fit: 86, trust: 84, risk: '低', state: '报名中', need: '扫码报名，现场签到', detail: '面向零基础用户介绍 AI 实际应用场景，适合想了解 AI 发展趋势与���具使用的学生。', tags: ['AI', '公开课', '新生友好'] },
  { id: 'A03', title: '大学生创新创业项目团队招募', source: '校内项目组', sourceType: 'official', audience: '面向全校学生', location: '线上/项目组', timeText: '9月22日前', deadline: '2026-9-22 18:00', startAt: '2026-09-19 10:00', fit: 88, trust: 80, risk: '中', state: '报名中', need: '提交团队介绍与个人简历', detail: '项目组招募跨专业成员，重点看创意、沟通、执行力和投入意愿。', tags: ['创业', '团队', '项目'] },
  { id: 'A04', title: '数学建模竞赛经验分享会', source: '校内直播', sourceType: 'official', audience: '不限专业', location: '线上直播', timeText: '直播已结束，预计补录中', deadline: '2026-09-21 12:00', startAt: '2026-09-18 19:00', fit: 74, trust: 82, risk: '低', state: '已更新', need: '关注官方直播回放', detail: '分享赛题理解与建模思路，适合想参加竞赛但不确定方向的同学。', tags: ['数学建模', '竞赛', '直播'] },
  { id: 'A05', title: '校园公益志愿服务活动', source: '校内公益', sourceType: 'official', audience: '全校学生', location: '校内/社区', timeText: '9月27日8:30—17:00', deadline: '2026-9-25 23:59', startAt: '2026-09-27 08:30', fit: 81, trust: 88, risk: '低', state: '报名中', need: '提交志愿报名表', detail: '适合喜欢服务他人并希望积累志愿时长的学生，可提升实践经历。', tags: ['公益', '志愿', '服务'] },
  { id: 'A06', title: 'Web开发零基础学习小组', source: '校内学习小组', sourceType: 'official', audience: '零基础学生', location: '校内', timeText: '9月23日起每周三19:30', deadline: '2026-9-23 18:00', startAt: '2026-09-23 19:30', fit: 91, trust: 76, risk: '低', state: '报名中', need: '联系负责人登记名额', detail: '从 HTML/CSS/JavaScript 入门，适合想系统学习前端开发的学生。', tags: ['Web', '前端', '零基础'] },
  { id: 'A07', title: 'AI创新应用挑战赛', source: '校内赛事', sourceType: 'official', audience: '2—4人组队', location: '校内申报', timeText: '9月21日18:00前完成校内申报', deadline: '2026-9-21 18:00', startAt: '2026-09-19 09:00', fit: 89, trust: 85, risk: '中', state: '报名中', need: '以队伍形式提交作品方向说明', detail: '鼓励结合 AI 技术完成真实问题解决，适合有创意与执行力的学生。', tags: ['AI', '挑战赛', '组队'] },
  { id: 'A08', title: '校园软件项目组招募', source: '校内项目组', sourceType: 'official', audience: '大一、大二学生', location: '线上/校内', timeText: '长期招募，名额有限', deadline: '长期招募', startAt: '2026-09-19 00:00', fit: 80, trust: 78, risk: '低', state: '报名中', need: '投递简历并参与筛选', detail: '适合想参与真实项目、积累开发经验的同学。', tags: ['项目', '编程', '实战'] },
  { id: 'A09', title: '程序设计训练营补充通知', source: '校内公告', sourceType: 'official', audience: '已报名同学', location: '实验楼A402', timeText: '首次训练改为9月20日18:30', deadline: '2026-09-20 18:00', startAt: '2026-09-20 18:30', fit: 80, trust: 90, risk: '低', state: '已更新', need: '按通知内容更新报名信息', detail: '已报名同学需根据补充通知调整训练时间与内容安排。', tags: ['编程', '通知', '训练营'] },
  { id: 'A10', title: '前端开发经验交流会', source: '校内活动', sourceType: 'official', audience: '全校学生', location: 'A201/线上直播', timeText: '9月19日15:00—16:30', deadline: '2026-09-19 15:00', startAt: '2026-09-19 15:00', fit: 84, trust: 83, risk: '低', state: '报名中', need: '现场签到或直播观看', detail: '分享前端学习路线、项目经验以及作品选题方向。', tags: ['前端', '分享会', '学习'] },
  { id: 'A11', title: '大学生科研入门分享会', source: '校内活动', sourceType: 'official', audience: '全校学生', location: '校内', timeText: '9月21日19:00—20:30', deadline: '2026-09-21 18:30', startAt: '2026-09-21 19:00', fit: 79, trust: 82, risk: '低', state: '报名中', need: '提前报名后现场参加', detail: '介绍科研选题、导师沟通、论文写作与项目规划。', tags: ['科研', '分享会', '入门'] },
  { id: 'A12', title: '全国高校计算机能力挑战赛', source: '全国赛事', sourceType: 'official', audience: '本科生', location: '线上/校内', timeText: '10月5日23:59报名截止', deadline: '2026-10-05 23:59', startAt: '2026-09-19 00:00', fit: 85, trust: 90, risk: '低', state: '报名中', need: '在线报名并完成资格确认', detail: '覆盖编程能力、数据结构和软件工程综合技能，适合有系统训练基础的学生。', tags: ['比赛', '编程', '全国赛'] },
  { id: 'A13', title: '科研助理招募', source: '科研组', sourceType: 'college', audience: '大二及以上学生', location: '校内实验室', timeText: '9月21日截止报名，每周安排一轮面试', deadline: '2026-9-21 23:59', startAt: '2026-09-19 00:00', fit: 73, trust: 79, risk: '中', state: '报名中', need: '投递简历并联系导师', detail: '受欢迎的研究方向将提供实际科研训练，适合想早期接触研究工作的学生。', tags: ['科研', '招募', '实验室'] },
  { id: 'A14', title: 'Git与GitHub零基础工作坊', source: '学院活动', sourceType: 'college', audience: '大一新生', location: '校内', timeText: '9月21日19:00—20:30，限40人', deadline: '2026-9-21 18:00', startAt: '2026-09-21 19:00', fit: 95, trust: 84, risk: '低', state: '报名中', need: '提前登记并按时到场', detail: '帮助新生快速掌握 Git 基础、协作流程与提交规范。', tags: ['Git', 'GitHub', '零基础'] },
  { id: 'A15', title: 'AI应用创意挑战', source: '校内赛事', sourceType: 'official', audience: '个人或团队', location: '线上/校内', timeText: '9月23日23:59前提交创意方案', deadline: '2026-9-23 23:59', startAt: '2026-09-19 00:00', fit: 86, trust: 77, risk: '中', state: '报名中', need: '提交创意方案及团队简介', detail: '适合对 AI 结合真实场景应用感兴趣的学生，重视想法创新与落地性。', tags: ['AI', '创意', '方案'] },
  { id: 'A16', title: '校园摄影志愿者招募', source: '学生/社团', sourceType: 'student', audience: '全校学生', location: '校内', timeText: '长期招募，活动摄影', deadline: '长期招募', startAt: '2026-09-19 00:00', fit: 68, trust: 60, risk: '中', state: '报名中', need: '联系社团负责人间接报名', detail: '用于活动记录及宣传，适合有摄影基础但不要求专业水平的学生。', tags: ['摄影', '志愿者', '社团'] },
  { id: 'A17', title: 'Python程序设计学习资料合集', source: '校内资料发布', sourceType: 'official', audience: '全校学生', location: '网盘共享', timeText: '资料长期开放', deadline: '长期开放', startAt: '2026-09-19 00:00', fit: 75, trust: 81, risk: '低', state: '报名中', need: '获取共享链接并按目录学习', detail: '包含基础语法、案例实践和练习资源，适合自学上手。', tags: ['Python', '资料', '自学'] },
  { id: 'A18', title: '网络安全兴趣交流小组', source: '校内社团', sourceType: 'college', audience: '感兴趣学生', location: '校内', timeText: '首次交流9月19日19:30', deadline: '2026-09-19 18:30', startAt: '2026-09-19 19:30', fit: 78, trust: 72, risk: '中', state: '报名中', need: '加入群聊并确认现场名额', detail: '适合对网络安全、CTF 和实战技术感兴趣的学生。', tags: ['网络安全', 'CTF', '社团'] },
  { id: 'A19', title: '学生创新项目路演观摩', source: '学生组织', sourceType: 'student', audience: '全校学生', location: '校内', timeText: '9月20日14:30', deadline: '2026-09-20 13:00', startAt: '2026-09-20 14:30', fit: 71, trust: 66, risk: '中', state: '报名中', need: '联系组织者确认是否需要报名', detail: '适合了解学生项目成果��做法，了解创新实践方向。', tags: ['路演', '创新', '观摩'] },
  { id: 'A20', title: '创新创业项目团队补充说明', source: '校内招募', sourceType: 'official', audience: '已投递者', location: '线上', timeText: '开发方向名额已满，补充说明更新中', deadline: '2026-09-22 18:00', startAt: '2026-09-19 09:00', fit: 62, trust: 77, risk: '中', state: '候补可入场', need: '关注官方更新或联系项目组', detail: '已投递同学可关注补充说明，若名额调整或待补充筛选可能开启机会。', tags: ['创业', '补充', '候补'] },
  { id: 'A21', title: '计算机学院AI产品设计分享会', source: '计算机学院', sourceType: 'college', audience: '全校学生', location: '明德楼B203', timeText: '9月20日19:00', deadline: '2026-09-20 18:30', startAt: '2026-09-20 19:00', fit: 82, trust: 85, risk: '低', state: '报名中', need: '签到报名或提前预约', detail: '分享 AI 产品设计思路和实际案例，适合想了解 AI 产品开发流程的学生。', tags: ['AI', '产品设计', '学院活动'] },
  { id: 'A22', title: '学生发起｜周末羽毛球约球', source: '学生个人发布', sourceType: 'student', audience: '6—8人', location: '待确认', timeText: '9月20日16:00，AA制', deadline: '2026-09-20 15:00', startAt: '2026-09-20 16:00', fit: 58, trust: 55, risk: '高', state: '风险信息', need: '联系发布者确认具体场地', detail: '活动由学生组织，适合忙里偷闲娱乐，但信息完整度低，需提前核实前提。', tags: ['体育', '约球', '社交'] },
  { id: 'A23', title: '学生发起｜AI工具交流搭子招募', source: '学生个人发布', sourceType: 'student', audience: '零基础可参加', location: '地理待定', timeText: '拟于9月23日晚上', deadline: '2026-09-22 18:00', startAt: '2026-09-23 19:00', fit: 71, trust: 58, risk: '高', state: '风险信息', need: '获取群号或联系方式后确认具体时间和地点', detail: '围绕 AI 学习用品、工具使用、效率提升进行交流，适合喜欢探索新工具的学生。', tags: ['AI', '学习小组', '搭子'] },
  { id: 'A24', title: '学生发起｜“校园兼职福利分享”', source: '学生个人发布', sourceType: 'student', audience: '全校学生', location: '未提供', timeText: '称“零门槛”“高薪”', deadline: '未注明', startAt: '2026-09-19 00:00', fit: 49, trust: 40, risk: '高', state: '风险信息', need: '先核实发布来源与具体岗位信息', detail: '内容存在过度承诺风险，需谨慎核实岗位真实性和安全性。', tags: ['兼职', '福利', '信息待核实'] },
  { id: 'A25', title: '学生发起｜数码新品体验交流', source: '学生个人发布', sourceType: 'student', audience: '技术交流', location: '未注明', timeText: '活动时间、地点均待确认', deadline: '未注明', startAt: '2026-09-19 00:00', fit: 52, trust: 46, risk: '高', state: '风险信息', need: '通过发布者确认活动真实性后再参与', detail: '适合数码党交流，但信息完整度偏低，需提前核实。', tags: ['数码', '体验', '交流'] },
  { id: 'A26', title: '外国语学院校园语言角', source: '外国语学院', sourceType: 'college', audience: '全校学生', location: '校内', timeText: '9月21日15:00，自由交流', deadline: '2026-09-21 14:30', startAt: '2026-09-21 15:00', fit: 76, trust: 81, risk: '低', state: '报名中', need: '现场加入交流小组', detail: '提供英语、日语等语言交流平台，适合想练口语和扩大朋友圈的学生。', tags: ['语言', '交流', '社交'] },
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
  searchInput: document.getElementById('searchInput'),
  sourceFilterGroup: document.getElementById('sourceFilterGroup'),
  statusFilterGroup: document.getElementById('statusFilterGroup'),
  sortSelect: document.getElementById('sortSelect'),
  detailModal: document.getElementById('detailModal'),
  detailContent: document.getElementById('detailContent'),
  publishBtn: document.getElementById('publishBtn'),
  publishModal: document.getElementById('publishModal'),
  publishForm: document.getElementById('publishForm'),
  todaySummary: document.getElementById('todaySummary'),
  freshmanOnly: document.getElementById('freshmanOnly'),
  lowRiskOnly: document.getElementById('lowRiskOnly'),
  favoritesList: document.getElementById('favoritesList'),
  clearFavoritesBtn: document.getElementById('clearFavoritesBtn'),
  filterSummary: document.getElementById('filterSummary'),
  toast: document.getElementById('toast'),
  resetFiltersBtn: document.getElementById('resetFiltersBtn'),
};

let toastTimer = null;

const localEvents = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
}

function setFavorites(items) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
}

function showToast(message, type = 'success') {
  if (!els.toast) return;
  els.toast.textContent = message;
  els.toast.className = `toast visible ${type}`;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    els.toast.className = 'toast';
  }, 1800);
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const next = favorites.includes(id) ? favorites.filter((value) => value !== id) : [...favorites, id];
  setFavorites(next);
  renderFavorites();
  renderActivities();
  const isAdded = !favorites.includes(id);
  showToast(isAdded ? '已加入收藏' : '已移出收藏', isAdded ? 'success' : 'info');
}

function clearFavorites() {
  setFavorites([]);
  renderFavorites();
  renderActivities();
  showToast('收藏已清空', 'info');
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
  }));
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

function parseDate(value) {
  if (!value || value === '长期招募' || value === '长期开放' || value === '未注明') return null;
  const normalized = value
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

  const alt = normalized.match(/(\d{1,2})-(\d{1,2})\s*(\d{1,2}:\d{2})?/);
  if (alt) {
    const [, m, d, t = '00:00'] = alt;
    return new Date(`2026-${m}-${d}T${t}:00`);
  }

  return null;
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
  const acts = mergeEvents().map((item) => ({ ...item, priority: getPriorityScore(item), stateType: byState(item) }));

  const filtered = acts.filter((item) => {
    const textMatch = !state.search || `${item.title} ${item.tags.join(' ')} ${item.detail}`.toLowerCase().includes(state.search.toLowerCase());
    const sourceMatch = state.source === 'all' || item.sourceType === state.source || (state.source === 'official' && item.sourceType === 'college');
    const statusMatch = state.status === 'all' || item.stateType === state.status;
    const freshmanMatch = !state.freshmanOnly || (item.fit >= 80 || item.audience.includes('新生') || item.tags.includes('零基础'));
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
        ${(item.tags || []).slice(0, 3).map((tag) => `<span class="badge student">${tag}</span>`).join('')}
      </div>

      <div class="card-footer">
        <span class="badge ${item.fit >= 80 ? 'safe' : 'student'}">适配度 ${item.fit}</span>
        <div class="card-actions">
          <button class="favorite-btn ${favoriteActive}" type="button" data-favorite-toggle="${item.id}">${getFavorites().includes(item.id) ? '已收藏' : '收藏'}</button>
          <button class="link-btn" type="button" data-open-detail="${item.id}">查看详情</button>
          <button class="small-btn" type="button" data-copy-info="${item.id}">复制</button>
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
          <p>${item.tags[0] || '校园机会'} · ${item.source}</p>
          <p>${item.timeText}</p>
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

function renderFilterSummary() {
  if (!els.filterSummary) return;
  const filtered = getFilteredActivities();
  const sourceText = state.source === 'all' ? '全部来源' : state.source === 'official' ? '官方/学院' : state.source === 'college' ? '学院' : state.source === 'student' ? '学生发布' : '全部';
  const statusText = state.status === 'all' ? '全部状态' : state.status === 'active' ? '报名中' : state.status === 'urgent' ? '即将截止' : state.status === 'review' ? '待确认' : '全部状态';
  const extra = [];
  if (state.freshmanOnly) extra.push('适合新生');
  if (state.lowRiskOnly) extra.push('低风险');
  if (state.search) extra.push(`关键词：${state.search}`);

  const suffix = extra.length ? ` · ${extra.join(' · ')}` : '';
  els.filterSummary.textContent = `筛选结果：${filtered.length} 项 · ${sourceText} · ${statusText}${suffix}`;
}

function renderActivities() {
  const filtered = getFilteredActivities();
  renderRecommend();
  renderSummary();
  renderFavorites();
  renderFilterSummary();

  if (!filtered.length) {
    els.activityList.innerHTML = '<div class="empty-state">暂无符合筛选条件的内容，试试调整关键词或筛选条件。</div>';
    return;
  }

  els.activityList.innerHTML = filtered.map(buildActivityCard).join('');
}

function renderDetail(item) {
  const favoriteActive = getFavorites().includes(item.id) ? 'active' : '';
  const detailText = item.detail || '暂无详细说明，建议直接联系主办方确认报名信息与要求。';
  const needText = item.need || item.contact || '请联系主办方确认具体报名方式';
  const riskBox = item.risk === '高'
    ? '<div class="warning-box"><strong>提醒：</strong> 此信息较为不完整或风险较高，建议先确认主办方、时间和场地，再决定是否报名。</div>'
    : item.risk === '中'
      ? '<div class="warning-box"><strong>提醒：</strong> 该信息存在部分不确定信息，建议优先核对时间、地点或审核规则后再行动。</div>'
      : '<div class="warning-box"><strong>推荐：</strong> 该信息较完整，适合优先考虑参与。</div>';

  const summaryLines = [
    `• 活动来源：${item.source || '校内信息'}`,
    `• 适用对象：${item.audience || '全校学生'}`,
    `• 报名方式：${needText}`,
    `• 关注要点：${item.risk === '高' ? '信息较少，建议核实后再报名' : item.risk === '中' ? '建议核对时间和场地后再报名' : '整体信息较完整，适合优先关注'}`
  ];

  const tags = Array.isArray(item.tags) && item.tags.length ? item.tags : ['校园机会', '新生友好'];

  els.detailContent.innerHTML = `
    <div class="detail-body">
      <div class="detail-header">
        <div class="detail-header-top">
          <div class="badge-row">${createBadge(item)}</div>
          <button class="favorite-btn ${favoriteActive}" type="button" data-favorite-toggle="${item.id}">${getFavorites().includes(item.id) ? '已收藏' : '收藏此活动'}</button>
        </div>
        <h3>${item.title}</h3>
        <div class="detail-summary-box">
          <p class="detail-summary">${detailText}</p>
        </div>
      </div>

      ${riskBox}

      <div class="detail-grid">
        <div class="detail-block">
          <h4>时间</h4>
          <p>${item.timeText || '待定'}</p>
        </div>
        <div class="detail-block">
          <h4>地点</h4>
          <p>${item.location || '待定'}</p>
        </div>
        <div class="detail-block">
          <h4>适用对象</h4>
          <p>${item.audience || '全校学生'}</p>
        </div>
        <div class="detail-block">
          <h4>报名方式</h4>
          <p>${needText}</p>
        </div>
      </div>

      <div class="detail-note">
        <h4>活动亮点</h4>
        <ul class="detail-list">
          ${summaryLines.map((line) => `<li>${line}</li>`).join('')}
        </ul>
      </div>

      <div class="detail-note">
        <h4>标签</h4>
        <div class="badge-row detail-tag-row">
          ${tags.map((tag) => `<span class="badge student">${tag}</span>`).join('')}
        </div>
      </div>

      <div class="detail-footer">
        <div class="detail-score-grid">
          <div class="detail-score-block">
            <span>适配度</span>
            <strong>${item.fit || 75}</strong>
          </div>
          <div class="detail-score-block">
            <span>可信度</span>
            <strong>${item.trust || 80}</strong>
          </div>
          <div class="detail-score-block">
            <span>风险</span>
            <strong>${item.risk || '中'}</strong>
          </div>
        </div>
        <div class="detail-actions">
          <button class="secondary-btn" type="button" data-share-info="${item.id}">分享</button>
          <button class="secondary-btn" type="button" data-copy-info="${item.id}">复制信息</button>
        </div>
      </div>
    </div>
  `;
  els.detailModal.classList.remove('hidden');
  els.detailModal.setAttribute('aria-hidden', 'false');
}

function closeModal(modalElement) {
  if (!modalElement) return;
  modalElement.classList.add('hidden');
  modalElement.setAttribute('aria-hidden', 'true');
}

async function copyActivityInfo(id) {
  const item = mergeEvents().find((entry) => entry.id === id);
  if (!item) return;

  const text = [
    `活动：${item.title}`,
    `来源：${item.source}`,
    `时间：${item.timeText}`,
    `地点：${item.location}`,
    `适用对象：${item.audience}`,
    `报名方式：${item.need || '请联系主办方'}`,
    `详情：${item.detail || '暂无详细说明'}`,
  ].join('\n');

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    showToast('信息已复制', 'success');
  } catch (error) {
    showToast('复制失败，请手动复制', 'error');
  }
}

async function shareActivity(id) {
  const item = mergeEvents().find((entry) => entry.id === id);
  if (!item) return;

  const shareText = `${item.title}｜${item.timeText}｜${item.location}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: item.title,
        text: shareText,
        url: window.location.href,
      });
      showToast('分享成功', 'success');
      return;
    } catch (error) {
      // user cancelled share
    }
  }

  await copyActivityInfo(id);
}

function resetFilters() {
  state.source = 'all';
  state.status = 'all';
  state.search = '';
  state.freshmanOnly = false;
  state.lowRiskOnly = false;
  state.sortBy = 'priority';

  els.searchInput.value = '';
  els.sortSelect.value = 'priority';
  els.freshmanOnly.checked = false;
  els.lowRiskOnly.checked = false;
  document.querySelectorAll('[data-source]').forEach((btn) => btn.classList.toggle('active', btn.dataset.source === 'all'));
  document.querySelectorAll('[data-status]').forEach((btn) => btn.classList.toggle('active', btn.dataset.status === 'all'));
  renderActivities();
  showToast('筛选已重置', 'info');
}

function bindEvents() {
  els.searchInput.addEventListener('input', (e) => {
    state.search = e.target.value.trim();
    renderActivities();
  });

  document.querySelectorAll('[data-source]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-source]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.source = btn.dataset.source;
      renderActivities();
    });
  });

  document.querySelectorAll('[data-status]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-status]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.status = btn.dataset.status;
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

  els.clearFavoritesBtn.addEventListener('click', clearFavorites);
  if (els.resetFiltersBtn) els.resetFiltersBtn.addEventListener('click', resetFilters);

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

    const copyButton = e.target.closest('[data-copy-info]');
    if (copyButton) {
      copyActivityInfo(copyButton.dataset.copyInfo);
    }

    const shareButton = e.target.closest('[data-share-info]');
    if (shareButton) {
      shareActivity(shareButton.dataset.shareInfo);
    }

    if (e.target.matches('[data-close="true"]')) {
      closeModal(els.detailModal);
      closeModal(els.publishModal);
    }
  });

  document.getElementById('closeModalBtn').addEventListener('click', () => closeModal(els.detailModal));
  document.getElementById('closePublishBtn').addEventListener('click', () => closeModal(els.publishModal));
  document.getElementById('cancelPublishBtn').addEventListener('click', () => closeModal(els.publishModal));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(els.detailModal);
      closeModal(els.publishModal);
    }
  });

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
      showToast('请完善标题、时间和说明', 'error');
      return;
    }

    const tags = tagsText ? tagsText.split(/[，,\s]+/).filter(Boolean) : ['学生发布'];
    const normalizedSource = source === '学院发布' ? 'college' : source === '社团发布' ? 'official' : 'student';

    const newEvent = {
      id: `U${Date.now()}`,
      title,
      source,
      sourceType: normalizedSource,
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
    showToast('信息已发布', 'success');
  });
}

function init() {
  bindEvents();
  renderActivities();
}

init();
