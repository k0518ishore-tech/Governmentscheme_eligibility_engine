// SchemeGuide — Recommendation Analytics

function renderRecommendationAnalytics(container) {
  container.innerHTML = appLayout('recommendation-analytics', `
    <div class="page-header">
      <h1 class="page-title">Recommendation Analytics</h1>
      <p class="page-subtitle">Recommendation performance will be shown once the application records impression and click events.</p>
    </div>
    <div class="alert alert-info">
      ${Icons.info}
      <div>Recommendation totals, match score averages, and click-through rates are not currently collected. No analytics are displayed until they can be calculated from persisted events.</div>
    </div>
  `, true);
}
