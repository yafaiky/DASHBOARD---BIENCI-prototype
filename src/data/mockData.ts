import type { Employee, ActivityItem, StorePerformance, IRCase, ComplianceItem } from '../types';

export const mockEmployees: Employee[] = [
  {
    id: 'EMP-10231',
    name: 'Andi Pratama',
    email: 'andi.pratama@biensi.co.id',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    division: 'Retail Operations',
    department: 'Store Ops – Bandung 01',
    position: 'Senior Store Associate',
    location: 'Bandung',
    storeCluster: 'Bandung HQ & Stores (Primary)',
    brand: '3SECOND',
    employmentType: 'PKWT',
    status: 'Active',
    joinDate: '24 Oct 2026',
    contractEndDate: '24 Oct 2027',
    salary: 5800000,
    phone: '+62 812-3456-7890',
    gender: 'Male',
    age: 26,
    education: 'Diploma / D3 Retail',
    tenureYears: 1
  },
  {
    id: 'EMP-10232',
    name: 'Sinta Maharani',
    email: 'sinta.m@biensi.co.id',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    division: 'Fashion & Design',
    department: 'Fashion Design – HQ',
    position: 'Apparel Designer (Greenlight)',
    location: 'Bandung HQ',
    storeCluster: 'Bandung HQ & Stores (Primary)',
    brand: 'GREENLIGHT',
    employmentType: 'Probation',
    status: 'Probation',
    joinDate: '22 Oct 2026',
    contractEndDate: '22 Jan 2027',
    salary: 8500000,
    phone: '+62 813-8877-6655',
    gender: 'Female',
    age: 28,
    education: "Bachelor's Degree in Fashion Design",
    tenureYears: 0.2
  },
  {
    id: 'EMP-10233',
    name: 'Budi Hartono',
    email: 'budi.hartono@biensi.co.id',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    division: 'Supply Chain & Logistics',
    department: 'Logistics & Fulfillment',
    position: 'Shift Supervisor Hub A',
    location: 'Cimahi Central Hub',
    storeCluster: 'Bandung HQ & Stores (Primary)',
    brand: '3SECOND',
    employmentType: 'PKWTT',
    status: 'Active',
    joinDate: '20 Oct 2026',
    salary: 7400000,
    phone: '+62 811-2233-4455',
    gender: 'Male',
    age: 34,
    education: "Bachelor's Degree in Industrial Engineering",
    tenureYears: 3
  },
  {
    id: 'EMP-10234',
    name: 'Maya Anggraeni',
    email: 'maya.a@biensi.co.id',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    division: 'Marketing & Creative',
    department: 'Visual Merchandising',
    position: 'Regional VM Specialist',
    location: 'Jakarta',
    storeCluster: 'Jabodetabek Flagship Hub',
    brand: 'FAMO',
    employmentType: 'PKWTT',
    status: 'Promotion',
    joinDate: '18 Oct 2026',
    salary: 9200000,
    phone: '+62 856-7890-1234',
    gender: 'Female',
    age: 31,
    education: "Bachelor's Degree in Visual Communication Design",
    tenureYears: 4
  },
  {
    id: 'EMP-10235',
    name: 'Reza Pahlevi',
    email: 'reza.p@biensi.co.id',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    division: 'Retail Operations',
    department: 'Store Ops – Jakarta Flagship',
    position: 'Chief Cashier Leader',
    location: 'Jakarta',
    storeCluster: 'Jabodetabek Flagship Hub',
    brand: '3SECOND',
    employmentType: 'PKWT',
    status: 'Active',
    joinDate: '17 Oct 2026',
    contractEndDate: '17 Oct 2027',
    salary: 5600000,
    phone: '+62 819-4567-8901',
    gender: 'Male',
    age: 27,
    education: 'Diploma in Accounting',
    tenureYears: 2
  },
  {
    id: 'EMP-10236',
    name: 'Dewi Lestari',
    email: 'dewi.lestari@biensi.co.id',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    division: 'Retail Operations',
    department: 'Store Ops – Surabaya Galaxy',
    position: 'Store Associate',
    location: 'Surabaya',
    storeCluster: 'East Java Region',
    brand: 'MOUTLEY',
    employmentType: 'PKWT',
    status: 'Active',
    joinDate: '15 Oct 2026',
    contractEndDate: '15 Oct 2027',
    salary: 5100000,
    phone: '+62 813-2211-0099',
    gender: 'Female',
    age: 22,
    education: 'Senior High School',
    tenureYears: 0.5
  },
  {
    id: 'EMP-10237',
    name: 'Fikri Ramadhan',
    email: 'fikri.r@biensi.co.id',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    division: 'Digital & Omnichannel',
    department: 'Omnichannel & IT',
    position: 'Frontend React Engineer',
    location: 'Bandung HQ',
    storeCluster: 'Bandung HQ & Stores (Primary)',
    brand: '3SECOND',
    employmentType: 'PKWTT',
    status: 'Active',
    joinDate: '10 Oct 2026',
    salary: 11000000,
    phone: '+62 878-1122-3344',
    gender: 'Male',
    age: 29,
    education: "Bachelor's Degree in Informatics",
    tenureYears: 1.5
  },
  {
    id: 'EMP-10238',
    name: 'Anisa Rahmawati',
    email: 'anisa.r@biensi.co.id',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    division: 'Finance & Accounting',
    department: 'Finance, Tax & Accounting',
    position: 'Tax Compliance Analyst',
    location: 'Bandung HQ',
    storeCluster: 'Bandung HQ & Stores (Primary)',
    brand: '3SECOND',
    employmentType: 'PKWTT',
    status: 'Active',
    joinDate: '05 Oct 2026',
    salary: 8200000,
    phone: '+62 812-9988-7766',
    gender: 'Female',
    age: 30,
    education: "Bachelor's Degree in Taxation",
    tenureYears: 2.8
  },
  {
    id: 'EMP-10239',
    name: 'Rian Hidayat',
    email: 'rian.h@biensi.co.id',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    division: 'Retail Operations',
    department: 'Store Ops – Medan Focal Point',
    position: 'Assistant Store Manager',
    location: 'Medan',
    storeCluster: 'Sumatera Regional Hub',
    brand: 'GREENLIGHT',
    employmentType: 'PKWTT',
    status: 'Active',
    joinDate: '02 Oct 2026',
    salary: 6900000,
    phone: '+62 821-3344-5566',
    gender: 'Male',
    age: 32,
    education: 'Diploma in Management',
    tenureYears: 3.2
  },
  {
    id: 'EMP-10240',
    name: 'Citra Permata',
    email: 'citra.p@biensi.co.id',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    division: 'Commercial Business',
    department: 'Merchandising Planning',
    position: 'Junior Planner',
    location: 'Bandung HQ',
    storeCluster: 'Bandung HQ & Stores (Primary)',
    brand: '3SECOND',
    employmentType: 'Probation',
    status: 'Probation',
    joinDate: '01 Oct 2026',
    contractEndDate: '01 Jan 2027',
    salary: 6200000,
    phone: '+62 857-4455-6677',
    gender: 'Female',
    age: 24,
    education: "Bachelor's Degree in Statistics",
    tenureYears: 0.1
  }
];

