// ============================================================
// SchemeGuide — Admin: Category, Department, User Management
// ============================================================

// ── Category Management ──────────────────────────────────────
function renderCategoryManagement(container) {
  container.innerHTML = appLayout('category-management', `
    <div class="page-header">
      <div class="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 class="page-title">Category Management</h1>
          <p class="page-subtitle">Manage scheme categories and their metadata.</p>
        </div>
        <button class="btn btn-primary" onclick="showAddCategoryModal()">${Icons.plus} Add Category</button>
      </div>
    </div>

    <div class="grid grid-3" style="gap:var(--space-4)">
      ${CATEGORIES.map(cat => `
        <div class="card">
          <div class="card-body">
            <div class="flex justify-between items-start mb-4">
              <div style="font-size:2.5rem">${cat.icon}</div>
              <div class="flex gap-2">
                <button class="btn btn-ghost btn-icon-sm" onclick="showEditCategoryModal('${cat.name}')" title="Edit">${Icons.edit}</button>
                <button class="btn btn-ghost btn-icon-sm" style="color:var(--clr-red)" title="Delete">${Icons.trash}</button>
              </div>
            </div>
            <h5 style="color:var(--clr-navy);margin-bottom:var(--space-1)">${cat.name}</h5>
            <div class="flex items-center justify-between mt-3">
              <span class="badge badge-${getCategoryColor(cat.name)}">${SCHEMES.filter(s => s.category === cat.name).length} schemes</span>
              <span class="badge badge-green">Active</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `, true);
}

function showAddCategoryModal() {
  showModal(`
    <div class="modal-header">
      <div class="modal-title">Add Category</div>
      <button class="modal-close" onclick="closeModal()">${Icons.x}</button>
    </div>
    <div class="modal-body">
      <div style="display:flex;flex-direction:column;gap:var(--space-4)">
        <div class="form-group">
          <label class="form-label">Category Name *</label>
          <input class="input" type="text" id="cat-name" placeholder="e.g. Sports & Youth"/>
        </div>
        <div class="form-group">
          <label class="form-label">Icon (Emoji)</label>
          <input class="input" type="text" id="cat-icon" placeholder="e.g. 🏆" maxlength="2"/>
        </div>
        <div class="form-group">
          <label class="form-label">Status</label>
          <select class="select"><option>Active</option><option>Inactive</option></select>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="closeModal(); showToast('Category added!','','success')">Save Category</button>
    </div>
  `, 'modal-sm');
}

function showEditCategoryModal(name) {
  const cat = CATEGORIES.find(c => c.name === name);
  showModal(`
    <div class="modal-header">
      <div class="modal-title">Edit Category</div>
      <button class="modal-close" onclick="closeModal()">${Icons.x}</button>
    </div>
    <div class="modal-body">
      <div style="display:flex;flex-direction:column;gap:var(--space-4)">
        <div class="form-group">
          <label class="form-label">Category Name</label>
          <input class="input" type="text" value="${cat?.name || ''}"/>
        </div>
        <div class="form-group">
          <label class="form-label">Icon (Emoji)</label>
          <input class="input" type="text" value="${cat?.icon || ''}" maxlength="2"/>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="closeModal(); showToast('Category updated!','','success')">Save Changes</button>
    </div>
  `, 'modal-sm');
}

// ── Department Management ────────────────────────────────────
function renderDepartmentManagement(container) {
  container.innerHTML = appLayout('department-management', `
    <div class="page-header">
      <div class="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 class="page-title">Department Management</h1>
          <p class="page-subtitle">Manage government departments and their contact details.</p>
        </div>
        <button class="btn btn-primary" onclick="showAddDeptModal()">${Icons.plus} Add Department</button>
      </div>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Description</th>
            <th>Contact</th>
            <th>Website</th>
            <th>Schemes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${DEPARTMENTS.map(d => `
            <tr>
              <td>
                <div class="flex items-center gap-3">
                  <div style="width:36px;height:36px;border-radius:var(--radius-md);background:var(--clr-primary-light);color:var(--clr-primary);display:flex;align-items:center;justify-content:center;flex-shrink:0">
                    ${Icons.building}
                  </div>
                  <div style="font-weight:600;color:var(--clr-navy)">${d.name}</div>
                </div>
              </td>
              <td style="font-size:var(--fs-xs);color:var(--clr-text-muted);max-width:200px">${d.desc}</td>
              <td style="font-size:var(--fs-sm)">${d.contact}</td>
              <td style="font-size:var(--fs-xs);color:var(--clr-primary)">${d.website}</td>
              <td><span class="badge badge-navy">${SCHEMES.filter(s=>s.department===d.name).length}</span></td>
              <td>
                <div class="table-actions">
                  <button class="btn btn-ghost btn-sm" onclick="showEditDeptModal('${d.id}')">${Icons.edit}</button>
                  <button class="btn btn-ghost btn-sm" style="color:var(--clr-red)">${Icons.trash}</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `, true);
}

function showAddDeptModal() {
  showModal(`
    <div class="modal-header">
      <div class="modal-title">Add Department</div>
      <button class="modal-close" onclick="closeModal()">${Icons.x}</button>
    </div>
    <div class="modal-body">
      <div style="display:flex;flex-direction:column;gap:var(--space-4)">
        <div class="form-group">
          <label class="form-label">Department Name *</label>
          <input class="input" type="text" placeholder="e.g. Ministry of Sports"/>
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea class="textarea" placeholder="Brief description..."></textarea>
        </div>
        <div class="grid grid-2" style="gap:var(--space-4)">
          <div class="form-group">
            <label class="form-label">Contact Email</label>
            <input class="input" type="email" placeholder="contact@gov.in"/>
          </div>
          <div class="form-group">
            <label class="form-label">Official Website</label>
            <input class="input" type="url" placeholder="website.gov.in"/>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="closeModal(); showToast('Department added!','','success')">Save Department</button>
    </div>
  `);
}

function showEditDeptModal(id) {
  const d = DEPARTMENTS.find(dept => dept.id == id);
  if (!d) return;
  showModal(`
    <div class="modal-header">
      <div class="modal-title">Edit Department</div>
      <button class="modal-close" onclick="closeModal()">${Icons.x}</button>
    </div>
    <div class="modal-body">
      <div style="display:flex;flex-direction:column;gap:var(--space-4)">
        <div class="form-group">
          <label class="form-label">Department Name</label>
          <input class="input" type="text" value="${d.name}"/>
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea class="textarea">${d.desc}</textarea>
        </div>
        <div class="grid grid-2" style="gap:var(--space-4)">
          <div class="form-group">
            <label class="form-label">Contact Email</label>
            <input class="input" type="email" value="${d.contact}"/>
          </div>
          <div class="form-group">
            <label class="form-label">Official Website</label>
            <input class="input" type="url" value="${d.website}"/>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="closeModal(); showToast('Department updated!','','success')">Save Changes</button>
    </div>
  `);
}

// ── User Management ──────────────────────────────────────────
async function renderUserManagement(container) {
  try {
    const result = await AdminAPI.getUsers();
    USERS = (result.data.users || []).map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      state: user.profile?.state,
      registeredDate: user.createdAt,
      age: user.profile?.age,
      gender: user.profile?.gender,
      income: user.profile?.annualIncome,
      education: user.profile?.education,
      occupation: user.profile?.occupation,
      community: user.profile?.category,
      applications: null,
    }));
  } catch (error) {
    USERS = [];
    showToast('Could not load users', error.message || 'Check the server connection.', 'error');
  }
  container.innerHTML = appLayout('user-management', `
    <div class="page-header">
      <div class="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 class="page-title">User Management</h1>
          <p class="page-subtitle">View and manage registered citizens.</p>
        </div>
        <div class="flex gap-3">
          <div class="scheme-search-bar" style="max-width:280px;padding:var(--space-2) var(--space-4)">
            ${Icons.search}
            <input type="text" placeholder="Search users..." style="background:transparent;border:none;outline:none;font-size:var(--fs-sm);flex:1;color:var(--clr-text)"/>
          </div>
          <select class="select" style="width:auto">
            <option>All Status</option>
            <option>Active</option>
            <option>Disabled</option>
          </select>
        </div>
      </div>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>State</th>
            <th>Registered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${USERS.map(u => `
            <tr>
              <td>
                <div class="flex items-center gap-3">
                  <div class="sidebar-avatar" style="width:32px;height:32px;font-size:var(--fs-xs)">${getInitials(u.name)}</div>
                  <div>
                    <div style="font-weight:600;color:var(--clr-navy)">${u.name}</div>
                    <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${u.email}</div>
                  </div>
                </div>
              </td>
              <td style="font-size:var(--fs-sm)">${u.state}</td>
              <td style="font-size:var(--fs-sm);color:var(--clr-text-muted)">${formatDate(u.registeredDate)}</td>
              <td>
                <div class="table-actions">
                  <button class="btn btn-ghost btn-sm" onclick="viewUserDetail('${u.id}')" title="View">${Icons.eye}</button>
                </div>
              </td>
            </tr>
          `).join('')}
          ${USERS.length ? '' : '<tr><td colspan="4" class="text-center">No registered users found.</td></tr>'}
        </tbody>
      </table>
    </div>
  `, true);
}

