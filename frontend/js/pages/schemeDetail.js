// ============================================================
// SchemeGuide — Scheme Detail Page
// ============================================================

async function renderSchemeDetail(container) {
  let scheme = SCHEMES.find(s => String(s.id) === String(AppState.selectedScheme));
  if (!scheme && AppState.selectedScheme) {
    try {
      const response = await SchemeAPI.getById(AppState.selectedScheme);
      if (response.data.scheme) scheme = mapBackendScheme(response.data.scheme);
    } catch (error) {
      showToast('Could not load scheme', error.message || 'The scheme may have been removed.', 'error');
    }
  }
  if (!scheme) {
    container.innerHTML = appLayout('find-schemes', '<div class="empty-state"><div class="empty-state-title">Scheme not found</div><button class="btn btn-primary" onclick="navigate(\'find-schemes\')">Browse schemes</button></div>');
    return;
  }
  const saved = isSaved(scheme.id);
  const user = AppState.currentUser;
  const eligResult = user ? checkEligibility(scheme, user) : null;

  container.innerHTML = appLayout('find-schemes', `
    <!-- Hero -->
    <div class="scheme-detail-hero" style="margin:-2rem -2rem 0;padding:var(--space-10) var(--space-8)">
      <div class="breadcrumb mb-4" style="color:rgba(255,255,255,0.6)">
        <span class="breadcrumb-item" style="color:rgba(255,255,255,0.6)" onclick="navigate('find-schemes')">Find Schemes</span>
        <span class="breadcrumb-sep" style="color:rgba(255,255,255,0.3)">${Icons.chevronRight}</span>
        <span class="breadcrumb-item current" style="color:white">${scheme.name}</span>
      </div>
      <div class="flex justify-between items-start flex-wrap gap-6">
        <div style="max-width:640px">
          <div class="flex gap-2 mb-3 flex-wrap">
            <span class="badge badge-teal">${scheme.category}</span>
            <span class="badge" style="background:rgba(255,255,255,0.15);color:white">${scheme.state}</span>
            <span class="badge ${getStatusBadge(scheme.status)}">${scheme.status}</span>
          </div>
          <h1 style="color:white;font-size:var(--fs-2xl);margin-bottom:var(--space-3)">${scheme.name}</h1>
          <p style="color:rgba(255,255,255,0.75);font-size:var(--fs-base);line-height:1.7">${scheme.shortDesc}</p>
          <div class="flex gap-4 mt-4 flex-wrap">
            <span style="font-size:var(--fs-xs);color:rgba(255,255,255,0.5)">${Icons.building} ${scheme.department}</span>
            <span style="font-size:var(--fs-xs);color:rgba(255,255,255,0.5)">${Icons.tag} Updated ${formatDate(scheme.lastUpdated)}</span>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:var(--space-3)">
          <button class="btn btn-lg" style="background:var(--clr-teal);color:white;border-color:var(--clr-teal)" onclick="navigate('eligibility', {scheme:'${scheme.id}'})">
            ${Icons.check} Check My Eligibility
          </button>
          <button class="btn btn-lg" style="background:rgba(255,255,255,0.15);color:white;border-color:rgba(255,255,255,0.2)">
            ${Icons.externalLink} Visit Official Website
          </button>
          <button class="save-btn ${saved ? 'saved' : ''}" data-id="${scheme.id}"
            style="background:rgba(255,255,255,0.1);border:1.5px solid rgba(255,255,255,0.2);border-radius:var(--radius-md);padding:var(--space-2) var(--space-4);color:${saved ? 'var(--clr-amber)' : 'rgba(255,255,255,0.6)'};cursor:pointer;display:flex;align-items:center;gap:var(--space-2);font-size:var(--fs-sm);font-weight:600"
            onclick="toggleSave('${scheme.id}')">
            ${saved ? Icons.bookmarkFilled : Icons.bookmark} ${saved ? 'Saved' : 'Save Scheme'}
          </button>
        </div>
      </div>
    </div>

    <div style="margin-top:var(--space-6)">
      <div class="grid" style="grid-template-columns:1fr 340px;gap:var(--space-6);align-items:start">
        <!-- Main Content -->
        <div>
          <!-- Collapsible Sections -->
          ${schemeSection('Overview', `<p style="color:var(--clr-text-secondary);line-height:1.8">${scheme.description}</p>`, true)}

          ${schemeSection('Benefits', `
            <div style="background:var(--clr-teal-light);border:1px solid var(--clr-teal);border-radius:var(--radius-md);padding:var(--space-4) var(--space-5);margin-bottom:var(--space-4)">
              <div style="font-size:var(--fs-xs);color:var(--clr-teal);font-weight:700;text-transform:uppercase;margin-bottom:var(--space-1)">Main Benefit</div>
              <div style="font-size:var(--fs-xl);font-weight:800;color:var(--clr-teal)">${scheme.benefit}</div>
            </div>
            <p style="color:var(--clr-text-secondary)">${scheme.benefitDetail}</p>
          `)}

          ${schemeSection('Eligibility Criteria', `
            <div style="display:flex;flex-direction:column;gap:var(--space-3)">
              ${scheme.criteria.map(c => `
                <div class="criteria-row criteria-met">
                  <div>
                    <div style="font-size:var(--fs-xs);color:var(--clr-text-muted);font-weight:600;text-transform:uppercase">${c.label}</div>
                    <div style="font-size:var(--fs-sm);font-weight:600;color:var(--clr-navy)">${c.requirement}</div>
                  </div>
                  <span style="color:var(--clr-teal)">${Icons.checkCircle}</span>
                </div>
              `).join('')}
            </div>
          `)}

          ${schemeSection('Required Documents', `
            <div style="display:flex;flex-direction:column;gap:var(--space-2)">
              ${scheme.documents.map(doc => `
                <div class="doc-item">
                  <div class="doc-icon">${Icons.schemes}</div>
                  <span style="font-size:var(--fs-sm);font-weight:500;color:var(--clr-navy)">${doc}</span>
                </div>
              `).join('')}
            </div>
          `)}

          ${schemeSection('Application Process', `
            <div style="display:flex;flex-direction:column;gap:var(--space-3)">
              ${scheme.applicationProcess.map((step, i) => `
                <div class="flex gap-3 items-start">
                  <div style="width:28px;height:28px;border-radius:50%;background:var(--clr-primary);color:white;display:flex;align-items:center;justify-content:center;font-size:var(--fs-xs);font-weight:700;flex-shrink:0">${i+1}</div>
                  <p style="color:var(--clr-text-secondary);padding-top:4px">${step}</p>
                </div>
              `).join('')}
            </div>
            <div class="alert alert-info" style="margin-top:var(--space-4)">
              ${Icons.info} Applications are processed through the official government portal. SchemeGuide does not process applications.
            </div>
          `)}
        </div>

        <!-- Sidebar -->
        <div style="position:sticky;top:calc(var(--header-h) + var(--space-4))">
          <!-- Eligibility Card -->
          ${user && eligResult ? `
            <div class="card" style="margin-bottom:var(--space-4);border-color:${eligResult.eligible ? 'var(--clr-teal)' : 'var(--clr-amber)'}">
              <div class="card-body">
                <div style="font-size:var(--fs-xs);font-weight:700;text-transform:uppercase;color:var(--clr-text-muted);margin-bottom:var(--space-3)">Your Eligibility</div>
                <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-4)">
                  <div style="width:44px;height:44px;border-radius:50%;background:${eligResult.eligible ? 'var(--clr-teal)' : 'var(--clr-amber)'};display:flex;align-items:center;justify-content:center;color:white">
                    ${eligResult.eligible ? Icons.checkCircle : Icons.alertCircle}
                  </div>
                  <div>
                    <div style="font-weight:700;color:var(--clr-navy)">${eligResult.eligible ? 'Likely Eligible' : 'May Not Qualify'}</div>
                    <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">Based on your profile</div>
                  </div>
                </div>
                <button class="btn btn-primary btn-full" onclick="navigate('eligibility', {scheme:'${scheme.id}'})">
                  View Full Eligibility Check
                </button>
              </div>
            </div>
          ` : ''}

          <!-- Apply Card -->
          <div class="card" style="margin-bottom:var(--space-4)">
            <div class="card-body">
              <h5 style="color:var(--clr-navy);margin-bottom:var(--space-3)">Ready to apply?</h5>
              <p style="font-size:var(--fs-sm);color:var(--clr-text-muted);margin-bottom:var(--space-4)">Send an application request to SchemeGuide administrators. They can review it and follow up; final applications are completed with the issuing department.</p>
              ${user ? `<button class="btn btn-teal btn-full" onclick="startSchemeApplication('${scheme.id}')">${Icons.folder} Apply for this Scheme</button>` : '<button class="btn btn-teal btn-full" onclick="navigate(\'login\')">Sign in to apply</button>'}
              ${scheme.applicationURL ? `<a href="${scheme.applicationURL}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-full" style="margin-top:var(--space-3)">${Icons.externalLink} Official application portal</a>` : '<p class="alert alert-info" style="margin-top:var(--space-3)">An official application link has not been provided.</p>'}
              ${scheme.sourceURL ? `<a href="${scheme.sourceURL}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-full" style="margin-top:var(--space-3)">Official scheme source ${Icons.externalLink}</a>` : ''}
              ${scheme.eligibilitySourceURL ? `<a href="${scheme.eligibilitySourceURL}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-full" style="margin-top:var(--space-3)">Eligibility guidelines ${Icons.externalLink}</a>` : ''}
            </div>
          </div>

          <!-- Related Schemes -->
          <div class="card">
            <div style="padding:var(--space-4) var(--space-5);border-bottom:1px solid var(--clr-border)">
              <h5 style="color:var(--clr-navy);font-size:var(--fs-sm)">Similar Schemes</h5>
            </div>
            <div>
              ${SCHEMES.filter(s => s.id !== scheme.id && s.category === scheme.category).slice(0, 3).map(s => `
                <div class="flex gap-3 p-4 items-center" style="border-bottom:1px solid var(--clr-border-light);cursor:pointer" onclick="navigate('scheme-detail', {scheme:'${s.id}'})">
                  <div style="font-size:1.25rem">${CATEGORIES.find(c=>c.name===s.category)?.icon || '📋'}</div>
                  <div style="flex:1;min-width:0">
                    <div style="font-size:var(--fs-xs);font-weight:600;color:var(--clr-navy);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.name}</div>
                    <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${s.benefit}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `);

  // Collapsible sections
  document.querySelectorAll('.scheme-section-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const icon = header.querySelector('.expand-icon');
      const isOpen = body.style.display !== 'none';
      body.style.display = isOpen ? 'none' : 'block';
      if (icon) icon.style.transform = isOpen ? 'rotate(-90deg)' : 'rotate(0deg)';
    });
  });
}

const applicationFieldLabels = {
  phone: 'Phone number', age: 'Age', gender: 'Gender', state: 'State', district: 'District',
  category: 'Social category', occupation: 'Occupation', annualIncome: 'Annual household income (₹)',
  education: 'Education', maritalStatus: 'Marital status', disabilityStatus: 'Do you have a disability?',
  minorityStatus: 'Do you belong to a minority community?', ruralUrban: 'Residence type',
};
const applicationFieldOptions = {
  gender: ['Male', 'Female', 'Other', 'Prefer not to say'],
  category: ['General', 'OBC', 'SC', 'ST', 'Minority', 'EWS'],
  occupation: ['Student', 'Employed', 'Self-Employed', 'Farmer', 'Unemployed', 'Homemaker', 'Retired', 'Other'],
  education: ['No Formal Education', 'Primary', 'Secondary', 'Higher Secondary', 'Diploma', "Bachelor's Degree", "Master's Degree", 'Doctorate'],
  maritalStatus: ['Single', 'Married', 'Widowed', 'Divorced'],
  ruralUrban: ['Rural', 'Urban', 'Semi-Urban'],
};

function escapeApplicationHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function applicationFieldsForScheme(scheme) {
  const rules = scheme._eligibilityRules || {};
  const fields = new Set(['phone']);
  if (rules.age?.min != null || rules.age?.max != null) fields.add('age');
  if (rules.gender?.length) fields.add('gender');
  if (rules.states?.length) fields.add('state');
  if (rules.districts?.length) fields.add('district');
  if (rules.categories?.length) fields.add('category');
  if (rules.occupations?.length) fields.add('occupation');
  if (rules.minAnnualIncome != null || rules.maxAnnualIncome != null) fields.add('annualIncome');
  if (rules.education?.length) fields.add('education');
  if (rules.maritalStatus?.length) fields.add('maritalStatus');
  if (rules.disabilityRequired) fields.add('disabilityStatus');
  if (rules.minorityRequired) fields.add('minorityStatus');
  if (rules.ruralUrban?.length) fields.add('ruralUrban');
  return [...fields];
}

function startSchemeApplication(schemeId) {
  if (!AppState.currentUser) return navigate('login');
  const scheme = SCHEMES.find(item => String(item.id) === String(schemeId));
  if (!scheme) return showToast('Scheme unavailable', 'Refresh the page and try again.', 'error');
  const profile = AppState.currentUser.profile || {};
  const fields = applicationFieldsForScheme(scheme);
  const controls = fields.map(key => {
    const val = key === 'phone' ? AppState.currentUser.phone : profile[key];
    const label = applicationFieldLabels[key];
    const required = 'required';
    if (['disabilityStatus', 'minorityStatus'].includes(key)) {
      return `<div class="form-group"><label class="form-label" for="apply-${key}">${label} *</label><select class="select" id="apply-${key}" ${required}><option value="">Choose an answer</option><option value="true" ${val === true ? 'selected' : ''}>Yes</option><option value="false" ${val === false ? 'selected' : ''}>No</option></select></div>`;
    }
    if (applicationFieldOptions[key]) {
      return `<div class="form-group"><label class="form-label" for="apply-${key}">${label} *</label><select class="select" id="apply-${key}" ${required}><option value="">Select ${label.toLowerCase()}</option>${applicationFieldOptions[key].map(option => `<option value="${escapeApplicationHTML(option)}" ${val === option ? 'selected' : ''}>${escapeApplicationHTML(option)}</option>`).join('')}</select></div>`;
    }
    const type = ['age', 'annualIncome'].includes(key) ? 'number' : key === 'phone' ? 'tel' : 'text';
    return `<div class="form-group"><label class="form-label" for="apply-${key}">${label} *</label><input class="input" id="apply-${key}" type="${type}" ${type === 'number' ? 'min="0"' : type === 'tel' ? 'inputmode="tel" autocomplete="tel"' : ''} value="${escapeApplicationHTML(val)}" ${required}></div>`;
  }).join('');
  showModal(`<div class="modal-header"><div class="modal-title">Apply for ${escapeApplicationHTML(scheme.name)}</div><button class="modal-close" onclick="closeModal()">${Icons.x}</button></div>
    <div class="modal-body"><p class="form-hint" style="margin-bottom:var(--space-4)">Your account name and email are included. Fill in the missing details below. This request is sent to SchemeGuide admins for review; the government portal makes the official decision.</p>
      <div class="grid grid-2" style="gap:var(--space-4)">${controls}</div>
      <div class="form-group"><label class="form-label" for="apply-notes">Additional information (optional)</label><textarea class="textarea" id="apply-notes" rows="3" placeholder="Add a note for the administrator"></textarea></div>
    </div><div class="modal-footer"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" id="apply-submit" onclick="submitSchemeApplication('${scheme.id}')">Submit application request</button></div>`, 'modal-lg');
}