export const mockActivityStream: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Batch Data Import Complete',
    description: 'HR Admin imported 124 records from store_recruitment.xlsx.',
    timestamp: '12m ago',
    type: 'import',
    dotColor: '#2563EB',
    user: 'Budi Santoso (Admin)'
  },
  {
    id: 'act-2',
    title: 'Promotion Approved',
    description: 'Promotion finalized: Maya Anggraeni to Senior Visual Merchandiser.',
    timestamp: '1h ago',
    type: 'promotion',
    dotColor: '#16A34A',
    user: 'HR Directorate'
  },
  {
    id: 'act-3',
    title: 'PKWT Contract Renewals',
    description: 'Contracts renewed for 42 retail associates across West Java branches.',
    timestamp: '3h ago',
    type: 'contract',
    dotColor: '#2563EB',
    user: 'West Java HR Cluster'
  },
  {
    id: 'act-4',
    title: 'Policy Update Issued',
    description: 'Broadcasted revised Holiday Shift Allowance for 3Second & Famo store staff.',
    timestamp: '5h ago',
    type: 'policy',
    dotColor: '#F59E0B',
    user: 'Corporate HR'
  },
  {
    id: 'act-5',
    title: 'Exit Interview Completed',
    description: 'Offboarding checklist signed off for Warehouse Hub Supervisor in Surabaya.',
    timestamp: 'Yesterday',
    type: 'exit',
    dotColor: '#DC2626',
    user: 'Talent Offboarding'
  }
];

