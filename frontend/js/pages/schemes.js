// ============================================================
// SchemeGuide — Find Schemes Page
// ============================================================

let schemesPage = 1;
let schemesPerPage = 6;
let filteredSchemes = [...SCHEMES];

async function fetchBackendSchemes() {
  try {
    const query = {
      search: AppState.searchQuery || '',
      category: AppState.filters.category || '',
      state: AppState.filters.state || '',
      department: AppState.filters.department || '',
      sort: document.getElementById('sort-select')?.value || 'relevant',
    };
    const res = await SchemeAPI.getAll(query);
    if (res.data && res.data.schemes) {
      // Map MongoDB backend schemes to frontend scheme format
      return res.data.schemes.map(s => ({
        id: s._id,
        _id: s._id,
        name: s.name,
        shortDesc: s.shortDescription || s.shortDesc,
        description: s.description,
        category: s.category,
        department: s.department,
        state: Array.isArray(s.state) ? s.state[0] : s.state,
        benefit: s.benefit,
        benefitDetail: s.benefitDetail,
        status: s.status,
        views: s.views || 0,
        tags: s.tags || [],
        eligibility: s.eligibilityRules || {},
        criteria: s.criteria || [],
        documents: s.documentsRequired || [],
        applicationProcess: s.applicationProcess || [],
        applicationURL: s.applicationUrl,
        popular: s.popular || false,
        recommended: s.recommended || false,
      }));
    }
  } catch (err) {
    console.warn('[SchemeGuide] Backend fetch failed, falling back to local schemes:', err);
  }
  return [...SCHEMES];
}

async function renderFindSchemes(container) {
  filteredSchemes = await fetchBackendSchemes();

  container.innerHTML = appLayout('find-schemes', `
    <div class="page-header">
      <h1 class="page-title">Find schemes that fit your needs</h1>
      <p class="page-subtitle">Search and filter through government schemes across all categories.</p>
    </div>

    <!-- Search Bar -->
    <div class="scheme-search-bar" style="margin-bottom:var(--space-5)">
      ${Icons.search}
      <input type="text" id="scheme-search" placeholder="Search scholarships, healthcare, housing, employment and more..."
        value="${AppState.searchQuery}"
        oninput="AppState.searchQuery=this.value; debounceSchemeSearch()"/>
      ${AppState.searchQuery ? `
        <button style="background:transparent;border:none;cursor:pointer;color:var(--clr-text-muted)" onclick="AppState.searchQuery=''; document.getElementById('scheme-search').value=''; applyAndRerender()">
          ${Icons.x}
        </button>
      ` : ''}
      <button class="btn btn-primary" onclick="applyAndRerender()">Search</button>
    </div>

    <!-- Sort & Filter Bar -->
    <div class="flex justify-between items-center flex-wrap gap-3 mb-4">
      <div class="pill-group">
        <span class="pill ${!AppState.filters.category ? 'active' : ''}" onclick="AppState.filters.category=''; applyAndRerender()">All</span>
        ${CATEGORIES.map(c => `
          <span class="pill ${AppState.filters.category===c.name ? 'active' : ''}" onclick="AppState.filters.category='${c.name}'; applyAndRerender()">
            ${c.icon} ${c.name}
          </span>
        `).join('')}
      </div>
      <div class="flex gap-3 items-center">
        <select class="select" style="width:auto;font-size:var(--fs-xs)" id="sort-select" onchange="applyAndRerender()">
          <option value="relevant">Most Relevant</option>
          <option value="updated">Recently Updated</option>
          <option value="popular">Most Popular</option>
        </select>
        <span style="font-size:var(--fs-sm);color:var(--clr-text-muted)" id="schemes-count-label">${filteredSchemes.length} schemes found</span>
      </div>
    </div>

    <div class="grid" style="grid-template-columns:240px 1fr;gap:var(--space-6);align-items:start">
      <!-- Filter Panel -->
      <div class="filter-panel">
        <div class="filter-title">
          ${Icons.filter} Filters
          <button class="btn btn-ghost btn-sm" onclick="AppState.filters={}; AppState.searchQuery=''; applyAndRerender()" style="font-size:var(--fs-xs)">Clear all</button>
        </div>

        ${filterGroup('State', `
          <select class="select" id="f-state" onchange="AppState.filters.state=this.value; applyAndRerender()">
            ${STATES.map(s => `<option ${AppState.filters.state===s?'selected':''}>${s}</option>`).join('')}
          </select>
        `)}

        ${filterGroup('Income Range', `
          <select class="select" id="f-income" onchange="AppState.filters.income=this.value; applyAndRerender()">
            <option value="">Any</option>
            <option value="100000" ${AppState.filters.income==='100000'?'selected':''}>Below ₹1 Lakh</option>
            <option value="200000" ${AppState.filters.income==='200000'?'selected':''}>Below ₹2 Lakh</option>
            <option value="500000" ${AppState.filters.income==='500000'?'selected':''}>Below ₹5 Lakh</option>
            <option value="1000000" ${AppState.filters.income==='1000000'?'selected':''}>Below ₹10 Lakh</option>
          </select>
        `)}

        ${filterGroup('Occupation', `
          <select class="select" id="f-occ" onchange="AppState.filters.occupation=this.value; applyAndRerender()">
            <option value="">Any</option>
            ${['Student','Farmer','Employed','Unemployed','Self-Employed','Retired'].map(o => `<option ${AppState.filters.occupation===o?'selected':''}>${o}</option>`).join('')}
          </select>
        `)}

        ${filterGroup('Community', `
          <select class="select" id="f-comm" onchange="AppState.filters.community=this.value; applyAndRerender()">
            <option value="">Any</option>
            ${['General','OBC','SC','ST','Minority','EWS'].map(c => `<option ${AppState.filters.community===c?'selected':''}>${c}</option>`).join('')}
          </select>
        `)}

        ${filterGroup('Department', `
          <select class="select" id="f-dept" onchange="AppState.filters.department=this.value; applyAndRerender()">
            <option value="">All Departments</option>
            ${DEPARTMENTS.map(d => `<option ${AppState.filters.department===d.name?'selected':''}>${d.name}</option>`).join('')}
          </select>
        `)}

        <button class="btn btn-primary btn-full btn-sm" style="margin-top:var(--space-4)" onclick="applyAndRerender()">
          Apply Filters
        </button>
      </div>

      <!-- Scheme Grid -->
      <div>
        <div id="scheme-grid">
          ${renderSchemeGrid()}
        </div>
      </div>
    </div>
  `);
}

