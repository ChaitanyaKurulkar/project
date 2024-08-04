import { API_BASE_URL } from "../utils/constant";

export async function login(email: string, password: string) {
  const response = await fetch(API_BASE_URL + `/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return await response.json();
}

export async function logout(id: string) {
  const response = await fetch(API_BASE_URL + `/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  return await response.json();
}