export const workforceTrendData = {
  categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT \'26'],
  active: [10200, 10450, 10700, 10920, 11150, 11340, 11520, 11680, 11740, 11920],
  joiners: [210, 245, 260, 255, 280, 290, 275, 305, 310, 284],
  resigned: [75, 82, 90, 88, 102, 95, 89, 92, 109, 96]
};

export const departmentDistribution = [
  { name: 'Retail Store Operations', count: 6850, percentage: 54.9, color: '#161928' },
  { name: 'Supply Chain & Logistics Hub', count: 2140, percentage: 17.1, color: '#2563EB' },
  { name: 'Marketing, Brand & Creative', count: 1230, percentage: 9.8, color: '#F59E0B' },
  { name: 'Finance, Tax & Accounting', count: 620, percentage: 5.0, color: '#0D9488' },
  { name: 'Digital, Omnichannel & IT', count: 210, percentage: 1.7, color: '#C8102E' }
];

export const contractTypesData = {
  series: [9740, 2180, 370, 190],
  labels: ['Permanent (PKWTT)', 'Contract (PKWT)', 'Probation', 'Internship / Seasonal'],
  colors: ['#172B4D', '#C8102E', '#F59E0B', '#38BDF8'],
  total: 12480,
  permanentPercentage: 78
};

