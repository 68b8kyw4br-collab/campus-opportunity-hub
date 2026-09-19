const STORAGE_KEY = 'campus-opportunity-hub-events';
const FAVORITES_KEY = 'campus-opportunity-hub-favorites';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80';

const baseActivities = [
  { id:'A01', title:'2026 新生校园开放日与学院社团招新', source:'官方', sourceType:'official', audience:'全校新生', location:'校本部大礼堂', timeText:'9月20日 15:00', deadline:'2026-09-24 23:59', startAt:'2026-09-20T15:00:00', fit:96, trust:95, risk:'低风险', state:'报名中', stateKey:'active', need:'无需提前准备，直接前往现场登记', details:'由校团委联合各学院举办，包含社团招新、学院介绍和校园生活体验，适合新生快速了解学校资源。', tags:['新生','校园活动','社团'], freshmanOnly:true, lowRisk:true, image:'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80' },
  { id:'A02', title:'AI 创新创业训练营报名', source:'学院', sourceType:'college', audience:'计算机相关专业', location:'创新中心 2F', timeText:'9月19日 19:00', deadline:'2026-09-20 18:00', startAt:'2026-09-19T19:00:00', fit:88, trust:84, risk:'低风险', state:'即将截止', stateKey:'urgent', need:'优先面向计算机、人工智能、数字媒体相关专业', details:'包含导师指导、案例分享和团队协作，适合对创新实践和编程项目感兴趣的同学。', tags:['AI','创新','创业'], freshmanOnly:false, lowRisk:true, image:'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80' },
  { id:'A03', title:'新生志愿者服务岗招募', source:'官方', sourceType:'official', audience:'全校学生', location:'学生事务中心', timeText:'9月18日 10:00', deadline:'2026-09-22 18:00', startAt:'2026-09-18T10:00:00', fit:86, trust:88, risk:'低风险', state:'报名中', stateKey:'active', need:'参与活动组织和接待工作，需按时到岗', details:'由学校统一组织，工作包括迎新接待和活动协助，适合希望早接触校园运营的同学。', tags:['志愿服务','接待','新生'], freshmanOnly:true, lowRisk:true, image:'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80' },
  { id:'A04', title:'校外培训班“高薪编程速成”招募', source:'学生发布', sourceType:'student', audience:'不限', location:'线上群聊', timeText:'9月17日 20:00', deadline:'2026-09-21 23:59', startAt:'2026-09-17T20:00:00', fit:64, trust:32, risk:'高风险', state:'待确认', stateKey:'review', need:'需额外缴纳培训费用，宣传语有夸大成分', details:'缺少学校背景和明确组织方信息，承诺“轻松高薪”，请先核实正规资质。', tags:['编程','培训','注意'], freshmanOnly:false, lowRisk:false, image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80' },
  { id:'A05', title:'校园科技节创意竞赛招募', source:'官方', sourceType:'official', audience:'全校在校生', location:'创新实验楼', timeText:'9月22日 18:30', deadline:'2026-09-26 12:00', startAt:'2026-09-22T18:30:00', fit:93, trust:91, risk:'低风险', state:'报名中', stateKey:'active', need:'以团队形式报名，需提交项目简介和创意计划', details:'聚焦 AI、创新设计和社会实践项目，适合对科技创新和团队协作有兴趣的同学。', tags:['科技节','竞赛','创新'], freshmanOnly:false, lowRisk:true, image:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80' },
  { id:'A06', title:'暑期科研助理招募计划', source:'学院', sourceType:'college', audience:'大一至大三', location:'科研楼 301', timeText:'9月25日 09:30', deadline:'2026-09-27 18:00', startAt:'2026-09-25T09:30:00', fit:90, trust:86, risk:'低风险', state:'报名中', stateKey:'active', need:'需提交简历并参与导师面试', details:'开放科研助理岗位，培养研究方法、实验设计以及论文阅读能力。', tags:['科研','助理','项目'], freshmanOnly:false, lowRisk:true, image:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80' }
];

const state = { search:'', source:'all', status:'all', freshmanOnly:false, lowRiskOnly:false, savedOnly:false, sortBy:'priority', favorites:readFavorites() };
const els = {};

document.addEventListener('DOMContentLoaded', init);

function init() {
  cacheElements();
  bindEvents();
  render();
}

function cacheElements() {
  ['searchInput','sortSelect','freshmanOnly','lowRiskOnly','savedOnly','todaySummary','recommendSection','activityList','timelineList','detailModal','detailContent','closeModalBtn','publishBtn','publishModal','closePublishBtn','publishForm','cancelPublishBtn','favoritesList','clearFavoritesBtn','filterSummary','heroTotal','heroFresh','heroLowRisk'].forEach((key) => { els[key] = document.getElementById(key); });
  els.sourceButtons = [...document.querySelectorAll('[data-source]')];
  els.statusButtons = [...document.querySelectorAll('[data-status]')];
}

function bindEvents() {
  els.searchInput?.addEventListener('input', (e) => { state.search = e.target.value.trim(); render(); });
  els.sortSelect?.addEventListener('change', (e) => { state.sortBy = e.target.value; render(); });
  els.freshmanOnly?.addEventListener('change', (e) => { state.freshmanOnly = e.target.checked; render(); });
  els.lowRiskOnly?.addEventListener('change', (e) => { state.lowRiskOnly = e.target.checked; render(); });
  els.savedOnly?.addEventListener('change', (e) => { state.savedOnly = e.target.checked; render(); });
  els.sourceButtons.forEach((button) => button.addEventListener('click', () => { state.source = button.dataset.source; setActive(els.sourceButtons, 'source', state.source); render(); }));
  els.statusButtons.forEach((button) => button.addEventListener('click', () => { state.status = button.dataset.status; setActive(els.statusButtons, 'status', state.status); render(); }));
  document.getElementById('resetFiltersBtn')?.addEventListener('click', resetFilters);
  els.publishBtn?.addEventListener('click', () => setModal(els.publishModal, true));
  els.closePublishBtn?.addEventListener('click', () => setModal(els.publishModal, false));
  els.cancelPublishBtn?.addEventListener('click', () => setModal(els.publishModal, false));
  els.closeModalBtn?.addEventListener('click', () => setModal(els.detailModal, false));
  els.clearFavoritesBtn?.addEventListener('click', clearFavorites);
  els.publishForm?.addEventListener('submit', submitNewActivity);
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { setModal(els.detailModal, false); setModal(els.publishModal, false); } });
}

function handleDocumentClick(event) {
  const close = event.target.closest('[data-close="true"]');
  if (close) { setModal(els.detailModal, false); setModal(els.publishModal, false); return; }
  const favorite = event.target.closest('[data-favorite-id]');
  if (favorite) { event.preventDefault(); event.stopPropagation(); toggleFavorite(favorite.dataset.favoriteId); return; }
  const detail = event.target.closest('[data-detail-id]');
  if (detail) { event.preventDefault(); openDetailModal(detail.dataset.detailId); }
}

function setActive(buttons, key, value) { buttons.forEach((button) => button.classList.toggle('active', button.dataset[key] === value)); }
function setModal(modal, open) { if (!modal) return; modal.classList.toggle('hidden', !open); modal.setAttribute('aria-hidden', String(!open)); }

function readFavorites() { try { const value = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]'); return Array.isArray(value) ? value.filter(Boolean) : []; } catch { return []; } }
function saveFavorites() { try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites)); } catch { toast('无法保存收藏，请检查浏览器隐私设置'); } }
function readEvents() { try { const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } }
function saveEvents(events) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(events)); } catch { toast('无法保存发布内容'); } }

