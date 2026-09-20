// ============================================================
// SchemeGuide — Admin Feedback Management
// ============================================================

function renderFeedbackManagement(container) {
  container.innerHTML = appLayout('feedback-management', `
    <div class="page-header">
      <div class="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 class="page-title">Feedback Management</h1>
          <p class="page-subtitle">Review citizen feedback and scheme ratings.</p>
        </div>
        <div class="flex gap-3">
          <select class="select" style="width:auto">
            <option>All Ratings</option>
            <option>5 Stars</option>
            <option>4 Stars</option>
            <option>3 Stars</option>
            <option>Below 3</option>
          </select>
          <select class="select" style="width:auto">
            <option>All Schemes</option>
            ${SCHEMES.map(s => `<option>${s.name}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>

    <!-- Rating Summary -->
    <div class="grid grid-4" style="gap:var(--space-4);margin-bottom:var(--space-6)">
      ${[
        { label: 'Total Feedback', val: FEEDBACKS.length, icon: Icons.message, color: 'var(--clr-primary)', bg: 'var(--clr-primary-light)' },
        { label: 'Average Rating', val: '4.7★', icon: Icons.star, color: 'var(--clr-amber-dark)', bg: 'var(--clr-amber-light)' },
        { label: '5-Star Reviews', val: FEEDBACKS.filter(f=>f.rating===5).length, icon: Icons.checkCircle, color: 'var(--clr-green)', bg: 'var(--clr-green-light)' },
        { label: 'Low Ratings', val: FEEDBACKS.filter(f=>f.rating<3).length, icon: Icons.alertCircle, color: 'var(--clr-red)', bg: 'var(--clr-red-light)' },
      ].map(s => `
        <div class="admin-stat-card">
          <div class="admin-stat-icon" style="background:${s.bg};color:${s.color}">${s.icon}</div>
          <div class="admin-stat-info">
            <div class="admin-stat-value">${s.val}</div>
            <div class="admin-stat-label">${s.label}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Rating Distribution -->
    <div class="card" style="margin-bottom:var(--space-6)">
      <div style="padding:var(--space-5) var(--space-6);border-bottom:1px solid var(--clr-border)">
        <h4 style="color:var(--clr-navy)">Rating Distribution</h4>
      </div>
      <div class="card-body">
        <div style="display:flex;flex-direction:column;gap:var(--space-3);max-width:500px">
          ${[5,4,3,2,1].map(star => `
            <div class="flex items-center gap-3">
              <span style="font-size:var(--fs-sm);font-weight:600;color:var(--clr-navy);width:20px">${star}</span>
              <span style="color:var(--clr-amber-dark)">★</span>
              <div class="progress-bar" style="flex:1">
                <div class="progress-fill" style="width:${star===5?'70%':star===4?'20%':star===3?'7%':'3%'};background:${star>=4?'var(--clr-amber)':star===3?'var(--clr-text-muted)':'var(--clr-red)'}"></div>
              </div>
              <span style="font-size:var(--fs-xs);color:var(--clr-text-muted);width:40px">${star===5?'70%':star===4?'20%':star===3?'7%':star===2?'2%':'1%'}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Feedback Table -->
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Scheme</th>
            <th>Rating</th>
            <th>Feedback</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${FEEDBACKS.map(f => `
            <tr>
              <td>
                <div style="font-weight:600;color:var(--clr-navy)">${f.user}</div>
              </td>
              <td style="font-size:var(--fs-sm)">${f.scheme}</td>
              <td>
                <div style="display:flex;gap:2px">
                  ${'★'.repeat(f.rating).split('').map(() => `<span style="color:var(--clr-amber-dark)">★</span>`).join('')}
                  ${'☆'.repeat(5-f.rating).split('').map(() => `<span style="color:var(--clr-border)">★</span>`).join('')}
                </div>
              </td>
              <td style="font-size:var(--fs-sm);color:var(--clr-text-secondary);max-width:300px">${f.feedback}</td>
              <td style="font-size:var(--fs-sm);color:var(--clr-text-muted)">${formatDate(f.date)}</td>
              <td>
                <div class="table-actions">
                  <button class="btn btn-ghost btn-sm" title="View">${Icons.eye}</button>
                  <button class="btn btn-ghost btn-sm" style="color:var(--clr-red)" title="Remove" onclick="showToast('Feedback removed','','info')">${Icons.trash}</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `, true);
}
