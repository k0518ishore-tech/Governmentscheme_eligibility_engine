// ============================================================
// SchemeGuide Backend — Scheme Service
// ============================================================

import Scheme from '../models/Scheme.js';

export const getAllSchemes = async (query = {}) => {
  const filter = { status: 'active' };

  // Text search
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { shortDescription: { $regex: query.search, $options: 'i' } },
      { category: { $regex: query.search, $options: 'i' } },
      { tags: { $in: [new RegExp(query.search, 'i')] } },
    ];
  }

  // Category filter
  if (query.category) {
    filter.category = query.category;
  }

  // State filter
  if (query.state && query.state !== 'All States') {
    filter.$or = filter.$or || [];
    filter.state = { $in: [query.state, 'All States'] };
    // Remove $or conflict if both search and state
    if (query.search) {
      const searchOr = [
        { name: { $regex: query.search, $options: 'i' } },
        { shortDescription: { $regex: query.search, $options: 'i' } },
        { category: { $regex: query.search, $options: 'i' } },
        { tags: { $in: [new RegExp(query.search, 'i')] } },
      ];
      filter.$and = [{ $or: searchOr }, { state: { $in: [query.state, 'All States'] } }];
      delete filter.$or;
      delete filter.state;
    }
  }

  // Department filter
  if (query.department) {
    filter.department = query.department;
  }

  // Status override for admin
  if (query.includeInactive) {
    delete filter.status;
  }

  // Sorting
  let sort = {};
  if (query.sort === 'popular') sort = { views: -1 };
  else if (query.sort === 'updated') sort = { updatedAt: -1 };
  else sort = { popular: -1, views: -1 };

  // Pagination
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 50;
  const skip = (page - 1) * limit;

  const schemes = await Scheme.find(filter).sort(sort).skip(skip).limit(limit);
  const total = await Scheme.countDocuments(filter);

  return { schemes, total, page, totalPages: Math.ceil(total / limit) };
};

export const getSchemeById = async (id) => {
  const scheme = await Scheme.findById(id);
  if (!scheme) {
    const error = new Error('Scheme not found');
    error.statusCode = 404;
    throw error;
  }

  // Increment views
  scheme.views = (scheme.views || 0) + 1;
  await scheme.save();

  return scheme;
};

export const getSchemesByCategory = async (category) => {
  return Scheme.find({ category, status: 'active' }).sort({ views: -1 });
};

export const getSchemesByState = async (state) => {
  return Scheme.find({
    state: { $in: [state, 'All States'] },
    status: 'active',
  }).sort({ views: -1 });
};

export const createScheme = async (data) => {
  return Scheme.create(data);
};

export const updateScheme = async (id, data) => {
  const scheme = await Scheme.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!scheme) {
    const error = new Error('Scheme not found');
    error.statusCode = 404;
    throw error;
  }
  return scheme;
};

export const deleteScheme = async (id) => {
  const scheme = await Scheme.findByIdAndDelete(id);
  if (!scheme) {
    const error = new Error('Scheme not found');
    error.statusCode = 404;
    throw error;
  }
  return scheme;
};