// Store Performance Leaderboard with Excel Store Types & Regions
export const mockStorePerformances: StorePerformance[] = [
  {
    storeId: 'STR-BDO-01',
    storeName: 'FS MARTADINATA BANDUNG',
    cluster: 'Bandung HQ & Stores (Primary)',
    region: 'Barat',
    brand: '3SECOND',
    format: 'Family Store',
    headcount: 25,
    leaderTenure: '6.2 Years',
    staffRatio: '1 : 11.5',
    sales: 1980000000,
    targetSales: 1850000000,
    labourCost: 148000000,
    achievementRate: 107.0,
    revenuePerFte: 79200000,
    labourCostRatio: 7.47
  },
  {
    storeId: 'STR-JKT-04',
    storeName: 'SHOWROOM SUMMARECON MAL BKSI',
    cluster: 'Jabodetabek Flagship Hub',
    region: 'Barat',
    brand: 'GREENLIGHT',
    format: 'Showroom',
    headcount: 7,
    leaderTenure: '3.8 Years',
    staffRatio: '1 : 6.0',
    sales: 1420000000,
    targetSales: 1300000000,
    labourCost: 98000000,
    achievementRate: 109.2,
    revenuePerFte: 202857142,
    labourCostRatio: 6.90
  },
  {
    storeId: 'STR-GRT-01',
    storeName: 'FS GARUT',
    cluster: 'Priangan Timur',
    region: 'Barat',
    brand: '3SECOND',
    format: 'Family Store',
    headcount: 21,
    leaderTenure: '5.1 Years',
    staffRatio: '1 : 10.0',
    sales: 2786000000,
    targetSales: 2600000000,
    labourCost: 182000000,
    achievementRate: 107.1,
    revenuePerFte: 132666666,
    labourCostRatio: 6.53
  },
  {
    storeId: 'STR-KPT-01',
    storeName: 'FS KEPATIHAN',
    cluster: 'Bandung Central',
    region: 'Barat',
    brand: '3SECOND',
    format: 'Family Store',
    headcount: 10,
    leaderTenure: '2.5 Years',
    staffRatio: '1 : 9.0',
    sales: 1987000000,
    targetSales: 1900000000,
    labourCost: 112000000,
    achievementRate: 104.5,
    revenuePerFte: 198700000,
    labourCostRatio: 5.63
  },
  {
    storeId: 'STR-SBY-02',
    storeName: 'SHOWROOM TUNJUNGAN PLAZA',
    cluster: 'East Java Region',
    region: 'Timur',
    brand: 'FAMO',
    format: 'Showroom',
    headcount: 8,
    leaderTenure: '0.9 Years',
    staffRatio: '1 : 7.0',
    sales: 1220000000,
    targetSales: 1250000000,
    labourCost: 88000000,
    achievementRate: 97.6,
    revenuePerFte: 152500000,
    labourCostRatio: 7.21
  },
  {
    storeId: 'STR-MKS-01',
    storeName: 'FS PERINTIS MKS',
    cluster: 'Sulawesi & Eastern Hub',
    region: 'Timur',
    brand: '3SECOND',
    format: 'Family Store',
    headcount: 14,
    leaderTenure: '4.2 Years',
    staffRatio: '1 : 13.0',
    sales: 980000000,
    targetSales: 950000000,
    labourCost: 78000000,
    achievementRate: 103.1,
    revenuePerFte: 70000000,
    labourCostRatio: 7.95
  },
  {
    storeId: 'STR-YOG-03',
    storeName: 'COUNTER MATAHARI MALIOBORO',
    cluster: 'Central Java & DIY',
    region: 'Tengah',
    brand: '3SECOND',
    format: 'Counter',
    headcount: 3,
    leaderTenure: '0.6 Years',
    staffRatio: '1 : 2.0',
    sales: 420000000,
    targetSales: 450000000,
    labourCost: 32000000,
    achievementRate: 93.3,
    revenuePerFte: 140000000,
    labourCostRatio: 7.62
  }
];

// Q11: Peak Season Cost Savings (Part-time & Internship vs Full-Time Equivalent)
export const peakSeasonSavingsData = {
  seasonalHeadcount: 450,
  peakPeriods: ['Ramadhan & Lebaran', 'End-Year Holiday Sale'],
  actualSeasonalCost: 1580000000, // Rp 1.58 Miliar
  fulltimeBenchmarkCost: 3420000000, // Rp 3.42 Miliar
  netCostSavings: 1840000000, // Rp 1.84 Miliar Saved!
  savingsPercentage: 53.8,
  internsDeployed: 120,
  partTimeDeployed: 330
};

// Q22: Sales per Hour Productivity: Part-Time vs Full-Time during Peak Hours
export const salesPerHourData = {
  peakHoursRange: '14:00 – 21:00 (Weekend & Payday)',
  fullTime: {
    salesPerHour: 310000, // Rp 310k/hr
    costPerHour: 38000,
    efficiencyRatio: 8.15
  },
  partTime: {
    salesPerHour: 285000, // Rp 285k/hr (91.9% output)
    costPerHour: 22000,
    efficiencyRatio: 12.95 // 1.58x more cost-efficient!
  },
  productivityOutputPercentage: 91.9,
  hourlyCostSavingsPercentage: 42.1
};

