// ============================================================
// SchemeGuide — Notifications Page
// ============================================================

function renderNotifications(container) {
  AppState.notificationCount = 0; // Mark as read on visit

  container.innerHTML = appLayout('notifications', `
    <div class="page-header">
      <div class="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 class="page-title">Notifications</h1>
          <p class="page-subtitle">Stay updated on new schemes and your application status.</p>
        </div>
        <div class="flex gap-3">
          <button class="btn btn-ghost btn-sm" onclick="markAllRead()">Mark all as read</button>
          <button class="btn btn-ghost btn-sm" onclick="clearNotifs()">Clear all</button>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs mb-6">
      ${['All','New Scheme','Application Update','Recommendation','System'].map((t, i) => `
        <div class="tab ${i===0?'active':''}" onclick="filterNotifs(this, '${t}')">${t}</div>
      `).join('')}
    </div>

    <div id="notifs-list">
      ${renderNotifList(NOTIFICATIONS)}
    </div>
  `);
}

function renderNotifList(notifs) {
  if (notifs.length === 0) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">${Icons.bell}</div>
        <div class="empty-state-title">No notifications</div>
        <p class="empty-state-msg">You're all caught up! We'll notify you when there's something new.</p>
      </div>
    `;
  }

  return `
    <div class="card-flat">
      ${notifs.map(n => `
        <div class="notif-item ${!n.read ? 'unread' : ''}" id="notif-${n.id}">
          <div class="notif-icon" style="background:${getNotifColor(n.type)}20;color:${getNotifColor(n.type)}">
            ${getNotifIcon(n.type)}
          </div>
          <div style="flex:1">
            <div style="font-weight:600;font-size:var(--fs-sm);color:var(--clr-navy)">${n.title}</div>
            <p style="font-size:var(--fs-sm);color:var(--clr-text-muted);margin-top:2px">${n.message}</p>
            <div style="font-size:var(--fs-xs);color:var(--clr-text-light);margin-top:var(--space-1)">${n.time}</div>
          </div>
          <div class="flex gap-2 items-center">
            ${!n.read ? `<div class="dot" style="color:var(--clr-primary)"></div>` : ''}
            ${n.schemeId ? `
              <button class="btn btn-ghost btn-sm" onclick="navigate('scheme-detail', {scheme:${n.schemeId}})" title="View Scheme">
                ${Icons.externalLink}
              </button>
            ` : ''}
            <button class="btn btn-ghost btn-sm" onclick="deleteNotif(${n.id})" title="Delete">
              ${Icons.trash}
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function filterNotifs(el, type) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const filtered = type === 'All' ? NOTIFICATIONS : NOTIFICATIONS.filter(n => n.type === type.toLowerCase().replace(' ',''));
  document.getElementById('notifs-list').innerHTML = renderNotifList(filtered);
}

function markAllRead() {
  NOTIFICATIONS.forEach(n => n.read = true);
  document.querySelectorAll('.notif-item').forEach(item => item.classList.remove('unread'));
  document.querySelectorAll('.dot').forEach(d => d.remove());
  showToast('All marked as read', '', 'success');
}

function deleteNotif(id) {
  const el = document.getElementById(`notif-${id}`);
  if (el) {
    el.style.animation = 'slideOutRight 0.3s forwards';
    setTimeout(() => el.remove(), 300);
  }
  showToast('Notification deleted', '', 'info');
}

function clearNotifs() {
  document.getElementById('notifs-list').innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">${Icons.bell}</div>
      <div class="empty-state-title">No notifications</div>
      <p class="empty-state-msg">All notifications have been cleared.</p>
    </div>
  `;
  showToast('All notifications cleared', '', 'info');
}
