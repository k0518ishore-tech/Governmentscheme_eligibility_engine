// ============================================================
// SchemeGuide — Main App Router & Initialization
// ============================================================

document.addEventListener('DOMContentLoaded', async () => {
  await loadReferenceData();
  // Check for saved JWT token
  if (getToken()) {
    try {
      const res = await AuthAPI.getMe();
      if (res.data && res.data.user) {
        AppState.currentUser = res.data.user;
        AppState.isAdmin = res.data.user.role === 'admin';
        await syncSavedSchemes();
        console.log('[SchemeGuide] Restored session for:', res.data.user.email);
      }
    } catch (err) {
      console.warn('[SchemeGuide] Failed to restore session from token');
      removeToken();
    }
  }

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
    'home': 'SchemeEngine — Find Government Schemes',
    'login': 'Sign In — SchemeEngine',
    'register': 'Create Account — SchemeEngine',
    'dashboard': 'Dashboard — SchemeEngine',
    'find-schemes': 'Find Schemes — SchemeEngine',
    'scheme-detail': 'Scheme Details — SchemeEngine',
    'eligibility': 'Check Eligibility — SchemeEngine',
    'eligibility-result': 'Eligibility Results — SchemeEngine',
    'recommendations': 'Recommendations — SchemeEngine',
    'saved': 'Saved Schemes — SchemeEngine',
    'applications': 'My Applications — SchemeEngine',
    'notifications': 'Notifications — SchemeEngine',
    'profile': 'My Profile — SchemeEngine',
    'admin-login': 'Admin Login — SchemeEngine',
    'admin-dashboard': 'Admin Dashboard — SchemeEngine',
    'scheme-management': 'Scheme Management — Admin',
    'eligibility-rules': 'Eligibility Rules — Admin',
    'category-management': 'Categories — Admin',
    'department-management': 'Departments — Admin',
    'user-management': 'Users — Admin',
    'application-management': 'Applications — Admin',
    'recommendation-analytics': 'Recommendation Analytics — Admin',
    'feedback-management': 'Feedback — Admin',
  };
  document.title = pageTitles[AppState.currentPage] || 'SchemeEngine';

  setTimeout(animateProgressBars, 200);
  setTimeout(animateChartBars, 300);
};

console.log('[SchemeEngine] App initialized. Navigate to any page.');
