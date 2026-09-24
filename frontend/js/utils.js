// ============================================================
// SchemeGuide — Utility Functions
// ============================================================

// ── SVG Icons ───────────────────────────────────────────────
const Icons = {
  logo: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  home: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  schemes: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  star: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  bookmark: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>`,
  bookmarkFilled: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>`,
  bell: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
  user: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  users: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
  settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  chart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  filter: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  x: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  logout: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  arrowLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  checkCircle: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  xCircle: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  alertCircle: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  info: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  refresh: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>`,
  edit: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>`,
  eye: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  plus: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  menu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  chevronDown: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  chevronRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  chevronLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  spark: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  activity: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  tag: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  folder: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>`,
  building: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="18" height="13" rx="1"/><path d="M8 22V12"/><path d="M16 22V12"/><path d="M12 22V12"/><path d="M1 9l11-7 11 7"/></svg>`,
  mail: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  phone: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>`,
  lock: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
  mapPin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  trendingUp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  message: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  externalLink: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  grid: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  list: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  upload: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>`,
};

// ── Toast Notifications ──────────────────────────────────────
function showToast(title, message = '', type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const iconMap = {
    success: `<span style="color:#16A34A">${Icons.checkCircle}</span>`,
    error: `<span style="color:#DC2626">${Icons.xCircle}</span>`,
    warning: `<span style="color:#F59E0B">${Icons.alertCircle}</span>`,
    info: `<span style="color:#1565C0">${Icons.info}</span>`,
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${iconMap[type] || iconMap.info}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-msg">${message}</div>` : ''}
    </div>
    <button class="toast-close" onclick="dismissToast(this.parentElement)">${Icons.x}</button>
  `;

  container.appendChild(toast);
  setTimeout(() => dismissToast(toast), 4000);
}

function dismissToast(toast) {
  if (!toast || toast.classList.contains('dismissing')) return;
  toast.classList.add('dismissing');
  setTimeout(() => toast.remove(), 400);
}

// ── Modal ────────────────────────────────────────────────────
function showModal(content, size = '') {
  const overlay = document.getElementById('modal-overlay');
  overlay.innerHTML = `
    <div class="modal ${size}" role="dialog" aria-modal="true">
      ${content}
    </div>
  `;
  overlay.classList.remove('hidden');
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('hidden');
  overlay.innerHTML = '';
  document.body.style.overflow = '';
}

// ── Routing / Navigation ─────────────────────────────────────
function navigate(page, params = {}) {
  AppState.currentPage = page;
  if (params.scheme) AppState.selectedScheme = params.scheme;
  if (params.eligibility) AppState.eligibilityResult = params.eligibility;
  renderPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPage() {
  const content = document.getElementById('page-content');
  const page = AppState.currentPage;

  // Public pages
  if (page === 'home')         return renderHome(content);
  if (page === 'register')     return renderRegister(content);
  if (page === 'login')        return renderLogin(content);

  // Admin pages
  if (page === 'admin-login')  return renderAdminLogin(content);
  if (AppState.isAdmin) {
    if (page === 'admin-dashboard')     return renderAdminDashboard(content);
    if (page === 'scheme-management')   return renderSchemeManagement(content);
    if (page === 'eligibility-rules')   return renderEligibilityRules(content);
    if (page === 'category-management') return renderCategoryManagement(content);
    if (page === 'department-management') return renderDepartmentManagement(content);
    if (page === 'user-management')     return renderUserManagement(content);
    if (page === 'application-management') return renderApplicationManagement(content);
    if (page === 'recommendation-analytics') return renderRecommendationAnalytics(content);
    if (page === 'feedback-management') return renderFeedbackManagement(content);
    if (page === 'admin-notifications') return renderAdminNotifications(content);
  }

  // Protected citizen pages
  if (!AppState.currentUser) {
    return renderLogin(content);
  }
  if (page === 'dashboard')       return renderDashboard(content);
  if (page === 'profile')         return renderProfile(content);
  if (page === 'find-schemes')    return renderFindSchemes(content);
  if (page === 'scheme-detail')   return renderSchemeDetail(content);
  if (page === 'eligibility')     return renderEligibility(content);
  if (page === 'eligibility-result') return renderEligibilityResult(content);
  if (page === 'recommendations') return renderRecommendations(content);
  if (page === 'saved')           return renderSaved(content);
  if (page === 'applications')    return renderApplications(content);
  if (page === 'notifications')   return renderNotifications(content);
}

// ── Format helpers ───────────────────────────────────────────
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function mapBackendScheme(scheme) {
  return {
    id: scheme._id,
    _id: scheme._id,
    name: scheme.name,
    shortDesc: scheme.shortDescription || '',
    description: scheme.description || scheme.shortDescription || '',
    category: scheme.category || 'General',
    department: scheme.department || '',
    state: Array.isArray(scheme.state) ? scheme.state.join(', ') : (scheme.state || 'All States'),
    benefit: scheme.benefit || '',
    benefitDetail: scheme.benefitDetail || '',
    status: scheme.status === 'inactive' ? 'Inactive' : 'Active',
    lastUpdated: scheme.updatedAt || scheme.createdAt,
    views: scheme.views || 0,
    tags: scheme.tags || [],
    eligibility: {
      age: scheme.eligibilityRules?.age || {},
      income: { max: scheme.eligibilityRules?.maxAnnualIncome },
      gender: scheme.eligibilityRules?.gender || [],
      education: scheme.eligibilityRules?.education || [],
      occupation: scheme.eligibilityRules?.occupations || [],
      community: scheme.eligibilityRules?.categories || [],
      state: scheme.eligibilityRules?.states || [],
      disability: Boolean(scheme.eligibilityRules?.disabilityRequired),
    },
    _eligibilityRules: scheme.eligibilityRules || {},
    criteria: scheme.criteria || [],
    documents: scheme.documentsRequired || [],
    applicationProcess: scheme.applicationProcess || [],
    applicationURL: scheme.applicationUrl || '',
    sourceURL: scheme.sourceUrl || '',
    eligibilitySourceURL: scheme.eligibilitySourceUrl || '',
    sourceURL: scheme.sourceUrl || '',
    eligibilitySourceURL: scheme.eligibilitySourceUrl || '',
    popular: Boolean(scheme.popular),
    recommended: Boolean(scheme.recommended),
  };
}

function formatCurrency(num) {
  return '₹' + num.toLocaleString('en-IN');
}

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function getCategoryColor(cat) {
  const map = {
    'Education': 'blue', 'Healthcare': 'teal', 'Agriculture': 'green',
    'Employment': 'amber', 'Housing': 'navy', 'Women & Child': 'blue',
    'Senior Citizens': 'amber', 'Disability': 'blue', 'Financial Assistance': 'teal',
  };
  return map[cat] || 'navy';
}

function getStatusBadge(status) {
  const map = {
    'Submitted': 'badge-blue', 'Under Review': 'badge-amber',
    'Approved': 'badge-green', 'Rejected': 'badge-red',
    'Pending': 'badge-gray', 'Active': 'badge-green', 'Inactive': 'badge-gray',
  };
  return map[status] || 'badge-gray';
}

function isSaved(schemeId) {
  return AppState.savedSchemes.some(id => String(id) === String(schemeId));
}

async function syncSavedSchemes() {
  if (!AppState.currentUser || !getToken()) {
    AppState.savedSchemes = [];
    return;
  }
  try {
    const response = await UserAPI.getSaved();
    AppState.savedSchemes = (response.data.schemes || []).map(scheme => String(scheme._id || scheme));
  } catch (error) {
    console.warn('[SchemeGuide] Could not load saved schemes:', error.message);
  }
}

async function toggleSave(schemeId) {
  schemeId = String(schemeId);
  const idx = AppState.savedSchemes.findIndex(id => String(id) === schemeId);
  const isCurrentlySaved = idx !== -1;

  try {
    if (!AppState.currentUser || !getToken()) {
      navigate('login');
      return;
    }
    if (isCurrentlySaved) {
      await UserAPI.unsaveScheme(schemeId);
      AppState.savedSchemes.splice(idx, 1);
      showToast('Removed', 'Scheme removed from saved list.', 'info');
    } else {
      await UserAPI.saveScheme(schemeId);
      AppState.savedSchemes.push(schemeId);
      showToast('Scheme Saved', 'You can find it in Saved Schemes.', 'success');
    }
  } catch (error) {
    showToast('Could not update saved schemes', error.message || 'Please try again.', 'error');
    return;
  }

  // Re-render save buttons without full page refresh
  document.querySelectorAll(`.save-btn[data-id="${schemeId}"]`).forEach(btn => {
    const saved = isSaved(schemeId);
    btn.classList.toggle('saved', saved);
      btn.innerHTML = `${saved ? Icons.bookmarkFilled : Icons.bookmark} ${saved ? 'Saved' : 'Save'}`;
      btn.title = saved ? 'Remove from saved' : 'Save scheme';
      btn.setAttribute('aria-label', saved ? 'Remove saved scheme' : 'Save scheme');
  });
}

// ── Sidebar helpers ──────────────────────────────────────────
function toggleSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!sidebar) return;
  const isOpen = sidebar.classList.toggle('open');
  AppState.sidebarOpen = isOpen;
  if (overlay) overlay.style.display = isOpen ? 'block' : 'none';
}

function closeSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.style.display = 'none';
  AppState.sidebarOpen = false;
}

// ── Hour-based greeting ──────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

// ── Simple eligibility engine ────────────────────────────────
function checkEligibility(scheme, userData) {
  const results = [];
  const el = scheme.eligibility || {};
  const profile = userData?.profile || userData || {};
  const data = {
    age: profile.age,
    gender: profile.gender,
    income: profile.annualIncome ?? profile.income,
    occupation: profile.occupation,
    community: profile.category ?? profile.community,
    state: profile.state,
  };
  let eligible = false;

  // Age
  if (el.age && (el.age.min != null || el.age.max != null)) {
    eligible = true;
    if (data.age == null || data.age === '') return { eligible: false, results, needsProfile: true };
    const met = (el.age.min == null || data.age >= el.age.min) && (el.age.max == null || data.age <= el.age.max);
    results.push({
      criterion: 'Age',
      yours: `${data.age} years`,
      required: el.age.min == null ? `Up to ${el.age.max} years` : el.age.max == null ? `At least ${el.age.min} years` : `${el.age.min}–${el.age.max} years`,
      met,
    });
    if (!met) eligible = false;
  }

  // Gender
  if (el.gender?.length && !el.gender.includes('All')) {
    eligible = true;
    if (!data.gender) return { eligible: false, results, needsProfile: true };
    const met = el.gender.includes(data.gender);
    results.push({
      criterion: 'Gender',
      yours: data.gender,
      required: el.gender.join(' / '),
      met,
    });
    if (!met) eligible = false;
  }

  // Income
  if (el.income?.max != null) {
    eligible = true;
    if (data.income == null || data.income === '') return { eligible: false, results, needsProfile: true };
    const met = data.income <= el.income.max;
    results.push({
      criterion: 'Annual Income',
      yours: formatCurrency(data.income),
      required: `Below ${formatCurrency(el.income.max)}`,
      met,
    });
    if (!met) eligible = false;
  }

  // Occupation
  if (el.occupation?.length && !el.occupation.includes('All')) {
    eligible = true;
    if (!data.occupation) return { eligible: false, results, needsProfile: true };
    const met = el.occupation.includes(data.occupation);
    results.push({
      criterion: 'Occupation',
      yours: data.occupation,
      required: el.occupation.join(' / '),
      met,
    });
    if (!met) eligible = false;
  }

  // Community
  if (el.community?.length && !el.community.includes('All')) {
    eligible = true;
    if (!data.community) return { eligible: false, results, needsProfile: true };
    const met = el.community.includes(data.community);
    results.push({
      criterion: 'Community',
      yours: data.community,
      required: el.community.join(' / '),
      met,
    });
    if (!met) eligible = false;
  }

  // State
  if (el.state?.length && !el.state.includes('All States')) {
    eligible = true;
    if (!data.state) return { eligible: false, results, needsProfile: true };
    const met = el.state.includes(data.state);
    results.push({
      criterion: 'State',
      yours: data.state,
      required: el.state.join(', '),
      met,
    });
    if (!met) eligible = false;
  }

  return { eligible, results, needsProfile: false };
}

// ── Simple TF-IDF style recommendation ──────────────────────
function getRecommendations() {
  return [...SCHEMES].sort((a, b) => {
    const aEligible = checkEligibility(a, AppState.currentUser).eligible;
    const bEligible = checkEligibility(b, AppState.currentUser).eligible;
    return Number(bEligible) - Number(aEligible);
  }).map(scheme => ({
    ...scheme,
    reason: checkEligibility(scheme, AppState.currentUser).eligible
      ? 'The stored eligibility criteria match the profile information provided.'
      : 'Review the published requirements to see whether this scheme may apply to you.',
  }));
}

// ── Scheme Card HTML ─────────────────────────────────────────
function schemeCardHTML(scheme, options = {}) {
  const saved = isSaved(scheme.id);
  const catColor = getCategoryColor(scheme.category);
  return `
    <div class="scheme-card" onclick="navigate('scheme-detail', {scheme: '${scheme.id}'})">
      <div class="scheme-card-top">
        <div class="scheme-card-category">
          <span class="badge badge-${catColor}">${scheme.category}</span>
          <button class="save-btn ${saved ? 'saved' : ''}" data-id="${scheme.id}"
            title="${saved ? 'Remove from saved' : 'Save scheme'}"
            onclick="event.stopPropagation(); toggleSave('${scheme.id}')">
            ${saved ? Icons.bookmarkFilled : Icons.bookmark}
          </button>
        </div>
        <div class="scheme-card-title">${scheme.name}</div>
        <div class="scheme-card-desc">${scheme.shortDesc}</div>
        <div class="scheme-card-benefit">${Icons.tag} ${scheme.benefit}</div>
      </div>
      <div class="scheme-card-bottom">
        <span class="text-xs text-muted">${scheme.department.replace('Ministry of ', '')}</span>
        <div class="scheme-card-actions">
          <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); navigate('eligibility', {scheme: '${scheme.id}'})">
            Check Eligibility
          </button>
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); navigate('scheme-detail', {scheme: '${scheme.id}'})">
            View
          </button>
        </div>
      </div>
    </div>
  `;
}

// ── App Header (citizen) ─────────────────────────────────────
function appHeaderHTML() {
  const user = AppState.currentUser;
  const unread = AppState.notificationCount;
  return `
    <header class="app-header">
      <div class="app-header-left">
        <button class="sidebar-toggle" onclick="toggleSidebar()" aria-label="Toggle menu">
          ${Icons.menu}
        </button>
        <div class="search-bar">
          ${Icons.search}
          <input type="text" placeholder="Search schemes..." id="header-search"
            oninput="AppState.searchQuery = this.value"
            onkeydown="if(event.key==='Enter'){navigate('find-schemes')}">
        </div>
      </div>
      <div class="app-header-right">
        <button class="notif-btn" onclick="navigate('notifications')" aria-label="Notifications">
          ${Icons.bell}
          ${unread > 0 ? `<span class="notif-dot"></span>` : ''}
        </button>
        <div class="sidebar-avatar" onclick="navigate('profile')" style="cursor:pointer" title="Your profile">
          ${getInitials(user.name)}
        </div>
      </div>
    </header>
  `;
}

// ── Citizen Sidebar ──────────────────────────────────────────
function citizenSidebarHTML(activePage) {
  const user = AppState.currentUser;
  const navItems = [
    { id: 'dashboard',       label: 'Dashboard',       icon: Icons.home },
    { id: 'find-schemes',    label: 'Find Schemes',     icon: Icons.schemes },
    { id: 'eligibility',     label: 'Check Eligibility',icon: Icons.check },
    { id: 'recommendations', label: 'Recommendations',  icon: Icons.spark },
    { id: 'saved',           label: 'Saved Schemes',    icon: Icons.bookmark },
    { id: 'applications',    label: 'My Applications',  icon: Icons.folder },
    { id: 'notifications',   label: 'Notifications',    icon: Icons.bell, badge: AppState.notificationCount },
    { id: 'profile',         label: 'My Profile',       icon: Icons.user },
  ];

  return `
    <div id="sidebar-overlay" class="sidebar-overlay" onclick="closeSidebar()"></div>
    <aside class="sidebar" id="app-sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo" onclick="navigate('dashboard')">
          <div class="sidebar-logo-icon">${Icons.logo}</div>
          SchemeEngine
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="sidebar-section-label">Main Menu</div>
        ${navItems.map(item => `
          <div class="sidebar-nav-item ${activePage === item.id ? 'active' : ''}"
            onclick="closeSidebar(); navigate('${item.id}')">
            <span class="sidebar-nav-icon">${item.icon}</span>
            ${item.label}
            ${item.badge ? `<span class="sidebar-badge">${item.badge}</span>` : ''}
          </div>
        `).join('')}
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user" onclick="navigate('profile')">
          <div class="sidebar-avatar">${getInitials(user.name)}</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">${user.name}</div>
            <div class="sidebar-user-role">Citizen Account</div>
          </div>
        </div>
        <div class="sidebar-nav-item" onclick="logout()" style="margin-top:var(--space-2)">
          <span class="sidebar-nav-icon">${Icons.logout}</span>
          Sign Out
        </div>
      </div>
    </aside>
  `;
}

// ── Admin Sidebar ────────────────────────────────────────────
function adminSidebarHTML(activePage) {
  const navItems = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: Icons.chart, section: 'Overview' },
    { id: 'scheme-management', label: 'Scheme Management', icon: Icons.schemes, section: 'Content' },
    { id: 'eligibility-rules', label: 'Eligibility Rules', icon: Icons.check, section: 'Content' },
    { id: 'category-management', label: 'Categories', icon: Icons.folder, section: 'Content' },
    { id: 'department-management', label: 'Departments', icon: Icons.building, section: 'Content' },
    { id: 'user-management', label: 'Users', icon: Icons.users, section: 'People' },
    { id: 'application-management', label: 'Applications', icon: Icons.activity, section: 'People' },
    { id: 'recommendation-analytics', label: 'Recommendations', icon: Icons.spark, section: 'Analytics' },
    { id: 'feedback-management', label: 'Feedback', icon: Icons.message, section: 'Analytics' },
    { id: 'admin-notifications', label: 'Notifications', icon: Icons.bell, section: 'System' },
  ];

  const sections = [...new Set(navItems.map(i => i.section))];

  return `
    <div id="sidebar-overlay" class="sidebar-overlay" onclick="closeSidebar()"></div>
    <aside class="sidebar" id="app-sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo" onclick="navigate('admin-dashboard')">
          <div class="sidebar-logo-icon">${Icons.logo}</div>
          Admin Panel
        </div>
      </div>
      <nav class="sidebar-nav">
        ${sections.map(section => `
          <div class="sidebar-section-label">${section}</div>
          ${navItems.filter(i => i.section === section).map(item => `
            <div class="sidebar-nav-item ${activePage === item.id ? 'active' : ''}"
              onclick="closeSidebar(); navigate('${item.id}')">
              <span class="sidebar-nav-icon">${item.icon}</span>
              ${item.label}
            </div>
          `).join('')}
        `).join('')}
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="sidebar-avatar" style="background:linear-gradient(135deg,#F59E0B,#DC2626)">AD</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">Admin</div>
            <div class="sidebar-user-role">System Administrator</div>
          </div>
        </div>
        <div class="sidebar-nav-item" onclick="logout()" style="margin-top:var(--space-2)">
          <span class="sidebar-nav-icon">${Icons.logout}</span>
          Sign Out
        </div>
      </div>
    </aside>
  `;
}

// ── App layout wrapper ───────────────────────────────────────
function appLayout(page, contentHTML, isAdmin = false) {
  const sidebar = isAdmin ? adminSidebarHTML(page) : citizenSidebarHTML(page);
  const header  = isAdmin ? adminHeaderHTML() : appHeaderHTML();
  return `
    <div class="app-layout">
      ${sidebar}
      <div class="main-content">
        ${header}
        <div class="page-body">
          ${contentHTML}
        </div>
      </div>
    </div>
  `;
}

function adminHeaderHTML() {
  return `
    <header class="app-header">
      <div class="app-header-left">
        <button class="sidebar-toggle" onclick="toggleSidebar()" aria-label="Toggle menu">
          ${Icons.menu}
        </button>
        <div class="search-bar">
          ${Icons.search}
          <input type="text" placeholder="Search..." id="admin-search">
        </div>
      </div>
      <div class="app-header-right">
        <button class="notif-btn" onclick="navigate('admin-notifications')" aria-label="Notifications">
          ${Icons.bell}
          <span class="notif-dot"></span>
        </button>
        <div class="sidebar-avatar" style="background:linear-gradient(135deg,#F59E0B,#DC2626)">AD</div>
      </div>
    </header>
  `;
}

function logout() {
  removeToken();
  AppState.currentUser = null;
  AppState.isAdmin = false;
  AppState.savedSchemes = [];
  showToast('Signed out', 'You have been signed out successfully.', 'info');
  navigate('home');
}

// ── Pagination helper ────────────────────────────────────────
function paginationHTML(total, current, perPage, onPageClick) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return '';
  let pages = '';
  for (let i = 1; i <= totalPages; i++) {
    pages += `<button class="btn btn-sm ${i === current ? 'btn-primary' : 'btn-ghost'}"
      onclick="${onPageClick}(${i})">${i}</button>`;
  }
  return `<div class="flex items-center gap-2 justify-center mt-6">${pages}</div>`;
}

// ── Public nav ───────────────────────────────────────────────
function pubNavHTML() {
  return `
    <nav class="pub-nav">
      <div class="pub-nav-inner">
        <div class="nav-logo" onclick="navigate('home')">
          <div class="nav-logo-icon">${Icons.logo}</div>
          SchemeEngine
        </div>
        <div class="nav-links">
          <span class="nav-link" onclick="navigate('find-schemes')">Find Schemes</span>
          <span class="nav-link" onclick="navigate('eligibility')">Check Eligibility</span>
          <span class="nav-link" onclick="navigate('home')">About</span>
        </div>
        <div class="nav-actions">
          <button class="mobile-menu-btn" id="mobile-menu-btn">${Icons.menu}</button>
          <button class="btn btn-ghost btn-sm" onclick="navigate('login')">Sign In</button>
          <button class="btn btn-primary btn-sm" onclick="navigate('register')">Get Started</button>
        </div>
      </div>
    </nav>
  `;
}

function pubFooterHTML() {
  return `
    <footer class="pub-footer">
      <div class="container">
        <div class="disclaimer">
          <strong>Disclaimer:</strong> SchemeEngine is an independent information platform to help citizens discover government schemes.
          It is not affiliated with, endorsed by, or an official representative of any government department. All scheme information is for reference only.
          Always visit the official government website to apply or verify eligibility.
        </div>
        <div class="footer-top">
          <div class="footer-brand">
            <div class="footer-logo">
              <div class="sidebar-logo-icon">${Icons.logo}</div>
              SchemeEngine
            </div>
            <p class="footer-desc">Helping citizens discover government support schemes and check eligibility — all in one place.</p>
          </div>
          <div>
            <div class="footer-col-title">Platform</div>
            <div class="footer-links">
              <span class="footer-link" onclick="navigate('find-schemes')">Find Schemes</span>
              <span class="footer-link" onclick="navigate('eligibility')">Check Eligibility</span>
              <span class="footer-link" onclick="navigate('recommendations')">Recommendations</span>
              <span class="footer-link" onclick="navigate('register')">Register</span>
              <span class="footer-link" onclick="navigate('admin-login')" style="color:rgba(255,255,255,0.4);font-size:0.7rem;margin-top:var(--space-2)">🛡️ Admin Login</span>
            </div>
          </div>
          <div>
            <div class="footer-col-title">Information</div>
            <div class="footer-links">
              <span class="footer-link">About SchemeEngine</span>
              <span class="footer-link">How It Works</span>
              <span class="footer-link">Privacy Policy</span>
              <span class="footer-link">Terms of Use</span>
            </div>
          </div>
          <div>
            <div class="footer-col-title">Resources</div>
            <div class="footer-links">
              <span class="footer-link">Official Gov Sites</span>
              <span class="footer-link">NSP Portal</span>
              <span class="footer-link">PM-JAY Portal</span>
              <span class="footer-link">Contact Us</span>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2024 SchemeEngine. Information purpose only.</span>
          <span>Built to make government schemes easier to discover.</span>
        </div>
      </div>
    </footer>
  `;
}
