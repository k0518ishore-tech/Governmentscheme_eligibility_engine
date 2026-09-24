// SchemeGuide — runtime state populated from MongoDB-backed API responses.

let CATEGORIES = [];
let DEPARTMENTS = [];
let SCHEMES = [];
let USERS = [];
let APPLICATIONS = [];
let NOTIFICATIONS = [];
let FEEDBACKS = [];

const STATES = ['All States','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];

const AppState = {
  currentUser: null,
  isAdmin: false,
  currentPage: 'home',
  savedSchemes: [],
  searchQuery: '',
  filters: {},
  eligibilityData: null,
  eligibilityResult: null,
  selectedScheme: null,
  sidebarOpen: false,
  notificationCount: 0,
};

async function loadReferenceData() {
  const [categoriesResult, departmentsResult, schemesResult] = await Promise.allSettled([
    CategoryAPI.getAll(), DepartmentAPI.getAll(), SchemeAPI.getAll(),
  ]);

  if (categoriesResult.status === 'fulfilled') {
    CATEGORIES = (categoriesResult.value.data.categories || categoriesResult.value.data || []).map(category => ({
      id: category._id,
      name: category.categoryName,
      desc: category.categoryDescription || '',
      icon: '📋',
    }));
  }
  if (departmentsResult.status === 'fulfilled') {
    DEPARTMENTS = (departmentsResult.value.data.departments || departmentsResult.value.data || []).map(department => ({
      id: department._id,
      name: department.departmentName,
      desc: department.departmentDescriptor || '',
      contact: department.contactEmail || '',
      website: department.officialWebsite || '',
    }));
  }
  if (schemesResult.status === 'fulfilled') {
    SCHEMES = (schemesResult.value.data.schemes || []).map(mapBackendScheme);
  }
}
