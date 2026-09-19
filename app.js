function renderDetail(item) {
  const favoriteActive = getFavorites().includes(item.id) ? 'active' : '';
  const needText = item.need || item.contact || '请联系主办方确认具体报名方式';
  const detailText = item.detail || '暂无详细说明，建议直接联系主办方确认报名信息与要求。';
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
      </div>
    </div>
  `;
  els.detailModal.classList.remove('hidden');
  els.detailModal.setAttribute('aria-hidden', 'false');
}
