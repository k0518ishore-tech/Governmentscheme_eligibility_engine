// ============================================================
// SchemeGuide — Recommendations Page
// ============================================================

function renderRecommendations(container) {
  const recs = getRecommendations();
  container.innerHTML = appLayout('recommendations', `
    <div class="page-header">
      <h1 class="page-title">Scheme suggestions</h1>
      <p class="page-subtitle">Schemes are ranked using the eligibility details currently in the database and the information in your profile.</p>
    </div>
    <div class="alert alert-info mb-6">${Icons.info}<div>Suggestions do not guarantee eligibility. Check the scheme details and issuing department's official requirements.</div></div>
    ${recs.length ? `<div class="grid grid-auto" style="gap:var(--space-4)">${recs.map(s => recCardHTML(s)).join('')}</div>` : '<div class="empty-state"><div class="empty-state-title">No schemes available</div><p class="empty-state-msg">Schemes added by an administrator will appear here.</p></div>'}
  `);
}

function recCardHTML(scheme) {
  const saved = isSaved(scheme.id);
  const catColor = getCategoryColor(scheme.category);
  return `
    <div class="rec-card" onclick="navigate('scheme-detail', {scheme:'${scheme.id}'})">
      <div class="rec-match-badge">${scheme.category}</div>
      <div class="rec-card-body">
        <div style="padding-top:var(--space-5)">
          <div class="flex gap-2 mb-3">
            <span class="badge badge-${catColor}">${scheme.category}</span>
          </div>
          <div style="font-weight:700;font-size:var(--fs-base);color:var(--clr-navy);margin-bottom:var(--space-2);line-height:1.4;padding-right:var(--space-10)">${scheme.name}</div>
          <div style="font-size:var(--fs-sm);color:var(--clr-text-muted);margin-bottom:var(--space-3)">${scheme.shortDesc}</div>
          <div style="background:var(--clr-primary-light);border-radius:var(--radius-sm);padding:var(--space-2) var(--space-3);font-size:var(--fs-xs);font-weight:600;color:var(--clr-primary);margin-bottom:var(--space-3)">
            ${scheme.benefit}
          </div>
          <div class="rec-why">
            ${Icons.info} ${scheme.reason}
          </div>
          <div class="flex gap-2 mt-4">
            <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); navigate('scheme-detail', {scheme:'${scheme.id}'})">View Details</button>
            <button class="save-btn ${saved ? 'saved' : ''}" data-id="${scheme.id}"
              onclick="event.stopPropagation(); toggleSave('${scheme.id}')"
              aria-label="${saved ? 'Remove saved scheme' : 'Save scheme'}"
              title="${saved ? 'Remove from saved schemes' : 'Save scheme'}"
              style="padding:var(--space-2) var(--space-3);border-radius:var(--radius-md);border:1.5px solid var(--clr-border);background:transparent;cursor:pointer;font-size:var(--fs-xs);display:flex;align-items:center;gap:4px;color:${saved ? 'var(--clr-amber-dark)' : 'var(--clr-text-muted)'}">
              ${saved ? Icons.bookmarkFilled : Icons.bookmark} ${saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
