// SchemeGuide — Admin Dashboard, driven by persisted database aggregates.

async function renderAdminDashboard(container) {
  container.innerHTML = appLayout('admin-dashboard', '<div class="loading-spinner"></div>', true);
  try {
    const { data } = await AdminAPI.getDashboard();
    const stats = data.stats || {};
    const cards = [
      ['Total Schemes', stats.totalSchemes],
      ['Active Schemes', stats.activeSchemes],
      ['Registered Users', stats.totalUsers],
      ['Applications', stats.totalApplications],
    ];
    const categoryRows = data.schemesByCategory || [];
    const maxCategoryCount = Math.max(1, ...categoryRows.map(row => row.count));
    const appRows = data.appsByStatus || [];

    container.innerHTML = appLayout('admin-dashboard', `
      <div class="page-header">
        <h1 class="page-title">Administration Overview</h1>
        <p class="page-subtitle">Current totals from the connected database.</p>
      </div>
      <div class="grid grid-4" style="gap:var(--space-4);margin-bottom:var(--space-8)">
        ${cards.map(([label, value]) => `<div class="admin-stat-card"><div class="admin-stat-info"><div class="admin-stat-value">${Number(value || 0).toLocaleString()}</div><div class="admin-stat-label">${label}</div></div></div>`).join('')}
      </div>
      <div class="grid grid-2" style="gap:var(--space-6)">
        <div class="card"><div class="card-body"><h4>Scheme counts by category</h4>
          ${categoryRows.length ? `<div class="chart-bar">${categoryRows.map(row => `<div class="chart-bar-item"><div class="chart-bar-label">${row._id || 'Uncategorized'}</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:${Math.round(row.count / maxCategoryCount * 100)}%">${row.count}</div></div></div>`).join('')}</div>` : '<p class="empty-state-msg">No schemes have been added.</p>'}
        </div></div>
        <div class="card"><div class="card-body"><h4>Applications by status</h4>
          ${appRows.length ? `<div class="chart-bar">${appRows.map(row => `<div class="chart-bar-item"><div class="chart-bar-label">${row._id || 'Unknown'}</div><div class="chart-bar-track"><div class="chart-bar-fill" style="width:${Math.round(row.count / Math.max(1, stats.totalApplications || 0) * 100)}%">${row.count}</div></div></div>`).join('')}</div>` : '<p class="empty-state-msg">No applications have been submitted.</p>'}
        </div></div>
      </div>
      <div class="grid grid-2" style="gap:var(--space-6);margin-top:var(--space-6)">
        <div class="card"><div class="card-body"><h4>Recently registered users</h4>
          ${(data.recentUsers || []).length ? data.recentUsers.map(user => `<div class="flex justify-between p-3" style="border-bottom:1px solid var(--clr-border-light)"><span>${user.name}</span><span style="color:var(--clr-text-muted)">${formatDate(user.createdAt)}</span></div>`).join('') : '<p class="empty-state-msg">No users have registered.</p>'}
        </div></div>
        <div class="card"><div class="card-body"><h4>Recent applications</h4>
          ${(data.recentApps || []).length ? data.recentApps.map(app => `<div class="flex justify-between p-3" style="border-bottom:1px solid var(--clr-border-light)"><span>${app.userId?.name || 'Applicant'} · ${app.status}</span><span style="color:var(--clr-text-muted)">${formatDate(app.createdAt)}</span></div>`).join('') : '<p class="empty-state-msg">No applications have been submitted.</p>'}
        </div></div>
      </div>
    `, true);
  } catch (error) {
    container.innerHTML = appLayout('admin-dashboard', `<div class="alert alert-error">Could not load dashboard data from the server. ${error.message || ''}</div>`, true);
  }
}

function renderAdminNotifications(container) {
  container.innerHTML = appLayout('admin-notifications', `
    <div class="page-header"><h1 class="page-title">System Notifications</h1><p class="page-subtitle">Operational events will appear here when the server provides them.</p></div>
    <div class="empty-state"><div class="empty-state-title">No system notifications</div><p class="empty-state-msg">There are no persisted system notifications to show.</p></div>
  `, true);
}
