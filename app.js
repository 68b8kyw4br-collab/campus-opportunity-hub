const STORAGE_KEY = 'campus-opportunity-hub-events';
const FAVORITES_KEY = 'campus-opportunity-hub-favorites';

const baseActivities = [
  {
    id: 'A01',
    title: '2026 新生校园开放日与学院社团招新',
    source: '官方',
    sourceType: 'official',
    audience: '全校新生',
    location: '校本部大礼堂',
    timeText: '9月20日 15:00',
    deadline: '2026-09-24 23:59',
    startAt: '2026-09-20T15:00:00',
    fit: 96,
    trust: 95,
    risk: '低风险',
    state: '报名中',
    stateKey: 'active',
    need: '无需提前准备，直接前往现场登记',
    details: '由校团委联合各学院举办的校园开放日活动，汇集社团招新、学院介绍和校园生活体验环节，适合新生快速了解学校资源与社团文化。',
    tags: ['新生', '校园活动', '社团'],
    freshmanOnly: true,
    lowRisk: true,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    createdAt: '2026-09-10T09:00:00Z'
  },
  {
    id: 'A02',
    title: 'AI 创新创业训练营报名',
    source: '学院',
    sourceType: 'college',
    audience: '计算机相关专业',
    location: '创新中心 2F',
    timeText: '9月19日 19:00',
    deadline: '2026-09-20 18:00',
    startAt: '2026-09-19T19:00:00',
    fit: 88,
    trust: 84,
    risk: '低风险',
    state: '即将截止',
    stateKey: 'urgent',
    need: '优先面向计算机、人工智能、数字媒体相关专业',
    details: '面向感兴趣的同学进行 AI 创新创业交流与项目训练，包含导师指导、案例分享和团队协作。适合对创新实践和编程项目感兴趣的新生。',
    tags: ['AI', '创新', '创业'],
    freshmanOnly: false,
    lowRisk: true,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
    createdAt: '2026-09-12T10:30:00Z'
  },
  {
    id: 'A03',
    title: '新生志愿者服务岗招募',
    source: '官方',
    sourceType: 'official',
    audience: '全校学生',
    location: '学生事务中心',
    timeText: '9月18日 10:00',
    deadline: '2026-09-22 18:00',
    startAt: '2026-09-18T10:00:00',
    fit: 86,
    trust: 88,
    risk: '低风险',
    state: '报名中',
    stateKey: 'active',
    need: '参与活动组织和接待工作，需按时到岗',
    details: '由学校统一组织的志愿者服务岗位，适合希望早接触校园运营和公共服务体验的新生参与。工作内容包括迎新接待和活动协助。',
    tags: ['志愿服务', '接待', '新生'],
    freshmanOnly: true,
    lowRisk: true,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80',
    createdAt: '2026-09-08T08:00:00Z'
  },
  {
    id: 'A04',
    title: '校外培训班“高薪编程速成”招募',
    source: '学生发布',
    sourceType: 'student',
    audience: '不限',
    location: '线上群聊',
    timeText: '9月17日 20:00',
    deadline: '2026-09-21 23:59',
    startAt: '2026-09-17T20:00:00',
    fit: 64,
    trust: 32,
    risk: '高风险',
    state: '待确认',
    stateKey: 'review',
    need: '需额外缴纳培训费用，宣传语有夸大成分',
    details: '缺少学校背景和明确组织方信息，承诺“轻松高薪”，请先核实正规资质。',
    tags: ['编程', '培训', '注意'],
    freshmanOnly: false,
    lowRisk: false,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    createdAt: '2026-09-14T13:20:00Z'
  },
  {
    id: 'A05',
    title: '校园科技节创意竞赛招募',
    source: '官方',
    sourceType: 'official',
    audience: '全校在校生',
    location: '创新实验楼',
    timeText: '9月22日 18:30',
    deadline: '2026-09-26 12:00',
    startAt: '2026-09-22T18:30:00',
    fit: 93,
    trust: 91,
    risk: '低风险',
    state: '报名中',
    stateKey: 'active',
    need: '以团队形式报名，需提交项目简介和创意计划',
    details: '本次活动聚焦AI、创新设计和社会实践项目，适合对科技创新和团队协作有兴趣的同学。',
    tags: ['科技节', '竞赛', '创新'],
    freshmanOnly: false,
    lowRisk: true,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    createdAt: '2026-09-15T09:00:00Z'
  },
  {
    id: 'A06',
    title: '暑期科研助理招募计划',
    source: '学院',
    sourceType: 'college',
    audience: '大一至大三',
    location: '科研楼 301',
    timeText: '9月25日 09:30',
    deadline: '2026-09-27 18:00',
    startAt: '2026-09-25T09:30:00',
    fit: 90,
    trust: 86,
    risk: '低风险',
    state: '报名中',
    stateKey: 'active',
    need: '需提交简历并参与导师面试，适合对科研和数据分析感兴趣的学生',
    details: '面向感兴趣的学生开放科研助理岗位，培养研究方法、实验设计以及论文阅读能力。',
    tags: ['科研', '助理', '项目'],
    freshmanOnly: false,
    lowRisk: true,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
    createdAt: '2026-09-16T13:00:00Z'
  }
];

