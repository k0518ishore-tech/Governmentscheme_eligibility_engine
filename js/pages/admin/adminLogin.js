// ============================================================
// SchemeGuide — Admin Login Page
// ============================================================

function renderAdminLogin(container) {
  container.innerHTML = `
    <div style="min-height:100vh;background:linear-gradient(160deg,#091F3D 0%,#0F3460 50%,#1A4F8A 100%);display:flex;align-items:center;justify-content:center;padding:var(--space-6)">
      <div style="max-width:440px;width:100%">
        <!-- Logo -->
        <div style="text-align:center;margin-bottom:var(--space-8)">
          <div style="width:60px;height:60px;background:var(--clr-teal);border-radius:var(--radius-lg);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-4)">
            ${Icons.logo}
          </div>
          <h1 style="color:white;font-size:var(--fs-xl);margin-bottom:var(--space-2)">SchemeGuide Administration</h1>
          <p style="color:rgba(255,255,255,0.5);font-size:var(--fs-sm)">Authorized personnel only</p>
        </div>

        <div style="background:rgba(255,255,255,0.06);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.1);border-radius:var(--radius-xl);padding:var(--space-8)">
          <h2 style="color:white;font-size:var(--fs-lg);margin-bottom:var(--space-6)">Administrator Sign In</h2>

          <form onsubmit="handleAdminLogin(event)" novalidate style="display:flex;flex-direction:column;gap:var(--space-4)">
            <div class="form-group">
              <label class="form-label" style="color:rgba(255,255,255,0.7)" for="admin-email">Admin Email</label>
              <div class="input-icon-wrap">
                <span class="icon-left" style="color:rgba(255,255,255,0.4)">${Icons.mail}</span>
                <input class="input" type="email" id="admin-email" value="admin@schemeguide.in"
                  style="background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.15);color:white;"
                  placeholder="admin@schemeguide.in"/>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" style="color:rgba(255,255,255,0.7)" for="admin-pw">Password</label>
              <div class="input-icon-wrap">
                <span class="icon-left" style="color:rgba(255,255,255,0.4)">${Icons.lock}</span>
                <input class="input" type="password" id="admin-pw" value="admin123"
                  style="background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.15);color:white;"
                  placeholder="Enter admin password"/>
              </div>
            </div>
            <button type="submit" class="btn btn-lg btn-full" style="background:var(--clr-teal);color:white;border-color:var(--clr-teal);margin-top:var(--space-2)" id="admin-login-btn">
              ${Icons.lock} Sign In as Administrator
            </button>
          </form>

          <div style="margin-top:var(--space-6);padding-top:var(--space-4);border-top:1px solid rgba(255,255,255,0.1)">
            <p style="font-size:var(--fs-xs);color:rgba(255,255,255,0.4);text-align:center">
              This is a restricted administrative area. Unauthorized access is prohibited.
            </p>
            <div style="text-align:center;margin-top:var(--space-4)">
              <span onclick="navigate('home')" style="color:rgba(255,255,255,0.5);font-size:var(--fs-xs);cursor:pointer">
                ← Return to SchemeGuide
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function handleAdminLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('admin-login-btn');
  btn.disabled = true;
  btn.innerHTML = `<span class="loading-spinner" style="width:16px;height:16px;border-width:2px"></span> Verifying credentials...`;

  setTimeout(() => {
    AppState.isAdmin = true;
    AppState.currentUser = { name: 'Admin', email: 'admin@schemeguide.in' };
    showToast('Admin access granted', 'Welcome to SchemeGuide Administration.', 'success');
    navigate('admin-dashboard');
  }, 1200);
}
