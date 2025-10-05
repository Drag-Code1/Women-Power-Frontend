import React from "react";
import { getUsers } from "../data/dashboarduserstabdata";
import UserList from "../component/dashboard/dashboarduserstab/UserList";

// Server Component with SSR
export default async function UsersPage() {
  // Fetch data on server side
  const users = await getUsers();

  return <UserList users={users} />;
}

// Optional: Add metadata
export const metadata = {
  title: "User Management",
  description: "View and search user information",
};
