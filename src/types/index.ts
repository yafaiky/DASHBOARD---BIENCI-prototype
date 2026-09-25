export interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  division: string;
  department: string;
  position: string;
  location: string;
  storeCluster: string;
  brand: string;
  employmentType: 'PKWTT' | 'PKWT' | 'Probation' | 'Internship' | 'Freelance';
  status: 'Active' | 'Probation' | 'Promotion' | 'Resigned' | 'Suspended';
  joinDate: string;
  contractEndDate?: string;
  salary?: number;
  phone?: string;
  gender?: 'Male' | 'Female';
  age?: number;
  education?: string;
  tenureYears?: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'import' | 'promotion' | 'contract' | 'policy' | 'exit' | 'warning';
  dotColor: string;
  user: string;
}

export interface StorePerformance {
  storeId: string;
  storeName: string;
  cluster: string;
  region: 'Barat' | 'Tengah' | 'Timur';
  brand: string;
  format?: 'Family Store' | 'Showroom' | 'Counter';
  headcount: number;
  leaderTenure?: string;
  staffRatio?: string;
  sales: number;
  targetSales: number;
  labourCost: number;
  achievementRate: number;
  revenuePerFte: number;
  labourCostRatio: number;
}

export interface IRCase {
  id: string;
  caseNo: string;
  employeeId: string;
  employeeName: string;
  position: string;
  store: string;
  category: 'Discipline / SP' | 'Fraud / Shrinkage' | 'Grievance' | 'Mediation' | 'Bipartite';
  level: 'SP-1' | 'SP-2' | 'SP-3' | 'PHK' | 'Investigation';
  financialImpact?: number;
  startDate: string;
  endDate?: string;
  status: 'Open' | 'In Review' | 'Mediation' | 'Resolved' | 'Closed';
}

export interface ComplianceItem {
  id: string;
  area: string;
  name: string;
  entity: string;
  status: 'Compliant' | 'Expiring' | 'Expired' | 'Missing';
  expiryDate: string;
  daysRemaining: number;
  assignedTo: string;
}
