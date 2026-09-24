// ============================================================
// SchemeGuide — Auth Pages (Register + Login)
// ============================================================

function renderRegister(container) {
  container.innerHTML = `
    <div class="auth-layout">
      <!-- Left Panel -->
      <div class="auth-panel">
        <div style="position:relative;z-index:1;max-width:400px;text-align:center">
          ${authIllustrationSVG()}
          <h2 style="color:white;font-size:var(--fs-2xl);margin-bottom:var(--space-4);margin-top:var(--space-6)">
            Discover support made for you
          </h2>
          <p style="color:rgba(255,255,255,0.7);font-size:var(--fs-base);line-height:1.7">
            Find government schemes and check eligibility against your profile.
          </p>
        </div>
      </div>
      <!-- Right Panel -->
      <div class="auth-form-wrap">
        <div class="auth-form-card">
          <div class="nav-logo" style="margin-bottom:var(--space-6);cursor:pointer" onclick="navigate('home')">
            <div class="nav-logo-icon">${Icons.logo}</div>
            SchemeEngine
          </div>
          <h1 class="auth-title">Create your account</h1>
          <p class="auth-subtitle">Start discovering government schemes that are right for you.</p>

          <form onsubmit="handleRegister(event)" novalidate>
            <div style="display:flex;flex-direction:column;gap:var(--space-4)">
              <div class="form-group">
                <label class="form-label" for="reg-name">Full Name</label>
                <div class="input-icon-wrap">
                  <span class="icon-left">${Icons.user}</span>
                  <input class="input" type="text" id="reg-name" placeholder="Enter your full name" required autocomplete="name"/>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="reg-email">Email Address</label>
                <div class="input-icon-wrap">
                  <span class="icon-left">${Icons.mail}</span>
                  <input class="input" type="email" id="reg-email" placeholder="you@example.com" required autocomplete="email"/>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="reg-phone">Phone Number</label>
                <div class="input-icon-wrap">
                  <span class="icon-left">${Icons.phone}</span>
                  <input class="input" type="tel" id="reg-phone" placeholder="10-digit mobile number" maxlength="10"/>
                </div>
              </div>
              <div class="grid grid-2" style="gap:var(--space-4)">
                <div class="form-group">
                  <label class="form-label" for="reg-pw">Password</label>
                  <div class="input-icon-wrap">
                    <span class="icon-left">${Icons.lock}</span>
                    <input class="input" type="password" id="reg-pw" placeholder="Min. 8 characters" required/>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label" for="reg-cpw">Confirm Password</label>
                  <div class="input-icon-wrap">
                    <span class="icon-left">${Icons.lock}</span>
                    <input class="input" type="password" id="reg-cpw" placeholder="Repeat password" required/>
                  </div>
                </div>
              </div>
              <label class="checkbox-wrap">
                <input type="checkbox" id="reg-terms" required/>
                <span style="font-size:var(--fs-sm);color:var(--clr-text-secondary)">
                  I agree to the <a href="#" style="color:var(--clr-primary);font-weight:600">Terms of Use</a> and <a href="#" style="color:var(--clr-primary);font-weight:600">Privacy Policy</a>
                </span>
              </label>
              <button type="submit" class="btn btn-primary btn-lg btn-full" id="reg-btn">
                Create Account ${Icons.arrowRight}
              </button>
            </div>
          </form>

          <div class="auth-divider"><span>or continue with</span></div>
          <div class="flex gap-3">
            <button class="btn btn-outline-navy btn-full" onclick="showToast('Google login coming soon','',  'info')">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button class="btn btn-outline-navy btn-full" onclick="showToast('DigiLocker login coming soon','',  'info')">
              🏛️ DigiLocker
            </button>
          </div>

          <p style="text-align:center;margin-top:var(--space-6);font-size:var(--fs-sm);color:var(--clr-text-muted)">
            Already have an account?
            <span onclick="navigate('login')" style="color:var(--clr-primary);font-weight:600;cursor:pointer">Sign in</span>
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderLogin(container) {
  container.innerHTML = `
    <div class="auth-layout">
      <!-- Left Panel -->
      <div class="auth-panel">
        <div style="position:relative;z-index:1;max-width:400px;text-align:center">
          ${authIllustrationSVG()}
          <h2 style="color:white;font-size:var(--fs-2xl);margin-bottom:var(--space-4);margin-top:var(--space-6)">
            Welcome back to SchemeEngine
          </h2>
          <p style="color:rgba(255,255,255,0.7);font-size:var(--fs-base);line-height:1.7">
            Access your scheme recommendations, eligibility history, and application status.
          </p>
        </div>
      </div>
      <!-- Right Panel -->
      <div class="auth-form-wrap">
        <div class="auth-form-card">
          <div class="nav-logo" style="margin-bottom:var(--space-6);cursor:pointer" onclick="navigate('home')">
            <div class="nav-logo-icon">${Icons.logo}</div>
            SchemeEngine
          </div>
          <h1 class="auth-title">Sign in to your account</h1>
          <p class="auth-subtitle">Enter your credentials below to access your citizen portal.</p>

          <form onsubmit="handleLogin(event)" novalidate>
            <div style="display:flex;flex-direction:column;gap:var(--space-4)">
              <div class="form-group">
                <label class="form-label" for="login-email">Email Address</label>
                <div class="input-icon-wrap">
                  <span class="icon-left">${Icons.mail}</span>
                  <input class="input" type="email" id="login-email" placeholder="you@example.com" required autocomplete="email"/>
                </div>
              </div>
              <div class="form-group">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-1)">
                  <label class="form-label" for="login-pw" style="margin-bottom:0">Password</label>
                  <a href="#" onclick="showToast('Password reset link sent to your email','', 'info');return false" style="font-size:var(--fs-xs);color:var(--clr-primary)">Forgot password?</a>
                </div>
                <div class="input-icon-wrap">
                  <span class="icon-left">${Icons.lock}</span>
                  <input class="input" type="password" id="login-pw" placeholder="Enter your password" required autocomplete="current-password"/>
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-lg btn-full" id="login-btn">
                Sign In ${Icons.arrowRight}
              </button>
            </div>
          </form>

          <div class="auth-divider"><span>or continue with</span></div>
          <div class="flex gap-3">
            <button class="btn btn-outline-navy btn-full" onclick="showToast('Google login coming soon','', 'info')">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button class="btn btn-outline-navy btn-full" onclick="showToast('DigiLocker login coming soon','', 'info')">
              🏛️ DigiLocker
            </button>
          </div>

          <p style="text-align:center;margin-top:var(--space-6);font-size:var(--fs-sm);color:var(--clr-text-muted)">
            Don't have an account?
            <span onclick="navigate('register')" style="color:var(--clr-primary);font-weight:600;cursor:pointer">Create account</span>
          </p>

          <div style="text-align:center;margin-top:var(--space-4)">
            <span onclick="navigate('admin-login')" style="color:var(--clr-text-muted);font-size:var(--fs-xs);cursor:pointer">
              🛡️ Go to Admin Portal
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const pw = document.getElementById('reg-pw').value;
  const cpw = document.getElementById('reg-cpw').value;
  const terms = document.getElementById('reg-terms').checked;

  if (!name) return showToast('Full name required', '', 'error');
  if (!email || !email.includes('@')) return showToast('Valid email required', '', 'error');
  if (pw.length < 8) return showToast('Password too short', 'Minimum 8 characters', 'error');
  if (pw !== cpw) return showToast('Passwords do not match', '', 'error');
  if (!terms) return showToast('Please accept terms', '', 'error');

  const btn = document.getElementById('reg-btn');
  btn.disabled = true;
  btn.innerHTML = `<span class="loading-spinner" style="width:18px;height:18px;border-width:2px"></span> Creating account...`;

  try {
    const res = await AuthAPI.register({ name, email, password: pw, phone });
    setToken(res.data.token);
    AppState.currentUser = res.data.user;
    AppState.isAdmin = res.data.user.role === 'admin';
    await syncSavedSchemes();
    showToast('Account created!', `Welcome to SchemeGuide, ${name.split(' ')[0]}!`, 'success');
    navigate('dashboard');
  } catch (err) {
    showToast('Registration failed', err.message || 'Error creating account', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `Create Account ${Icons.arrowRight}`;
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const pw = document.getElementById('login-pw').value;

  if (!email) return showToast('Email required', '', 'error');
  if (!pw)    return showToast('Password required', '', 'error');

  const btn = document.getElementById('login-btn');
  btn.disabled = true;
  btn.innerHTML = `<span class="loading-spinner" style="width:18px;height:18px;border-width:2px"></span> Signing in...`;

  try {
    const res = await AuthAPI.login({ email, password: pw });
    setToken(res.data.token);
    AppState.currentUser = res.data.user;
    AppState.isAdmin = res.data.user.role === 'admin';
    await syncSavedSchemes();
    showToast('Welcome back!', `Good to see you, ${(res.data.user.name || 'User').split(' ')[0]}!`, 'success');
    if (AppState.isAdmin) {
      navigate('admin-dashboard');
    } else {
      navigate('dashboard');
    }
  } catch (err) {
    showToast('Login failed', err.message || 'Invalid email or password', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `Sign In ${Icons.arrowRight}`;
  }
}

function authIllustrationSVG() {
  return `
    <svg width="220" height="180" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="110" cy="90" r="80" fill="rgba(255,255,255,0.06)"/>
      <rect x="40" y="50" width="140" height="90" rx="12" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
      <rect x="56" y="66" width="60" height="8" rx="4" fill="rgba(255,255,255,0.3)"/>
      <rect x="56" y="82" width="108" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>
      <rect x="56" y="96" width="90" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>
      <rect x="56" y="114" width="50" height="20" rx="8" fill="#00897B"/>
      <circle cx="170" cy="55" r="20" fill="rgba(0,191,165,0.2)" stroke="#00BFA5" stroke-width="1.5"/>
      <path d="M163 55l5 5 10-10" stroke="#00BFA5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}