function getAllActivities() {
  const local = readEvents();
  const ids = new Set(local.map((item) => item.id));
  return [...local, ...baseActivities.filter((item) => !ids.has(item.id))].filter(Boolean);
}

function getFilteredActivities() {
  const query = state.search.toLowerCase();
  return getAllActivities().filter((activity) => {
    const content = [activity.title, activity.source, activity.audience, activity.details, ...(activity.tags || [])].join(' ').toLowerCase();
    return (!query || content.includes(query)) && (state.source === 'all' || activity.sourceType === state.source) && (state.status === 'all' || activity.stateKey === state.status) && (!state.freshmanOnly || activity.freshmanOnly) && (!state.lowRiskOnly || activity.lowRisk) && (!state.savedOnly || state.favorites.includes(activity.id));
  }).sort(sortActivities);
}

function sortActivities(a, b) {
  if (state.sortBy === 'trust') return (b.trust || 0) - (a.trust || 0);
  if (state.sortBy === 'time') return new Date(a.startAt || 0) - new Date(b.startAt || 0);
  return ((b.fit || 0) + (b.trust || 0)) - ((a.fit || 0) + (a.trust || 0));
}

function render() {
  const activities = getFilteredActivities();
  renderStats(); renderSummary(activities); renderRecommendations(activities); renderList(activities); renderTimeline(activities); renderFavorites(); renderFilterSummary(activities);
}

