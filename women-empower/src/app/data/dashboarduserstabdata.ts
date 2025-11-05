// ==================== app/lib/userapi.ts ====================
import { User } from "../types/dashboarduserstab";
import { getAuthHeaders } from "../lib/authApi";
import { API_BASE_URL } from "../lib/config";

// Fetch all users
export async function getUsers(token?: string): Promise<User[]> {
  const baseHeaders = getAuthHeaders();
  const headers: HeadersInit = {
    ...baseHeaders,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(`${API_BASE_URL}/user/`, {
    cache: "no-store", // avoid Next.js caching
    headers,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const json = await res.json();
  return json.data; // ✅ assuming your backend returns { data: [...] }
}