// Q6: Turnover Breakdown by Store Format (Family Store, Showroom, Counter)
export const storeFormatTurnoverData = [
  {
    format: 'Family Store (FS)',
    turnoverRate: 1.8,
    headcount: 6240,
    departuresYtd: 112,
    benchmarkMax: 3.0,
    status: 'Optimal 🟢',
    primaryReasons: 'Habis Kontrak (52%), Resign SOP (28%), Kelalaian SO (20%)'
  },
  {
    format: 'Showroom (Mall)',
    turnoverRate: 2.4,
    headcount: 3180,
    departuresYtd: 76,
    benchmarkMax: 3.0,
    status: 'Normal 🟡',
    primaryReasons: 'Target Tekanan Mall (45%), Tawaran Karir Lain (35%), Closing Toko (20%)'
  },
  {
    format: 'Counter (Dept Store/YDS)',
    turnoverRate: 3.9,
    headcount: 1820,
    departuresYtd: 71,
    benchmarkMax: 3.0,
    status: 'Perlu Evaluasi 🔴',
    primaryReasons: 'Single-brand fatigue, Jam kerja shift mall panjang, Komisi kompetitor'
  }
];

// Q3: Store Staffing Composition (Sales Advisor/Cashier to Store Manager Ratio)
export const storeStaffingRatioData = {
  nationalAverageRatio: '1 : 7.4',
  breakdown: [
    { format: 'Family Store', ratio: '1 Store Leader : 11.2 Associate', productivityStatus: 'Optimal' },
    { format: 'Showroom', ratio: '1 Store Leader : 5.8 Associate', productivityStatus: 'Optimal' },
    { format: 'Counter', ratio: '1 Senior Leader : 2.0 Associate', productivityStatus: 'Lean' }
  ]
};

// Q20 & Recruitment KPI Dashboard from Excel
export const recruitmentKpiData = {
  totalManpowerRequest2026: 3450,
  positionsFilled: 3180,
  fulfillmentRate: 92.2,
  avgTimeToHireDays: 14.2, // Benchmark < 21 Days
  costPerHire: 1250000, // Rp 1.25M per hire
  turnoverUnderOneYear: 4.8 // Target < 10%
};

// Q28: Store Leader Tenure vs Consistent Target Achievement
export const storeLeaderTenureImpact = [
  { tenureGroup: '> 5 Years Experience', countStores: 24, avgAchievement: 108.4, status: 'Top Consistent Performer' },
  { tenureGroup: '2 – 5 Years Experience', countStores: 85, avgAchievement: 102.1, status: 'Consistent' },
  { tenureGroup: '1 – 2 Years Experience', countStores: 142, avgAchievement: 98.6, status: 'Moderate' },
  { tenureGroup: '< 1 Year Experience', countStores: 91, avgAchievement: 93.8, status: 'Coaching Required' }
];

// Q9 & Q24: R&D, Design & Product Development Demographics
export const designProductDevData = {
  avgAge: 26.4,
  headcount: 185,
  genderSplit: { female: 62, male: 38 },
  tenureDistribution: [
    { range: '< 1 Year (Fresh Perspectives)', pct: 26 },
    { range: '1 – 3 Years (Growth Core)', pct: 40 },
    { range: '3 – 5 Years (Experienced)', pct: 22 },
    { range: '> 5 Years (Design Guardians)', pct: 12 }
  ]
};

// Q27: Internship Conversion to Full-time
export const internshipConversionData = {
  totalInterns: 190,
  convertedToFulltimePKWT: 65,
  conversionRate: 34.2,
  activeInterns: 85,
  completedNotConverted: 40
};

// Q29: Managerial Level Gender Representation
export const managerialGenderData = {
  malePct: 54,
  femalePct: 46,
  totalManagerialPositions: 142,
  femaleLeaders: 65,
  maleLeaders: 77
};

