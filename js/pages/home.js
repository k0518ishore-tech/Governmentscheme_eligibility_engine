// ============================================================
// SchemeGuide — Home / Landing Page
// ============================================================

function renderHome(container) {
  const featuredSchemes = SCHEMES.filter(s => s.popular).slice(0, 3);

  container.innerHTML = `
    ${pubNavHTML()}
    <main>
      <!-- Official Government Hero Banner -->
      <section class="hero" style="background:linear-gradient(180deg, var(--clr-bg-alt) 0%, var(--clr-bg) 100%);padding:var(--space-12) 0 var(--space-8)">
        <div class="container">
          <div class="hero-content" style="display:grid;grid-template-columns:1.2fr 0.8fr;gap:var(--space-8);align-items:center">
            <div class="hero-text animate-up">
              <div class="hero-eyebrow" style="background:var(--clr-surface);border:1px solid var(--clr-border);padding:0.4rem 0.875rem;border-radius:var(--radius-full);display:inline-flex;align-items:center;gap:0.5rem;font-weight:700;font-size:var(--fs-xs);color:var(--clr-navy)">
                <span>🏛️ Official Public Welfare Engine</span> &bull; <span>Verified Information</span>
              </div>
              <h1 style="margin-top:var(--space-3);font-size:2.8rem;line-height:1.2;color:var(--clr-navy)">
                Discover & Check Eligibility for <span style="color:var(--clr-saffron-dark)">Government Welfare Schemes</span>
              </h1>
              <p class="hero-subtitle" style="font-size:var(--fs-md);color:var(--clr-text-secondary);margin:var(--space-4) 0 var(--space-6)">
                Single window portal to check eligibility for central & state schemes across education, healthcare, agriculture, housing, and financial assistance.
              </p>

              <!-- Central Hero Search Box -->
              <div style="background:var(--clr-surface);padding:0.75rem;border-radius:var(--radius-lg);box-shadow:var(--shadow-soft);border:1.5px solid var(--clr-border);display:flex;gap:0.5rem;align-items:center;margin-bottom:var(--space-6)">
                <div style="color:var(--clr-text-muted);padding-left:0.5rem">${Icons.search}</div>
                <input type="text" id="hero-search-input" placeholder="Search by scheme name, category (e.g. Student, Farmer, Healthcare)..." 
                  style="flex:1;border:none;outline:none;font-size:var(--fs-base);background:transparent"
                  onkeydown="if(event.key==='Enter'){ AppState.searchQuery=this.value; navigate('find-schemes'); }" />
                <button class="btn btn-primary" onclick="const val=document.getElementById('hero-search-input').value; AppState.searchQuery=val; navigate('find-schemes');">
                  Search Schemes
                </button>
              </div>

              <!-- Quick CTAs & Pills -->
              <div class="flex items-center gap-3 flex-wrap">
                <button class="btn btn-primary btn-lg" onclick="navigate('eligibility')" style="background:var(--clr-navy);color:#fff">
                  ⚡ Check My Eligibility Wizard
                </button>
                <button class="btn btn-outline-navy btn-lg" onclick="navigate('find-schemes')">
                  Browse All 100+ Schemes ${Icons.arrowRight}
                </button>
              </div>

              <!-- Quick Category Tags -->
              <div style="margin-top:var(--space-5);display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap">
                <span style="font-size:var(--fs-xs);font-weight:700;color:var(--clr-text-muted);text-transform:uppercase;letter-spacing:0.05em">Popular Searches:</span>
                ${['PM Kisan', 'Scholarships', 'Ayushman Bharat', 'Housing', 'Women Schemes'].map(tag => `
                  <span style="background:var(--clr-surface);border:1px solid var(--clr-border);font-size:var(--fs-xs);font-weight:600;padding:3px 10px;border-radius:var(--radius-full);cursor:pointer;color:var(--clr-navy)"
                    onclick="AppState.searchQuery='${tag}'; navigate('find-schemes')">
                    ${tag}
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- Hero Graphics Card -->
            <div class="hero-illustration">
              ${heroIllustrationSVG()}
            </div>
          </div>
        </div>
      </section>

      <!-- Key Portal Stats Ribbon -->
      <section style="background:var(--clr-navy);color:#fff;padding:var(--space-6) 0;border-bottom:3px solid var(--clr-saffron)">
        <div class="container">
          <div class="grid grid-4 text-center" style="gap:var(--space-4)">
            <div>
              <div style="font-size:2.2rem;font-weight:800;color:var(--clr-saffron)">100+</div>
              <div style="font-size:var(--fs-xs);font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:rgba(255,255,255,0.8)">Active Central & State Schemes</div>
            </div>
            <div>
              <div style="font-size:2.2rem;font-weight:800;color:var(--clr-saffron)">9</div>
              <div style="font-size:var(--fs-xs);font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:rgba(255,255,255,0.8)">Major Categories</div>
            </div>
            <div>
              <div style="font-size:2.2rem;font-weight:800;color:var(--clr-saffron)">100%</div>
              <div style="font-size:var(--fs-xs);font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:rgba(255,255,255,0.8)">Verified Official Criteria</div>
            </div>
            <div>
              <div style="font-size:2.2rem;font-weight:800;color:var(--clr-saffron)">50,000+</div>
              <div style="font-size:var(--fs-xs);font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:rgba(255,255,255,0.8)">Citizens Served</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="section" style="background:var(--clr-surface);padding:var(--space-12) 0">
        <div class="container">
          <div class="section-header text-center" style="margin-bottom:var(--space-8)">
            <div class="section-eyebrow" style="color:var(--clr-saffron-dark);font-weight:800;text-transform:uppercase;font-size:var(--fs-xs);letter-spacing:0.08em">Welfare Domains</div>
            <h2 class="section-title">Explore Schemes by Category</h2>
            <p class="section-subtitle" style="color:var(--clr-text-secondary)">Find targeted government initiatives designed for your specific background and requirements.</p>
          </div>
          <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:var(--space-4)">
            ${CATEGORIES.map(cat => `
              <div class="card card-body text-center" style="cursor:pointer;padding:var(--space-5);border-top:3px solid var(--clr-primary);transition:transform 0.2s ease"
                onclick="AppState.filters={category:'${cat.name}'}; navigate('find-schemes')"
                onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'">
                <div style="font-size:2.4rem;margin-bottom:var(--space-2)">${cat.icon}</div>
                <div style="font-weight:700;font-size:var(--fs-base);color:var(--clr-navy)">${cat.name}</div>
                <div style="font-size:var(--fs-xs);color:var(--clr-text-muted);margin-top:var(--space-1)">${cat.count} schemes available</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Featured / Popular Schemes Grid -->
      <section class="section" style="background:var(--clr-bg);padding:var(--space-12) 0">
        <div class="container">
          <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <div style="color:var(--clr-saffron-dark);font-weight:800;text-transform:uppercase;font-size:var(--fs-xs);letter-spacing:0.08em">Featured Programs</div>
              <h2 class="section-title">High-Impact Popular Welfare Schemes</h2>
            </div>
            <button class="btn btn-outline-navy" onclick="navigate('find-schemes')">
              View All Schemes ${Icons.arrowRight}
            </button>
          </div>

          <div class="grid grid-3" style="gap:var(--space-6)">
            ${featuredSchemes.map(s => `
              <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;border-left:4px solid var(--clr-saffron)">
                <div class="card-body">
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="badge badge-blue">${s.category}</span>
                    <span style="font-size:0.7rem;font-weight:700;color:var(--clr-teal);background:var(--clr-teal-light);padding:2px 8px;border-radius:var(--radius-full)">Active</span>
                  </div>
                  <h4 style="color:var(--clr-navy);margin-bottom:var(--space-2);font-size:1.1rem">${s.name}</h4>
                  <p style="font-size:var(--fs-sm);color:var(--clr-text-secondary);margin-bottom:var(--space-4)">${s.shortDesc}</p>
                  
                  <div style="background:var(--clr-bg-alt);padding:var(--space-3);border-radius:var(--radius-md);margin-bottom:var(--space-4)">
                    <div style="font-size:0.7rem;font-weight:700;color:var(--clr-text-muted);text-transform:uppercase">Financial Benefit</div>
                    <div style="font-size:1.1rem;font-weight:800;color:var(--clr-green)">${s.benefit}</div>
                  </div>
                </div>
                <div style="padding:0 var(--space-6) var(--space-6)">
                  <button class="btn btn-primary btn-full" onclick="navigate('scheme-detail', {scheme:${s.id}})">
                    View Scheme Details & Criteria
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- How it Works Process -->
      <section class="steps-section" style="padding:var(--space-12) 0;background:var(--clr-surface)">
        <div class="container">
          <div class="section-header text-center" style="margin-bottom:var(--space-8)">
            <div class="section-eyebrow" style="color:var(--clr-saffron-dark);font-weight:800;text-transform:uppercase;font-size:var(--fs-xs)">Citizen Guide</div>
            <h2 class="section-title">How to Find & Apply in 4 Easy Steps</h2>
          </div>
          <div class="grid grid-4" style="gap:var(--space-6)">
            ${[
              { num: '01', title: 'Enter Basic Profile', desc: 'Provide basic age, category, income range, and state details.' },
              { num: '02', title: 'Check Eligibility', desc: 'Our engine evaluates your profile against verified government rules.' },
              { num: '03', title: 'Review Results', desc: 'See matched schemes with financial benefits & required documents.' },
              { num: '04', title: 'Apply Directly', desc: 'Access official direct portal links for NSP, PM-KISAN, PM-JAY & more.' },
            ].map(step => `
              <div class="step-card" style="border:1px solid var(--clr-border);padding:var(--space-6);border-radius:var(--radius-lg);background:var(--clr-surface-2)">
                <div class="step-num"><span style="background:var(--clr-navy);color:#fff">${step.num}</span></div>
                <div class="step-title" style="margin-top:var(--space-4);font-size:var(--fs-md);font-weight:700">${step.title}</div>
                <p style="font-size:var(--fs-sm);color:var(--clr-text-muted);margin-top:var(--space-2)">${step.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Official Helpline Banner -->
      <section class="section" style="background:var(--clr-bg);padding:0 0 var(--space-12)">
        <div class="container">
          <div style="background:linear-gradient(135deg, var(--clr-navy) 0%, var(--clr-navy-dark) 100%);border-radius:var(--radius-xl);padding:var(--space-8) var(--space-12);color:#fff;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--space-6);border-left:6px solid var(--clr-saffron)">
            <div>
              <span style="background:var(--clr-saffron);color:#000;font-size:0.7rem;font-weight:800;padding:2px 8px;border-radius:var(--radius-sm);text-transform:uppercase">Government Support</span>
              <h3 style="color:#fff;margin-top:var(--space-2)">Need assistance discovering the right scheme?</h3>
              <p style="color:rgba(255,255,255,0.8);font-size:var(--fs-sm)">Contact national scheme helpline support or visit your nearest Common Service Centre (CSC).</p>
            </div>
            <div class="flex items-center gap-3">
              <button class="btn btn-lg" style="background:var(--clr-saffron);color:#000;font-weight:700" onclick="navigate('eligibility')">
                Launch Eligibility Checker
              </button>
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
