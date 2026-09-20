// ============================================================
// SchemeGuide — Admin Application Management
// ============================================================

function renderApplicationManagement(container) {
  let filterStatus = '';

  container.innerHTML = appLayout('application-management', `
    <div class="page-header">
      <div class="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 class="page-title">Application Management</h1>
          <p class="page-subtitle">Review and update citizen scheme applications.</p>
        </div>
        <div class="flex gap-3">
          <select class="select" style="width:auto" id="app-admin-filter" onchange="filterAdminApps(this.value)">
            <option value="">All Status</option>
            <option>Submitted</option>
            <option>Under Review</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Status Pills -->
    <div class="pill-group mb-6">
      ${['All','Submitted','Under Review','Approved','Rejected'].map((s,i) => `
        <span class="pill ${i===0?'active':''}" id="app-pill-${i}" onclick="filterAdminApps('${s==='All'?'':s}', ${i})">${s} (${s==='All'?APPLICATIONS.length:APPLICATIONS.filter(a=>a.status===s).length})</span>
      `).join('')}
    </div>

    <div class="table-wrap" id="admin-apps-table">
      ${renderAdminAppsTable(APPLICATIONS)}
    </div>
  `, true);
}

function renderAdminAppsTable(apps) {
  return `
    <table>
      <thead>
        <tr>
          <th>Ref ID</th>
          <th>User</th>
          <th>Scheme</th>
          <th>Applied Date</th>
          <th>Status</th>
          <th>Last Updated</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${apps.map(app => {
          const user = USERS.find(u => u.id === app.userId) || { name: 'Unknown', email: '' };
          return `
            <tr>
              <td style="font-family:monospace;font-size:var(--fs-xs);color:var(--clr-text-muted)">${app.id}</td>
              <td>
                <div class="flex items-center gap-2">
                  <div class="sidebar-avatar" style="width:28px;height:28px;font-size:10px">${getInitials(user.name)}</div>
                  <div>
                    <div style="font-size:var(--fs-sm);font-weight:600;color:var(--clr-navy)">${user.name}</div>
                    <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${user.email}</div>
                  </div>
                </div>
              </td>
              <td>
                <div style="font-size:var(--fs-sm);font-weight:600;color:var(--clr-navy)">${app.schemeName}</div>
                <span class="badge badge-${getCategoryColor(app.category)}" style="margin-top:4px">${app.category}</span>
              </td>
              <td style="font-size:var(--fs-sm);color:var(--clr-text-muted)">${formatDate(app.appliedDate)}</td>
              <td>
                <div class="flex items-center gap-2">
                  <div class="status-indicator status-${app.status.toLowerCase().replace(' ','-')}"></div>
                  <span class="badge ${getStatusBadge(app.status)}">${app.status}</span>
                </div>
              </td>
              <td style="font-size:var(--fs-sm);color:var(--clr-text-muted)">${formatDate(app.lastUpdated)}</td>
              <td>
                <div class="table-actions">
                  <button class="btn btn-ghost btn-sm" onclick="showAppAdminDetail('${app.id}')">${Icons.eye}</button>
                  <button class="btn btn-sm btn-teal" onclick="updateAppStatus('${app.id}','Approved')" title="Approve">✓</button>
                  <button class="btn btn-sm btn-danger" onclick="updateAppStatus('${app.id}','Rejected')" title="Reject">✕</button>
                </div>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

function filterAdminApps(status, pillIdx) {
  // Update pills
  document.querySelectorAll('[id^="app-pill-"]').forEach((p, i) => p.classList.toggle('active', i === (pillIdx ?? -1)));

  const filtered = status ? APPLICATIONS.filter(a => a.status === status) : APPLICATIONS;
  document.getElementById('admin-apps-table').innerHTML = renderAdminAppsTable(filtered);
}

function showAppAdminDetail(id) {
  const app = APPLICATIONS.find(a => a.id === id);
  const user = app ? USERS.find(u => u.id === app.userId) : null;
  if (!app) return;

  showModal(`
    <div class="modal-header">
      <div class="modal-title">Application: ${app.id}</div>
      <button class="modal-close" onclick="closeModal()">${Icons.x}</button>
    </div>
    <div class="modal-body">
      <div class="grid grid-2" style="gap:var(--space-4);margin-bottom:var(--space-4)">
        ${[
          ['Applicant', user?.name || 'Unknown'],
          ['Email', user?.email || '-'],
          ['Scheme', app.schemeName],
          ['Category', app.category],
          ['Applied', formatDate(app.appliedDate)],
          ['Last Updated', formatDate(app.lastUpdated)],
          ['Current Status', app.status],
        ].map(([k,v]) => `
          <div style="padding:var(--space-3);background:var(--clr-bg-alt);border-radius:var(--radius-md)">
            <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${k}</div>
            <div style="font-size:var(--fs-sm);font-weight:600;color:var(--clr-navy)">${v}</div>
          </div>
        `).join('')}
      </div>

      <h5 style="color:var(--clr-navy);margin-bottom:var(--space-3)">Update Status</h5>
      <div class="flex gap-3">
        <button class="btn btn-teal btn-sm" onclick="updateAppStatus('${app.id}','Approved'); closeModal()">Mark Approved</button>
        <button class="btn btn-outline btn-sm" onclick="updateAppStatus('${app.id}','Under Review'); closeModal()">Set Under Review</button>
        <button class="btn btn-danger btn-sm" onclick="updateAppStatus('${app.id}','Rejected'); closeModal()">Reject</button>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Close</button>
    </div>
  `);
}

function updateAppStatus(id, newStatus) {
  const app = APPLICATIONS.find(a => a.id === id);
  if (app) {
    app.status = newStatus;
    app.lastUpdated = new Date().toISOString().split('T')[0];
  }
  showToast(`Application ${newStatus}`, `Status updated to "${newStatus}"`, newStatus === 'Approved' ? 'success' : 'info');
  renderApplicationManagement(document.getElementById('page-content').firstElementChild || document.getElementById('page-content'));
}