export const mockIRCases: IRCase[] = [
  {
    id: 'IR-2026-089',
    caseNo: 'SP-109/HC-IR/X/2026',
    employeeId: 'EMP-08812',
    employeeName: 'Dimas Kurniawan',
    position: 'Cashier Store Bandung 03',
    store: 'FS KEPATIHAN',
    category: 'Discipline / SP',
    level: 'SP-2',
    financialImpact: 1200000,
    startDate: '12 Oct 2026',
    status: 'In Review'
  },
  {
    id: 'IR-2026-088',
    caseNo: 'FR-044/AUDIT-HC/X/2026',
    employeeId: 'EMP-07441',
    employeeName: 'Rendy Pratomo',
    position: 'Inventory Staff Hub C',
    store: 'Cimahi Central Hub',
    category: 'Fraud / Shrinkage',
    level: 'Investigation',
    financialImpact: 24500000,
    startDate: '08 Oct 2026',
    status: 'Open'
  },
  {
    id: 'IR-2026-085',
    caseNo: 'BP-012/DISNAKER-BDG/IX/2026',
    employeeId: 'EMP-06109',
    employeeName: 'Iwan Setiawan',
    position: 'Ex-Logistics Helper',
    store: 'Bandung Central Distribution',
    category: 'Bipartite',
    level: 'PHK',
    financialImpact: 14800000,
    startDate: '25 Sep 2026',
    endDate: '15 Oct 2026',
    status: 'Resolved'
  }
];

export const mockComplianceItems: ComplianceItem[] = [
  {
    id: 'CMP-01',
    area: 'BPJS Ketenagakerjaan',
    name: 'Laporan Kepesertaan & Pembayaran Iuran Bulan Oktober 2026',
    entity: 'PT BIENSI FESYENINDO & Group',
    status: 'Compliant',
    expiryDate: '15 Nov 2026',
    daysRemaining: 22,
    assignedTo: 'Finance & HR Compensation'
  },
  {
    id: 'CMP-02',
    area: 'WLKP Kemnaker',
    name: 'Wajib Lapor Ketenagakerjaan Perusahaan Tahunan 2026/2027',
    entity: 'Seluruh 342 Store Unit & HQ',
    status: 'Expiring',
    expiryDate: '01 Nov 2026',
    daysRemaining: 8,
    assignedTo: 'Legal & IR Directorate'
  },
  {
    id: 'CMP-03',
    area: 'Peraturan Perusahaan (PP)',
    name: 'Pembaruan Registrasi Peraturan Perusahaan Disnaker Bandung',
    entity: 'PT BIENSI FESYENINDO',
    status: 'Compliant',
    expiryDate: '28 Feb 2027',
    daysRemaining: 126,
    assignedTo: 'Industrial Relation Team'
  },
  {
    id: 'CMP-04',
    area: 'SLF & Sertifikasi K3 Kelistrikan',
    name: 'Riksa Uji Instalasi Genset & Kelistrikan Store Flagship Surabaya',
    entity: 'Store Surabaya Galaxy',
    status: 'Expired',
    expiryDate: '10 Oct 2026',
    daysRemaining: -14,
    assignedTo: 'GA & Retail Facility Management'
  }
];

