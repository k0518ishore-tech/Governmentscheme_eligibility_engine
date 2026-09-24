// ============================================================
// SchemeGuide — Notifications Page
// ============================================================

let userNotifications = [];
let notificationFilter = 'All';

async function renderNotifications(container) {
  try {
    const response = await NotificationAPI.getAll();
    userNotifications = (response.data.notifications || []).map(notification => ({
      id: notification._id,
      schemeId: notification.schemeId?._id || notification.schemeId,
      title: notification.title || notificationTypeTitle(notification.type),
      type: notification.type || 'system',
      message: notification.message,
      time: notification.sendDate ? formatDate(notification.sendDate) : formatDate(notification.createdAt),
      read: Boolean(notification.readStatus),
    }));
    AppState.notificationCount = response.data.unreadCount || 0;
  } catch (error) {
    userNotifications = [];
    AppState.notificationCount = 0;
    showToast('Could not load notifications', error.message || 'Check the backend connection.', 'error');
  }

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
    <div class="tabs mb-6">
      ${['All','New Scheme','Application Update','Recommendation','System'].map(type => `
        <div class="tab ${notificationFilter === type ? 'active' : ''}" onclick="filterNotifs(this, '${type}')">${type}</div>
      `).join('')}
    </div>
    <div id="notifs-list">${renderNotifList(filteredNotifications())}</div>
  `);
}

function notificationTypeTitle(type) {
  return ({
    new_scheme: 'New Scheme Available',
    application_update: 'Application Update',
    recommendation: 'New Recommendations',
    system: 'SchemeGuide Update',
  })[type] || 'Notification';
}

function notificationTypeForFilter(type) {
  return ({
    'New Scheme': 'new_scheme',
    'Application Update': 'application_update',
    Recommendation: 'recommendation',
    System: 'system',
  })[type];
}

function filteredNotifications() {
  if (notificationFilter === 'All') return userNotifications;
  const type = notificationTypeForFilter(notificationFilter);
  return userNotifications.filter(notification => notification.type === type);
}

function renderNotifList(notifications) {
  if (notifications.length === 0) {
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
      ${notifications.map(notification => {
        const color = getNotifColor(notification.type);
        return `
          <div class="notif-item ${notification.read ? '' : 'unread'}" id="notif-${notification.id}">
            <div class="notif-icon" style="background:${color}20;color:${color}">
              ${getNotifIcon(notification.type)}
            </div>
            <div style="flex:1">
              <div style="font-weight:600;font-size:var(--fs-sm);color:var(--clr-navy)">${notification.title}</div>
              <p style="font-size:var(--fs-sm);color:var(--clr-text-muted);margin-top:2px">${notification.message}</p>
              <div style="font-size:var(--fs-xs);color:var(--clr-text-light);margin-top:var(--space-1)">${notification.time}</div>
            </div>
            <div class="flex gap-2 items-center">
              ${notification.read ? '' : '<div class="dot" style="color:var(--clr-primary)"></div>'}
              ${notification.schemeId ? `<button class="btn btn-ghost btn-sm" onclick="navigate('scheme-detail', {scheme:'${notification.schemeId}'})" title="View Scheme">${Icons.externalLink}</button>` : ''}
              ${notification.read ? '' : `<button class="btn btn-ghost btn-sm" onclick="markNotificationRead('${notification.id}')" title="Mark as read">${Icons.check}</button>`}
              <button class="btn btn-ghost btn-sm" onclick="deleteNotif('${notification.id}')" title="Delete">${Icons.trash}</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function filterNotifs(element, type) {
  notificationFilter = type;
  document.querySelectorAll('.tabs .tab').forEach(tab => tab.classList.remove('active'));
  element.classList.add('active');
  document.getElementById('notifs-list').innerHTML = renderNotifList(filteredNotifications());
}

async function markNotificationRead(id) {
  try {
    await NotificationAPI.markAsRead(id);
    const notification = userNotifications.find(item => item.id === id);
    if (notification) notification.read = true;
    AppState.notificationCount = Math.max(0, AppState.notificationCount - 1);
    document.getElementById('notifs-list').innerHTML = renderNotifList(filteredNotifications());
  } catch (error) {
    showToast('Could not update notification', error.message || 'Please try again.', 'error');
  }
}

async function markAllRead() {
  try {
    const unread = userNotifications.filter(notification => !notification.read);
    await Promise.all(unread.map(notification => NotificationAPI.markAsRead(notification.id)));
    userNotifications.forEach(notification => { notification.read = true; });
    AppState.notificationCount = 0;
    document.getElementById('notifs-list').innerHTML = renderNotifList(filteredNotifications());
    showToast('All marked as read', '', 'success');
  } catch (error) {
    showToast('Could not update notifications', error.message || 'Please try again.', 'error');
  }
}

async function deleteNotif(id) {
  try {
    await NotificationAPI.delete(id);
    userNotifications = userNotifications.filter(notification => notification.id !== id);
    document.getElementById('notifs-list').innerHTML = renderNotifList(filteredNotifications());
    showToast('Notification deleted', '', 'info');
  } catch (error) {
    showToast('Could not delete notification', error.message || 'Please try again.', 'error');
  }
}

async function clearNotifs() {
  try {
    await Promise.all(userNotifications.map(notification => NotificationAPI.delete(notification.id)));
    userNotifications = [];
    AppState.notificationCount = 0;
    document.getElementById('notifs-list').innerHTML = renderNotifList([]);
    showToast('All notifications cleared', '', 'info');
  } catch (error) {
    showToast('Could not clear notifications', error.message || 'Please try again.', 'error');
  }
}
