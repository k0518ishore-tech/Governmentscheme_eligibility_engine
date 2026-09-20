// ============================================================
// SchemeGuide — Admin Scheme Management
// ============================================================

let schemeSearchAdmin = '';
let schemeFilterStatus = '';

function renderSchemeManagement(container) {
  const filtered = SCHEMES.filter(s => {
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
                  <button class="btn btn-ghost btn-sm" onclick="navigate('scheme-detail', {scheme:${s.id}})" title="View">${Icons.eye}</button>
                  <button class="btn btn-ghost btn-sm" onclick="showEditSchemeModal(${s.id})" title="Edit">${Icons.edit}</button>
                  <button class="btn btn-ghost btn-sm" onclick="confirmDeleteScheme(${s.id})" title="Delete" style="color:var(--clr-red)">${Icons.trash}</button>
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
              ${CATEGORIES.map(c => `<option>${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Department *</label>
            <select class="select" id="modal-scheme-dept">
              ${DEPARTMENTS.map(d => `<option>${d.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">State</label>
            <select class="select" id="modal-scheme-state">
              ${STATES.map(s => `<option>${s}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select class="select" id="modal-scheme-status">
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Main Benefit</label>
          <input class="input" type="text" id="modal-scheme-benefit" placeholder="e.g. ₹50,000 per annum"/>
        </div>
        <div class="form-group">
          <label class="form-label">Official Application URL</label>
          <input class="input" type="url" id="modal-scheme-url" placeholder="https://example.gov.in"/>
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
  const s = SCHEMES.find(sc => sc.id === id);
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
          <input class="input" type="text" value="${s.name}"/>
        </div>
        <div class="form-group">
          <label class="form-label">Short Description</label>
          <textarea class="textarea">${s.shortDesc}</textarea>
        </div>
        <div class="grid grid-2" style="gap:var(--space-4)">
          <div class="form-group">
            <label class="form-label">Category</label>
            <select class="select">${CATEGORIES.map(c => `<option ${c.name===s.category?'selected':''}>${c.name}</option>`).join('')}</select>
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select class="select"><option ${s.status==='Active'?'selected':''}>Active</option><option ${s.status==='Inactive'?'selected':''}>Inactive</option></select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Main Benefit</label>
          <input class="input" type="text" value="${s.benefit}"/>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="closeModal(); showToast('Scheme updated!', '', 'success')">Save Changes</button>
    </div>
  `, 'modal-lg');
}

function saveNewScheme() {
  const name = document.getElementById('modal-scheme-name')?.value;
  if (!name) return showToast('Scheme name is required', '', 'error');
  closeModal();
  showToast('Scheme added!', `"${name}" has been added successfully.`, 'success');
}

function confirmDeleteScheme(id) {
  const s = SCHEMES.find(sc => sc.id === id);
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
      <button class="btn btn-danger" onclick="closeModal(); showToast('Scheme deleted', '', 'info')">Yes, Delete</button>
    </div>
  `, 'modal-sm');
}