// Q17: Tren Demografi dan Produktivitas Karyawan: Area Timur vs Area Barat
export const regionalDemographicsProductivityData = {
  west: {
    regionName: 'Area Barat',
    code: 'Barat' as const,
    coverage: 'Sumatera, DKI Jakarta, Banten, Jawa Barat',
    totalStores: 218,
    totalHeadcount: 7180,
    avgAge: 23.4,
    avgTenureYears: 1.8,
    revenuePerFte: 71200000, // Rp 71.2 Juta / FTE
    targetAchievement: 104.2, // %
    turnoverRate: 11.4, // %
    supervisionRatio: '1 : 8.4',
    tenureCohorts: [
      { label: '< 1 Tahun (Staf Baru)', pct: 42, count: 3015 },
      { label: '1 – 3 Tahun (Terkonfirmasi)', pct: 38, count: 2728 },
      { label: '> 3 Tahun (Senior / Core)', pct: 20, count: 1437 },
    ],
    ageCohorts: [
      { range: '< 21 Thn', pct: 22 },
      { range: '21 – 25 Thn', pct: 52 },
      { range: '26 – 30 Thn', pct: 18 },
      { range: '> 30 Thn', pct: 8 },
    ],
    productivityTitle: 'High-Velocity Footfall',
    operationalTrait: 'Didominasi talenta muda Gen-Z usia produktif awal dengan dinamika sales floor cepat di mall-mall kota besar.',
    keyChallenge: 'Turnover tahun pertama relatif tinggi (11.4%) karena perputaran retail perkotaan dan rekrutmen agresif kompetitor.'
  },
  east: {
    regionName: 'Area Timur',
    code: 'Timur' as const,
    coverage: 'Jawa Tengah, Jawa Timur, Bali, NTB/NTT, Kalimantan, Sulawesi, Papua',
    totalStores: 124,
    totalHeadcount: 4060,
    avgAge: 25.8,
    avgTenureYears: 3.2,
    revenuePerFte: 64800000, // Rp 64.8 Juta / FTE
    targetAchievement: 107.5, // %
    turnoverRate: 6.8, // %
    supervisionRatio: '1 : 9.2',
    tenureCohorts: [
      { label: '< 1 Tahun (Staf Baru)', pct: 22, count: 893 },
      { label: '1 – 3 Tahun (Terkonfirmasi)', pct: 48, count: 1949 },
      { label: '> 3 Tahun (Senior / Core)', pct: 30, count: 1218 },
    ],
    ageCohorts: [
      { range: '< 21 Thn', pct: 10 },
      { range: '21 – 25 Thn', pct: 42 },
      { range: '26 – 30 Thn', pct: 34 },
      { range: '> 30 Thn', pct: 14 },
    ],
    productivityTitle: 'High-Tenure Quota Consistency',
    operationalTrait: 'Stabilitas staf sangat kokoh dengan rata-rata masa kerja 3.2 tahun, loyalitas tinggi, dan penguasaan pelanggan lokal.',
    keyChallenge: 'Pertumbuhan basket size lebih bergantung pada daya beli regional, namun target sales tercapai konsisten (107.5%).'
  },
  comparisonMetrics: [
    {
      metric: 'Rata-Rata Usia Karyawan',
      westVal: '23.4 Tahun',
      eastVal: '25.8 Tahun',
      diff: '+2.4 thn lebih matang di Timur',
      indicator: 'Demografi Usia',
      winner: 'Timur Lebih Stabil'
    },
    {
      metric: 'Rata-Rata Masa Kerja (Tenure)',
      westVal: '1.8 Tahun',
      eastVal: '3.2 Tahun',
      diff: '+1.4 thn masa kerja lebih panjang',
      indicator: 'Masa Kerja',
      winner: 'Timur Lebih Loyal'
    },
    {
      metric: 'Turnover Tahunan Toko',
      westVal: '11.4%',
      eastVal: '6.8%',
      diff: '-4.6% turnover lebih rendah di Timur',
      indicator: 'Retensi HR',
      winner: 'Timur Unggul Retensi'
    },
    {
      metric: 'Produktivitas Sales (Revenue / FTE)',
      westVal: 'Rp 71.2 Juta',
      eastVal: '64.8 Juta',
      diff: '+Rp 6.4 Jt/FTE lebih tinggi di Barat',
      indicator: 'Produktivitas Sales',
      winner: 'Barat Unggul Per-Kapita'
    },
    {
      metric: 'Pencapaian Target Penjualan',
      westVal: '104.2%',
      eastVal: '107.5%',
      diff: '+3.3% konsistensi kuota lebih tinggi',
      indicator: 'Pencapaian Target',
      winner: 'Timur Unggul Target'
    },
    {
      metric: 'Total Toko Aktif & Headcount',
      westVal: '218 Toko (7,180 Staf)',
      eastVal: '124 Toko (4,060 Staf)',
      diff: '64% populasi toko ritel nasional',
      indicator: 'Jaringan Toko',
      winner: 'Barat Skala Terbesar'
    }
  ]
};

