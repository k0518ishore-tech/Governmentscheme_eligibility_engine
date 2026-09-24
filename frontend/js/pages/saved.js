// ============================================================
// SchemeGuide — Saved Schemes Page
// ============================================================

async function renderSaved(container) {
  let saved = [];
  const user = AppState.currentUser;
  try {
    const response = await UserAPI.getSaved();
    saved = (response.data.schemes || []).filter(Boolean).map(mapBackendScheme);
    AppState.savedSchemes = saved.map(scheme => String(scheme.id));
  } catch (error) {
    showToast('Could not load saved schemes', error.message || 'Check the backend connection.', 'error');
  }

  container.innerHTML = appLayout('saved', `
    <div class="page-header">
      <div class="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 class="page-title">Your saved schemes</h1>
          <p class="page-subtitle">Schemes you've bookmarked to come back to later.</p>
        </div>
        <button class="btn btn-outline" onclick="navigate('find-schemes')">
          ${Icons.search} Find More Schemes
        </button>
      </div>
    </div>

    ${saved.length === 0 ? `
      <div class="empty-state">
        <div class="empty-state-icon">${Icons.bookmark}</div>
        <div class="empty-state-title">Nothing saved yet</div>
        <p class="empty-state-msg">Save schemes you want to come back to later. Click the bookmark icon on any scheme card.</p>
        <button class="btn btn-primary" onclick="navigate('find-schemes')">Explore Schemes</button>
      </div>
    ` : `
      <div class="grid grid-auto" style="gap:var(--space-4)">
        ${saved.map(s => savedSchemeCard(s, user)).join('')}
      </div>
    `}
  `);
}

function savedSchemeCard(scheme, user) {
  const eligResult = user ? checkEligibility(scheme, user) : null;
  const catColor = getCategoryColor(scheme.category);
  return `
    <div class="card">
      <div class="card-body">
        <div class="flex justify-between items-start mb-3">
          <div class="flex gap-2 flex-wrap">
            <span class="badge badge-${catColor}">${scheme.category}</span>
            ${eligResult ? `<span class="badge ${eligResult.eligible ? 'badge-green' : 'badge-amber'}">${eligResult.eligible ? '✓ Likely Eligible' : '? Check Required'}</span>` : ''}
          </div>
          <button class="save-btn saved" data-id="${scheme.id}"
            onclick="toggleSave('${scheme.id}').then(() => navigate('saved'))"
            title="Remove from saved">
            ${Icons.bookmarkFilled}
          </button>
        </div>
        <h4 style="color:var(--clr-navy);font-size:var(--fs-base);margin-bottom:var(--space-2)">${scheme.name}</h4>
        <p style="font-size:var(--fs-sm);color:var(--clr-text-muted);margin-bottom:var(--space-3)">${scheme.shortDesc}</p>
        <div style="font-size:var(--fs-xs);color:var(--clr-text-muted);margin-bottom:var(--space-4)">
          ${Icons.tag} ${scheme.benefit} &nbsp;|&nbsp; Saved on ${formatDate(new Date().toISOString().split('T')[0])}
        </div>
        <div class="flex gap-2">
          <button class="btn btn-primary btn-sm" onclick="navigate('scheme-detail', {scheme:'${scheme.id}'})">View Details</button>
          <button class="btn btn-outline btn-sm" onclick="navigate('eligibility', {scheme:'${scheme.id}'})">Check Eligibility</button>
          <button class="btn btn-ghost btn-sm" onclick="toggleSave('${scheme.id}').then(() => navigate('saved'))">
            Remove
          </button>
        </div>
      </div>
    </div>
  `;
}
