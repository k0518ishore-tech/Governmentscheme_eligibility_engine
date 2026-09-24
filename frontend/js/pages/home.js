// ============================================================
// SchemeGuide — Home / Landing Page
// ============================================================

function renderHome(container) {
  container.innerHTML = `
    ${pubNavHTML()}
    <main>
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-text animate-up">
            <div class="hero-eyebrow">
              ${Icons.checkCircle} Government Scheme Information Platform
            </div>
            <h1>Find the government support <span>you're eligible for.</span></h1>
            <p class="hero-subtitle">
              Discover government schemes, check your eligibility, and find opportunities that match your needs — all in one place.
            </p>
            <div class="hero-ctas">
              <button class="btn btn-primary btn-xl" onclick="navigate('register')">
                ${Icons.check} Check My Eligibility
              </button>
              <button class="btn btn-outline-navy btn-xl" onclick="navigate('find-schemes')">
                Explore Schemes ${Icons.arrowRight}
              </button>
            </div>
            <div class="hero-stats">
              <div><div class="hero-stat-num">${SCHEMES.length}</div><div class="hero-stat-label">Schemes listed</div></div>
              <div><div class="hero-stat-num">${CATEGORIES.length}</div><div class="hero-stat-label">Categories</div></div>
              <div><div class="hero-stat-num">${DEPARTMENTS.length}</div><div class="hero-stat-label">Departments</div></div>
            </div>
          </div>
          <div class="hero-illustration">
            ${heroIllustrationSVG()}
          </div>
        </div>
      </section>

      <!-- How it Works -->
      <section class="steps-section">
        <div class="container">
          <div class="section-header">
            <div class="section-eyebrow">Simple Process</div>
            <h2 class="section-title">How SchemeGuide Works</h2>
            <p class="section-subtitle">Find, check, and apply for government schemes in four easy steps.</p>
          </div>
          <div class="grid grid-4" style="gap:var(--space-6)">
            ${[
              { num: '01', title: 'Tell us about yourself', desc: 'Create a profile with basic personal, financial, and location information.' },
              { num: '02', title: 'Check your eligibility', desc: 'Our system checks your details against scheme requirements instantly.' },
              { num: '03', title: 'Discover relevant schemes', desc: 'See all schemes you qualify for and understand why you may not qualify for others.' },
              { num: '04', title: 'Apply with confidence', desc: 'Get guided to the official application website with all the documents you need.' },
            ].map(step => `
              <div class="step-card">
                <div class="step-num"><span>${step.num}</span></div>
                <div class="step-title">${step.title}</div>
                <p style="font-size:var(--fs-sm);color:var(--clr-text-muted);margin-top:var(--space-2)">${step.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="section" style="background:var(--clr-bg)">
        <div class="container">
          <div class="section-header">
            <div class="section-eyebrow">Why SchemeGuide</div>
            <h2 class="section-title">Built to make government schemes easier to discover</h2>
            <p class="section-subtitle">We've designed every feature to help ordinary citizens navigate complex government programs with ease.</p>
          </div>
          <div class="grid grid-4" style="gap:var(--space-5)">
            ${[
              { icon: Icons.check, color: 'blue', title: 'Eligibility Checking', desc: 'Instantly check if you qualify for any scheme based on your profile information.' },
              { icon: Icons.spark, color: 'teal', title: 'Smart Recommendations', desc: 'Discover schemes tailored to your profile and interests using our recommendation system.' },
              { icon: Icons.info, color: 'amber', title: 'Clear Explanations', desc: 'Understand exactly why you qualify or don\'t — in simple, friendly language.' },
              { icon: Icons.search, color: 'green', title: 'Scheme Discovery', desc: 'Search and filter government schemes across all categories.' },
            ].map(f => `
              <div class="feature-card">
                <div class="feature-icon ${f.color}">${f.icon}</div>
                <h5 style="color:var(--clr-navy);margin-bottom:var(--space-2)">${f.title}</h5>
                <p style="font-size:var(--fs-sm)">${f.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Categories -->
      <section class="section" style="background:var(--clr-surface)">
        <div class="container">
          <div class="section-header">
            <div class="section-eyebrow">Scheme Categories</div>
            <h2 class="section-title">Explore schemes by category</h2>
          </div>
          <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:var(--space-4)">
            ${CATEGORIES.map(cat => `
              <div class="feature-card text-center" style="cursor:pointer;padding:var(--space-5)"
                onclick="AppState.filters={category:'${cat.name}'}; navigate('find-schemes')">
                <div style="font-size:2.5rem;margin-bottom:var(--space-3)">${cat.icon}</div>
                <div style="font-weight:700;font-size:var(--fs-sm);color:var(--clr-navy)">${cat.name}</div>
                <div style="font-size:var(--fs-xs);color:var(--clr-text-muted);margin-top:var(--space-1)">${SCHEMES.filter(s => s.category === cat.name).length} schemes</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="stats-section">
        <div class="container">
          <div class="grid grid-4 stats-grid" style="gap:var(--space-6)">
            ${[
              { num: SCHEMES.length, label: 'Schemes listed' },
              { num: CATEGORIES.length, label: 'Scheme categories' },
              { num: DEPARTMENTS.length, label: 'Departments covered' },
            ].map(s => `
              <div class="stat-card text-center">
                <div class="stat-big-num">${s.num}</div>
                <div class="stat-big-label">${s.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- CTA Banner -->
      <section class="section" style="background:var(--clr-bg)">
        <div class="container">
          <div style="background:linear-gradient(135deg,var(--clr-navy) 0%,#1A4F8A 100%);border-radius:var(--radius-xl);padding:var(--space-12);text-align:center;position:relative;overflow:hidden">
            <div style="position:relative;z-index:1">
              <div style="font-size:var(--fs-xs);font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:var(--space-3)">Get Started Today</div>
              <h2 style="color:white;font-size:var(--fs-3xl);margin-bottom:var(--space-4)">Ready to find support that's right for you?</h2>
              <p style="color:rgba(255,255,255,0.7);font-size:var(--fs-lg);margin-bottom:var(--space-8)">Create an account to save schemes and check eligibility against your profile.</p>
              <div class="flex justify-center gap-4 flex-wrap">
                <button class="btn btn-lg" style="background:var(--clr-teal);color:white;border-color:var(--clr-teal)" onclick="navigate('register')">
                  Create Free Account ${Icons.arrowRight}
                </button>
                <button class="btn btn-lg btn-outline" style="color:white;border-color:rgba(255,255,255,0.4)" onclick="navigate('find-schemes')">
                  Explore Schemes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    ${pubFooterHTML()}
  `;
}

function heroIllustrationSVG() {
  return `
    <svg width="480" height="400" viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Background circle -->
      <circle cx="240" cy="200" r="180" fill="#EEF2F9"/>
      <!-- Card 1 - Main -->
      <rect x="80" y="120" width="220" height="140" rx="16" fill="white" filter="url(#shadow)"/>
      <defs><filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#0F3460" flood-opacity="0.1"/></filter></defs>
      <rect x="96" y="136" width="60" height="8" rx="4" fill="#E8F0FE"/>
      <rect x="96" y="152" width="180" height="12" rx="6" fill="#1565C0" opacity="0.8"/>
      <rect x="96" y="172" width="140" height="8" rx="4" fill="#E2E8F0"/>
      <rect x="96" y="188" width="160" height="8" rx="4" fill="#E2E8F0"/>
      <rect x="96" y="208" width="80" height="28" rx="10" fill="#00897B"/>
      <rect x="186" y="208" width="80" height="28" rx="10" fill="#E8F0FE"/>
      <!-- Checkmark badge -->
      <circle cx="300" cy="120" r="36" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <path d="M286 120l10 10 18-18" stroke="#16A34A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Card 2 - Small -->
      <rect x="290" y="170" width="130" height="90" rx="12" fill="white" filter="url(#shadow)"/>
      <rect x="304" y="184" width="50" height="6" rx="3" fill="#E8F0FE"/>
      <rect x="304" y="198" width="100" height="8" rx="4" fill="#0F3460" opacity="0.8"/>
      <rect x="304" y="214" width="80" height="6" rx="3" fill="#E2E8F0"/>
      <circle cx="330" cy="238" r="10" fill="#E8F0FE"/>
      <circle cx="350" cy="238" r="10" fill="#F0FDF4"/>
      <circle cx="370" cy="238" r="10" fill="#FFF8E7"/>
      <!-- Match score pill -->
      <rect x="100" y="290" width="100" height="30" rx="15" fill="#1565C0"/>
      <text x="150" y="310" text-anchor="middle" fill="white" font-size="12" font-weight="700" font-family="Plus Jakarta Sans">94% Match</text>
      <!-- Floating dots -->
      <circle cx="60" cy="160" r="6" fill="#1565C0" opacity="0.3"/>
      <circle cx="430" cy="240" r="8" fill="#00897B" opacity="0.3"/>
      <circle cx="420" cy="140" r="5" fill="#F59E0B" opacity="0.4"/>
      <circle cx="70" cy="280" r="4" fill="#16A34A" opacity="0.3"/>
    </svg>
  `;
}
