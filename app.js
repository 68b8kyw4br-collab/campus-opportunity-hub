const STORAGE_KEY = 'campus-opportunity-hub-events';

const baseActivities = [
  { id: 'A01', title: '蓝桥杯程序设计校内训练营', source: '校内公告', sourceType: 'official', audience: '全校学生', location: '线上/校内', timeText: '报名截止：9月24日22:00；每周六19:00训练', deadline: '2026-09-24 22:00', startAt: '2026-09-20 19:00', tags: ['编程','零基础','训练营'], fit: 92, trust: 94, risk: '低', state: '报名中', need: '报名', detail: '原计划于9月20日起每周六19:00训练，适合零基础学生参加。材料说明给出明确时间和对象，属于高价值官方活动。' },
  { id: 'A02', title: 'AI应用入门公开课', source: '计算机学院', sourceType: 'college', audience: '全校学生', location: '计算机学院教学楼', timeText: '9月19日19:00，预计90分钟', deadline: '2026-09-19 19:00', startAt: '2026-09-19 19:00', tags: ['AI','公开课','无需报名'], fit: 91, trust: 92, risk: '低', state: '进行中', need: '无需报名', detail: '课程面向全校学生，无需报名，属于即时参加的学习机会。活动时间明确，且信息来源是学院官方发布。' },
  { id: 'A03', title: '大学生创新创业项目团队招募', source: '校内项目组', sourceType: 'official', audience: '面向全校学生', location: '线上/项目组', timeText: '9月22日18:00截止，需提交自我介绍', deadline: '2026-09-22 18:00', startAt: '2026-09-19 00:00', tags: ['创业','招募','开发'], fit: 82, trust: 88, risk: '中', state: '报名中', need: '提交简历/自我介绍', detail: '招募开发、设计、材料成员，需稳定投入4小时/周。信息较完整，但仍需注意项目真实性和个人匹配度。' },
  { id: 'A04', title: '数学建模竞赛经验分享会', source: '校内直播', sourceType: 'official', audience: '不限专业', location: '线上直播', timeText: '直播已结束，预计9月20日上传回放', deadline: '2026-09-20 00:00', startAt: '2026-09-18 19:30', tags: ['数学建模','直播','回放'], fit: 72, trust: 84, risk: '低', state: '已结束', need: '查看回放', detail: '活动已结束，官方说明预计上传回放，因此适合在平台上补充回放链接，适合后续查看。' },
  { id: 'A05', title: '校园公益志愿服务活动', source: '校内公益', sourceType: 'official', audience: '全校学生', location: '校内/社区', timeText: '9月27日8:30—17:00，9月20日12:00报名截止', deadline: '2026-09-20 12:00', startAt: '2026-09-27 08:30', tags: ['志愿服务','公益','服务时长'], fit: 89, trust: 90, risk: '低', state: '报名中', need: '提前签到', detail: '预计服务8小时，需要提前到场签到。适合有长期参与意愿的学生，信息较完整。' },
  { id: 'A06', title: 'Web开发零基础学习小组', source: '校内学习小组', sourceType: 'official', audience: '零基础学生', location: '校内', timeText: '9月23日起每周三19:30，共6周，限30人', deadline: '2026-09-23 19:30', startAt: '2026-09-23 19:30', tags: ['Web开发','零基础','学习小组'], fit: 94, trust: 86, risk: '中', state: '报名中', need: '按需预约/满员即止', detail: '面向零基础学生、人数限制为30人。虽有清晰说明，但报名时间未明确，需及时关注。' },
  { id: 'A07', title: 'AI创新应用挑战赛', source: '校内赛事', sourceType: 'official', audience: '2—4人组队', location: '校内申报', timeText: '9月21日18:00前完成校内意向登记；10月20日提交作品', deadline: '2026-09-21 18:00', startAt: '2026-09-19 00:00', tags: ['AI','比赛','组队'], fit: 88, trust: 91, risk: '中', state: '报名中', need: '登记意向并组队', detail: '项目说明强调意向登记不等同于最终作品提交，适合提前组队但需注意阶段性目标。' },
  { id: 'A08', title: '校园软件项目组招募', source: '校内项目组', sourceType: 'official', audience: '大一、大二学生', location: '线上/校内', timeText: '长期招募，满员即止，预计每周5小时', deadline: '长期招募', startAt: '2026-09-19 00:00', tags: ['软件开发','Git','长期'], fit: 86, trust: 87, risk: '低', state: '持续招募', need: '了解Git基础', detail: '适合有项目参与意愿的大一大二学生，长期招募且需了解Git基础。建议优先判断项目真实需求与成员配置。' },
  { id: 'A09', title: '程序设计训练营补充通知', source: '校内公告', sourceType: 'official', audience: '已报名同学', location: '实验楼A402', timeText: '首次训练改为9月21日19:30；报名截止时间不变', deadline: '2026-09-24 22:00', startAt: '2026-09-21 19:30', tags: ['编程','更新通知','场地调整'], fit: 84, trust: 96, risk: '低', state: '已更新', need: '留意更新信息', detail: '该信息属于重要更新通知，已报名同学无需重复提交。对新生而言，需留意原始通知与更新版本是否有差异。' },
  { id: 'A10', title: '前端开发经验交流会', source: '校内活动', sourceType: 'official', audience: '全校学生', location: 'A201/线上直播', timeText: '9月19日15:00—16:30', deadline: '2026-09-19 16:30', startAt: '2026-09-19 15:00', tags: ['前端','经验交流','直播'], fit: 87, trust: 91, risk: '低', state: '进行中', need: '无需报名', detail: '线下与线上同步进行，适合对前端方向感兴趣的学生。活动经过明确说明，无需报名。' },
  { id: 'A11', title: '大学生科研入门分享会', source: '校内活动', sourceType: 'official', audience: '全校学生', location: '校内', timeText: '9月21日19:00—20:30', deadline: '2026-09-21 20:30', startAt: '2026-09-21 19:00', tags: ['科研','导师','文献检索'], fit: 80, trust: 90, risk: '低', state: '报名中', need: '关注时间', detail: '活动介绍论文检索、科研项目和导师联系方法，适合对科研感兴趣但尚无经验的学生。' },
  { id: 'A12', title: '全国高校计算机能力挑战赛', source: '全国赛事', sourceType: 'official', audience: '本科生', location: '线上/校内', timeText: '10月5日23:59报名截止，个人参赛', deadline: '2026-10-05 23:59', startAt: '2026-09-19 00:00', tags: ['比赛','能力挑战','计算机'], fit: 71, trust: 89, risk: '中', state: '报名中', need: '关注费用及规则', detail: '个人参赛，报名有明确截止日期，但费用信息未提供，需进一步确认是否需要自费。' },
  { id: 'A13', title: '科研助理招募', source: '科研组', sourceType: 'college', audience: '大二及以上学生', location: '校内实验室', timeText: '9月21日截止报名，每周预计6小时', deadline: '2026-09-21 00:00', startAt: '2026-09-19 00:00', tags: ['科研','助理','数据整理'], fit: 70, trust: 82, risk: '中', state: '报名中', need: '校对能力与年级条件', detail: '仅限大二及以上学生，适合有科研意愿但未明确项目背景及指导老师的学生。需要注意年级门槛。' },
  { id: 'A14', title: 'Git与GitHub零基础工作坊', source: '学院活动', sourceType: 'college', audience: '大一新生', location: '校内', timeText: '9月21日19:00—20:30，限40人，需提前预约', deadline: '2026-09-21 19:00', startAt: '2026-09-21 19:00', tags: ['Git','GitHub','新生'], fit: 96, trust: 88, risk: '中', state: '报名中', need: '预约并等待审核', detail: '针对大一新生，需提前预约，且“报名表不代表最终录取”说明有明确审核机制，适合有主动学习动机的学生。' },
  { id: 'A15', title: 'AI应用创意挑战', source: '校内赛事', sourceType: 'official', audience: '个人或团队', location: '线上/校内', timeText: '9月23日23:59前提交创意方案；9月30日前提交最终作品', deadline: '2026-09-23 23:59', startAt: '2026-09-19 00:00', tags: ['AI','创意','展示'], fit: 85, trust: 90, risk: '低', state: '报名中', need: '提交方案/可再组队', detail: '允许个人或团队参加，进入展示环节后仍可再组队，适合想尝试AI项目但还未明确方向的学生。' },
  { id: 'A16', title: '校园摄影志愿者招募', source: '学生/社团', sourceType: 'student', audience: '全校学生', location: '校内', timeText: '长期招募，活动摄影', deadline: '长期招募', startAt: '2026-09-19 00:00', tags: ['摄影','志愿','长期'], fit: 63, trust: 72, risk: '中', state: '持续招募', need: '提供摄影设备/可能岗位不固定', detail: '长期招募，信息不完整，适合有设备和兴趣的学生申请，但缺少明确报名截止时间。' },
  { id: 'A17', title: 'Python程序设计学习资料合集', source: '校内资料发布', sourceType: 'official', audience: '全校学生', location: '网盘共享', timeText: '资料长期开放，当前网盘提取信息有效至9月22日', deadline: '2026-09-22 00:00', startAt: '2026-09-19 00:00', tags: ['Python','资料','课程案例'], fit: 80, trust: 79, risk: '中', state: '更新中', need: '尽快提取资料', detail: '存在明确有效期说明，适合新生快速获取资源，但需要警惕后续更新和资料版本差异。' },
  { id: 'A18', title: '网络安全兴趣交流小组', source: '校内社团', sourceType: 'college', audience: '感兴趣学生', location: '校内', timeText: '首次交流9月19日19:30；之后每两周开展一次', deadline: '2026-09-19 19:30', startAt: '2026-09-19 19:30', tags: ['网络安全','CTF','Web安全'], fit: 77, trust: 80, risk: '低', state: '进行中', need: '关注第一次交流', detail: '面向CTF、Web安全等方向，首次时间明确，适合对安全方向有兴趣的学生。' },
  { id: 'A19', title: '学生创新项目路演观摩', source: '学生组织', sourceType: 'student', audience: '全校学生', location: '校内', timeText: '9月20日14:30，原报名截止9月18日22:00，现场候补可能', deadline: '2026-09-20 14:30', startAt: '2026-09-20 14:30', tags: ['路演','观摩','候补'], fit: 68, trust: 74, risk: '中', state: '候补可入场', need: '现场确认余位', detail: '活动方说明如现场仍有余位，可接受候补入场，属于“即使错过报名仍可观察”的信息，但需注意现场不稳定。' },
  { id: 'A20', title: '创新创业项目团队补充说明', source: '校内招募', sourceType: 'official', audience: '已投递者', location: '线上', timeText: '开发方向名额已满，补充设计与材料成员，9月22日18:00截止', deadline: '2026-09-22 18:00', startAt: '2026-09-19 00:00', tags: ['创业','设计','材料'], fit: 75, trust: 89, risk: '中', state: '报名中', need: '不重复提交', detail: '说明开发方向已满，但仍欢迎设计与材料成员，适合此前已投递但未匹配成功的学生继续关注。' },
  { id: 'A21', title: '计算机学院AI产品设计分享会', source: '计算机学院', sourceType: 'college', audience: '全校学生', location: '明德楼B203', timeText: '9月20日19:00，座位有限，无需报名', deadline: '2026-09-20 19:00', startAt: '2026-09-20 19:00', tags: ['AI','设计','学院活动'], fit: 84, trust: 90, risk: '低', state: '报名中', need: '早点到场', detail: '活动为学院发布，面向全校学生，座位有限。适合关注AI产品/设计方向的学生。' },
  { id: 'A22', title: '学生发起｜周末羽毛球约球', source: '学生个人发布', sourceType: 'student', audience: '6—8人', location: '待确认', timeText: '9月20日16:00，AA制', deadline: '2026-09-20 16:00', startAt: '2026-09-20 16:00', tags: ['体育','约球','AA制'], fit: 60, trust: 58, risk: '高', state: '待确认', need: '确认场地与时间', detail: '学生个人发布内容较轻，不含明确主办方与场地说明，属于高风险或待确认的信息，适合“晚一点再决定是否参加”。' },
  { id: 'A23', title: '学生发起｜AI工具交流搭子招募', source: '学生个人发布', sourceType: 'student', audience: '零基础可参加', location: '地理待定', timeText: '拟于9月21日晚开展，报名后拉群', deadline: '2026-09-21 21:00', startAt: '2026-09-21 21:00', tags: ['AI','搭子','零基础'], fit: 76, trust: 64, risk: '中', state: '待确认', need: '报名后再确认群信息', detail: '学生发起的信息较轻，具体地点未确定，且存在“报名后拉群”的模式。适合尝试但需要注意信息真实性和组织方式。' },
  { id: 'A24', title: '学生发起｜“校园兼职福利分享”', source: '学生个人发布', sourceType: 'student', audience: '全校学生', location: '未提供', timeText: '称“零门槛、日结”，要求加微信获取详情', deadline: '未注明', startAt: '2026-09-19 00:00', tags: ['兼职','微信','高风险'], fit: 25, trust: 20, risk: '高', state: '风险信息', need: '不建议直接参与', detail: '未提供主办方、地点和完整内容，需添加私人微信获取详情，明显存在不透明风险。该类内容应被标记为“需谨慎”。' },
  { id: 'A25', title: '学生发起｜数码新品体验交流', source: '学生个人发布', sourceType: 'student', audience: '技术交流', location: '未注明', timeText: '活动时间、地点未注明，正文主要介绍商家优惠链接', deadline: '未注明', startAt: '2026-09-19 00:00', tags: ['数码','促销','推广'], fit: 18, trust: 22, risk: '高', state: '风险信息', need: '谨慎评估', detail: '活动标题为技术交流，但正文主要宣传商家优惠与购买链接，属于明显偏商业推广的内容。' },
  { id: 'A26', title: '外国语学院校园语言角', source: '外国语学院', sourceType: 'college', audience: '全校学生', location: '校内', timeText: '9月21日15:00，自由交流，场地容量有限', deadline: '2026-09-21 15:00', startAt: '2026-09-21 15:00', tags: ['语言角','交流','跨专业'], fit: 78, trust: 86, risk: '低', state: '报名中', need: '到场了解', detail: '学院发布，有明确时间与对象，且无需提前报名。适合想练习外语或认识新朋友的学生。' }
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
};