const state = {
  search: '',
  source: 'all',
  status: 'all',
  freshmanOnly: false,
  lowRiskOnly: false,
  savedOnly: false,
  sortBy: 'priority',
  favorites: readFavorites()
};

const els = {};
document.addEventListener('DOMContentLoaded', init);

function init() {
  cacheElements();
  bindEvents();
  ensureSeedData();
  render();
}

function cacheElements() {
  els.searchInput = document.getElementById('searchInput');
  els.sortSelect = document.getElementById('sortSelect');
  els.freshmanOnly = document.getElementById('freshmanOnly');
  els.lowRiskOnly = document.getElementById('lowRiskOnly');
  els.savedOnly = document.getElementById('savedOnly');
  els.todaySummary = document.getElementById('todaySummary');
  els.recommendSection = document.getElementById('recommendSection');
  els.activityList = document.getElementById('activityList');
  els.timelineList = document.getElementById('timelineList');
  els.detailModal = document.getElementById('detailModal');
  els.detailContent = document.getElementById('detailContent');
  els.closeModalBtn = document.getElementById('closeModalBtn');
  els.publishBtn = document.getElementById('publishBtn');
  els.publishModal = document.getElementById('publishModal');
  els.closePublishBtn = document.getElementById('closePublishBtn');
  els.publishForm = document.getElementById('publishForm');
  els.cancelPublishBtn = document.getElementById('cancelPublishBtn');
  els.favoritesList = document.getElementById('favoritesList');
  els.clearFavoritesBtn = document.getElementById('clearFavoritesBtn');
  els.filterSummary = document.getElementById('filterSummary');
  els.heroTotal = document.getElementById('heroTotal');
  els.heroFresh = document.getElementById('heroFresh');
  els.heroLowRisk = document.getElementById('heroLowRisk');
  els.sourceButtons = Array.from(document.querySelectorAll('[data-source]'));
  els.statusButtons = Array.from(document.querySelectorAll('[data-status]'));
}

function bindEvents() {
  els.searchInput?.addEventListener('input', (event) => {
    state.search = event.target.value.trim();
    render();
  });

  els.sourceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.source = button.dataset.source;
      updateFilterButtons(els.sourceButtons, state.source, 'source');
      render();
    });
  });

  els.statusButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.status = button.dataset.status;
      updateFilterButtons(els.statusButtons, state.status, 'status');
      render();
    });
  });

  els.freshmanOnly?.addEventListener('change', (event) => {
    state.freshmanOnly = event.target.checked;
    render();
  });

  els.lowRiskOnly?.addEventListener('change', (event) => {
    state.lowRiskOnly = event.target.checked;
    render();
  });

  els.savedOnly?.addEventListener('change', (event) => {
    state.savedOnly = event.target.checked;
    render();
  });

  els.sortSelect?.addEventListener('change', (event) => {
    state.sortBy = event.target.value;
    render();
  });

  document.getElementById('resetFiltersBtn')?.addEventListener('click', resetFilters);

  els.publishBtn?.addEventListener('click', openPublishModal);
  els.closePublishBtn?.addEventListener('click', closePublishModal);
  els.cancelPublishBtn?.addEventListener('click', closePublishModal);
  els.closeModalBtn?.addEventListener('click', closeDetailModal);
  els.clearFavoritesBtn?.addEventListener('click', () => {
    state.favorites = [];
    saveFavorites();
    render();
    toast('收藏夹已清空');
  });

  document.addEventListener('click', (event) => {
    const closeTarget = event.target.closest('[data-close="true"]');
    if (closeTarget) {
      closeDetailModal();
      closePublishModal();
      return;
    }

    const favoriteButton = event.target.closest('[data-favorite-id]');
    if (favoriteButton) {
      event.preventDefault();
      event.stopPropagation();
      toggleFavorite(favoriteButton.dataset.favoriteId);
      return;
    }

    const detailButton = event.target.closest('[data-detail-id]');
    if (detailButton) {
      event.preventDefault();
      openDetailModal(detailButton.dataset.detailId);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDetailModal();
      closePublishModal();
    }
  });

  els.publishForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    submitNewActivity();
  });
}

