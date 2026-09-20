// ============================================================
// SchemeGuide — Application History Page
// ============================================================

function renderApplications(container) {
  const user = AppState.currentUser;
  const apps = APPLICATIONS.filter(a => a.userId === user.id);

  container.innerHTML = appLayout('applications', `
    <div class="page-header">
      <div class="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 class="page-title">My Applications</h1>
          <p class="page-subtitle">Track the status of all your scheme applications.</p>
        </div>
        <button class="btn btn-primary" onclick="navigate('find-schemes')">
          ${Icons.plus} Apply for New Scheme
        </button>
      </div>
    </div>

    <!-- Status Summary -->
    <div class="grid grid-4" style="gap:var(--space-4);margin-bottom:var(--space-6)">
      ${[
        { label: 'Total', count: apps.length, color: 'var(--clr-primary)', bg: 'var(--clr-primary-light)' },
        { label: 'Approved', count: apps.filter(a=>a.status==='Approved').length, color: 'var(--clr-green)', bg: 'var(--clr-green-light)' },
        { label: 'Under Review', count: apps.filter(a=>a.status==='Under Review').length, color: 'var(--clr-teal)', bg: 'var(--clr-teal-light)' },
        { label: 'Submitted', count: apps.filter(a=>a.status==='Submitted').length, color: 'var(--clr-amber-dark)', bg: 'var(--clr-amber-light)' },
      ].map(s => `
        <div class="stat-card">
          <div class="flex justify-between items-center">
            <div>
              <div style="font-size:var(--fs-2xl);font-weight:800;color:var(--clr-navy)">${s.count}</div>
              <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${s.label}</div>
            </div>
            <div style="width:40px;height:40px;border-radius:var(--radius-md);background:${s.bg};color:${s.color};display:flex;align-items:center;justify-content:center">
              ${Icons.folder}
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    ${apps.length === 0 ? `
      <div class="empty-state">
        <div class="empty-state-icon">${Icons.folder}</div>
        <div class="empty-state-title">No applications yet</div>
        <p class="empty-state-msg">Find schemes you're eligible for and apply through the official government portal.</p>
        <button class="btn btn-primary" onclick="navigate('find-schemes')">Find Schemes</button>
      </div>
    ` : `
      <div class="card-flat">
        <div style="padding:var(--space-4) var(--space-6);border-bottom:1px solid var(--clr-border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--space-4)">
          <h4 style="color:var(--clr-navy)">All Applications</h4>
          <div class="flex gap-3">
            <select class="select" style="width:auto;font-size:var(--fs-xs)" id="app-filter">
              <option value="">All Status</option>
              <option>Submitted</option>
              <option>Under Review</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
        <div class="table-wrap" style="border:none;border-radius:0">
          <table>
            <thead>
              <tr>
                <th>Scheme</th>
                <th>Category</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${apps.map(app => `
                <tr>
                  <td>
                    <div style="font-weight:600;color:var(--clr-navy)">${app.schemeName}</div>
                    <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">Ref: ${app.id}</div>
                  </td>
                  <td><span class="badge badge-${getCategoryColor(app.category)}">${app.category}</span></td>
                  <td style="color:var(--clr-text-secondary)">${formatDate(app.appliedDate)}</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <div class="status-indicator status-${app.status.toLowerCase().replace(' ','-')}"></div>
                      <span class="badge ${getStatusBadge(app.status)}">${app.status}</span>
                    </div>
                  </td>
                  <td style="color:var(--clr-text-secondary)">${formatDate(app.lastUpdated)}</td>
                  <td>
                    <div class="table-actions">
                      <button class="btn btn-ghost btn-sm" onclick="viewApplicationDetail('${app.id}')" title="View Details">
                        ${Icons.eye}
                      </button>
                      <button class="btn btn-ghost btn-sm" onclick="navigate('scheme-detail', {scheme:${app.schemeId}})" title="View Scheme">
                        ${Icons.externalLink}
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `}
  `);
}

function viewApplicationDetail(appId) {
  const app = APPLICATIONS.find(a => a.id === appId);
  if (!app) return;

  const statusSteps = ['Submitted', 'Under Review', 'Approved'];
  const currentIdx = statusSteps.indexOf(app.status);

  showModal(`
    <div class="modal-header">
      <div class="modal-title">Application Details</div>
      <button class="modal-close" onclick="closeModal()">${Icons.x}</button>
    </div>
    <div class="modal-body">
      <div class="flex gap-3 mb-4">
        <span class="badge ${getStatusBadge(app.status)}">${app.status}</span>
        <span class="badge badge-gray">Ref: ${app.id}</span>
      </div>
      <h4 style="color:var(--clr-navy);margin-bottom:var(--space-2)">${app.schemeName}</h4>
      <p style="font-size:var(--fs-sm);color:var(--clr-text-muted);margin-bottom:var(--space-6)">Applied on ${formatDate(app.appliedDate)}</p>

      <!-- Status Timeline -->
      <div style="margin-bottom:var(--space-6)">
        <h5 style="color:var(--clr-navy);margin-bottom:var(--space-4)">Application Progress</h5>
        ${statusSteps.map((step, i) => `
          <div class="flex gap-4 items-start mb-3">
            <div style="width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;${i <= currentIdx ? 'background:var(--clr-teal);color:white' : 'background:var(--clr-bg-alt);color:var(--clr-text-muted);border:2px solid var(--clr-border)'}">
              ${i < currentIdx ? Icons.check : i+1}
            </div>
            <div style="flex:1;padding-top:4px">
              <div style="font-weight:600;font-size:var(--fs-sm);color:${i <= currentIdx ? 'var(--clr-navy)' : 'var(--clr-text-muted)'}">${step}</div>
              ${i <= currentIdx ? `<div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${formatDate(app.lastUpdated)}</div>` : ''}
            </div>
          </div>
          ${i < statusSteps.length - 1 ? `<div style="width:2px;height:20px;background:${i < currentIdx ? 'var(--clr-teal)' : 'var(--clr-border)'};margin-left:14px;margin-bottom:4px"></div>` : ''}
        `).join('')}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Close</button>
      <button class="btn btn-primary" onclick="closeModal(); navigate('scheme-detail', {scheme:${app.schemeId}})">View Scheme</button>
    </div>
  `, 'modal-sm');
}