function viewUserDetail(id) {
  const u = USERS.find(user => String(user.id) === String(id));
  if (!u) return;
  showModal(`
    <div class="modal-header">
      <div class="modal-title">User Details</div>
      <button class="modal-close" onclick="closeModal()">${Icons.x}</button>
    </div>
    <div class="modal-body">
      <div class="flex items-center gap-4 mb-6">
        <div class="sidebar-avatar" style="width:56px;height:56px;font-size:var(--fs-lg)">${getInitials(u.name)}</div>
        <div>
          <h4 style="color:var(--clr-navy)">${u.name}</h4>
          <p style="font-size:var(--fs-sm);color:var(--clr-text-muted)">${u.email}${u.phone ? ` • ${u.phone}` : ''}</p>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
        ${[
          ['State', u.state], ['Age', u.age], ['Gender', u.gender], ['Income', u.income ? formatCurrency(u.income) : 'N/A'],
          ['Education', u.education], ['Occupation', u.occupation], ['Community', u.community],
        ].map(([k,v]) => `
          <div style="padding:var(--space-3);background:var(--clr-bg-alt);border-radius:var(--radius-md)">
            <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${k}</div>
            <div style="font-size:var(--fs-sm);font-weight:600;color:var(--clr-navy)">${v || 'Not provided'}</div>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Close</button>
    </div>
  `);
}

// Database-backed catalogue actions override the earlier static mock handlers.
function escapeAdminText(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

async function renderCategoryManagement(container) {
  try {
    const result = await CategoryAPI.getAll();
    CATEGORIES = (result.data.categories || []).map(category => ({ id: category._id, name: category.categoryName, desc: category.categoryDescription || '', icon: '📋' }));
    container.innerHTML = appLayout('category-management', `
      <div class="page-header"><div class="flex justify-between items-center flex-wrap gap-4"><div><h1 class="page-title">Category Management</h1><p class="page-subtitle">Manage database-backed scheme categories.</p></div><button class="btn btn-primary" onclick="showAddCategoryModal()">${Icons.plus} Add Category</button></div></div>
      ${CATEGORIES.length ? `<div class="grid grid-3" style="gap:var(--space-4)">${CATEGORIES.map(cat => `<div class="card"><div class="card-body"><div class="flex justify-between items-start mb-4"><div style="font-size:2rem">${cat.icon}</div><div class="flex gap-2"><button class="btn btn-ghost btn-icon-sm" onclick="showEditCategoryModal('${cat.id}')" title="Edit">${Icons.edit}</button><button class="btn btn-ghost btn-icon-sm" onclick="confirmDeleteCategory('${cat.id}')" title="Delete" style="color:var(--clr-red)">${Icons.trash}</button></div></div><h5>${escapeAdminText(cat.name)}</h5><p class="text-muted">${escapeAdminText(cat.desc)}</p><span class="badge badge-${getCategoryColor(cat.name)}">${SCHEMES.filter(s => s.category === cat.name).length} schemes</span></div></div>`).join('')}</div>` : '<div class="empty-state"><div class="empty-state-title">No categories yet</div></div>'}
    `, true);
  } catch (error) {
    container.innerHTML = appLayout('category-management', `<div class="alert alert-error">Could not load categories. ${escapeAdminText(error.message)}</div>`, true);
  }
}

function showAddCategoryModal() { showCategoryModal(); }
function showEditCategoryModal(id) { const category = CATEGORIES.find(item => String(item.id) === String(id)); if (category) showCategoryModal(category); }

function showCategoryModal(category = null) {
  showModal(`<div class="modal-header"><div class="modal-title">${category ? 'Edit' : 'Add'} Category</div><button class="modal-close" onclick="closeModal()">${Icons.x}</button></div><div class="modal-body"><div class="form-group"><label class="form-label">Category name *</label><input class="input" id="category-name" value="${escapeAdminText(category?.name || '')}" required></div><div class="form-group"><label class="form-label">Description</label><textarea class="textarea" id="category-description">${escapeAdminText(category?.desc || '')}</textarea></div></div><div class="modal-footer"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveCategory('${category?.id || ''}')">Save</button></div>`, 'modal-sm');
}

async function saveCategory(id) {
  const categoryName = document.getElementById('category-name').value.trim();
  const categoryDescription = document.getElementById('category-description').value.trim();
  if (!categoryName) return showToast('Category name required', '', 'error');
  try {
    if (id) await CategoryAPI.update(id, { categoryName, categoryDescription });
    else await CategoryAPI.create({ categoryName, categoryDescription });
    closeModal(); await loadReferenceData(); await renderCategoryManagement(document.getElementById('page-content'));
    showToast('Category saved', 'The category was saved to the database.', 'success');
  } catch (error) { showToast('Could not save category', error.message || 'Please try again.', 'error'); }
}

function confirmDeleteCategory(id) {
  const category = CATEGORIES.find(item => String(item.id) === String(id));
  showModal(`<div class="modal-header"><div class="modal-title">Delete Category</div></div><div class="modal-body"><p>Delete ${escapeAdminText(category?.name || 'this category')}?</p><p class="form-hint">The database may reject deletion if schemes still reference it.</p></div><div class="modal-footer"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-danger" onclick="deleteCategory('${id}')">Delete</button></div>`);
}

async function deleteCategory(id) {
  try { await CategoryAPI.delete(id); closeModal(); await loadReferenceData(); await renderCategoryManagement(document.getElementById('page-content')); showToast('Category deleted', 'The category was removed.', 'success'); }
  catch (error) { showToast('Could not delete category', error.message || 'Remove its scheme references first.', 'error'); }
}

async function renderDepartmentManagement(container) {
  try {
    const result = await DepartmentAPI.getAll();
    DEPARTMENTS = (result.data.departments || []).map(department => ({ id: department._id, name: department.departmentName, desc: department.departmentDescriptor || '', contact: department.contactEmail || '', level: department.stateOrCentral || '' }));
    container.innerHTML = appLayout('department-management', `
      <div class="page-header"><div class="flex justify-between items-center flex-wrap gap-4"><div><h1 class="page-title">Department Management</h1><p class="page-subtitle">Manage departments and verified contact details.</p></div><button class="btn btn-primary" onclick="showAddDeptModal()">${Icons.plus} Add Department</button></div></div>
      <div class="table-wrap"><table><thead><tr><th>Department</th><th>Description</th><th>Level</th><th>Contact</th><th>Schemes</th><th>Actions</th></tr></thead><tbody>
        ${DEPARTMENTS.map(dept => `<tr><td>${escapeAdminText(dept.name)}</td><td>${escapeAdminText(dept.desc)}</td><td>${escapeAdminText(dept.level)}</td><td>${escapeAdminText(dept.contact)}</td><td>${SCHEMES.filter(s => s.department === dept.name).length}</td><td><button class="btn btn-ghost btn-sm" onclick="showEditDeptModal('${dept.id}')">${Icons.edit}</button><button class="btn btn-ghost btn-sm" style="color:var(--clr-red)" onclick="confirmDeleteDept('${dept.id}')">${Icons.trash}</button></td></tr>`).join('')}
        ${DEPARTMENTS.length ? '' : '<tr><td colspan="6" class="text-center">No departments yet.</td></tr>'}
      </tbody></table></div>
    `, true);
  } catch (error) { container.innerHTML = appLayout('department-management', `<div class="alert alert-error">Could not load departments. ${escapeAdminText(error.message)}</div>`, true); }
}

function showAddDeptModal() { showDeptModal(); }
function showEditDeptModal(id) { const department = DEPARTMENTS.find(item => String(item.id) === String(id)); if (department) showDeptModal(department); }

function showDeptModal(department = null) {
  showModal(`<div class="modal-header"><div class="modal-title">${department ? 'Edit' : 'Add'} Department</div><button class="modal-close" onclick="closeModal()">${Icons.x}</button></div><div class="modal-body"><div class="form-group"><label class="form-label">Department name *</label><input class="input" id="dept-name" value="${escapeAdminText(department?.name || '')}" required></div><div class="form-group"><label class="form-label">Description</label><textarea class="textarea" id="dept-description">${escapeAdminText(department?.desc || '')}</textarea></div><div class="form-group"><label class="form-label">Government level *</label><select class="select" id="dept-level"><option value="">Select a level</option><option value="Central" ${department?.level==='Central'?'selected':''}>Central</option><option value="State" ${department?.level==='State'?'selected':''}>State</option></select></div><div class="form-group"><label class="form-label">Verified contact email</label><input class="input" type="email" id="dept-email" value="${escapeAdminText(department?.contact || '')}"></div></div><div class="modal-footer"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveDept('${department?.id || ''}')">Save</button></div>`);
}

async function saveDept(id) {
  const departmentName = document.getElementById('dept-name').value.trim();
  const departmentDescriptor = document.getElementById('dept-description').value.trim();
  const stateOrCentral = document.getElementById('dept-level').value;
  const contactEmail = document.getElementById('dept-email').value.trim();
  if (!departmentName || !stateOrCentral) return showToast('Required fields missing', 'Enter the department name and government level.', 'error');
  try {
    const payload = { departmentName, departmentDescriptor, stateOrCentral, contactEmail };
    if (id) await DepartmentAPI.update(id, payload); else await DepartmentAPI.create(payload);
    closeModal(); await loadReferenceData(); await renderDepartmentManagement(document.getElementById('page-content'));
    showToast('Department saved', 'The department was saved to the database.', 'success');
  } catch (error) { showToast('Could not save department', error.message || 'Please try again.', 'error'); }
}

function confirmDeleteDept(id) {
  const department = DEPARTMENTS.find(item => String(item.id) === String(id));
  showModal(`<div class="modal-header"><div class="modal-title">Delete Department</div></div><div class="modal-body"><p>Delete ${escapeAdminText(department?.name || 'this department')}?</p><p class="form-hint">The database may reject deletion if schemes still reference it.</p></div><div class="modal-footer"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-danger" onclick="deleteDept('${id}')">Delete</button></div>`);
}

async function deleteDept(id) {
  try { await DepartmentAPI.delete(id); closeModal(); await loadReferenceData(); await renderDepartmentManagement(document.getElementById('page-content')); showToast('Department deleted', 'The department was removed.', 'success'); }
  catch (error) { showToast('Could not delete department', error.message || 'Remove its scheme references first.', 'error'); }
}
