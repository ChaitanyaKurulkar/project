import { API_BASE_URL } from "../utils/constant";

export async function getCounts() {
    const status = await fetch(API_BASE_URL + `/status-count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await status.json();
  }

  export async function getDeptProjects() {
    const project = await fetch(API_BASE_URL + `/departments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await project.json();
  }