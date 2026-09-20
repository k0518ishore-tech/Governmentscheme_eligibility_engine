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
              <span class="badge badge-${getCategoryColor(cat.name)}">${cat.count} schemes</span>
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
function renderUserManagement(container) {
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

    <!-- Summary Stats -->
    <div class="grid grid-4" style="gap:var(--space-4);margin-bottom:var(--space-6)">
      ${[
        { label: 'Total Users', val: '2,841', color: 'var(--clr-primary)', bg: 'var(--clr-primary-light)' },
        { label: 'Active Today', val: '384', color: 'var(--clr-teal)', bg: 'var(--clr-teal-light)' },
        { label: 'New This Week', val: '124', color: 'var(--clr-green)', bg: 'var(--clr-green-light)' },
        { label: 'Disabled', val: '12', color: 'var(--clr-red)', bg: 'var(--clr-red-light)' },
      ].map(s => `
        <div class="stat-card">
          <div style="font-size:var(--fs-2xl);font-weight:800;color:var(--clr-navy)">${s.val}</div>
          <div style="font-size:var(--fs-xs);color:var(--clr-text-muted)">${s.label}</div>
        </div>
      `).join('')}
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>State</th>
            <th>Registered</th>
            <th>Status</th>
            <th>Applications</th>
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
              <td><span class="badge ${u.status==='Active'?'badge-green':'badge-red'}">${u.status}</span></td>
              <td><span class="badge badge-navy">${u.applications}</span></td>
              <td>
                <div class="table-actions">
                  <button class="btn btn-ghost btn-sm" onclick="viewUserDetail(${u.id})" title="View">${Icons.eye}</button>
                  <button class="btn btn-ghost btn-sm" onclick="showToast('User disabled','','info')" title="Disable" style="color:var(--clr-amber-dark)">${Icons.lock}</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `, true);
}

function viewUserDetail(id) {
  const u = USERS.find(user => user.id === id);
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
          <p style="font-size:var(--fs-sm);color:var(--clr-text-muted)">${u.email} • ${u.phone}</p>
          <span class="badge ${u.status==='Active'?'badge-green':'badge-red'}">${u.status}</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
        ${[
          ['State', u.state], ['Age', u.age], ['Gender', u.gender], ['Income', u.income ? formatCurrency(u.income) : 'N/A'],
          ['Education', u.education], ['Occupation', u.occupation], ['Community', u.community], ['Applications', u.applications],
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
      <button class="btn btn-danger btn-sm" onclick="closeModal(); showToast('User disabled','','info')">Disable User</button>
    </div>
  `);
}