async function submitSchemeApplication(schemeId) {
  const scheme = SCHEMES.find(item => String(item.id) === String(schemeId));
  if (!scheme) return;
  const details = {};
  for (const field of applicationFieldsForScheme(scheme)) {
    const control = document.getElementById(`apply-${field}`);
    if (!control?.value.trim()) {
      control?.focus();
      return showToast('Missing information', `Please enter ${applicationFieldLabels[field].toLowerCase()}.`, 'error');
    }
    details[field] = ['age', 'annualIncome'].includes(field) ? Number(control.value) : ['disabilityStatus', 'minorityStatus'].includes(field) ? control.value === 'true' : control.value.trim();
  }
  const button = document.getElementById('apply-submit');
  if (button) { button.disabled = true; button.textContent = 'Submitting…'; }
  try {
    const response = await ApplicationAPI.create({ schemeId, notes: document.getElementById('apply-notes')?.value.trim(), applicantDetails: details });
    closeModal();
    if (response.data.notificationWarning) showToast('Request saved', response.data.notificationWarning, 'warning');
    else showToast('Application request sent', 'Your request was saved and the admin team was notified.', 'success');
    navigate('applications');
  } catch (error) {
    showToast('Could not submit application', error.message || 'Please check the information and try again.', 'error');
    if (button) { button.disabled = false; button.textContent = 'Submit application request'; }
  }
}

function schemeSection(title, content, defaultOpen = false) {
  return `
    <div class="scheme-section">
      <div class="scheme-section-header">
        <h4>${title}</h4>
        <span class="expand-icon" style="transition:transform var(--transition-fast);${defaultOpen ? '' : 'transform:rotate(-90deg)'}">${Icons.chevronDown}</span>
      </div>
      <div class="scheme-section-body" ${defaultOpen ? '' : 'style="display:none"'}>
        ${content}
      </div>
    </div>
  `;
}