function updateFilterButtons(buttons, activeValue, type) {
  buttons.forEach((button) => {
    const matches = button.dataset[type] === activeValue;
    button.classList.toggle('active', matches);
  });
}

function readFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch (error) {
    return [];
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
  } catch (error) {
    toast('浏览器未允许保存收藏，请检查隐私设置');
  }
}

function readEvents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveEvents(events) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('保存事件失败', error);
  }
}

function ensureSeedData() {
  const events = readEvents();
  if (!events.length) {
    saveEvents(baseActivities);
  }
}

function getAllActivities() {
  const localEvents = readEvents();
  const seen = new Set(localEvents.map((item) => item.id));
  return [...localEvents, ...baseActivities.filter((item) => !seen.has(item.id))].filter(Boolean);
}

function getFilteredActivities() {
  const activities = getAllActivities();
  const query = state.search.toLowerCase();

  const filtered = activities.filter((activity) => {
    const text = [activity.title, activity.source, activity.audience, activity.details, ...(activity.tags || [])].join(' ').toLowerCase();
    const matchesSearch = !query || text.includes(query);
    const matchesSource = state.source === 'all' || activity.sourceType === state.source;
    const matchesStatus = state.status === 'all' || activity.stateKey === state.status;
    const matchesFreshman = !state.freshmanOnly || activity.freshmanOnly;
    const matchesLowRisk = !state.lowRiskOnly || activity.lowRisk;
    const matchesSaved = !state.savedOnly || state.favorites.includes(activity.id);

    return matchesSearch && matchesSource && matchesStatus && matchesFreshman && matchesLowRisk && matchesSaved;
  });

  return filtered.sort((a, b) => sortActivities(a, b));
}

function sortActivities(a, b) {
  switch (state.sortBy) {
    case 'time':
      return new Date(a.startAt || 0) - new Date(b.startAt || 0);
    case 'trust':
      return (b.trust || 0) - (a.trust || 0);
    case 'priority':
    default:
      return ((b.fit || 0) + (b.trust || 0)) - ((a.fit || 0) + (a.trust || 0));
  }
}

function render() {
  const activities = getFilteredActivities();
  renderStats();
  renderSummary(activities);
  renderRecommendations(activities);
  renderList(activities);
  renderTimeline(activities);
  renderFavorites();
  renderFilterSummary(activities);
}

function renderStats() {
  const all = getAllActivities();
  if (els.heroTotal) els.heroTotal.textContent = String(all.length);
  if (els.heroFresh) els.heroFresh.textContent = String(all.filter((item) => item.freshmanOnly).length);
  if (els.heroLowRisk) els.heroLowRisk.textContent = String(all.filter((item) => item.lowRisk).length);
}

function renderSummary(activities) {
  if (!els.todaySummary) return;

  const total = activities.length;
  const active = activities.filter((item) => ['active', 'urgent'].includes(item.stateKey)).length;
  const lowRisk = activities.filter((item) => item.lowRisk).length;

  els.todaySummary.innerHTML = `
    <div class="summary-metric">
      <strong>${total}</strong>
      <span>条符合信息</span>
    </div>
    <div class="summary-metric">
      <strong>${active}</strong>
      <span>个可参与</span>
    </div>
    <div class="summary-metric">
      <strong>${lowRisk}</strong>
      <span>个低风险</span>
    </div>
  `;
}

function renderFilterSummary(activities) {
  if (!els.filterSummary) return;

  const hasFilter = state.search || state.source !== 'all' || state.status !== 'all' || state.freshmanOnly || state.lowRiskOnly || state.savedOnly;
  els.filterSummary.innerHTML = hasFilter
    ? `<span class="filter-summary-badge">当前筛选：${activities.length} 条 · 点击卡片查看详情</span>`
    : '<span class="filter-summary-empty">已展示全部机会</span>';
}

