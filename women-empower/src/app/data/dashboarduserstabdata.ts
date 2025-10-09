// ==================== app/lib/userapi.ts ====================
import { User } from "../types/dashboarduserstab";

// Fetch all users
export async function getUsers(): Promise<User[]> {
  const res = await fetch("http://localhost:5000/v1/user/", {
    cache: "no-store", // avoid Next.js caching
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const json = await res.json();
  return json.data; // ✅ assuming your backend returns { data: [...] }
}
