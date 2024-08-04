export interface userLogin {
  email: string;
  password: string;
}

export interface Status {
  id: string;
  name: string;
  description?: string;
}

export interface StatusCount {
  status: string;
  count: number;
}

export interface DashboardData {
  statusCounts: StatusCount[];
  totalProjects: number;
}

export interface ProjectStatus {
  id: string;
  name: string;
  description: string;
}

export interface ProjectType {
  id: string;
  projectName: string;
  reason: string;
  division: string;
  category: string;
  priority: string;
  department: string;
  startDate: string;
  endDate: string;
  location: string;
  status: ProjectStatus;
}

export interface DashboardData {
  statusCounts: { status: string; count: number }[];
  totalProjects: number;
  departmentCounts?: { department: string; total: number; closed: number }[];
}

export interface DepartmentCount {
  department: string;
  total: number;
  closed: number;
}

export interface DepartmentCounts {
  departmentCounts: DepartmentCount[];
  totalProjects: number;
}