function renderRecommendations(activities) {
  if (!els.recommendSection) return;

  const topItems = [...activities].slice(0, 3);

  if (!topItems.length) {
    els.recommendSection.innerHTML = '<div class="empty-state">暂无符合条件的推荐内容，试试重置筛选。</div>';
    return;
  }

  els.recommendSection.innerHTML = `
    <div class="recommend-heading">
      <p class="eyebrow">为你推荐</p>
      <h2>最值得关注的机会</h2>
    </div>
    <div class="recommend-wrap">
      ${topItems.map((activity) => {
        const saved = state.favorites.includes(activity.id);
        return `
          <article class="recommend-card">
            <img src="${safe(activity.image)}" alt="${safe(activity.title)}" loading="lazy" />
            <div class="card-content">
              <div class="badge-row">
                <span class="badge ${sourceClass(activity.sourceType)}">${safe(activity.source)}</span>
                <span class="badge ${activity.lowRisk ? 'safe' : 'critical'}">${safe(activity.risk)}</span>
                <button type="button" class="favorite-btn ${saved ? 'active' : ''}" data-favorite-id="${safe(activity.id)}" aria-pressed="${saved}" aria-label="${saved ? '取消收藏' : '收藏'}">★</button>
              </div>
              <h3>${safe(activity.title)}</h3>
              <p>${safe(activity.details)}</p>
              <button type="button" class="text-btn" data-detail-id="${safe(activity.id)}">查看详情 →</button>
            </div>
          </article>
        `;
      }).join('')}
    </div>
  `;
}

