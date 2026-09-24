// ============================================================
// SchemeGuide — Admin Scheme Management
// ============================================================

let schemeSearchAdmin = '';
let schemeFilterStatus = '';
let managedSchemes = [];

async function renderSchemeManagement(container) {
  try {
    const response = await AdminAPI.getSchemes();
    managedSchemes = response.data.schemes.map(s => ({
      id: s._id,
      name: s.name,
      shortDesc: s.shortDescription,
      category: s.category,
      department: s.department,
      state: Array.isArray(s.state) ? s.state.join(', ') : s.state,
      status: s.status === 'inactive' ? 'Inactive' : 'Active',
      benefit: s.benefit || '',
      lastUpdated: s.updatedAt || s.createdAt,
      applicationURL: s.applicationUrl || '',
    }));
  } catch (error) {
    showToast('Could not load schemes', error.message || 'Check the backend connection.', 'error');
    managedSchemes = [];
  }

  const filtered = managedSchemes.filter(s => {
    const q = schemeSearchAdmin.toLowerCase();
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
    const matchS = !schemeFilterStatus || s.status === schemeFilterStatus;
    return matchQ && matchS;
  });

  container.innerHTML = appLayout('scheme-management', `
    <div class="page-header">
      <div class="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 class="page-title">Scheme Management</h1>
          <p class="page-subtitle">Add, edit, and manage government scheme information.</p>
        </div>
        <button class="btn btn-primary" onclick="showAddSchemeModal()">
          ${Icons.plus} Add New Scheme
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex gap-4 flex-wrap mb-4 items-center">
      <div class="scheme-search-bar" style="max-width:320px;padding:var(--space-2) var(--space-4)">
        ${Icons.search}
        <input type="text" placeholder="Search schemes..." value="${schemeSearchAdmin}"
          oninput="schemeSearchAdmin=this.value; renderSchemeManagement(document.getElementById('page-content').firstElementChild || document.getElementById('page-content'))"
          style="background:transparent;border:none;outline:none;font-size:var(--fs-sm);color:var(--clr-text);flex:1"/>
      </div>
      <select class="select" style="width:auto" onchange="schemeFilterStatus=this.value; renderSchemeManagement(document.getElementById('page-content').firstElementChild || document.getElementById('page-content'))">
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <select class="select" style="width:auto">
        <option value="">All Categories</option>
        ${CATEGORIES.map(c => `<option>${c.name}</option>`).join('')}
      </select>
      <span style="font-size:var(--fs-sm);color:var(--clr-text-muted)">${filtered.length} schemes</span>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Scheme Name</th>
            <th>Category</th>
            <th>Department</th>
            <th>State</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(s => `
            <tr>
              <td>
                <div style="font-weight:600;color:var(--clr-navy)">${s.name}</div>
                <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${s.benefit}</div>
              </td>
              <td><span class="badge badge-${getCategoryColor(s.category)}">${s.category}</span></td>
              <td style="font-size:var(--fs-xs);color:var(--clr-text-secondary)">${s.department.replace('Ministry of ','')}</td>
              <td style="font-size:var(--fs-sm)">${s.state}</td>
              <td><span class="badge ${getStatusBadge(s.status)}">${s.status}</span></td>
              <td style="font-size:var(--fs-sm);color:var(--clr-text-muted)">${formatDate(s.lastUpdated)}</td>
              <td>
                <div class="table-actions">
                  <button class="btn btn-ghost btn-sm" onclick="navigate('scheme-detail', {scheme:'${s.id}'})" title="View">${Icons.eye}</button>
                  <button class="btn btn-ghost btn-sm" onclick="showEditSchemeModal('${s.id}')" title="Edit">${Icons.edit}</button>
                  <button class="btn btn-ghost btn-sm" onclick="confirmDeleteScheme('${s.id}')" title="Delete" style="color:var(--clr-red)">${Icons.trash}</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `, true);
}

function showAddSchemeModal() {
  showModal(`
    <div class="modal-header">
      <div class="modal-title">Add New Scheme</div>
      <button class="modal-close" onclick="closeModal()">${Icons.x}</button>
    </div>
    <div class="modal-body">
      <div style="display:flex;flex-direction:column;gap:var(--space-4)">
        <div class="form-group">
          <label class="form-label">Scheme Name *</label>
          <input class="input" type="text" id="modal-scheme-name" placeholder="e.g. PM Scholarship for NER"/>
        </div>
        <div class="form-group">
          <label class="form-label">Short Description *</label>
          <textarea class="textarea" id="modal-scheme-desc" placeholder="Brief description of the scheme..."></textarea>
        </div>
        <div class="grid grid-2" style="gap:var(--space-4)">
          <div class="form-group">
            <label class="form-label">Category *</label>
            <select class="select" id="modal-scheme-cat">
              <option value="">Select a category</option>
              ${CATEGORIES.map(c => `<option>${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Department *</label>
            <select class="select" id="modal-scheme-dept">
              <option value="">Select a department</option>
              ${DEPARTMENTS.map(d => `<option>${d.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Applicable State *</label>
            <select class="select" id="modal-scheme-state">
              <option value="">Select a state</option>
              ${STATES.filter(s => s !== 'All States').map(s => `<option>${s}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select class="select" id="modal-scheme-status">
              <option value="">Select status</option><option value="active">Active</option><option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Main Benefit</label>
          <input class="input" type="text" id="modal-scheme-benefit" placeholder="Enter the verified benefit amount or service"/>
        </div>
        <div class="form-group">
          <label class="form-label">Full Scheme Details</label>
          <textarea class="textarea" id="modal-scheme-details" placeholder="Purpose, coverage, benefit rules, and other verified information"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Benefit Details</label>
          <textarea class="textarea" id="modal-scheme-benefit-details" placeholder="Explain how the benefit is provided"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Eligibility Criteria (one item per line)</label>
          <textarea class="textarea" id="modal-scheme-criteria" placeholder="Add only requirements confirmed by the issuing department"></textarea>
        </div>
        <div class="form-group">
          <h4>Eligibility rules</h4>
          <p class="form-hint">Add only conditions confirmed by the scheme's official guidelines. Unknown conditions can stay blank.</p>
        </div>
        ${ruleEditorFields({}, 'new-scheme-rule')}
        <div class="form-group">
          <label class="form-label">Required Documents (one per line)</label>
          <textarea class="textarea" id="modal-scheme-documents" placeholder="List documents confirmed by the issuing department"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Application Steps (one per line)</label>
          <textarea class="textarea" id="modal-scheme-process" placeholder="Add the official application steps"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Official Application URL</label>
          <input class="input" type="url" id="modal-scheme-url" placeholder="https://example.gov.in"/>
        </div>
        <div class="form-group">
          <label class="form-label">Official Source / Guidelines URL</label>
          <input class="input" type="url" id="modal-scheme-source" placeholder="Enter the issuing authority's source page"/>
        </div>
        <div class="form-group">
          <label class="form-label">Eligibility Guidelines URL</label>
          <input class="input" type="url" id="modal-scheme-eligibility-source" placeholder="Link to the official eligibility conditions, if separate"/>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveNewScheme()">Save Scheme</button>
    </div>
  `, 'modal-lg');
}

function showEditSchemeModal(id) {
  const s = managedSchemes.find(sc => String(sc.id) === String(id));
  if (!s) return;
  showModal(`
    <div class="modal-header">
      <div class="modal-title">Edit Scheme</div>
      <button class="modal-close" onclick="closeModal()">${Icons.x}</button>
    </div>
    <div class="modal-body">
      <div style="display:flex;flex-direction:column;gap:var(--space-4)">
        <div class="form-group">
          <label class="form-label">Scheme Name</label>
          <input class="input" type="text" id="edit-scheme-name" value="${s.name}"/>
        </div>
        <div class="form-group">
          <label class="form-label">Short Description</label>
          <textarea class="textarea" id="edit-scheme-desc">${s.shortDesc || ''}</textarea>
        </div>
        <div class="grid grid-2" style="gap:var(--space-4)">
          <div class="form-group">
            <label class="form-label">Category</label>
            <select class="select" id="edit-scheme-cat">${CATEGORIES.map(c => `<option ${c.name===s.category?'selected':''}>${c.name}</option>`).join('')}</select>
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select class="select" id="edit-scheme-status"><option ${s.status==='Active'?'selected':''}>Active</option><option ${s.status==='Inactive'?'selected':''}>Inactive</option></select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Main Benefit</label>
          <input class="input" type="text" id="edit-scheme-benefit" value="${s.benefit}"/>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveSchemeChanges('${s.id}')">Save Changes</button>
    </div>
  `, 'modal-lg');
}

async function saveNewScheme() {
  const value = id => document.getElementById(id)?.value?.trim() || '';
  const name = value('modal-scheme-name');
  const shortDescription = value('modal-scheme-desc');
  const category = value('modal-scheme-cat');
  const department = value('modal-scheme-dept');
  const state = value('modal-scheme-state');
  const status = value('modal-scheme-status');
  if (!name || !shortDescription || !category || !department || !state || !status) return showToast('Required fields missing', 'Enter the name, description, category, department, state, and status.', 'error');
  let eligibilityRules;
  try { eligibilityRules = readRuleEditor('new-scheme-rule'); }
  catch (error) { return showToast('Check eligibility rules', error.message, 'error'); }

  const button = document.querySelector('#modal-overlay .modal-footer .btn-primary');
  if (button) { button.disabled = true; button.textContent = 'Saving…'; }
  try {
    const response = await AdminAPI.createScheme({
      name,
      shortDescription,
      department,
      departmentId: DEPARTMENTS.find(item => item.name === department)?.id,
      category,
      categoryId: CATEGORIES.find(item => item.name === category)?.id,
      state: [state],
      status,
      benefit: value('modal-scheme-benefit'),
      description: value('modal-scheme-details'),
      benefitDetail: value('modal-scheme-benefit-details'),
      eligibilityRules,
      criteria: value('modal-scheme-criteria').split('\n').map(item => item.trim()).filter(Boolean).map(requirement => ({ label: 'Eligibility', requirement })),
      documentsRequired: value('modal-scheme-documents').split('\n').map(item => item.trim()).filter(Boolean),
      applicationProcess: value('modal-scheme-process').split('\n').map(item => item.trim()).filter(Boolean),
      applicationUrl: value('modal-scheme-url'),
      sourceUrl: value('modal-scheme-source'),
      eligibilitySourceUrl: value('modal-scheme-eligibility-source'),
    });
    closeModal();
    if (response.data.notificationWarning) {
      showToast('Scheme saved with a notification issue', response.data.notificationWarning, 'warning');
    } else {
      showToast('Scheme added', `${name} is saved. ${response.data.notificationsSent || 0} users notified.`, 'success');
    }
    await renderSchemeManagement(document.getElementById('page-content'));
  } catch (error) {
    showToast('Could not add scheme', error.message || 'Check the required fields and try again.', 'error');
    if (button) { button.disabled = false; button.textContent = 'Save Scheme'; }
  }
}

async function saveSchemeChanges(id) {
  const value = field => document.getElementById(field)?.value?.trim() || '';
  try {
    await AdminAPI.updateScheme(id, {
      name: value('edit-scheme-name'),
      shortDescription: value('edit-scheme-desc'),
      category: value('edit-scheme-cat'),
      status: value('edit-scheme-status').toLowerCase(),
      benefit: value('edit-scheme-benefit'),
    });
    closeModal();
    showToast('Scheme updated', '', 'success');
    await renderSchemeManagement(document.getElementById('page-content'));
  } catch (error) {
    showToast('Could not update scheme', error.message || 'Please try again.', 'error');
  }
}

function confirmDeleteScheme(id) {
  const s = managedSchemes.find(sc => String(sc.id) === String(id));
  showModal(`
    <div class="modal-header">
      <div class="modal-title">Delete Scheme</div>
      <button class="modal-close" onclick="closeModal()">${Icons.x}</button>
    </div>
    <div class="modal-body">
      <div class="alert alert-error mb-4">${Icons.alertCircle} This action cannot be undone.</div>
      <p style="color:var(--clr-text-secondary)">Are you sure you want to delete <strong>${s?.name}</strong>?</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-danger" onclick="deleteScheme('${id}')">Yes, Delete</button>
    </div>
  `, 'modal-sm');
}

async function deleteScheme(id) {
  try {
    await AdminAPI.deleteScheme(id);
    closeModal();
    showToast('Scheme deleted', '', 'success');
    await renderSchemeManagement(document.getElementById('page-content'));
  } catch (error) {
    showToast('Could not delete scheme', error.message || 'Please try again.', 'error');
  }
}
