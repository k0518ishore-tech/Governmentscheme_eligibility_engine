// ============================================================
// SchemeGuide — Main App Router & Initialization
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize app
  navigate('home');

  
  // Mobile menu handler
  const mobileBtn = document.getElementById('mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      const nav = document.querySelector('.nav-links');
      if (nav) nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // Close sidebar on outside click
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
      closeSidebar();
    }
  });

  // Progress bar animations — trigger after render
  setTimeout(animateProgressBars, 100);
});

// Re-animate after page changes
const origRenderPage = renderPage;
window.renderPage = function() {
  origRenderPage();
  setTimeout(animateProgressBars, 200);
  setTimeout(animateChartBars, 300);
};

function animateProgressBars() {
  document.querySelectorAll('.progress-fill').forEach(el => {
    const target = el.style.width;
    el.style.width = '0%';
    requestAnimationFrame(() => {
      el.style.transition = 'width 1s ease';
      el.style.width = target;
    });
  });
}

function animateChartBars() {
  document.querySelectorAll('.chart-bar-fill').forEach(el => {
    const target = el.style.width;
    el.style.width = '0%';
    requestAnimationFrame(() => {
      el.style.transition = 'width 1.2s ease';
      el.style.width = target;
    });
  });
}

// Override renderPage to update page title
const _renderPage = renderPage;
window.renderPage = function() {
  _renderPage();

  // Update document title
  const pageTitles = {
    'home': 'SchemeGuide — Find Government Schemes',
    'login': 'Sign In — SchemeGuide',
    'register': 'Create Account — SchemeGuide',
    'dashboard': 'Dashboard — SchemeGuide',
    'find-schemes': 'Find Schemes — SchemeGuide',
    'scheme-detail': 'Scheme Details — SchemeGuide',
    'eligibility': 'Check Eligibility — SchemeGuide',
    'eligibility-result': 'Eligibility Results — SchemeGuide',
    'recommendations': 'Recommendations — SchemeGuide',
    'saved': 'Saved Schemes — SchemeGuide',
    'applications': 'My Applications — SchemeGuide',
    'notifications': 'Notifications — SchemeGuide',
    'profile': 'My Profile — SchemeGuide',
    'admin-login': 'Admin Login — SchemeGuide',
    'admin-dashboard': 'Admin Dashboard — SchemeGuide',
    'scheme-management': 'Scheme Management — Admin',
    'eligibility-rules': 'Eligibility Rules — Admin',
    'category-management': 'Categories — Admin',
    'department-management': 'Departments — Admin',
    'user-management': 'Users — Admin',
    'application-management': 'Applications — Admin',
    'recommendation-analytics': 'Recommendation Analytics — Admin',
    'feedback-management': 'Feedback — Admin',
  };
  document.title = pageTitles[AppState.currentPage] || 'SchemeGuide';

  setTimeout(animateProgressBars, 200);
  setTimeout(animateChartBars, 300);
};

console.log('[SchemeGuide] App initialized. Navigate to any page.');
