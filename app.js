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
    startAt: '2026-09-20 15:00',
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
    createdAt: new Date('2026-09-10T09:00:00').toISOString()
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
    startAt: '2026-09-19 19:00',
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
    createdAt: new Date('2026-09-12T10:30:00').toISOString()
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
    startAt: '2026-09-18 10:00',
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
    createdAt: new Date('2026-09-08T08:00:00').toISOString()
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
    startAt: '2026-09-17 20:00',
    fit: 64,
    trust: 32,
    risk: '高风险',
    state: '待确认',
    stateKey: 'review',
    need: '需额外缴纳培训费用，且宣传语句有夸大成分',
    details: '发布信息称“轻松高薪”并承诺就业保障，但缺少学校背景和明确组织方信息，需谨慎核实是否为正规培训机构。',
    tags: ['编程', '培训', '注意'],
    freshmanOnly: false,
    lowRisk: false,
    createdAt: new Date('2026-09-14T13:20:00').toISOString()
  }
];

const state = {
  search: '',
  source: 'all',
  status: 'all',
  freshmanOnly: false,
  lowRiskOnly: false,
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
  els.todaySummary = document.getElementById('todaySummary');
  els.recommendSection = document.getElementById('recommendSection');
  els.activityList = document.getElementById('activityList');
  els.detailModal = document.getElementById('detailModal');
  els.detailContent = document.getElementById('detailContent');
  els.closeModalBtn = document.getElementById('closeModalBtn');
  els.publishBtn = document.getElementById('publishBtn');
  els.publishModal = document.getElementById('publishModal');
  els.closePublishBtn = document.getElementById('closePublishBtn');
  els.publishForm = document.getElementById('publishForm');
  els.cancelPublishBtn = document.getElementById('cancelPublishBtn');

  els.sourceButtons = Array.from(document.querySelectorAll('[data-source]'));
  els.statusButtons = Array.from(document.querySelectorAll('[data-status]'));
}