function renderStats() { const all = getAllActivities(); setText(els.heroTotal, all.length); setText(els.heroFresh, all.filter((x) => x.freshmanOnly).length); setText(els.heroLowRisk, all.filter((x) => x.lowRisk).length); }
function setText(element, value) { if (element) element.textContent = String(value); }
function renderSummary(list) { if (els.todaySummary) els.todaySummary.innerHTML = `<div class="summary-metric"><strong>${list.length}</strong><span>条符合信息</span></div><div class="summary-metric"><strong>${list.filter((x) => ['active','urgent'].includes(x.stateKey)).length}</strong><span>个可参与</span></div><div class="summary-metric"><strong>${list.filter((x) => x.lowRisk).length}</strong><span>个低风险</span></div>`; }
function renderFilterSummary(list) { if (els.filterSummary) { const active = state.search || state.source !== 'all' || state.status !== 'all' || state.freshmanOnly || state.lowRiskOnly || state.savedOnly; els.filterSummary.innerHTML = active ? `<span class="filter-summary-badge">当前筛选：${list.length} 条 · 点击卡片查看详情</span>` : '<span class="filter-summary-empty">已展示全部机会</span>'; } }

function renderRecommendations(list) {
  if (!els.recommendSection) return;
  const items = list.slice(0, 3);
  els.recommendSection.innerHTML = items.length ? `<div class="recommend-heading"><p class="eyebrow">为你推荐</p><h2>最值得关注的机会</h2></div><div class="recommend-wrap">${items.map(recommendCard).join('')}</div>` : '<div class="empty-state">暂无符合条件的推荐内容，试试重置筛选。</div>';
}
function recommendCard(activity) { const saved = state.favorites.includes(activity.id); return `<article class="recommend-card"><img src="${image(activity)}" alt="${esc(activity.title)}" loading="lazy" onerror="this.src='${FALLBACK_IMAGE}'"><div class="card-content"><div class="badge-row"><span class="badge ${sourceClass(activity.sourceType)}">${esc(activity.source)}</span><span class="badge ${activity.lowRisk ? 'safe' : 'critical'}">${esc(activity.risk)}</span><button type="button" class="favorite-btn ${saved ? 'active' : ''}" data-favorite-id="${esc(activity.id)}" aria-pressed="${saved}">★</button></div><h3>${esc(activity.title)}</h3><p>${esc(activity.details)}</p><button type="button" class="text-btn" data-detail-id="${esc(activity.id)}">查看详情 →</button></div></article>`; }

