// ============================================================
// SchemeGuide — User Dashboard
// ============================================================

function renderDashboard(container) {
  const user = AppState.currentUser;
  const greeting = getGreeting();
  const eligible = SCHEMES.filter(s => checkEligibility(s, user).eligible);
  const recommended = SCHEMES.slice(0, 3);

  container.innerHTML = appLayout('dashboard', `
    <div class="dashboard-shell">
      <!-- Greeting Banner -->
    <div class="greeting-banner animate-up" style="margin-bottom:var(--space-6)">
      <div class="flex justify-between items-center flex-wrap gap-4">
        <div>
          <div style="font-size:var(--fs-xs);color:rgba(255,255,255,0.6);font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:var(--space-2)">
            ${greeting} 👋
          </div>
          <h2 style="color:white;font-size:var(--fs-2xl);margin-bottom:var(--space-2)">${user.name}</h2>
          <p style="color:rgba(255,255,255,0.7)">Let's find the support that's right for you.</p>
        </div>
        <div>
          <div style="background:rgba(255,255,255,0.1);border-radius:var(--radius-lg);padding:var(--space-4) var(--space-5);border:1px solid rgba(255,255,255,0.15)">
            <div style="font-size:var(--fs-xs);color:rgba(255,255,255,0.6);margin-bottom:var(--space-2)">Profile Completion</div>
            <div style="font-size:var(--fs-xl);font-weight:800;color:white;margin-bottom:var(--space-2)">80%</div>
            <div class="progress-bar progress-thin"><div class="progress-fill" style="width:80%"></div></div>
            <button class="btn btn-sm" style="margin-top:var(--space-3);background:rgba(255,255,255,0.15);color:white;border-color:transparent" onclick="navigate('profile')">
              Complete Profile ${Icons.arrowRight}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Eligibility Snapshot -->
    <div class="grid grid-4" style="gap:var(--space-4);margin-bottom:var(--space-8)">
      ${[
        { label: 'Eligible Schemes', val: eligible.length, color: 'var(--clr-teal)', icon: Icons.checkCircle, page: 'find-schemes' },
        { label: 'Saved Schemes', val: AppState.savedSchemes.length, color: 'var(--clr-amber-dark)', icon: Icons.bookmark, page: 'saved' },
        { label: 'Applications', val: APPLICATIONS.filter(a => a.userId === user.id).length, color: 'var(--clr-primary)', icon: Icons.folder, page: 'applications' },
        { label: 'Recommended', val: 4, color: '#8B5CF6', icon: Icons.spark, page: 'recommendations' },
      ].map(s => `
        <div class="stat-card" style="cursor:pointer" onclick="navigate('${s.page}')">
          <div class="flex justify-between items-center">
            <div>
              <div style="font-size:2rem;font-weight:800;color:var(--clr-navy)">${s.val}</div>
              <div style="font-size:var(--fs-xs);color:var(--clr-text-muted);margin-top:var(--space-1)">${s.label}</div>
            </div>
            <div style="width:44px;height:44px;border-radius:var(--radius-md);background:${s.color}20;color:${s.color};display:flex;align-items:center;justify-content:center">
              ${s.icon}
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="grid" style="grid-template-columns:2fr 1fr;gap:var(--space-6)">
      <div>
        <!-- Recommended for you -->
        <div class="flex justify-between items-center mb-4">
          <div>
            <h3 style="font-size:var(--fs-lg);font-weight:700;color:var(--clr-navy)">Recommended for You</h3>
            <p style="font-size:var(--fs-sm);color:var(--clr-text-muted)">Explore schemes that may help you</p>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="navigate('recommendations')">View all ${Icons.arrowRight}</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:var(--space-3);margin-bottom:var(--space-8)">
          ${recommended.map(s => dashboardSchemeRow(s)).join('')}
        </div>

        <!-- Applications -->
        <div class="flex justify-between items-center mb-4">
          <div>
            <h3 style="font-size:var(--fs-lg);font-weight:700;color:var(--clr-navy)">Your Applications</h3>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="navigate('applications')">View all ${Icons.arrowRight}</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:var(--space-3)">
          ${APPLICATIONS.filter(a => a.userId === user.id).map(app => `
            <div class="app-status-card">
              <div class="status-indicator status-${app.status.toLowerCase().replace(' ','-')}"></div>
              <div style="flex:1">
                <div style="font-weight:600;font-size:var(--fs-sm);color:var(--clr-navy)">${app.schemeName}</div>
                <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">Applied ${formatDate(app.appliedDate)}</div>
              </div>
              <span class="badge ${getStatusBadge(app.status)}">${app.status}</span>
              <button class="btn btn-ghost btn-sm" onclick="navigate('applications')">${Icons.eye}</button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Right Sidebar -->
      <div>
        <!-- Quick Actions -->
        <h4 style="font-size:var(--fs-base);font-weight:700;color:var(--clr-navy);margin-bottom:var(--space-4)">Quick Actions</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-6)">
          ${[
            { label: 'Check Eligibility', icon: Icons.check, color: 'var(--clr-primary)', bg: 'var(--clr-primary-light)', page: 'eligibility' },
            { label: 'Find Schemes', icon: Icons.search, color: 'var(--clr-teal)', bg: 'var(--clr-teal-light)', page: 'find-schemes' },
            { label: 'Recommendations', icon: Icons.spark, color: '#8B5CF6', bg: '#F3E8FF', page: 'recommendations' },
            { label: 'Saved Schemes', icon: Icons.bookmark, color: 'var(--clr-amber-dark)', bg: 'var(--clr-amber-light)', page: 'saved' },
          ].map(a => `
            <div class="quick-action" onclick="navigate('${a.page}')">
              <div class="quick-action-icon" style="background:${a.bg};color:${a.color}">${a.icon}</div>
              <span style="font-size:var(--fs-xs);font-weight:600;color:var(--clr-navy)">${a.label}</span>
            </div>
          `).join('')}
        </div>

        <!-- Notifications -->
        <div class="flex justify-between items-center mb-4">
          <h4 style="font-size:var(--fs-base);font-weight:700;color:var(--clr-navy)">Notifications</h4>
          <button class="btn btn-ghost btn-sm" onclick="navigate('notifications')" style="font-size:var(--fs-xs)">View all</button>
        </div>
        <div class="card-flat">
          ${NOTIFICATIONS.slice(0, 4).map(n => `
            <div class="notif-item ${!n.read ? 'unread' : ''}" onclick="navigate('notifications')">
              <div class="notif-icon" style="background:${getNotifColor(n.type)}20;color:${getNotifColor(n.type)}">
                ${getNotifIcon(n.type)}
              </div>
              <div style="flex:1">
                <div style="font-size:var(--fs-xs);font-weight:600;color:var(--clr-navy)">${n.title}</div>
                <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${n.time}</div>
              </div>
              ${!n.read ? `<div class="dot" style="color:var(--clr-primary);flex-shrink:0"></div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    </div>
  `);
}

function dashboardSchemeRow(scheme) {
  const saved = isSaved(scheme.id);
  const catColor = getCategoryColor(scheme.category);
  return `
    <div class="flex gap-4 p-4 card-flat" style="cursor:pointer;border-radius:var(--radius-md);align-items:center"
      onclick="navigate('scheme-detail', {scheme:${scheme.id}})">
      <div style="width:44px;height:44px;border-radius:var(--radius-md);background:var(--clr-primary-light);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.25rem">
        ${CATEGORIES.find(c=>c.name===scheme.category)?.icon || '📋'}
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:600;font-size:var(--fs-sm);color:var(--clr-navy);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${scheme.name}</div>
        <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${scheme.category} • ${scheme.benefit}</div>
      </div>
      <span class="badge badge-${catColor}" style="flex-shrink:0">${scheme.status}</span>
    </div>
  `;
}

function getNotifColor(type) {
  const map = { scheme: 'var(--clr-primary)', application: 'var(--clr-green)', recommendation: '#8B5CF6', update: 'var(--clr-amber-dark)', system: 'var(--clr-text-muted)' };
  return map[type] || 'var(--clr-text-muted)';
}

function getNotifIcon(type) {
  const map = { scheme: Icons.schemes, application: Icons.checkCircle, recommendation: Icons.spark, update: Icons.info, system: Icons.bell };
  return map[type] || Icons.bell;
}
