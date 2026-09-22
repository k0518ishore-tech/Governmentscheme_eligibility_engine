// ============================================================
// SchemeGuide Backend — Scheme Seed Data
// ============================================================
// Seeds the 8 schemes from the existing frontend data.js
// into MongoDB with proper eligibilityRules format.
// Run: node seed/schemeSeed.js
// ============================================================

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Scheme from '../models/Scheme.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/GovernmentSchemeDB';

const schemes = [
  {
    name: 'AICTE Pragati Scholarship for Girls',
    shortDescription: 'Financial support for girl students pursuing technical education.',
    description: 'The AICTE Pragati Scholarship provides financial assistance to girl students enrolled in AICTE approved institutions for pursuing technical education (degree and diploma). The scheme aims to advance technical education among girls.',
    category: 'Education',
    department: 'Ministry of Education',
    state: ['All States'],
    benefit: '₹50,000 per annum',
    benefitDetail: 'Annual scholarship of ₹50,000 along with contingency allowance.',
    status: 'active',
    views: 4521,
    tags: ['scholarship', 'girls', 'technical education'],
    popular: true,
    recommended: true,
    eligibilityRules: {
      age: { min: 18, max: 30 },
      gender: ['Female'],
      maxAnnualIncome: 800000,
      education: ['Diploma', "Bachelor's Degree"],
      occupations: ['Student'],
      categories: ['All'],
      states: ['All States'],
      disabilityRequired: false,
    },
    criteria: [
      { label: 'Gender', requirement: 'Female' },
      { label: 'Course', requirement: 'Technical (AICTE approved)' },
      { label: 'Annual Income', requirement: 'Below ₹8,00,000' },
      { label: 'Age', requirement: '18 to 30 years' },
    ],
    documentsRequired: ['Aadhaar Card', 'Marksheets (Class 10 & 12)', 'Income Certificate', 'Bank Account Details', 'Admission Letter'],
    applicationProcess: ['Register on National Scholarship Portal', 'Fill application form with accurate details', 'Upload required documents', 'Submit before deadline', 'Track application status online'],
    applicationUrl: 'https://scholarships.gov.in',
  },
  {
    name: 'PM Kisan Samman Nidhi',
    shortDescription: 'Income support of ₹6,000/year to small and marginal farmers.',
    description: 'PM-KISAN is a Central Sector scheme with 100% funding from the Government of India that provides income support to all landholding farmers to supplement their financial needs.',
    category: 'Agriculture',
    department: 'Ministry of Agriculture',
    state: ['All States'],
    benefit: '₹6,000 per year',
    benefitDetail: '₹6,000 per year in three installments of ₹2,000 each.',
    status: 'active',
    views: 8920,
    tags: ['farmer', 'income support', 'agriculture'],
    popular: true,
    recommended: false,
    eligibilityRules: {
      age: { min: 18, max: 100 },
      gender: ['Male', 'Female', 'Other'],
      maxAnnualIncome: 200000,
      education: ['All'],
      occupations: ['Farmer'],
      categories: ['All'],
      states: ['All States'],
      disabilityRequired: false,
    },
    criteria: [
      { label: 'Occupation', requirement: 'Farmer (landholding)' },
      { label: 'Annual Income', requirement: 'Below ₹2,00,000' },
      { label: 'Age', requirement: '18 years and above' },
    ],
    documentsRequired: ['Land Records (Khatoni/Patta)', 'Aadhaar Card', 'Bank Account Details', 'Mobile Number linked to Aadhaar'],
    applicationProcess: ['Visit nearest CSC center or official website', 'Fill PM-KISAN registration form', 'Provide land and bank details', 'Verification by local authorities', 'Amount directly credited to bank'],
    applicationUrl: 'https://pmkisan.gov.in',
  },
  {
    name: 'Ayushman Bharat PM-JAY',
    shortDescription: 'Health cover of ₹5 lakh per family per year for secondary and tertiary hospitalization.',
    description: 'Pradhan Mantri Jan Arogya Yojana (PM-JAY) is the world\'s largest health insurance scheme fully financed by the government providing cover of ₹5 lakh per family per year for secondary and tertiary care hospitalization.',
    category: 'Healthcare',
    department: 'Ministry of Health',
    state: ['All States'],
    benefit: '₹5 Lakh health cover',
    benefitDetail: 'Cashless hospitalization up to ₹5 lakh per family per year.',
    status: 'active',
    views: 12450,
    tags: ['health insurance', 'hospitalization', 'cashless'],
    popular: true,
    recommended: true,
    eligibilityRules: {
      age: { min: 0, max: 100 },
      gender: ['Male', 'Female', 'Other'],
      maxAnnualIncome: 200000,
      education: ['All'],
      occupations: ['All'],
      categories: ['All'],
      states: ['All States'],
      disabilityRequired: false,
    },
    criteria: [
      { label: 'Income', requirement: 'Below Poverty Line / SECC listed' },
      { label: 'Family', requirement: 'All family members covered' },
    ],
    documentsRequired: ['Aadhaar Card', 'Ration Card', 'Income Certificate', 'SECC data verification'],
    applicationProcess: ['Check eligibility on pmjay.gov.in', 'Visit empanelled hospital', 'Show Aadhaar/ration card at hospital help desk', 'Get Ayushman card issued', 'Avail cashless treatment'],
    applicationUrl: 'https://pmjay.gov.in',
  },
  {
    name: 'National Scholarship Portal — Merit-cum-Means',
    shortDescription: 'Merit-based scholarship for minority community students.',
    description: 'Merit-cum-Means Scholarship is available for students belonging to minority communities who are pursuing professional and technical courses at undergraduate and postgraduate levels.',
    category: 'Education',
    department: 'Ministry of Education',
    state: ['All States'],
    benefit: '₹20,000 per annum',
    benefitDetail: 'Course fee up to ₹20,000 and maintenance allowance of ₹1,000/month.',
    status: 'active',
    views: 3210,
    tags: ['minority', 'scholarship', 'professional courses'],
    popular: false,
    recommended: true,
    eligibilityRules: {
      age: { min: 16, max: 30 },
      gender: ['Male', 'Female', 'Other'],
      maxAnnualIncome: 250000,
      education: ["Bachelor's Degree", "Master's Degree"],
      occupations: ['Student'],
      categories: ['Minority'],
      states: ['All States'],
      disabilityRequired: false,
    },
    criteria: [
      { label: 'Community', requirement: 'Minority (Muslim/Sikh/Christian/Buddhist/Parsi/Jain)' },
      { label: 'Annual Income', requirement: 'Below ₹2,50,000' },
      { label: 'Marks', requirement: 'At least 50% in previous exam' },
    ],
    documentsRequired: ['Community Certificate', 'Income Certificate', 'Marksheets', 'Institution Verification', 'Bank Account Details'],
    applicationProcess: ['Register on National Scholarship Portal', 'Select Merit-cum-Means scholarship', 'Fill form with academic and income details', 'Upload documents', 'Submit and track'],
    applicationUrl: 'https://scholarships.gov.in',
  },
  {
    name: 'PM Awas Yojana (Urban)',
    shortDescription: 'Affordable housing for urban poor under "Housing for All" mission.',
    description: 'Pradhan Mantri Awas Yojana (Urban) aims to provide housing for all urban poor. The scheme offers interest subsidy on home loans and direct assistance for house construction.',
    category: 'Housing',
    department: 'Ministry of Housing',
    state: ['All States'],
    benefit: 'Up to ₹2.67 Lakh subsidy',
    benefitDetail: 'Interest subsidy up to 6.5% on home loans for eligible categories.',
    status: 'active',
    views: 6780,
    tags: ['housing', 'home loan', 'urban'],
    popular: true,
    recommended: false,
    eligibilityRules: {
      age: { min: 18, max: 70 },
      gender: ['Male', 'Female', 'Other'],
      maxAnnualIncome: 1800000,
      education: ['All'],
      occupations: ['All'],
      categories: ['EWS', 'LIG', 'MIG'],
      states: ['All States'],
      disabilityRequired: false,
    },
    criteria: [
      { label: 'Income Group', requirement: 'EWS / LIG / MIG' },
      { label: 'Home Ownership', requirement: 'Should not own a pucca house' },
      { label: 'Location', requirement: 'Urban area' },
    ],
    documentsRequired: ['Aadhaar Card', 'Income Certificate', 'Property Documents', 'Bank Account Details', 'Caste Certificate (if applicable)'],
    applicationProcess: ['Apply through local municipal body', 'Submit application with documents', 'Verification by officials', 'Sanction of loan with subsidy', 'Construction begins'],
    applicationUrl: 'https://pmaymis.gov.in',
  },
  {
    name: 'Beti Bachao Beti Padhao',
    shortDescription: 'Scheme to promote welfare of girl child and women empowerment.',
    description: 'Beti Bachao Beti Padhao scheme aims to address the declining Child Sex Ratio and related issues of disempowerment of women. It focuses on survival, protection and education of the girl child.',
    category: 'Women & Child',
    department: 'Ministry of Women & Child Development',
    state: ['All States'],
    benefit: 'Multiple benefits',
    benefitDetail: 'Educational support, conditional cash transfers, and social welfare programs.',
    status: 'active',
    views: 5430,
    tags: ['girl child', 'education', 'women empowerment'],
    popular: false,
    recommended: true,
    eligibilityRules: {
      age: { min: 0, max: 25 },
      gender: ['Female'],
      maxAnnualIncome: 500000,
      education: ['All'],
      occupations: ['All'],
      categories: ['All'],
      states: ['All States'],
      disabilityRequired: false,
    },
    criteria: [
      { label: 'Gender', requirement: 'Girl child / Women' },
      { label: 'Age', requirement: 'Up to 25 years' },
    ],
    documentsRequired: ['Birth Certificate', 'Aadhaar Card', 'School Enrollment Proof', 'Income Certificate'],
    applicationProcess: ['Visit Anganwadi or District office', 'Fill application form', 'Submit documents', 'Enroll in programme', 'Avail benefits as per scheme component'],
    applicationUrl: 'https://wcd.nic.in',
  },
  {
    name: 'Skill India Mission — PMKVY',
    shortDescription: 'Free skill training and certification for youth to enhance employability.',
    description: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY) is the flagship scheme of Ministry of Skill Development. Objectives of this skill certification scheme is to enable a large number of Indian youth to take up industry-relevant skill training.',
    category: 'Employment',
    department: 'Ministry of Labour',
    state: ['All States'],
    benefit: 'Free training + ₹8,000 reward',
    benefitDetail: 'Free skill certification and monetary reward up to ₹8,000 on completion.',
    status: 'active',
    views: 9870,
    tags: ['skill development', 'employment', 'youth', 'training'],
    popular: true,
    recommended: true,
    eligibilityRules: {
      age: { min: 15, max: 45 },
      gender: ['Male', 'Female', 'Other'],
      maxAnnualIncome: 500000,
      education: ['Primary', 'Secondary', 'Higher Secondary', 'All'],
      occupations: ['Unemployed', 'Student'],
      categories: ['All'],
      states: ['All States'],
      disabilityRequired: false,
    },
    criteria: [
      { label: 'Age', requirement: '15 to 45 years' },
      { label: 'Status', requirement: 'Unemployed / Seeking employment' },
    ],
    documentsRequired: ['Aadhaar Card', 'Educational Certificates', 'Bank Account Details', 'Passport Photo'],
    applicationProcess: ['Find nearest PMKVY training center', 'Register online or walk-in', 'Choose skill course', 'Complete training', 'Appear for assessment and get certified'],
    applicationUrl: 'https://pmkvyofficial.org',
  },
  {
    name: 'Senior Citizen Welfare Fund',
    shortDescription: 'Financial assistance and healthcare support for senior citizens above 60.',
    description: 'The Senior Citizen Welfare Fund provides various benefits including financial assistance, healthcare, and social security measures for senior citizens in India.',
    category: 'Senior Citizens',
    department: 'Ministry of Social Justice',
    state: ['All States'],
    benefit: 'Multiple benefits',
    benefitDetail: 'Monthly pension, medical aid, and travel concessions.',
    status: 'active',
    views: 2340,
    tags: ['pension', 'senior citizen', 'elderly'],
    popular: false,
    recommended: false,
    eligibilityRules: {
      age: { min: 60, max: 100 },
      gender: ['Male', 'Female', 'Other'],
      maxAnnualIncome: 200000,
      education: ['All'],
      occupations: ['Retired', 'Unemployed'],
      categories: ['All'],
      states: ['All States'],
      disabilityRequired: false,
    },
    criteria: [
      { label: 'Age', requirement: '60 years and above' },
      { label: 'Income', requirement: 'Below ₹2,00,000 per annum' },
    ],
    documentsRequired: ['Age Proof (Aadhaar/Birth Certificate)', 'Income Certificate', 'Bank Account Details', 'Residence Proof'],
    applicationProcess: ['Visit nearest district social welfare office', 'Submit application form', 'Provide age and income documents', 'Verification process', 'Pension credited monthly'],
    applicationUrl: 'https://socialjustice.gov.in',
  },
];

const seedSchemes = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('[Seed] Connected to MongoDB');

    // Clear existing schemes
    await Scheme.deleteMany({});
    console.log('[Seed] Cleared existing schemes');

    // Insert schemes
    const inserted = await Scheme.insertMany(schemes);
    console.log(`[Seed] ✅ Inserted ${inserted.length} schemes successfully`);

    // Print scheme IDs for reference
    inserted.forEach((s) => {
      console.log(`  - ${s.name} → ID: ${s._id}`);
    });

    await mongoose.connection.close();
    console.log('[Seed] Done. Connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error:', error.message);
    process.exit(1);
  }
};

seedSchemes();