function bindEvents() {
  if (els.searchInput) {
    els.searchInput.addEventListener('input', (event) => {
      state.search = event.target.value.trim();
      render();
    });
  }

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

  if (els.freshmanOnly) {
    els.freshmanOnly.addEventListener('change', (event) => {
      state.freshmanOnly = event.target.checked;
      render();
    });
  }

  if (els.lowRiskOnly) {
    els.lowRiskOnly.addEventListener('change', (event) => {
      state.lowRiskOnly = event.target.checked;
      render();
    });
  }

  if (els.sortSelect) {
    els.sortSelect.addEventListener('change', (event) => {
      state.sortBy = event.target.value;
      render();
    });
  }

  if (els.publishBtn) {
    els.publishBtn.addEventListener('click', openPublishModal);
  }

  if (els.closePublishBtn) {
    els.closePublishBtn.addEventListener('click', closePublishModal);
  }

  if (els.cancelPublishBtn) {
    els.cancelPublishBtn.addEventListener('click', closePublishModal);
  }

  if (els.closeModalBtn) {
    els.closeModalBtn.addEventListener('click', closeDetailModal);
  }

  document.addEventListener('click', (event) => {
    const closeTarget = event.target.closest('[data-close="true"]');
    if (closeTarget) {
      if (closeTarget.closest('#detailModal')) {
        closeDetailModal();
      }
      if (closeTarget.closest('#publishModal')) {
        closePublishModal();
      }
    }

    const favoriteBtn = event.target.closest('[data-favorite-id]');
    if (favoriteBtn) {
      toggleFavorite(favoriteBtn.dataset.favoriteId);
      return;
    }

    const detailBtn = event.target.closest('[data-detail-id]');
    if (detailBtn) {
      openDetailModal(detailBtn.dataset.detailId);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDetailModal();
      closePublishModal();
    }
  });

  if (els.publishForm) {
    els.publishForm.addEventListener('submit', (event) => {
      event.preventDefault();
      submitNewActivity();
    });
  }
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
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveFavorites() {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

function ensureSeedData() {
  const events = readEvents();
  if (!events.length) {
    saveEvents(baseActivities);
  }
}

function getAllActivities() {
  return [...readEvents(), ...baseActivities].filter(Boolean);
}

function getFilteredActivities() {
  const activities = getAllActivities();
  const query = state.search.toLowerCase();

  const filtered = activities.filter((activity) => {
    const matchesSearch = !query || [activity.title, activity.source, activity.tags?.join(' ') || '', activity.details || '']
      .join(' ')
      .toLowerCase()
      .includes(query);

    const matchesSource = state.source === 'all' || activity.sourceType === state.source;
    const matchesStatus = state.status === 'all' || activity.stateKey === state.status;
    const matchesFreshman = !state.freshmanOnly || activity.freshmanOnly;
    const matchesLowRisk = !state.lowRiskOnly || activity.lowRisk;

    return matchesSearch && matchesSource && matchesStatus && matchesFreshman && matchesLowRisk;
  });

  return filtered.sort((a, b) => sortActivities(a, b));
}

function sortActivities(a, b) {
  switch (state.sortBy) {
    case 'time':
      return new Date(b.startAt || b.createdAt || 0) - new Date(a.startAt || a.createdAt || 0);
    case 'trust':
      return (b.trust || 0) - (a.trust || 0);
    case 'priority':
    default:
      return ((b.fit || 0) + (b.trust || 0)) - ((a.fit || 0) + (a.trust || 0));
  }
}

function render() {
  const activities = getFilteredActivities();
  renderSummary(activities);
  renderRecommendations(activities);
  renderList(activities);
}

function renderSummary(activities) {
  if (!els.todaySummary) return;

  const safeActivities = activities.length ? activities : getAllActivities();
  const total = safeActivities.length;
  const active = safeActivities.filter((item) => item.stateKey === 'active' || item.stateKey === 'urgent').length;
  const lowRisk = safeActivities.filter((item) => item.lowRisk).length;

  els.todaySummary.innerHTML = `
    <div class="summary-metric">
      <strong>${total}</strong>
      <span>条信息</span>
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

function renderRecommendations(activities) {
  if (!els.recommendSection) return;

  const topItems = [...activities].sort(sortActivities).slice(0, 3);

  if (!topItems.length) {
    els.recommendSection.innerHTML = '<div class="empty-state">暂无符合条件的推荐内容</div>';
    return;
  }

  const html = topItems.map((activity) => `
    <article class="recommend-card">
      <div class="recommend-head">
        <span class="badge ${getSourceClass(activity.sourceType)}">${activity.source}</span>
        <button class="favorite-btn ${state.favorites.includes(activity.id) ? 'saved' : ''}" data-favorite-id="${activity.id}" aria-label="收藏">★</button>
      </div>
      <h3>${activity.title}</h3>
      <p>${activity.details}</p>
      <div class="meta-row">
        <span>${activity.timeText}</span>
        <span>${activity.risk}</span>
      </div>
      <button class="text-btn" data-detail-id="${activity.id}">查看详情</button>
    </article>
  `).join('');

  els.recommendSection.innerHTML = html;
}

function renderList(activities) {
  if (!els.activityList) return;

  if (!activities.length) {
    els.activityList.innerHTML = '<div class="empty-state">没有符合筛选条件的信息</div>';
    return;
  }

  const html = activities.map((activity) => {
    const isFavorite = state.favorites.includes(activity.id);
    return `
      <article class="activity-card">
        <div class="card-header">
          <div>
            <div class="card-source ${getSourceClass(activity.sourceType)}">${activity.source}</div>
            <h3>${activity.title}</h3>
          </div>
          <button class="favorite-btn ${isFavorite ? 'saved' : ''}" data-favorite-id="${activity.id}" aria-label="收藏">★</button>
        </div>
        <div class="card-meta">
          <span>适配度 ${activity.fit}%</span>
          <span>可信度 ${activity.trust}%</span>
          <span>${activity.state}</span>
        </div>
        <p class="card-desc">${activity.details}</p>
        <div class="card-tags">
          ${(activity.tags || []).map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="card-footer">
          <span>${activity.location}</span>
          <span>${activity.timeText}</span>
        </div>
        <button class="secondary-btn detail-btn" data-detail-id="${activity.id}">查看详情</button>
      </article>
    `;
  }).join('');

  els.activityList.innerHTML = html;
}

function getSourceClass(sourceType) {
  switch (sourceType) {
    case 'official': return 'official';
    case 'college': return 'college';
    case 'student': return 'student';
    default: return 'official';
  }
}

function openDetailModal(id) {
  if (!els.detailModal || !els.detailContent) return;

  const activity = getAllActivities().find((item) => item.id === id);
  if (!activity) return;

  const isFavorite = state.favorites.includes(activity.id);

  els.detailContent.innerHTML = `
    <div class="detail-header">
      <div>
        <span class="badge ${getSourceClass(activity.sourceType)}">${activity.source}</span>
        <h3>${activity.title}</h3>
      </div>
      <button class="favorite-btn ${isFavorite ? 'saved' : ''}" data-favorite-id="${activity.id}" aria-label="收藏">★</button>
    </div>
    <div class="detail-grid">
      <div><strong>时间</strong><span>${activity.timeText}</span></div>
      <div><strong>地点</strong><span>${activity.location}</span></div>
      <div><strong>截止</strong><span>${activity.deadline}</span></div>
      <div><strong>适用对象</strong><span>${activity.audience}</span></div>
      <div><strong>可信度</strong><span>${activity.trust}%</span></div>
      <div><strong>适配度</strong><span>${activity.fit}%</span></div>
    </div>
    <p>${activity.details}</p>
    <div class="detail-section">
      <strong>说明</strong>
      <p>${activity.need}</p>
    </div>
    <div class="card-tags">
      ${(activity.tags || []).map((tag) => `<span class="tag">${tag}</span>`).join('')}
    </div>
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
  const current = state.favorites.includes(id);
  if (current) {
    state.favorites = state.favorites.filter((item) => item !== id);
  } else {
    state.favorites.push(id);
  }

  saveFavorites();
  render();
}

function submitNewActivity() {
  if (!els.publishForm) return;

  const formData = new FormData(els.publishForm);
  const newActivity = {
    id: `L${Date.now()}`,
    title: (formData.get('newTitle') || document.getElementById('newTitle')?.value || '').trim() || '新发布活动',
    source: document.getElementById('newSource')?.value || '学生发布',
    sourceType: 'student',
    audience: document.getElementById('newAudience')?.value || '全校学生',
    location: document.getElementById('newLocation')?.value || '待定',
    timeText: document.getElementById('newTime')?.value || '待定',
    deadline: document.getElementById('newDeadline')?.value || '待定',
    startAt: new Date().toISOString(),
    fit: 78,
    trust: 65,
    risk: '待确认',
    state: '待确认',
    stateKey: 'review',
    need: '信息已由用户提交，需人工确认真实性',
    details: (document.getElementById('newDescription')?.value || '').trim() || '新活动信息已发布。',
    tags: parseTags(document.getElementById('newTags')?.value || ''),
    freshmanOnly: true,
    lowRisk: false,
    createdAt: new Date().toISOString()
  };

  const existing = readEvents();
  const updated = [newActivity, ...existing];
  saveEvents(updated);
  closePublishModal();
  render();
}

function parseTags(value) {
  return value
    .split(/[，,\s]+/)
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 8);
}

window.campusOpportunityHub = {
  readEvents,
  saveEvents,
  render,
  getFilteredActivities,
  state,
  toggleFavorite
};