// Q16: Kesenjangan (Tenure Gap) Masa Kerja Antara Store Manager (Senior) dan Staf Baru
export const storeTenureGapData = {
  overallGapYears: 5.0, // Gap 5.8 yrs (SM) vs 0.8 yrs (Staf Baru)
  storeManagerTenure: 5.8,
  frontlineStaffTenure: 0.8,
  jobLevelBreakdown: [
    {
      role: 'Store Manager (Kepala Toko)',
      level: 'Senior Leadership',
      headcount: 342,
      avgTenureYears: 5.8,
      tenureSpread: {
        lessThan1Year: 4, // %
        oneToThreeYears: 14,
        moreThan3Years: 82
      },
      conflictRisk: 'Low Direct Exit',
      culturalTrait: 'Sangat loyal, memegang teguh SOP tradisional retail & target omset ketat.'
    },
    {
      role: 'Assistant Store Manager / Supervisor',
      level: 'Store Middle Management',
      headcount: 420,
      avgTenureYears: 3.2,
      tenureSpread: {
        lessThan1Year: 12,
        oneToThreeYears: 48,
        moreThan3Years: 40
      },
      conflictRisk: 'Medium Friction Buffer',
      culturalTrait: 'Jembatan komunikasi penting antara instruksi Store Manager dan dinamika tim lapangan.'
    },
    {
      role: 'Senior Store Associate / Cashier Head',
      level: 'Core Operational Staff',
      headcount: 1850,
      avgTenureYears: 2.1,
      tenureSpread: {
        lessThan1Year: 24,
        oneToThreeYears: 56,
        moreThan3Years: 20
      },
      conflictRisk: 'Low Friction',
      culturalTrait: 'Menjadi peer mentor bagi staf baru; stabilitas pelayanan kasir & inventory.'
    },
    {
      role: 'Junior Sales Associate (SPG/SPB & Kasir Baru)',
      level: 'Frontline Associate',
      headcount: 8628,
      avgTenureYears: 0.8,
      tenureSpread: {
        lessThan1Year: 71,
        oneToThreeYears: 25,
        moreThan3Years: 4
      },
      conflictRisk: 'High Friction Vulnerability',
      culturalTrait: 'Didominasi Gen-Z usia 18-22 tahun (first jobbers); membutuhkan bimbingan empatik.'
    }
  ],
  frictionAnalysis: {
    gapSizeHighStores: {
      gapThreshold: '> 4.5 Tahun Kesenjangan',
      storeCount: 186,
      earlyAttritionRate: 21.8, // % turnover < 90 hari
      internalGrievancesReported: 34, // kasus komplain/mediasi HR
      mainConflictTriggers: [
        'Kesenjangan gaya komunikasi: Instruksi otoritatif satu arah vs ekspektasi mentoring dialogis staf muda',
        'Tekanan kuota target harian oleh SM senior tanpa pendampingan teknis dan simulasi sales',
        'Perbedaan persepsi adaptasi tools digital POS & omnichannel ritel modern'
      ]
    },
    gapSizeBalancedStores: {
      gapThreshold: '< 3.0 Tahun Kesenjangan / With Buddy System',
      storeCount: 156,
      earlyAttritionRate: 8.4,
      internalGrievancesReported: 8,
      keyMitigationFactors: [
        'Penerapan "Store Buddy Program" (pendampingan 1-on-1 oleh Senior Associate selama 60 hari)',
        'Workshop "Empathetic Retail Leadership" khusus Store Manager senior',
        'Sesi briefing harian dua arah (huddle morning) yang fokus apresiasi & solusi bersama'
      ]
    }
  },
  executiveFinding: 'Kesenjangan masa kerja 5.0 tahun antara Store Manager (5.8 thn) dan Frontline Associate (0.8 thn) terbukti memicu friksi operasional jika dibiarkan tanpa jembatan budaya (turnover 21.8% di toko ber-gap lebar). Namun friksi dapat ditekan hingga -61% (turnover 8.4%) di 156 toko yang telah menerapkan program Buddy System & Supervisory Coaching.'
};