function renderList(activities) {
  if (!els.activityList) return;

  if (!activities.length) {
    els.activityList.innerHTML = '<div class="empty-state">没有符合筛选条件的信息</div>';
    return;
  }

  els.activityList.innerHTML = activities.map((activity) => {
    const saved = state.favorites.includes(activity.id);
    return `
      <article class="activity-card">
        <img class="activity-image" src="${safe(activity.image)}" alt="${safe(activity.title)}" loading="lazy" />
        <div class="card-body">
          <div class="card-top">
            <div class="badge-row">
              <span class="badge ${sourceClass(activity.sourceType)}">${safe(activity.source)}</span>
              <span class="badge ${activity.lowRisk ? 'safe' : 'critical'}">${safe(activity.risk)}</span>
            </div>
            <button type="button" class="favorite-btn ${saved ? 'active' : ''}" data-favorite-id="${safe(activity.id)}" aria-pressed="${saved}" aria-label="${saved ? '取消收藏' : '收藏'}">★ ${saved ? '已收藏' : '收藏'}</button>
          </div>

          <h3 class="card-title">${safe(activity.title)}</h3>

          <div class="card-meta">
            <span>📅 ${safe(activity.timeText)}</span>
            <span>📍 ${safe(activity.location)}</span>
            <span>适配度 <strong>${activity.fit}%</strong> · 可信度 <strong>${activity.trust}%</strong></span>
          </div>

          <p>${safe(activity.details)}</p>

          <div class="badge-row">
            ${(activity.tags || []).map((tag) => `<span class="tag">#${safe(tag)}</span>`).join('')}
          </div>

          <button type="button" class="secondary-btn detail-btn" data-detail-id="${safe(activity.id)}">查看详情</button>
        </div>
      </article>
    `;
  }).join('');
}

function renderTimeline(activities) {
  if (!els.timelineList) return;

  const upcoming = [...activities]
    .filter((activity) => activity.startAt)
    .sort((a, b) => new Date(a.startAt) - new Date(b.startAt))
    .slice(0, 5);

  if (!upcoming.length) {
    els.timelineList.innerHTML = '<div class="empty-timeline">暂无近期安排</div>';
    return;
  }

  els.timelineList.innerHTML = upcoming.map((activity) => {
    const date = new Date(activity.startAt);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `
      <div class="timeline-item">
        <div class="timeline-date">
          <strong>${day}</strong>
          <span>${month}月</span>
        </div>
        <div class="timeline-copy">
          <h4>${safe(activity.title)}</h4>
          <p>${safe(activity.location)} · ${safe(activity.timeText)}</p>
        </div>
        <span class="timeline-risk ${activity.lowRisk ? 'safe' : 'critical'}">${safe(activity.risk)}</span>
      </div>
    `;
  }).join('');
}

function renderFavorites() {
  if (!els.favoritesList) return;

  const savedActivities = getAllActivities().filter((activity) => state.favorites.includes(activity.id));

  els.favoritesList.innerHTML = savedActivities.length
    ? savedActivities.map((activity) => `
        <div class="favorite-item">
          <span>${safe(activity.title)}</span>
          <button type="button" data-detail-id="${safe(activity.id)}">查看</button>
        </div>
      `).join('')
    : '<p class="empty-favorites">还没有收藏内容，点击机会卡片上的 ★ 收藏。</p>';
}

function sourceClass(sourceType) {
  switch (sourceType) {
    case 'college':
      return 'college';
    case 'student':
      return 'student';
    default:
      return 'official';
  }
}

function safe(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function openDetailModal(id) {
  if (!els.detailModal || !els.detailContent) return;

  const activity = getAllActivities().find((item) => item.id === id);
  if (!activity) return;

  const saved = state.favorites.includes(activity.id);

  els.detailContent.innerHTML = `
    <div class="detail-header">
      <span class="badge ${sourceClass(activity.sourceType)}">${safe(activity.source)}</span>
      <h3>${safe(activity.title)}</h3>
      <button type="button" class="favorite-btn ${saved ? 'active' : ''}" data-favorite-id="${safe(activity.id)}" aria-pressed="${saved}">★ ${saved ? '已收藏' : '收藏'}</button>
    </div>
    <img class="detail-image" src="${safe(activity.image)}" alt="${safe(activity.title)}" />
    <div class="detail-grid">
      <div class="detail-block"><h4>时间</h4><p>${safe(activity.timeText)}</p></div>
      <div class="detail-block"><h4>地点</h4><p>${safe(activity.location)}</p></div>
      <div class="detail-block"><h4>适用对象</h4><p>${safe(activity.audience)}</p></div>
      <div class="detail-block"><h4>截止时间</h4><p>${safe(activity.deadline)}</p></div>
    </div>
    <p>${safe(activity.details)}</p>
    <div class="warning-box">提示：${safe(activity.need)}</div>
  `;

  els.detailModal.classList.remove('hidden');
  els.detailModal.setAttribute('aria-hidden', 'false');
}

function closeDetailModal() {
  if (!els.detailModal) return;
  els.detailModal.classList.add('hidden');
  els.detailModal.setAttribute('aria-hidden', 'true');
}

function openPublishModal() {
  if (!els.publishModal) return;
  els.publishModal.classList.remove('hidden');
  els.publishModal.setAttribute('aria-hidden', 'false');
}

function closePublishModal() {
  if (!els.publishModal) return;
  els.publishModal.classList.add('hidden');
  els.publishModal.setAttribute('aria-hidden', 'true');
  if (els.publishForm) {
    els.publishForm.reset();
  }
}

function toggleFavorite(id) {
  if (!id) return;

  const wasSaved = state.favorites.includes(id);
  state.favorites = wasSaved
    ? state.favorites.filter((item) => item !== id)
    : [...state.favorites, id];

  saveFavorites();
  render();
  toast(wasSaved ? '已取消收藏' : '已加入收藏');
}

function submitNewActivity() {
  if (!els.publishForm) return;

  const fieldValue = (id) => document.getElementById(id)?.value.trim() || '';

  const newActivity = {
    id: `L${Date.now()}`,
    title: fieldValue('newTitle') || '新发布活动',
    source: fieldValue('newSource') || '学生发布',
    sourceType: 'student',
    audience: fieldValue('newAudience') || '全校学生',
    location: fieldValue('newLocation') || '待定',
    timeText: fieldValue('newTime') || '待定',
    deadline: fieldValue('newDeadline') || '待定',
    startAt: new Date().toISOString(),
    fit: 78,
    trust: 65,
    risk: '待确认',
    state: '待确认',
    stateKey: 'review',
    need: '信息已由用户提交，需人工确认真实性',
    details: fieldValue('newDescription') || '新活动信息已发布。',
    tags: fieldValue('newTags').split(/[，,\s]+/).filter(Boolean).slice(0, 8),
    freshmanOnly: true,
    lowRisk: false,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80',
    createdAt: new Date().toISOString()
  };

  saveEvents([newActivity, ...readEvents()]);
  closePublishModal();
  render();
  toast('发布成功，已加入待确认列表');
}

function resetFilters() {
  state.search = '';
  state.source = 'all';
  state.status = 'all';
  state.freshmanOnly = false;
  state.lowRiskOnly = false;
  state.savedOnly = false;

  if (els.searchInput) els.searchInput.value = '';
  if (els.freshmanOnly) els.freshmanOnly.checked = false;
  if (els.lowRiskOnly) els.lowRiskOnly.checked = false;
  if (els.savedOnly) els.savedOnly.checked = false;

  updateFilterButtons(els.sourceButtons, 'all', 'source');
  updateFilterButtons(els.statusButtons, 'all', 'status');
  render();
}

function toast(message) {
  let toastEl = document.getElementById('toast');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'toast';
    toastEl.className = 'toast';
    document.body.appendChild(toastEl);
  }

  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastEl.timer);
  toastEl.timer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

window.campusOpportunityHub = {
  readEvents,
  saveEvents,
  render,
  getFilteredActivities,
  state,
  toggleFavorite
};
