// ============================================================
// SchemeGuide — Admin Eligibility Rule Management
// ============================================================

const defaultRules = {
  age: { min: 18, max: 35 },
  income: { max: 250000 },
  gender: [],
  education: [],
  occupation: ['Student'],
  community: [],
  state: ['Tamil Nadu'],
  disability: false,
};

let rules = { ...defaultRules };

function renderEligibilityRules(container) {
  container.innerHTML = appLayout('eligibility-rules', `
    <div class="page-header">
      <div class="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 class="page-title">Eligibility Rule Management</h1>
          <p class="page-subtitle">Define the eligibility criteria for each government scheme.</p>
        </div>
        <div class="flex gap-3">
          <button class="btn btn-outline" onclick="previewEligibility()">Preview Eligibility</button>
          <button class="btn btn-primary" onclick="saveRules()">Save Rules</button>
        </div>
      </div>
    </div>

    <div class="grid" style="grid-template-columns:1fr 340px;gap:var(--space-6);align-items:start">
      <!-- Rules Builder -->
      <div>
        <div style="margin-bottom:var(--space-4)">
          <label class="form-label" style="margin-bottom:var(--space-3)">Select Scheme to Configure</label>
          <select class="select" id="rule-scheme-select" onchange="loadSchemeRules(this.value)">
            ${SCHEMES.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
          </select>
        </div>

        <!-- Age Rule -->
        ${ruleCard('Age', 'Define the age range for eligibility', `
          <div class="grid grid-2" style="gap:var(--space-4)">
            <div class="form-group">
              <label class="form-label">Minimum Age</label>
              <input class="input" type="number" id="rule-age-min" value="${rules.age.min}" min="0" max="100" oninput="rules.age.min=parseInt(this.value); updateRuleSummary()"/>
            </div>
            <div class="form-group">
              <label class="form-label">Maximum Age</label>
              <input class="input" type="number" id="rule-age-max" value="${rules.age.max}" min="0" max="120" oninput="rules.age.max=parseInt(this.value); updateRuleSummary()"/>
            </div>
          </div>
        `)}

        <!-- Income Rule -->
        ${ruleCard('Income', 'Set income limits for eligibility', `
          <div class="form-group">
            <label class="form-label">Maximum Annual Income (₹)</label>
            <input class="input" type="number" id="rule-income" value="${rules.income.max}" oninput="rules.income.max=parseInt(this.value); updateRuleSummary()"/>
            <div class="form-hint">Applicants with income above this limit will not be eligible.</div>
          </div>
        `)}

        <!-- Gender Rule -->
        ${ruleCard('Gender', 'Leave blank to allow all genders', `
          <div class="flex gap-4 flex-wrap">
            ${['Male','Female','Other'].map(g => `
              <label class="checkbox-wrap">
                <input type="checkbox" onchange="toggleArrayRule('gender','${g}',this.checked); updateRuleSummary()" ${rules.gender.includes(g)?'checked':''}/>
                <span style="font-size:var(--fs-sm)">${g}</span>
              </label>
            `).join('')}
          </div>
          <div class="form-hint mt-2">If none selected, all genders are eligible.</div>
        `)}

        <!-- Education Rule -->
        ${ruleCard('Education', 'Minimum education requirements', `
          <div class="grid grid-2" style="gap:var(--space-2)">
            ${['No Formal Education','Primary','Secondary','Higher Secondary','Diploma',"Bachelor's Degree","Master's Degree",'Doctorate'].map(e => `
              <label class="checkbox-wrap">
                <input type="checkbox" onchange="toggleArrayRule('education','${e}',this.checked); updateRuleSummary()" ${rules.education.includes(e)?'checked':''}/>
                <span style="font-size:var(--fs-sm)">${e}</span>
              </label>
            `).join('')}
          </div>
        `)}

        <!-- Occupation Rule -->
        ${ruleCard('Occupation', 'Eligible occupations for this scheme', `
          <div class="grid grid-2" style="gap:var(--space-2)">
            ${['Student','Farmer','Employed','Unemployed','Self-Employed','Homemaker','Retired','All'].map(o => `
              <label class="checkbox-wrap">
                <input type="checkbox" onchange="toggleArrayRule('occupation','${o}',this.checked); updateRuleSummary()" ${rules.occupation.includes(o)?'checked':''}/>
                <span style="font-size:var(--fs-sm)">${o}</span>
              </label>
            `).join('')}
          </div>
        `)}

        <!-- Community Rule -->
        ${ruleCard('Community / Category', 'Eligible social categories', `
          <div class="flex gap-3 flex-wrap">
            ${['All','General','OBC','SC','ST','Minority','EWS'].map(c => `
              <label class="checkbox-wrap">
                <input type="checkbox" onchange="toggleArrayRule('community','${c}',this.checked); updateRuleSummary()" ${rules.community.includes(c)?'checked':''}/>
                <span style="font-size:var(--fs-sm)">${c}</span>
              </label>
            `).join('')}
          </div>
        `)}

        <!-- State Rule -->
        ${ruleCard('State Restriction', 'Leave as All States for national schemes', `
          <select class="select" multiple style="height:120px" id="rule-states" onchange="updateStateRule()">
            ${STATES.map(s => `<option ${rules.state.includes(s)?'selected':''}>${s}</option>`).join('')}
          </select>
          <div class="form-hint mt-2">Hold Ctrl/Cmd to select multiple states.</div>
        `)}

        <!-- Disability -->
        ${ruleCard('Disability', 'Scheme specifically for persons with disability', `
          <label class="toggle">
            <input type="checkbox" id="rule-disability" ${rules.disability?'checked':''} onchange="rules.disability=this.checked; updateRuleSummary()"/>
            <span class="toggle-slider"></span>
          </label>
          <span style="font-size:var(--fs-sm);color:var(--clr-text-secondary);margin-left:var(--space-3)">Only for persons with disability</span>
        `)}
      </div>

      <!-- Live Summary -->
      <div style="position:sticky;top:calc(var(--header-h) + var(--space-4))">
        <div class="card">
          <div style="padding:var(--space-5);border-bottom:1px solid var(--clr-border)">
            <h4 style="color:var(--clr-navy)">Rule Summary</h4>
            <p style="font-size:var(--fs-xs);color:var(--clr-text-muted)">Live preview of your eligibility rules</p>
          </div>
          <div class="card-body">
            <div class="rule-summary" id="rule-summary-text">
              ${generateRuleSummary()}
            </div>
            <div style="margin-top:var(--space-4);display:flex;flex-direction:column;gap:var(--space-3)">
              <button class="btn btn-primary btn-full" onclick="saveRules()">Save Rules</button>
              <button class="btn btn-outline btn-full" onclick="resetRules()">Reset to Default</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `, true);
}

