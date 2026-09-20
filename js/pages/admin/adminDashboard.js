// ============================================================
// SchemeGuide — Admin Dashboard
// ============================================================

function renderAdminDashboard(container) {
  container.innerHTML = appLayout('admin-dashboard', `
    <div class="page-header">
      <h1 class="page-title">Administration Overview</h1>
      <p class="page-subtitle">Monitor platform performance and manage government schemes.</p>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-4" style="gap:var(--space-4);margin-bottom:var(--space-8)">
      ${[
        { label: 'Total Schemes', val: SCHEMES.length, trend: '+2 this month', up: true, icon: Icons.schemes, color: 'var(--clr-primary)', bg: 'var(--clr-primary-light)' },
        { label: 'Active Schemes', val: SCHEMES.filter(s=>s.status==='Active').length, trend: 'All active', up: true, icon: Icons.checkCircle, color: 'var(--clr-teal)', bg: 'var(--clr-teal-light)' },
        { label: 'Registered Users', val: '2,841', trend: '+124 this week', up: true, icon: Icons.users, color: '#8B5CF6', bg: '#F3E8FF' },
        { label: 'Applications', val: APPLICATIONS.length, trend: '+8 today', up: true, icon: Icons.folder, color: 'var(--clr-amber-dark)', bg: 'var(--clr-amber-light)' },
      ].map(s => `
        <div class="admin-stat-card">
          <div class="admin-stat-icon" style="background:${s.bg};color:${s.color}">${s.icon}</div>
          <div class="admin-stat-info">
            <div class="admin-stat-value">${s.val}</div>
            <div class="admin-stat-label">${s.label}</div>
            <div class="admin-stat-trend ${s.up ? 'trend-up' : 'trend-down'}">
              ${s.up ? Icons.trendingUp : '▼'} ${s.trend}
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="grid" style="grid-template-columns:1fr 1fr;gap:var(--space-6);margin-bottom:var(--space-6)">
      <!-- Scheme Distribution Chart -->
      <div class="card">
        <div style="padding:var(--space-5) var(--space-6);border-bottom:1px solid var(--clr-border)">
          <h4 style="color:var(--clr-navy)">Scheme Distribution by Category</h4>
        </div>
        <div class="card-body">
          <div class="chart-bar">
            ${CATEGORIES.slice(0,6).map(c => `
              <div class="chart-bar-item">
                <div class="chart-bar-label">${c.name}</div>
                <div class="chart-bar-track">
                  <div class="chart-bar-fill" style="width:${(c.count / 24 * 100).toFixed(0)}%">
                    ${c.count}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Applications Overview -->
      <div class="card">
        <div style="padding:var(--space-5) var(--space-6);border-bottom:1px solid var(--clr-border)">
          <h4 style="color:var(--clr-navy)">Application Status Overview</h4>
        </div>
        <div class="card-body">
          <div class="flex items-center justify-center gap-8">
            <div class="donut-chart" style="--v1:30%;--v2:55%;--v3:80%;--v4:92%">
              <div class="donut-inner">
                ${APPLICATIONS.length}<br><span style="font-size:9px">Total</span>
              </div>
            </div>
            <div>
              ${[
                { label: 'Submitted', color: 'var(--clr-primary)', pct: '30%' },
                { label: 'Under Review', color: 'var(--clr-teal)', pct: '25%' },
                { label: 'Approved', color: 'var(--clr-amber)', pct: '25%' },
                { label: 'Rejected', color: 'var(--clr-red)', pct: '12%' },
                { label: 'Pending', color: 'var(--clr-green)', pct: '8%' },
              ].map(s => `
                <div class="flex items-center gap-3 mb-3">
                  <div style="width:10px;height:10px;border-radius:50%;background:${s.color};flex-shrink:0"></div>
                  <span style="font-size:var(--fs-xs);color:var(--clr-text-secondary)">${s.label}</span>
                  <span style="font-size:var(--fs-xs);font-weight:700;color:var(--clr-navy);margin-left:auto">${s.pct}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid" style="grid-template-columns:1fr 1fr;gap:var(--space-6)">
      <!-- Most Viewed Schemes -->
      <div class="card">
        <div style="padding:var(--space-5) var(--space-6);border-bottom:1px solid var(--clr-border)">
          <h4 style="color:var(--clr-navy)">Most Viewed Schemes</h4>
        </div>
        <div>
          ${[...SCHEMES].sort((a,b) => b.views-a.views).slice(0,5).map((s, i) => `
            <div class="flex items-center gap-4 p-4" style="border-bottom:1px solid var(--clr-border-light)">
              <div style="width:28px;height:28px;border-radius:50%;background:${i===0?'var(--clr-primary)':'var(--clr-bg-alt)'};color:${i===0?'white':'var(--clr-text-muted)'};display:flex;align-items:center;justify-content:center;font-size:var(--fs-xs);font-weight:700">
                ${i+1}
              </div>
              <div style="flex:1;min-width:0">
                <div style="font-size:var(--fs-sm);font-weight:600;color:var(--clr-navy);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.name}</div>
                <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${s.category}</div>
              </div>
              <div style="font-size:var(--fs-xs);font-weight:700;color:var(--clr-primary)">${s.views.toLocaleString()} views</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card">
        <div style="padding:var(--space-5) var(--space-6);border-bottom:1px solid var(--clr-border)">
          <h4 style="color:var(--clr-navy)">Recent Activity</h4>
        </div>
        <div>
          ${[
            { action: 'New user registered', detail: 'Priya Nair from Kerala', time: '5 min ago', icon: Icons.user, color: 'var(--clr-primary)' },
            { action: 'Application submitted', detail: 'PMKVY — Riya Sharma', time: '12 min ago', icon: Icons.folder, color: 'var(--clr-teal)' },
            { action: 'Scheme updated', detail: 'PM Kisan Samman Nidhi', time: '1 hour ago', icon: Icons.edit, color: 'var(--clr-amber-dark)' },
            { action: 'Application approved', detail: 'AICTE Scholarship — APP001', time: '2 hours ago', icon: Icons.checkCircle, color: 'var(--clr-green)' },
            { action: 'New feedback received', detail: '5★ for Ayushman Bharat', time: '3 hours ago', icon: Icons.message, color: '#8B5CF6' },
          ].map(a => `
            <div class="flex gap-4 p-4 items-start" style="border-bottom:1px solid var(--clr-border-light)">
              <div style="width:32px;height:32px;border-radius:50%;background:${a.color}20;color:${a.color};display:flex;align-items:center;justify-content:center;flex-shrink:0">
                ${a.icon}
              </div>
              <div style="flex:1">
                <div style="font-size:var(--fs-sm);font-weight:600;color:var(--clr-navy)">${a.action}</div>
                <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${a.detail}</div>
              </div>
              <div style="font-size:var(--fs-xs);color:var(--clr-text-light);white-space:nowrap">${a.time}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `, true);
}

function renderAdminNotifications(container) {
  container.innerHTML = appLayout('admin-notifications', `
    <div class="page-header">
      <h1 class="page-title">System Notifications</h1>
    </div>
    <div class="card-flat">
      ${[
        { title: 'High Traffic Alert', msg: 'PM-JAY page experiencing high traffic. 1,200 views in last hour.', time: '10 min ago', type: 'warning' },
        { title: 'New User Registrations', msg: '48 new users registered today.', time: '1 hour ago', type: 'info' },
        { title: 'Scheme Deadline Approaching', msg: 'AICTE Pragati application deadline is in 7 days.', time: '3 hours ago', type: 'warning' },
        { title: 'System Backup Complete', msg: 'Daily database backup completed successfully.', time: '6 hours ago', type: 'success' },
      ].map(n => `
        <div class="notif-item">
          <div class="notif-icon" style="background:${n.type==='warning'?'var(--clr-amber-light)':n.type==='success'?'var(--clr-green-light)':'var(--clr-primary-light)'};color:${n.type==='warning'?'var(--clr-amber-dark)':n.type==='success'?'var(--clr-green)':'var(--clr-primary)'}">
            ${n.type==='warning' ? Icons.alertCircle : n.type==='success' ? Icons.checkCircle : Icons.info}
          </div>
          <div style="flex:1">
            <div style="font-weight:600;font-size:var(--fs-sm);color:var(--clr-navy)">${n.title}</div>
            <p style="font-size:var(--fs-sm);color:var(--clr-text-muted)">${n.msg}</p>
            <div style="font-size:var(--fs-xs);color:var(--clr-text-light);margin-top:4px">${n.time}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `, true);
}