function filterGroup(label, content) {
  return `
    <div class="filter-group">
      <div class="filter-group-label">${label}</div>
      ${content}
    </div>
  `;
}

function applyFilters() {
  let schemes = [...SCHEMES];
  const f = AppState.filters;
  const q = AppState.searchQuery.toLowerCase();

  if (q) {
    schemes = schemes.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.shortDesc.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.tags.some(t => t.includes(q))
    );
  }
  if (f.category) schemes = schemes.filter(s => s.category === f.category);
  if (f.state && f.state !== 'All States') schemes = schemes.filter(s => s.state === f.state || s.state === 'All States');
  if (f.income) schemes = schemes.filter(s => s.eligibility.income && s.eligibility.income.max <= parseInt(f.income));
  if (f.occupation) schemes = schemes.filter(s => s.eligibility.occupation.includes('All') || s.eligibility.occupation.includes(f.occupation));
  if (f.community) schemes = schemes.filter(s => s.eligibility.community.includes('All') || s.eligibility.community.includes(f.community));
  if (f.department) schemes = schemes.filter(s => s.department === f.department);

  const sort = document.getElementById('sort-select')?.value || 'relevant';
  if (sort === 'popular') schemes.sort((a, b) => b.views - a.views);
  if (sort === 'updated') schemes.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

  return schemes;
}

function renderSchemeGrid() {
  if (filteredSchemes.length === 0) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">${Icons.search}</div>
        <div class="empty-state-title">No schemes found</div>
        <p class="empty-state-msg">Try changing your filters or search terms. We'll find the right scheme for you.</p>
        <button class="btn btn-outline" onclick="AppState.filters={}; AppState.searchQuery=''; applyAndRerender()">Clear all filters</button>
      </div>
    `;
  }

  const start = (schemesPage - 1) * schemesPerPage;
  const paged = filteredSchemes.slice(start, start + schemesPerPage);

  return `
    <div class="grid grid-auto" style="gap:var(--space-4)">
      ${paged.map(s => schemeCardHTML(s)).join('')}
    </div>
    ${filteredSchemes.length > schemesPerPage ? `
      <div class="flex items-center gap-2 justify-center" style="margin-top:var(--space-6)">
        <button class="btn btn-sm btn-outline-navy" onclick="changeSchemePage(${schemesPage-1})" ${schemesPage===1?'disabled':''}>
          ${Icons.chevronLeft} Prev
        </button>
        ${Array.from({length:Math.ceil(filteredSchemes.length/schemesPerPage)},(_, i) => `
          <button class="btn btn-sm ${i+1===schemesPage ? 'btn-primary' : 'btn-ghost'}" onclick="changeSchemePage(${i+1})">${i+1}</button>
        `).join('')}
        <button class="btn btn-sm btn-outline-navy" onclick="changeSchemePage(${schemesPage+1})" ${schemesPage>=Math.ceil(filteredSchemes.length/schemesPerPage)?'disabled':''}>
          Next ${Icons.chevronRight}
        </button>
      </div>
    ` : ''}
  `;
}

async function applyAndRerender() {
  filteredSchemes = await fetchBackendSchemes();
  schemesPage = 1;
  const countLabel = document.getElementById('schemes-count-label');
  if (countLabel) countLabel.textContent = `${filteredSchemes.length} schemes found`;
  const grid = document.getElementById('scheme-grid');
  if (grid) grid.innerHTML = renderSchemeGrid();
}

function changeSchemePage(page) {
  const maxPage = Math.ceil(filteredSchemes.length / schemesPerPage);
  if (page < 1 || page > maxPage) return;
  schemesPage = page;
  const grid = document.getElementById('scheme-grid');
  if (grid) grid.innerHTML = renderSchemeGrid();
  grid.scrollIntoView({ behavior: 'smooth' });
}

let searchDebounce;
function debounceSchemeSearch() {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(applyAndRerender, 300);
}