function renderList(list) {
  if (!els.activityList) return;
  if (!list.length) { els.activityList.innerHTML = '<div class="empty-state">没有符合筛选条件的信息</div>'; return; }
  els.activityList.innerHTML = list.map((activity) => { const saved = state.favorites.includes(activity.id); return `<article class="activity-card"><img class="activity-image" src="${image(activity)}" alt="${esc(activity.title)}" loading="lazy" onerror="this.src='${FALLBACK_IMAGE}'"><div class="card-body"><div class="card-top"><div class="badge-row"><span class="badge ${sourceClass(activity.sourceType)}">${esc(activity.source)}</span><span class="badge ${activity.lowRisk ? 'safe' : 'critical'}">${esc(activity.risk)}</span></div><button type="button" class="favorite-btn ${saved ? 'active' : ''}" data-favorite-id="${esc(activity.id)}" aria-pressed="${saved}">★ ${saved ? '已收藏' : '收藏'}</button></div><h3 class="card-title">${esc(activity.title)}</h3><div class="card-meta"><span>📅 ${esc(activity.timeText)}</span><span>📍 ${esc(activity.location)}</span><span>适配度 <strong>${activity.fit || 0}%</strong> · 可信度 <strong>${activity.trust || 0}%</strong></span></div><p>${esc(activity.details)}</p><div class="badge-row">${(activity.tags || []).map((tag) => `<span class="tag">#${esc(tag)}</span>`).join('')}</div><button type="button" class="secondary-btn detail-btn" data-detail-id="${esc(activity.id)}">查看详情</button></div></article>`; }).join('');
}

function renderTimeline(list) { if (!els.timelineList) return; const items = [...list].filter((x) => x.startAt).sort((a,b) => new Date(a.startAt)-new Date(b.startAt)).slice(0,5); els.timelineList.innerHTML = items.length ? items.map((x) => { const date = new Date(x.startAt); return `<div class="timeline-item"><div class="timeline-date"><strong>${String(date.getDate()).padStart(2,'0')}</strong><span>${String(date.getMonth()+1).padStart(2,'0')}月</span></div><div class="timeline-copy"><h4>${esc(x.title)}</h4><p>${esc(x.location)} · ${esc(x.timeText)}</p></div><span class="timeline-risk ${x.lowRisk ? 'safe' : 'critical'}">${esc(x.risk)}</span></div>`; }).join('') : '<div class="empty-timeline">暂无近期安排</div>'; }
function renderFavorites() { if (!els.favoritesList) return; const items = getAllActivities().filter((x) => state.favorites.includes(x.id)); els.favoritesList.innerHTML = items.length ? items.map((x) => `<div class="favorite-item"><span>${esc(x.title)}</span><button type="button" data-detail-id="${esc(x.id)}">查看</button></div>`).join('') : '<p class="empty-favorites">还没有收藏内容，点击机会卡片上的 ★ 收藏。</p>'; }
function renderFilterButtons() { setActive(els.sourceButtons, 'source', state.source); setActive(els.statusButtons, 'status', state.status); }

function openDetailModal(id) { const activity = getAllActivities().find((x) => x.id === id); if (!activity || !els.detailContent) return; const saved = state.favorites.includes(id); els.detailContent.innerHTML = `<div class="detail-header"><span class="badge ${sourceClass(activity.sourceType)}">${esc(activity.source)}</span><h3>${esc(activity.title)}</h3><button type="button" class="favorite-btn ${saved ? 'active' : ''}" data-favorite-id="${esc(id)}" aria-pressed="${saved}">★ ${saved ? '已收藏' : '收藏'}</button></div><img class="detail-image" src="${image(activity)}" alt="${esc(activity.title)}" onerror="this.src='${FALLBACK_IMAGE}'><div class="detail-grid"><div class="detail-block"><h4>时间</h4><p>${esc(activity.timeText)}</p></div><div class="detail-block"><h4>地点</h4><p>${esc(activity.location)}</p></div><div class="detail-block"><h4>适用对象</h4><p>${esc(activity.audience)}</p></div><div class="detail-block"><h4>截止时间</h4><p>${esc(activity.deadline)}</p></div></div><p>${esc(activity.details)}</p><div class="warning-box">提示：${esc(activity.need)}</div>`; setModal(els.detailModal, true); }
function toggleFavorite(id) { if (!id) return; const saved = state.favorites.includes(id); state.favorites = saved ? state.favorites.filter((x) => x !== id) : [...state.favorites, id]; saveFavorites(); render(); toast(saved ? '已取消收藏' : '已加入收藏'); }
function clearFavorites() { state.favorites = []; saveFavorites(); render(); toast('收藏夹已清空'); }
function submitNewActivity(event) { event.preventDefault(); const value = (id) => document.getElementById(id)?.value.trim() || ''; const activity = { id:`L${Date.now()}`, title:value('newTitle') || '新发布活动', source:value('newSource') || '学生发布', sourceType:'student', audience:value('newAudience') || '全校学生', location:value('newLocation') || '待定', timeText:value('newTime') || '待定', deadline:value('newDeadline') || '待定', startAt:new Date().toISOString(), fit:78, trust:65, risk:'待确认', state:'待确认', stateKey:'review', need:'信息已由用户提交，需人工确认真实性', details:value('newDescription') || '新活动信息已发布。', tags:value('newTags').split(/[，,\s]+/).filter(Boolean).slice(0,8), freshmanOnly:true, lowRisk:false, image:FALLBACK_IMAGE }; saveEvents([activity, ...readEvents()]); els.publishForm?.reset(); setModal(els.publishModal, false); render(); toast('发布成功，已加入待确认列表'); }
function resetFilters() { Object.assign(state, {search:'', source:'all', status:'all', freshmanOnly:false, lowRiskOnly:false, savedOnly:false}); if (els.searchInput) els.searchInput.value=''; ['freshmanOnly','lowRiskOnly','savedOnly'].forEach((key) => { if (els[key]) els[key].checked=false; }); renderFilterButtons(); render(); }
function sourceClass(type) { return type === 'college' ? 'college' : type === 'student' ? 'student' : 'official'; }
function image(activity) { return activity.image || FALLBACK_IMAGE; }
function esc(value) { return String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function toast(message) { let node = document.getElementById('toast'); if (!node) { node = document.createElement('div'); node.id='toast'; node.className='toast'; document.body.appendChild(node); } node.textContent=message; node.classList.add('show'); clearTimeout(node.timer); node.timer=setTimeout(() => node.classList.remove('show'), 2200); }

window.campusOpportunityHub = { readEvents, saveEvents, render, getFilteredActivities, state, toggleFavorite };
