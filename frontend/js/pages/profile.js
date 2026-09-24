// ============================================================
// SchemeGuide — User Profile Page
// ============================================================

function renderProfile(container) {
  const user = AppState.currentUser;
  const completionFields = ['name','email','age','gender','income','education','occupation','community','state','district'];
  const filled = completionFields.filter(f => user[f] && user[f] !== '').length;
  const pct = Math.round((filled / completionFields.length) * 100);

  container.innerHTML = appLayout('profile', `
    <div class="page-header">
      <div class="breadcrumb mb-2">
        <span class="breadcrumb-item" onclick="navigate('dashboard')">Dashboard</span>
        <span class="breadcrumb-sep">${Icons.chevronRight}</span>
        <span class="breadcrumb-item current">My Profile</span>
      </div>
      <h1 class="page-title">My Profile</h1>
      <p class="page-subtitle">Keep your profile updated to get accurate eligibility results and better recommendations.</p>
    </div>

    <div class="grid" style="grid-template-columns:280px 1fr;gap:var(--space-6)">
      <!-- Left: Profile Card -->
      <div>
        <div class="card">
          <div class="card-body text-center">
            <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--clr-teal),var(--clr-primary));display:flex;align-items:center;justify-content:center;font-size:var(--fs-2xl);font-weight:800;color:white;margin:0 auto var(--space-4)">
              ${getInitials(user.name)}
            </div>
            <h4 style="color:var(--clr-navy)">${user.name}</h4>
            <p style="font-size:var(--fs-sm);color:var(--clr-text-muted)">${user.email}</p>
            <div style="margin:var(--space-4) 0">
              <div class="flex justify-between mb-2">
                <span style="font-size:var(--fs-xs);color:var(--clr-text-muted)">Profile Complete</span>
                <span style="font-size:var(--fs-xs);font-weight:700;color:${pct >= 80 ? 'var(--clr-teal)' : 'var(--clr-amber-dark)'}">${pct}%</span>
              </div>
              <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
            </div>
            ${pct < 100 ? `
              <div class="alert alert-warning" style="text-align:left;font-size:var(--fs-xs)">
                ${Icons.info} Complete your profile for better scheme matches.
              </div>
            ` : `
              <div class="alert alert-success" style="text-align:left;font-size:var(--fs-xs)">
                ${Icons.checkCircle} Profile complete!
              </div>
            `}
          </div>
        </div>
      </div>

      <!-- Right: Form -->
      <div>
        <form onsubmit="saveProfile(event)" novalidate>
          <!-- Personal Info -->
          ${profileSection('Personal Information', Icons.user, `
            <div class="grid grid-2" style="gap:var(--space-4)">
              <div class="form-group">
                <label class="form-label" for="p-name">Full Name</label>
                <input class="input" type="text" id="p-name" value="${user.name || ''}" placeholder="Your full name"/>
              </div>
              <div class="form-group">
                <label class="form-label" for="p-age">Age</label>
                <input class="input" type="number" id="p-age" value="${user.age || ''}" placeholder="Your age" min="1" max="120"/>
              </div>
              <div class="form-group">
                <label class="form-label" for="p-gender">Gender</label>
                <select class="select" id="p-gender">
                  <option value="">Select gender</option>
                  ${['Male','Female','Other','Prefer not to say'].map(g => `<option ${user.gender===g?'selected':''}>${g}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="p-phone">Phone Number</label>
                <input class="input" type="tel" id="p-phone" value="${user.phone || ''}" placeholder="10-digit number"/>
              </div>
              <div class="form-group" style="grid-column:span 2">
                <label class="form-label" for="p-email">Email Address</label>
                <input class="input" type="email" id="p-email" value="${user.email || ''}" placeholder="your@email.com"/>
              </div>
            </div>
          `)}

          <!-- Financial -->
          ${profileSection('Financial Information', Icons.chart, `
            <div class="form-group">
              <label class="form-label" for="p-income">Annual Family Income (₹)</label>
              <div class="input-icon-wrap">
                <span class="icon-left" style="font-size:var(--fs-sm);font-weight:600">₹</span>
                <input class="input" type="number" id="p-income" value="${user.income || ''}" placeholder="e.g. 200000" style="padding-left:2.5rem"/>
              </div>
              <div class="form-hint">This is used to determine your eligibility for income-based schemes.</div>
            </div>
          `)}

          <!-- Education -->
          ${profileSection('Education & Occupation', Icons.schemes, `
            <div class="grid grid-2" style="gap:var(--space-4)">
              <div class="form-group">
                <label class="form-label" for="p-edu">Education Level</label>
                <select class="select" id="p-edu">
                  <option value="">Select education</option>
                  ${['No Formal Education','Primary','Secondary','Higher Secondary','Diploma',"Bachelor's Degree","Master's Degree",'Doctorate'].map(e => `<option ${user.education===e?'selected':''}>${e}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="p-occ">Occupation</label>
                <select class="select" id="p-occ">
                  <option value="">Select occupation</option>
                  ${['Student','Employed','Self-Employed','Farmer','Unemployed','Homemaker','Retired','Other'].map(o => `<option ${user.occupation===o?'selected':''}>${o}</option>`).join('')}
                </select>
              </div>
            </div>
          `)}

          <!-- Social -->
          ${profileSection('Social Information', Icons.users, `
            <div class="grid grid-2" style="gap:var(--space-4)">
              <div class="form-group">
                <label class="form-label" for="p-cat">Community / Category</label>
                <select class="select" id="p-cat">
                  <option value="">Select category</option>
                  ${['General','OBC','SC','ST','Minority','EWS'].map(c => `<option ${user.community===c?'selected':''}>${c}</option>`).join('')}
                </select>
                <div class="form-hint">Used to check caste/community-based eligibility.</div>
              </div>
              <div class="form-group">
                <label class="form-label">Disability Status</label>
                <div style="margin-top:var(--space-2)">
                  <label class="toggle" style="display:inline-block">
                    <input type="checkbox" id="p-disability" ${user.disability ? 'checked' : ''}/>
                    <span class="toggle-slider"></span>
                  </label>
                  <span style="font-size:var(--fs-sm);color:var(--clr-text-secondary);margin-left:var(--space-3)">Person with Disability</span>
                </div>
              </div>
            </div>
          `)}

          <!-- Location -->
          ${profileSection('Location', Icons.mapPin, `
            <div class="grid grid-2" style="gap:var(--space-4)">
              <div class="form-group">
                <label class="form-label" for="p-state">State</label>
                <select class="select" id="p-state">
                  ${STATES.map(s => `<option ${user.state===s?'selected':''}>${s}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="p-dist">District</label>
                <input class="input" type="text" id="p-dist" value="${user.district || ''}" placeholder="Your district"/>
              </div>
              <div class="form-group">
                <label class="form-label" for="p-area">Area Type</label>
                <select class="select" id="p-area">
                  <option ${user.area==='Urban'?'selected':''}>Urban</option>
                  <option ${user.area==='Rural'?'selected':''}>Rural</option>
                  <option ${user.area==='Semi-Urban'?'selected':''}>Semi-Urban</option>
                </select>
              </div>
            </div>
          `)}

          <div class="flex gap-4" style="margin-top:var(--space-6)">
            <button type="submit" class="btn btn-primary btn-lg" id="save-profile-btn">
              ${Icons.check} Save Changes
            </button>
            <button type="button" class="btn btn-outline-navy btn-lg" onclick="navigate('dashboard')">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `);
}

function profileSection(title, icon, content) {
  return `
    <div class="card" style="margin-bottom:var(--space-4)">
      <div style="padding:var(--space-5) var(--space-6);border-bottom:1px solid var(--clr-border);display:flex;align-items:center;gap:var(--space-3)">
        <span style="color:var(--clr-primary)">${icon}</span>
        <h4 style="font-size:var(--fs-base);font-weight:700;color:var(--clr-navy)">${title}</h4>
      </div>
      <div class="card-body">${content}</div>
    </div>
  `;
}

async function saveProfile(e) {
  e.preventDefault();
  const btn = document.getElementById('save-profile-btn');
  btn.disabled = true;
  btn.innerHTML = `<span class="loading-spinner" style="width:16px;height:16px;border-width:2px"></span> Saving...`;

  const profileData = {
    name: document.getElementById('p-name').value.trim(),
    phone: document.getElementById('p-phone').value.trim(),
    profile: {
      age: parseInt(document.getElementById('p-age').value) || undefined,
      gender: document.getElementById('p-gender').value,
      annualIncome: parseInt(document.getElementById('p-income').value) || undefined,
      education: document.getElementById('p-edu').value,
      occupation: document.getElementById('p-occ').value,
      category: document.getElementById('p-cat').value,
      disabilityStatus: document.getElementById('p-disability').checked,
      state: document.getElementById('p-state').value,
      district: document.getElementById('p-dist').value.trim(),
      ruralUrban: document.getElementById('p-area').value,
    }
  };

  try {
    const res = await UserAPI.updateProfile(profileData);
    AppState.currentUser = res.data.user;
    showToast('Profile updated!', 'Your information has been saved to the backend successfully.', 'success');
  } catch (err) {
    showToast('Update failed', err.message || 'Could not save profile', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `${Icons.check} Save Changes`;
  }
}
