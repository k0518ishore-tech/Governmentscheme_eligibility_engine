// ============================================================
// SchemeGuide — API Client
// ============================================================
// Centralized API configuration for communicating with the backend.
// All fetch calls go through this module.
// ============================================================

const API_BASE_URL = 'http://localhost:5000/api';

// ── Token Management ──────────────────────────────────────────
function getToken() {
  return localStorage.getItem('schemeguide_token');
}

function setToken(token) {
  localStorage.setItem('schemeguide_token', token);
}

function removeToken() {
  localStorage.removeItem('schemeguide_token');
}

// ── Base fetch wrapper ────────────────────────────────────────
async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // If token is invalid/expired, logout
      if (response.status === 401) {
        removeToken();
        if (AppState.currentUser) {
          AppState.currentUser = null;
          AppState.isAdmin = false;
          showToast('Session expired', 'Please sign in again.', 'warning');
          navigate('login');
        }
      }
      throw { ...data, httpStatus: response.status };
    }

    return data;
  } catch (error) {
    if (error.httpStatus) throw error;
    // Network error
    console.error('[API] Network error:', error);
    throw {
      success: false,
      message: 'Unable to connect to server. Please check if the backend is running.',
      error: { code: 'NETWORK_ERROR' },
    };
  }
}

// ── Auth API ──────────────────────────────────────────────────
const AuthAPI = {
  register: (data) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  getMe: () => apiFetch('/auth/me'),
};

// ── User API ──────────────────────────────────────────────────
const UserAPI = {
  getProfile: () => apiFetch('/users/me'),
  updateProfile: (data) => apiFetch('/users/me', { method: 'PUT', body: JSON.stringify(data) }),
  getResults: () => apiFetch('/users/me/results'),
  getApplications: () => apiFetch('/users/me/applications'),
  getSaved: () => apiFetch('/users/me/saved'),
  saveScheme: (id) => apiFetch(`/users/me/saved/${id}`, { method: 'POST' }),
  unsaveScheme: (id) => apiFetch(`/users/me/saved/${id}`, { method: 'DELETE' }),
};

// ── Scheme API ────────────────────────────────────────────────
const SchemeAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/schemes${query ? '?' + query : ''}`);
  },
  getById: (id) => apiFetch(`/schemes/${id}`),
  search: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/schemes/search${query ? '?' + query : ''}`);
  },
  getByCategory: (category) => apiFetch(`/schemes/category/${encodeURIComponent(category)}`),
  getByState: (state) => apiFetch(`/schemes/state/${encodeURIComponent(state)}`),
};

// ── Eligibility API ───────────────────────────────────────────
const EligibilityAPI = {
  check: (profileData) =>
    apiFetch('/eligibility/check', { method: 'POST', body: JSON.stringify(profileData) }),
};

// ── Application API ───────────────────────────────────────────
const ApplicationAPI = {
  create: (data) => apiFetch('/applications', { method: 'POST', body: JSON.stringify(data) }),
  getAll: () => apiFetch('/applications'),
  getById: (id) => apiFetch(`/applications/${id}`),
  update: (id, data) => apiFetch(`/applications/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/applications/${id}`, { method: 'DELETE' }),
};

// ── Admin API ─────────────────────────────────────────────────
const AdminAPI = {
  getDashboard: () => apiFetch('/admin/dashboard'),
  getUsers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/users${query ? '?' + query : ''}`);
  },
  getSchemes: () => apiFetch('/admin/schemes'),
  createScheme: (data) => apiFetch('/admin/schemes', { method: 'POST', body: JSON.stringify(data) }),
  updateScheme: (id, data) => apiFetch(`/admin/schemes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteScheme: (id) => apiFetch(`/admin/schemes/${id}`, { method: 'DELETE' }),
  updateSchemeRules: (id, rules) =>
    apiFetch(`/admin/schemes/${id}/rules`, { method: 'PUT', body: JSON.stringify({ eligibilityRules: rules }) }),
  getApplications: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/applications${query ? '?' + query : ''}`);
  },
  updateApplicationStatus: (id, status) =>
    apiFetch(`/admin/applications/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
  getEligibilityStats: () => apiFetch('/admin/eligibility-statistics'),
};

console.log('[SchemeGuide] API client loaded. Backend:', API_BASE_URL);
