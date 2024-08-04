import { API_BASE_URL } from "../utils/constant";

export async function addProject(Inputfield: {
  projectName: string;
  reason: string;
  type: string;
  division: string;
  category: string;
  priority: string;
  department: string;
  startDate: string;
  endDate: string;
  location: string;
  status: number;
}) {
  const project = await fetch(API_BASE_URL + `/project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectName: Inputfield.projectName,
      reason: Inputfield.reason,
      type: Inputfield.type,
      division: Inputfield.division,
      category: Inputfield.category,
      priority: Inputfield.priority,
      department: Inputfield.department,
      startDate: Inputfield.startDate,
      endDate: Inputfield.endDate,
      location: Inputfield.location,
      status: Inputfield.status,
    }),
  });
  return await project.json();
}

export async function getProjects(keyword: string = "", page: number = 1) {
  const response = await fetch(
    `${API_BASE_URL}/project?keyword=${encodeURIComponent(
      keyword
    )}&page=${page}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data;
}

export async function updateProjectStatus(projectId: string, statusId: string) {
  const status = await fetch(API_BASE_URL + `/project/${projectId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ statusId }),
  });
  if (!status.ok) {
    throw new Error("Failed to update status");
  }
  return await status.json();
}

export async function getStatuses() {
  const status = await fetch(API_BASE_URL + `/project/statuses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!status.ok) {
    throw new Error("Failed to fetch statuses");
  }
  return await status.json();
}
