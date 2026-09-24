// ============================================================
// SchemeGuide Backend — Search History Service
// ============================================================

import SearchHistory from '../models/SearchHistory.js';

export const recordSearch = async (userId, searchData) => {
  return SearchHistory.create({
    userId,
    searchQuery: searchData.searchQuery || searchData.search || '',
    searchCategory: searchData.searchCategory || searchData.category || '',
    filterApplied: searchData.filterApplied || searchData.filters || null,
  });
};

export const getUserSearchHistory = async (userId, limit = 50) => {
  return SearchHistory.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit);
};

export const getSearchById = async (id, userId) => {
  const entry = await SearchHistory.findOne({ _id: id, userId });
  if (!entry) {
    const error = new Error('Search history entry not found');
    error.statusCode = 404;
    throw error;
  }
  return entry;
};

export const deleteSearchEntry = async (id, userId) => {
  const entry = await SearchHistory.findOneAndDelete({ _id: id, userId });
  if (!entry) {
    const error = new Error('Search history entry not found');
    error.statusCode = 404;
    throw error;
  }
  return entry;
};