function ruleCard(title, subtitle, content) {
  return `
    <div class="card" style="margin-bottom:var(--space-4)">
      <div style="padding:var(--space-4) var(--space-5);border-bottom:1px solid var(--clr-border)">
        <div style="font-weight:700;font-size:var(--fs-sm);color:var(--clr-navy)">${title}</div>
        <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${subtitle}</div>
      </div>
      <div class="card-body">${content}</div>
    </div>
  `;
}

function toggleArrayRule(field, value, checked) {
  if (checked) {
    if (!rules[field].includes(value)) rules[field].push(value);
  } else {
    rules[field] = rules[field].filter(v => v !== value);
  }
}

function updateStateRule() {
  const sel = document.getElementById('rule-states');
  rules.state = Array.from(sel.selectedOptions).map(o => o.value);
  updateRuleSummary();
}

function updateRuleSummary() {
  const el = document.getElementById('rule-summary-text');
  if (el) el.innerHTML = generateRuleSummary();
}

function generateRuleSummary() {
  const parts = [];
  parts.push(`aged <strong>${rules.age.min}–${rules.age.max}</strong>`);
  if (rules.income.max) parts.push(`with annual income below <strong>${formatCurrency(rules.income.max)}</strong>`);
  if (rules.gender.length) parts.push(`who identify as <strong>${rules.gender.join(' or ')}</strong>`);
  if (rules.occupation.length) parts.push(`who are <strong>${rules.occupation.join(' / ')}</strong>`);
  if (rules.community.length) parts.push(`from <strong>${rules.community.join(', ')}</strong> community`);
  if (rules.state.length && !rules.state.includes('All States')) parts.push(`in <strong>${rules.state.join(', ')}</strong>`);
  if (rules.disability) parts.push(`who are <strong>persons with disability</strong>`);
  return `This scheme is available to users ${parts.join(', ')}.`;
}

function saveRules() {
  showToast('Rules saved!', 'Eligibility rules have been updated successfully.', 'success');
}

function resetRules() {
  rules = { ...defaultRules };
  renderEligibilityRules(document.getElementById('page-content').firstElementChild || document.getElementById('page-content'));
  showToast('Rules reset', 'Rules have been reset to defaults.', 'info');
}

function previewEligibility() {
  showModal(`
    <div class="modal-header">
      <div class="modal-title">Eligibility Preview</div>
      <button class="modal-close" onclick="closeModal()">${Icons.x}</button>
    </div>
    <div class="modal-body">
      <div class="rule-summary">${generateRuleSummary()}</div>
      <div style="margin-top:var(--space-4)">
        <h5 style="color:var(--clr-navy);margin-bottom:var(--space-3)">Rule Breakdown</h5>
        ${[
          ['Age Range', `${rules.age.min}–${rules.age.max} years`],
          ['Income Limit', formatCurrency(rules.income.max)],
          ['Gender', rules.gender.length ? rules.gender.join(', ') : 'All'],
          ['Occupation', rules.occupation.length ? rules.occupation.join(', ') : 'All'],
          ['Community', rules.community.length ? rules.community.join(', ') : 'All'],
          ['State', rules.state.length ? rules.state.join(', ') : 'All States'],
          ['Disability Only', rules.disability ? 'Yes' : 'No'],
        ].map(([k,v]) => `
          <div class="flex justify-between py-2" style="border-bottom:1px solid var(--clr-border-light)">
            <span style="font-size:var(--fs-sm);color:var(--clr-text-muted)">${k}</span>
            <span style="font-size:var(--fs-sm);font-weight:600;color:var(--clr-navy)">${v}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Close</button>
      <button class="btn btn-primary" onclick="saveRules(); closeModal()">Save Rules</button>
    </div>
  `, 'modal-sm');
}

function loadSchemeRules(id) {
  // Mock: load scheme's existing rules
  showToast('Rules loaded', `Showing eligibility rules for scheme #${id}`, 'info');
}
