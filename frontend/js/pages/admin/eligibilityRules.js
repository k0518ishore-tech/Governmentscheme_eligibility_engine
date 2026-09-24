// SchemeGuide — visual eligibility rule editor. The form is translated to the
// scheme's structured eligibilityRules object before it is sent to the API.
let selectedRuleSchemeId = '';

const RULE_LIST_FIELDS = [
  ['gender', 'Eligible genders'], ['categories', 'Eligible social categories'],
  ['occupations', 'Eligible occupations'], ['education', 'Required education'],
  ['maritalStatus', 'Marital status'], ['ruralUrban', 'Residence type'],
  ['states', 'Eligible states'], ['districts', 'Eligible districts'],
];
const RULE_NUMBER_FIELDS = [
  ['age.min', 'Minimum age'], ['age.max', 'Maximum age'],
  ['minAnnualIncome', 'Minimum annual income (₹)'], ['maxAnnualIncome', 'Maximum annual income (₹)'],
];

function ruleEditorFields(rules = {}, prefix = 'rule') {
  const age = rules.age || {};
  const valueAt = key => key === 'age.min' ? age.min : key === 'age.max' ? age.max : rules[key];
  return `<div class="grid grid-2" style="gap:var(--space-4)">
    ${RULE_NUMBER_FIELDS.map(([key, label]) => `<div class="form-group"><label class="form-label" for="${prefix}-${key.replace('.', '-')}">${label}</label><input class="input" type="number" min="0" id="${prefix}-${key.replace('.', '-')}" value="${valueAt(key) ?? ''}" placeholder="Leave blank if not specified"></div>`).join('')}
    ${RULE_LIST_FIELDS.map(([key, label]) => `<div class="form-group"><label class="form-label" for="${prefix}-${key}">${label}</label><textarea class="textarea" rows="2" id="${prefix}-${key}" placeholder="One option per line">${(rules[key] || []).join('\n')}</textarea></div>`).join('')}
    ${[['disabilityRequired', 'Disability required'], ['minorityRequired', 'Minority status required']].map(([key, label]) => `<label class="form-group" style="display:flex;align-items:center;gap:var(--space-2)"><input type="checkbox" id="${prefix}-${key}" ${rules[key] ? 'checked' : ''}><span class="form-label">${label}</span></label>`).join('')}
  </div><p class="form-hint">Enter only eligibility conditions verified from the issuing authority. Leave an unspecified condition blank.</p>`;
}

function readRuleEditor(prefix = 'rule') {
  const rules = {};
  for (const [key] of RULE_NUMBER_FIELDS) {
    const value = document.getElementById(`${prefix}-${key.replace('.', '-')}`)?.value.trim();
    if (!value) continue;
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || numeric < 0) throw new Error('Age and income limits must be valid non-negative numbers.');
    if (key.startsWith('age.')) {
      rules.age ||= {};
      rules.age[key.split('.')[1]] = numeric;
    } else rules[key] = numeric;
  }
  for (const [key] of RULE_LIST_FIELDS) {
    const values = document.getElementById(`${prefix}-${key}`)?.value.split('\n').map(item => item.trim()).filter(Boolean) || [];
    if (values.length) rules[key] = values;
  }
  for (const key of ['disabilityRequired', 'minorityRequired']) {
    if (document.getElementById(`${prefix}-${key}`)?.checked) rules[key] = true;
  }
  if (rules.age?.min != null && rules.age?.max != null && rules.age.min > rules.age.max) {
    throw new Error('Minimum age cannot be greater than maximum age.');
  }
  if (rules.minAnnualIncome != null && rules.maxAnnualIncome != null && rules.minAnnualIncome > rules.maxAnnualIncome) {
    throw new Error('Minimum income cannot be greater than maximum income.');
  }
  return rules;
}

function renderEligibilityRules(container) {
  if (!selectedRuleSchemeId && SCHEMES.length) selectedRuleSchemeId = SCHEMES[0].id;
  const scheme = SCHEMES.find(item => String(item.id) === String(selectedRuleSchemeId));
  container.innerHTML = appLayout('eligibility-rules', `
    <div class="page-header"><h1 class="page-title">Eligibility Rule Management</h1><p class="page-subtitle">Enter scheme conditions with simple fields. Confirm each rule using its official source before saving.</p></div>
    ${SCHEMES.length ? `<div class="card"><div class="card-body">
      <div class="form-group"><label class="form-label" for="rule-scheme-select">Scheme</label><select class="select" id="rule-scheme-select" onchange="loadSchemeRules(this.value)">${SCHEMES.map(item => `<option value="${item.id}" ${String(item.id)===String(selectedRuleSchemeId)?'selected':''}>${item.name}</option>`).join('')}</select></div>
      ${scheme?.eligibilitySourceURL || scheme?.sourceURL ? `<p class="form-hint" style="margin-bottom:var(--space-4)">Verify requirements against the official source before saving: <a href="${scheme.eligibilitySourceURL || scheme.sourceURL}" target="_blank" rel="noopener noreferrer">Open scheme guidelines</a></p>` : '<p class="form-hint" style="margin-bottom:var(--space-4)">No official guideline link is stored for this scheme. Add one in Scheme Management before entering rules.</p>'}
      <div class="form-group"><h3>Age and income</h3></div>
      ${ruleEditorFields(scheme?._eligibilityRules || {})}
      <div class="flex justify-between items-center" style="margin-top:var(--space-4)"><span id="rule-validation" class="form-hint">Rules save to the scheme record in the database.</span><button class="btn btn-primary" onclick="saveRules()">Save Rules</button></div>
    </div></div>` : '<div class="empty-state"><div class="empty-state-title">No schemes are available</div><p class="empty-state-msg">Add a scheme before configuring its eligibility rules.</p></div>'}
  `, true);
}

function loadSchemeRules(id) { selectedRuleSchemeId = id; renderEligibilityRules(document.getElementById('page-content')); }

async function saveRules() {
  try {
    const rules = readRuleEditor();
    await AdminAPI.updateSchemeRules(selectedRuleSchemeId, rules);
    const scheme = SCHEMES.find(item => String(item.id) === String(selectedRuleSchemeId));
    if (scheme) scheme._eligibilityRules = rules;
    showToast('Rules saved', 'Eligibility rules were saved to the database.', 'success');
  } catch (error) {
    showToast('Could not save rules', error.message || 'Please check the entered values.', 'error');
  }
}
