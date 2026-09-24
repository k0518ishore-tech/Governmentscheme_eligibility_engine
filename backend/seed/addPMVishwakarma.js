// Add a sourced PM Vishwakarma record once, without replacing existing schemes.
// The scheme summary, covered trades, and benefit types are based on PIB's
// 30 July 2026 Ministry of MSME update. Eligibility follows the published
// scheme guidelines and should be confirmed on the official portal by users.

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Scheme from '../models/Scheme.js';
import Category from '../models/Category.js';
import Department from '../models/Department.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';

if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI must be configured.');

try {
  await mongoose.connect(process.env.MONGODB_URI);
  const existing = await Scheme.findOne({ name: 'PM Vishwakarma' });
  if (existing) {
    console.log(`PM Vishwakarma already exists in the database (${existing._id}). No duplicate added.`);
  } else {
    const category = await Category.findOne({ categoryName: 'Employment' });
    if (!category) throw new Error('The Employment category is missing. Create it in the admin interface first.');

    let department = await Department.findOne({ departmentName: 'Ministry of Micro, Small & Medium Enterprises' });
    if (!department) {
      department = await Department.create({
        departmentName: 'Ministry of Micro, Small & Medium Enterprises',
        ministryName: 'Ministry of Micro, Small & Medium Enterprises',
        departmentDescriptor: 'Government of India ministry administering PM Vishwakarma.',
        stateOrCentral: 'Central',
      });
    }

    const scheme = await Scheme.create({
      name: 'PM Vishwakarma',
      shortDescription: 'Support for artisans and craftspeople in 18 traditional trades who work with their hands and tools.',
      description: 'PM Vishwakarma provides end-to-end support to eligible traditional artisans and craftspeople, including recognition, skill training, modern toolkits, credit support, digital transaction incentives, and marketing support. Benefits are subject to scheme rules and verification by the implementing authorities.',
      department: department.departmentName,
      departmentId: department._id,
      ministry: department.ministryName,
      category: category.categoryName,
      categoryId: category._id,
      schemeType: 'Central Sector Scheme',
      level: 'Central',
      state: ['All States'],
      benefit: 'Training, toolkit, credit, digital and marketing support',
      benefitDetail: 'Published benefits include basic and advanced skill training, a toolkit incentive of up to ₹15,000, collateral-free enterprise loans in two tranches up to ₹3 lakh at a concessional 5% interest rate, digital transaction incentives, and marketing support. Actual availability and terms depend on scheme guidelines and beneficiary verification.',
      status: 'active',
      views: 0,
      tags: ['traditional trades', 'artisan', 'craftsperson', 'skill training', 'toolkit', 'credit support'],
      eligibilityRules: {
        age: { min: 18 },
        occupations: ['Traditional artisan or craftsperson'],
        states: ['All States'],
      },
      criteria: [
        { label: 'Trade', requirement: 'Must work with hands and tools in one of the 18 notified traditional trades.' },
        { label: 'Work status', requirement: 'Must be engaged in the trade in the unorganised sector on a self-employment basis.' },
        { label: 'Minimum age', requirement: '18 years at registration.' },
        { label: 'Family limit', requirement: 'Registration and benefits are restricted to one member of a family.' },
        { label: 'Restrictions', requirement: 'Government servants and their family members are not eligible. Prior similar government credit-based loans may restrict eligibility; check the current guidelines and exceptions.' },
        { label: 'Verification', requirement: 'Registration is subject to verification by implementing authorities.' },
      ],
      documentsRequired: [],
      applicationProcess: [
        'Review the current eligibility rules and notified trades on the official PM Vishwakarma portal.',
        'Register through the official portal or an authorised Common Service Centre.',
        'Complete the required local, district, and screening verification.',
        'After approval, check the portal for the benefits and steps available to your registration.',
      ],
      applicationUrl: 'https://pmvishwakarma.gov.in/',
      sourceUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2291931&lang=1&reg=3',
      eligibilitySourceUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1989108&lang=2&reg=48',
    });

    const users = await User.find({ role: 'user' }).select('_id').lean();
    if (users.length) {
      await Notification.insertMany(users.map(user => ({
        userId: user._id,
        schemeId: scheme._id,
        title: 'New Scheme Available',
        type: 'new_scheme',
        message: 'PM Vishwakarma has been added. Check the official guidelines and eligibility before applying.',
        priority: 'medium',
      })));
    }
    console.log(JSON.stringify({ schemeId: scheme._id, schemeName: scheme.name, category: scheme.category, department: scheme.department, notificationsSent: users.length }));
  }
} finally {
  await mongoose.disconnect();
}
