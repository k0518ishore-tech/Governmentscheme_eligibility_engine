// ============================================================
// SchemeGuide — Eligibility Check + Result
// ============================================================

let eligStep = 1;
const eligTotalSteps = 5;
let eligData = {};

function renderEligibility(container) {
  eligStep = 1;
  eligData = AppState.currentUser ? { ...AppState.currentUser } : {};

  container.innerHTML = appLayout('eligibility', `
    <div class="page-header">
      <h1 class="page-title">Let's check what you're eligible for</h1>
      <p class="page-subtitle">Answer a few questions and we'll show you which schemes you qualify for.</p>
    </div>

    <div class="container-sm" style="margin:0">
      <!-- Step Progress -->
      <div class="card" style="margin-bottom:var(--space-6)">
        <div class="card-body">
          <div class="step-progress" id="elig-steps">
            ${renderStepProgress()}
          </div>
          <div class="flex justify-between mt-3" style="padding:0 4px">
            ${['Personal','Financial','Education','Location','Review'].map((l, i) => `
              <div class="step-label ${i+1===eligStep ? 'active' : i+1<eligStep ? 'complete' : ''}">${l}</div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Step Content -->
      <div class="card" id="elig-form-card">
        <div class="card-body">
          <div id="elig-step-content">
            ${renderEligStepContent()}
          </div>
          <div class="flex justify-between items-center" style="margin-top:var(--space-6);padding-top:var(--space-4);border-top:1px solid var(--clr-border)">
            <button class="btn btn-outline-navy" onclick="eligPrev()" ${eligStep === 1 ? 'style="visibility:hidden"' : ''}>
              ${Icons.arrowLeft} Back
            </button>
            <span style="font-size:var(--fs-xs);color:var(--clr-text-muted)">Step ${eligStep} of ${eligTotalSteps}</span>
            ${eligStep < eligTotalSteps ? `
              <button class="btn btn-primary" onclick="eligNext()">
                Continue ${Icons.arrowRight}
              </button>
            ` : `
              <button class="btn btn-teal btn-lg" onclick="runEligibilityCheck()" id="check-btn">
                ${Icons.check} Check Eligibility
              </button>
            `}
          </div>
        </div>
      </div>
    </div>
  `);
}

function renderStepProgress() {
  return Array.from({length: eligTotalSteps}, (_, i) => {
    const n = i + 1;
    const cls = n < eligStep ? 'complete' : n === eligStep ? 'active' : 'pending';
    return `
      ${i > 0 ? `<div class="step-line ${i < eligStep ? 'done' : ''}"></div>` : ''}
      <div class="step-circle ${cls}">${n < eligStep ? Icons.check : n}</div>
    `;
  }).join('');
}

function renderEligStepContent() {
  const steps = [
    // Step 1: Personal
    `<h4 style="color:var(--clr-navy);margin-bottom:var(--space-5)">Personal Information</h4>
    <div class="grid grid-2" style="gap:var(--space-4)">
      <div class="form-group">
        <label class="form-label">Age</label>
        <input class="input" type="number" id="e-age" value="${eligData.age || ''}" placeholder="Your age" min="1" max="120"/>
      </div>
      <div class="form-group">
        <label class="form-label">Gender</label>
        <select class="select" id="e-gender">
          <option value="">Select gender</option>
          ${['Male','Female','Other'].map(g => `<option ${eligData.gender===g?'selected':''}>${g}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Disability Status</label>
        <select class="select" id="e-disability">
          <option value="false" ${!eligData.disability?'selected':''}>No disability</option>
          <option value="true" ${eligData.disability?'selected':''}>Person with Disability</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Marital Status</label>
        <select class="select" id="e-marital">
          <option>Single</option><option>Married</option><option>Widowed</option><option>Divorced</option>
        </select>
      </div>
    </div>`,

    // Step 2: Financial
    `<h4 style="color:var(--clr-navy);margin-bottom:var(--space-5)">Financial Information</h4>
    <div class="form-group" style="margin-bottom:var(--space-4)">
      <label class="form-label">Annual Family Income (₹)</label>
      <div class="input-icon-wrap">
        <span class="icon-left" style="font-size:var(--fs-sm);font-weight:700">₹</span>
        <input class="input" type="number" id="e-income" value="${eligData.income || ''}" placeholder="e.g. 180000" style="padding-left:2.5rem"/>
      </div>
      <div class="form-hint">Enter total annual income of your household. This is used only to check eligibility.</div>
    </div>
    <div class="form-group">
      <label class="form-label">BPL Card Holder</label>
      <div class="flex gap-4 mt-2">
        <label class="radio-wrap"><input type="radio" name="bpl" value="yes"/> Yes, I have a BPL card</label>
        <label class="radio-wrap"><input type="radio" name="bpl" value="no" checked/> No</label>
      </div>
    </div>`,

    // Step 3: Education
    `<h4 style="color:var(--clr-navy);margin-bottom:var(--space-5)">Education & Employment</h4>
    <div class="grid grid-2" style="gap:var(--space-4)">
      <div class="form-group">
        <label class="form-label">Highest Education</label>
        <select class="select" id="e-edu">
          <option value="">Select education level</option>
          ${['No Formal Education','Primary','Secondary','Higher Secondary','Diploma',"Bachelor's Degree","Master's Degree",'Doctorate'].map(e => `<option ${eligData.education===e?'selected':''}>${e}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Occupation</label>
        <select class="select" id="e-occ">
          <option value="">Select occupation</option>
          ${['Student','Employed','Self-Employed','Farmer','Unemployed','Homemaker','Retired','Other'].map(o => `<option ${eligData.occupation===o?'selected':''}>${o}</option>`).join('')}
        </select>
      </div>
      <div class="form-group" style="grid-column:span 2">
        <label class="form-label">Community / Category</label>
        <select class="select" id="e-comm">
          <option value="">Select category</option>
          ${['General','OBC','SC','ST','Minority','EWS'].map(c => `<option ${eligData.community===c?'selected':''}>${c}</option>`).join('')}
        </select>
        <div class="form-hint">Your social category is used to check reservation-based scheme eligibility.</div>
      </div>
    </div>`,

    // Step 4: Location
    `<h4 style="color:var(--clr-navy);margin-bottom:var(--space-5)">Location Details</h4>
    <div class="grid grid-2" style="gap:var(--space-4)">
      <div class="form-group">
        <label class="form-label">State</label>
        <select class="select" id="e-state">
          ${STATES.map(s => `<option ${eligData.state===s?'selected':''}>${s}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">District</label>
        <input class="input" type="text" id="e-dist" value="${eligData.district || ''}" placeholder="Enter your district"/>
      </div>
      <div class="form-group">
        <label class="form-label">Area Type</label>
        <div class="flex gap-4 mt-2">
          <label class="radio-wrap"><input type="radio" name="area" value="Urban" ${eligData.area==='Urban'?'checked':''}/> Urban</label>
          <label class="radio-wrap"><input type="radio" name="area" value="Rural" ${eligData.area==='Rural'?'checked':''}/> Rural</label>
          <label class="radio-wrap"><input type="radio" name="area" value="Semi-Urban" ${eligData.area==='Semi-Urban'?'checked':''}/> Semi-Urban</label>
        </div>
      </div>
    </div>`,

    // Step 5: Review
    `<h4 style="color:var(--clr-navy);margin-bottom:var(--space-5)">Review Your Information</h4>
    <div class="alert alert-info mb-4">
      ${Icons.info} Please review the details below before checking eligibility. You can go back to make changes.
    </div>
    <div style="display:flex;flex-direction:column;gap:var(--space-3)">
      ${[
        ['Age', eligData.age || 'Not provided'],
        ['Gender', eligData.gender || 'Not provided'],
        ['Annual Income', eligData.income ? formatCurrency(eligData.income) : 'Not provided'],
        ['Education', eligData.education || 'Not provided'],
        ['Occupation', eligData.occupation || 'Not provided'],
        ['Community', eligData.community || 'Not provided'],
        ['State', eligData.state || 'Not provided'],
        ['Disability', eligData.disability ? 'Yes' : 'No'],
      ].map(([k, v]) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:var(--space-3) var(--space-4);background:var(--clr-bg-alt);border-radius:var(--radius-md)">
          <span style="font-size:var(--fs-sm);color:var(--clr-text-muted)">${k}</span>
          <span style="font-size:var(--fs-sm);font-weight:600;color:var(--clr-navy)">${v}</span>
        </div>
      `).join('')}
    </div>`,
  ];

  return steps[eligStep - 1] || steps[0];
}

function eligNext() {
  saveCurrentStep();
  if (eligStep < eligTotalSteps) {
    eligStep++;
    updateEligUI();
  }
}

function eligPrev() {
  if (eligStep > 1) {
    eligStep--;
    updateEligUI();
  }
}

function saveCurrentStep() {
  const getVal = id => document.getElementById(id)?.value;
  if (eligStep === 1) {
    eligData.age = parseInt(getVal('e-age')) || '';
    eligData.gender = getVal('e-gender');
    eligData.disability = getVal('e-disability') === 'true';
  } else if (eligStep === 2) {
    eligData.income = parseInt(getVal('e-income')) || '';
  } else if (eligStep === 3) {
    eligData.education = getVal('e-edu');
    eligData.occupation = getVal('e-occ');
    eligData.community = getVal('e-comm');
  } else if (eligStep === 4) {
    eligData.state = getVal('e-state');
    eligData.district = getVal('e-dist');
    eligData.area = document.querySelector('input[name="area"]:checked')?.value || '';
  }
}

function updateEligUI() {
  document.getElementById('elig-steps').innerHTML = renderStepProgress();
  document.getElementById('elig-step-content').innerHTML = renderEligStepContent();
  // Update button
  const prev = document.querySelector('[onclick="eligPrev()"]');
  if (prev) prev.style.visibility = eligStep === 1 ? 'hidden' : 'visible';
}

async function runEligibilityCheck() {
  saveCurrentStep();
  const btn = document.getElementById('check-btn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="loading-spinner" style="width:16px;height:16px;border-width:2px"></span> Checking your details against scheme requirements...`;
  }

  // Map frontend field names to backend expected keys
  const profilePayload = {
    age: eligData.age,
    gender: eligData.gender,
    annualIncome: eligData.income,
    education: eligData.education,
    occupation: eligData.occupation,
    category: eligData.community,
    disabilityStatus: eligData.disability,
    state: eligData.state,
    district: eligData.district,
    ruralUrban: eligData.area,
  };

  try {
    const res = await EligibilityAPI.check(profilePayload);
    // Backend returns results array
    AppState.eligibilityData = eligData;
    AppState.backendEligibilityResult = res.data;
    // Map backend results to frontend structures
    AppState.eligibilityResult = (res.data.results || []).map(r => ({
      scheme: {
        id: r.schemeId,
        _id: r.schemeId,
        name: r.schemeName,
        category: r.category,
      },
      result: {
        eligible: r.status === 'ELIGIBLE' || r.status === 'PARTIALLY_ELIGIBLE',
        status: r.status,
        score: r.score,
        results: (r.conditionResults || []).map(cr => ({
          criterion: cr.condition,
          yours: cr.userValue,
          required: cr.requiredValue,
          met: cr.status === 'passed',
        }))
      }
    }));
    navigate('eligibility-result');
  } catch (err) {
    showToast('Eligibility check failed', err.message || 'Error connecting to eligibility engine', 'error');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `${Icons.check} Check Eligibility`;
    }
  }
}

// ── Eligibility Result ────────────────────────────────────────
function renderEligibilityResult(container) {
  const results = AppState.eligibilityResult || [];
  const eligible = results.filter(r => r.result.eligible);
  const ineligible = results.filter(r => !r.result.eligible);

  // If viewing for a specific scheme
  const schemeId = AppState.selectedScheme;
  const specificResult = schemeId ? results.find(r => r.scheme.id === schemeId) : null;

  container.innerHTML = appLayout('eligibility', `
    <div class="page-header">
      <div class="breadcrumb mb-2">
        <span class="breadcrumb-item" onclick="navigate('eligibility')">Eligibility Check</span>
        <span class="breadcrumb-sep">${Icons.chevronRight}</span>
        <span class="breadcrumb-item current">Results</span>
      </div>
      <h1 class="page-title">Your Eligibility Results</h1>
    </div>

    ${specificResult ? renderSpecificResult(specificResult) : renderAllResults(eligible, ineligible)}
  `);
}

function renderSpecificResult(r) {
  const { scheme, result } = r;
  return `
    <div class="elig-result-card ${result.eligible ? 'eligible' : 'ineligible'} animate-up" style="max-width:600px;margin:0 auto var(--space-8)">
      <div class="elig-result-icon ${result.eligible ? 'eligible' : 'ineligible'}">
        ${result.eligible ? Icons.checkCircle : Icons.alertCircle}
      </div>
      <h2 style="color:var(--clr-navy);margin-bottom:var(--space-3)">${result.eligible ? 'You\'re eligible!' : 'You may not qualify for this scheme'}</h2>
      <p style="color:var(--clr-text-muted);margin-bottom:var(--space-6)">${result.eligible ? 'Based on the information you provided, you meet the current eligibility requirements for this scheme.' : 'Based on your profile, one or more eligibility criteria are not met. See details below.'}</p>
      <div style="text-align:left">${renderCriteriaRows(result.results)}</div>
    </div>
    ${!result.eligible ? ineligibleExplanation(result.results) : ''}
    <div class="flex justify-center gap-4 flex-wrap">
      ${result.eligible ? `<button class="btn btn-teal btn-lg" onclick="navigate('scheme-detail', {scheme:${scheme.id}})">View Scheme & Apply</button>` : ''}
      <button class="btn btn-outline btn-lg" onclick="navigate('recommendations')">Explore Similar Schemes</button>
      <button class="btn btn-ghost btn-lg" onclick="navigate('eligibility')">Check Again</button>
    </div>
  `;
}

function renderAllResults(eligible, ineligible) {
  return `
    <!-- Summary -->
    <div class="grid grid-4" style="gap:var(--space-4);margin-bottom:var(--space-8)">
      ${[
        { label: 'Eligible Schemes', val: eligible.length, color: 'var(--clr-teal)', bg: 'var(--clr-teal-light)' },
        { label: 'Total Checked', val: eligible.length + ineligible.length, color: 'var(--clr-primary)', bg: 'var(--clr-primary-light)' },
        { label: 'Not Qualifying', val: ineligible.length, color: 'var(--clr-amber-dark)', bg: 'var(--clr-amber-light)' },
        { label: 'Recommended', val: 4, color: '#8B5CF6', bg: '#F3E8FF' },
      ].map(s => `
        <div class="stat-card text-center">
          <div style="width:48px;height:48px;border-radius:50%;background:${s.bg};color:${s.color};display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-3)">${Icons.checkCircle}</div>
          <div style="font-size:var(--fs-2xl);font-weight:800;color:var(--clr-navy)">${s.val}</div>
          <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${s.label}</div>
        </div>
      `).join('')}
    </div>

    <!-- Eligible Schemes -->
    ${eligible.length > 0 ? `
      <div style="margin-bottom:var(--space-8)">
        <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-4)">
          <div style="width:32px;height:32px;border-radius:50%;background:var(--clr-teal);color:white;display:flex;align-items:center;justify-content:center">${Icons.checkCircle}</div>
          <h3 style="font-size:var(--fs-xl);color:var(--clr-navy)">Eligible Schemes (${eligible.length})</h3>
        </div>
        <div class="grid grid-auto" style="gap:var(--space-4)">
          ${eligible.map(r => schemeCardHTML(r.scheme)).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Ineligible Schemes -->
    ${ineligible.length > 0 ? `
      <div>
        <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-4)">
          <div style="width:32px;height:32px;border-radius:50%;background:var(--clr-amber-light);color:var(--clr-amber-dark);display:flex;align-items:center;justify-content:center">${Icons.alertCircle}</div>
          <h3 style="font-size:var(--fs-xl);color:var(--clr-navy)">You may not qualify for these (${ineligible.length})</h3>
        </div>
        <div style="display:flex;flex-direction:column;gap:var(--space-4)">
          ${ineligible.map(r => ineligibleCard(r)).join('')}
        </div>
      </div>
    ` : ''}
  `;
}

function renderCriteriaRows(rows) {
  return rows.map(r => `
    <div class="criteria-row ${r.met ? 'criteria-met' : 'criteria-unmet'}">
      <div style="display:flex;align-items:center;gap:var(--space-3)">
        <span style="color:${r.met ? 'var(--clr-teal)' : 'var(--clr-red)'}">${r.met ? Icons.checkCircle : Icons.xCircle}</span>
        <div>
          <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${r.criterion}</div>
          <div style="font-size:var(--fs-sm);font-weight:600;color:var(--clr-navy)">Yours: ${r.yours}</div>
        </div>
      </div>
      <div style="text-align:right">
        <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">Required</div>
        <div style="font-size:var(--fs-sm);font-weight:600;color:${r.met ? 'var(--clr-teal)' : 'var(--clr-red)'}">${r.required}</div>
      </div>
    </div>
  `).join('');
}

function ineligibleExplanation(rows) {
  const failed = rows.filter(r => !r.met);
  if (!failed.length) return '';
  return `
    <div class="card" style="max-width:600px;margin:0 auto var(--space-6);border-left:4px solid var(--clr-amber)">
      <div class="card-body">
        <h5 style="color:var(--clr-navy);margin-bottom:var(--space-3)">Why you may not qualify</h5>
        ${failed.map(f => `
          <div class="flex gap-3 mb-2">
            <span style="color:var(--clr-amber-dark);flex-shrink:0">${Icons.alertCircle}</span>
            <p style="font-size:var(--fs-sm)">Your ${f.criterion.toLowerCase()} (${f.yours}) does not meet the requirement of ${f.required}.</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function ineligibleCard(r) {
  const failed = r.result.results.filter(cr => !cr.met);
  return `
    <div class="card" style="border-left:3px solid var(--clr-amber)">
      <div class="card-body">
        <div class="flex justify-between items-start flex-wrap gap-4">
          <div style="flex:1">
            <div style="font-weight:700;color:var(--clr-navy);margin-bottom:var(--space-2)">${r.scheme.name}</div>
            <span class="badge badge-amber">${r.scheme.category}</span>
            ${failed.map(f => `
              <div class="flex gap-2 items-center mt-2">
                <span style="color:var(--clr-red)">${Icons.xCircle}</span>
                <span style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${f.criterion}: ${f.yours} (Required: ${f.required})</span>
              </div>
            `).join('')}
          </div>
          <button class="btn btn-sm btn-outline" onclick="navigate('scheme-detail', {scheme:${r.scheme.id}})">View Details</button>
        </div>
      </div>
    </div>
  `;
}
