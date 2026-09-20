// ============================================================
// SchemeGuide — Admin Recommendation Analytics
// ============================================================

function renderRecommendationAnalytics(container) {
  container.innerHTML = appLayout('recommendation-analytics', `
    <div class="page-header">
      <h1 class="page-title">Recommendation Analytics</h1>
      <p class="page-subtitle">Insights into the scheme recommendation system performance.</p>
    </div>

    <!-- Explanation Banner -->
    <div class="alert alert-info mb-6" style="font-size:var(--fs-sm)">
      ${Icons.info}
      <div>
        <strong>How it works:</strong> The recommendation engine uses <strong>TF-IDF (Term Frequency-Inverse Document Frequency)</strong> and <strong>Cosine Similarity</strong> to identify schemes with similar descriptions, categories, and tags. Recommendations are personalized using each user's view history and saved schemes. Match scores reflect scheme similarity to user interests — not eligibility.
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-4" style="gap:var(--space-4);margin-bottom:var(--space-8)">
      ${[
        { label: 'Total Recommendations Served', val: '12,840', icon: Icons.spark, color: '#8B5CF6', bg: '#F3E8FF' },
        { label: 'Avg. Match Score', val: '82%', icon: Icons.chart, color: 'var(--clr-teal)', bg: 'var(--clr-teal-light)' },
        { label: 'Click-through Rate', val: '34.2%', icon: Icons.trendingUp, color: 'var(--clr-green)', bg: 'var(--clr-green-light)' },
        { label: 'Saved from Recommendations', val: '1,284', icon: Icons.bookmark, color: 'var(--clr-amber-dark)', bg: 'var(--clr-amber-light)' },
      ].map(s => `
        <div class="admin-stat-card">
          <div class="admin-stat-icon" style="background:${s.bg};color:${s.color}">${s.icon}</div>
          <div class="admin-stat-info">
            <div class="admin-stat-value">${s.val}</div>
            <div class="admin-stat-label">${s.label}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="grid grid-2" style="gap:var(--space-6);margin-bottom:var(--space-6)">
      <!-- Most Recommended Schemes -->
      <div class="card">
        <div style="padding:var(--space-5) var(--space-6);border-bottom:1px solid var(--clr-border)">
          <h4 style="color:var(--clr-navy)">Most Recommended Schemes</h4>
          <p style="font-size:var(--fs-xs);color:var(--clr-text-muted)">Top schemes served to users</p>
        </div>
        <div class="card-body">
          <div class="chart-bar">
            ${[
              { name: 'PMKVY — Skill India', val: 2840, max: 3000 },
              { name: 'Ayushman Bharat', val: 2430, max: 3000 },
              { name: 'AICTE Pragati', val: 1980, max: 3000 },
              { name: 'PM Kisan', val: 1640, max: 3000 },
              { name: 'PM Awas Yojana', val: 1200, max: 3000 },
            ].map(item => `
              <div class="chart-bar-item">
                <div class="chart-bar-label" style="font-size:10px">${item.name}</div>
                <div class="chart-bar-track">
                  <div class="chart-bar-fill" style="width:${(item.val/item.max*100).toFixed(0)}%">${item.val.toLocaleString()}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Click-through by Category -->
      <div class="card">
        <div style="padding:var(--space-5) var(--space-6);border-bottom:1px solid var(--clr-border)">
          <h4 style="color:var(--clr-navy)">Click-through by Category</h4>
          <p style="font-size:var(--fs-xs);color:var(--clr-text-muted)">How often users click recommended schemes</p>
        </div>
        <div class="card-body">
          <div style="display:flex;flex-direction:column;gap:var(--space-4)">
            ${[
              { cat: 'Education', ctr: '42%', color: 'var(--clr-primary)' },
              { cat: 'Healthcare', ctr: '38%', color: 'var(--clr-teal)' },
              { cat: 'Employment', ctr: '35%', color: 'var(--clr-green)' },
              { cat: 'Agriculture', ctr: '29%', color: 'var(--clr-amber-dark)' },
              { cat: 'Housing', ctr: '24%', color: '#8B5CF6' },
            ].map(item => `
              <div>
                <div class="flex justify-between mb-1">
                  <span style="font-size:var(--fs-xs);color:var(--clr-text-secondary)">${item.cat}</span>
                  <span style="font-size:var(--fs-xs);font-weight:700;color:var(--clr-navy)">${item.ctr}</span>
                </div>
                <div class="progress-bar progress-thin">
                  <div class="progress-fill" style="width:${item.ctr};background:${item.color}"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Algorithm Info -->
    <div class="card">
      <div style="padding:var(--space-5) var(--space-6);border-bottom:1px solid var(--clr-border)">
        <h4 style="color:var(--clr-navy)">Recommendation Algorithm Details</h4>
        <p style="font-size:var(--fs-xs);color:var(--clr-text-muted)">Technical overview for administrators</p>
      </div>
      <div class="card-body">
        <div class="grid grid-3" style="gap:var(--space-5)">
          ${[
            {
              title: 'Content Vectorization',
              desc: 'Scheme descriptions, categories, tags, and benefits are converted into TF-IDF vectors. This captures the importance of terms across all schemes.',
              icon: Icons.schemes,
              color: 'var(--clr-primary)',
              bg: 'var(--clr-primary-light)',
            },
            {
              title: 'Cosine Similarity',
              desc: 'User interest vectors (based on viewed/saved schemes) are compared against all scheme vectors using cosine similarity to find closest matches.',
              icon: Icons.spark,
              color: '#8B5CF6',
              bg: '#F3E8FF',
            },
            {
              title: 'Personalized Ranking',
              desc: 'Scores are combined with user demographics and activity frequency to produce final personalized recommendation rankings.',
              icon: Icons.user,
              color: 'var(--clr-teal)',
              bg: 'var(--clr-teal-light)',
            },
          ].map(item => `
            <div>
              <div class="feature-icon ${item.color === 'var(--clr-primary)' ? 'blue' : item.color === 'var(--clr-teal)' ? 'teal' : ''}" style="background:${item.bg};color:${item.color};margin-bottom:var(--space-3)">
                ${item.icon}
              </div>
              <h5 style="color:var(--clr-navy);margin-bottom:var(--space-2)">${item.title}</h5>
              <p style="font-size:var(--fs-sm);color:var(--clr-text-muted)">${item.desc}</p>
            </div>
          `).join('')}
        </div>
        <div class="alert alert-warning mt-4">
          ${Icons.info} Match scores reflect content similarity and user interest patterns. They do not indicate or predict official eligibility for any government scheme.
        </div>
      </div>
    </div>
  `, true);
}