const localEvents = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

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
  if (!value || value === '长期招募' || value === '未注明') return null;
  const normalized = value
    .replace(/年|月|日/g, '-')
    .replace(/时/g, ':')
    .replace(/分/g, '')
    .replace(/:/g, ':')
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
  const deadlineText = item.deadline && item.deadline !== '长期招募' ? `截止：${item.deadline}` : '长期开放';

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
        ${item.tags.slice(0, 3).map((tag) => `<span class="badge student">${tag}</span>`).join('')}
      </div>

      <div class="card-footer">
        <span class="badge ${item.fit >= 80 ? 'safe' : 'student'}">适配度 ${item.fit}</span>
        <button class="link-btn" type="button" data-open-detail="${item.id}">查看详情</button>
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
          <p>${item.tags[0]} · ${item.source}</p>
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

function renderActivities() {
  const filtered = getFilteredActivities();
  renderRecommend();
  renderSummary();

  if (!filtered.length) {
    els.activityList.innerHTML = '<div class="empty-state">暂无符合筛选条件的内容，试试调整关键词或筛选条件。</div>';
    return;
  }

  els.activityList.innerHTML = filtered.map(buildActivityCard).join('');
}

function renderDetail(item) {
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
    </div>
  `;
  els.detailModal.classList.remove('hidden');
  els.detailModal.setAttribute('aria-hidden', 'false');
}

function closeModal(modalElement) {
  modalElement.classList.add('hidden');
  modalElement.setAttribute('aria-hidden', 'true');
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

  document.addEventListener('click', (e) => {
    const detailButton = e.target.closest('[data-open-detail]');
    if (detailButton) {
      const item = mergeEvents().find((entry) => entry.id === detailButton.dataset.openDetail);
      if (item) renderDetail(item);
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

    const tags = tagsText ? tagsText.split(/[，,\s]+/).filter(Boolean) : ['学生发布'];

    const newEvent = {
      id: `U${Date.now()}`,
      title,
      source: source,
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
