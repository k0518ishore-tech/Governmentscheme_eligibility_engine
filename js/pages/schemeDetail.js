// ============================================================
// SchemeGuide — Scheme Detail Page
// ============================================================

function renderSchemeDetail(container) {
  const scheme = SCHEMES.find(s => s.id === AppState.selectedScheme) || SCHEMES[0];
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
            <span style="font-size:var(--fs-xs);color:rgba(255,255,255,0.5)">${Icons.eye} ${scheme.views.toLocaleString()} views</span>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:var(--space-3)">
          <button class="btn btn-lg" style="background:var(--clr-teal);color:white;border-color:var(--clr-teal)" onclick="navigate('eligibility', {scheme:${scheme.id}})">
            ${Icons.check} Check My Eligibility
          </button>
          <button class="btn btn-lg" style="background:rgba(255,255,255,0.15);color:white;border-color:rgba(255,255,255,0.2)">
            ${Icons.externalLink} Visit Official Website
          </button>
          <button class="save-btn ${saved ? 'saved' : ''}" data-id="${scheme.id}"
            style="background:rgba(255,255,255,0.1);border:1.5px solid rgba(255,255,255,0.2);border-radius:var(--radius-md);padding:var(--space-2) var(--space-4);color:${saved ? 'var(--clr-amber)' : 'rgba(255,255,255,0.6)'};cursor:pointer;display:flex;align-items:center;gap:var(--space-2);font-size:var(--fs-sm);font-weight:600"
            onclick="toggleSave(${scheme.id})">
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
                <button class="btn btn-primary btn-full" onclick="navigate('eligibility', {scheme:${scheme.id}})">
                  View Full Eligibility Check
                </button>
              </div>
            </div>
          ` : ''}

          <!-- Apply Card -->
          <div class="card" style="margin-bottom:var(--space-4)">
            <div class="card-body">
              <h5 style="color:var(--clr-navy);margin-bottom:var(--space-3)">Ready to apply?</h5>
              <p style="font-size:var(--fs-sm);color:var(--clr-text-muted);margin-bottom:var(--space-4)">Applications are accepted through the official government portal.</p>
              <a href="${scheme.applicationURL}" target="_blank" rel="noopener noreferrer" class="btn btn-teal btn-full">
                ${Icons.externalLink} Apply Now (Official Site)
              </a>
              <div style="margin-top:var(--space-3);font-size:var(--fs-xs);color:var(--clr-text-muted);text-align:center">
                You will be redirected to ${scheme.applicationURL}
              </div>
            </div>
          </div>

          <!-- Related Schemes -->
          <div class="card">
            <div style="padding:var(--space-4) var(--space-5);border-bottom:1px solid var(--clr-border)">
              <h5 style="color:var(--clr-navy);font-size:var(--fs-sm)">Similar Schemes</h5>
            </div>
            <div>
              ${SCHEMES.filter(s => s.id !== scheme.id && s.category === scheme.category).slice(0, 3).map(s => `
                <div class="flex gap-3 p-4 items-center" style="border-bottom:1px solid var(--clr-border-light);cursor:pointer" onclick="navigate('scheme-detail', {scheme:${s.id}})">
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
