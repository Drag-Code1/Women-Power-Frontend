// ==================== app/dashboard/contacts/page.tsx ====================
import React from "react";
import { getContacts } from "@/app/lib/contactapi";
import ContactsTable from "@/app/component/dashboard/dashboardcontacttab/ContactsTable";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <div className="min-h-screen bg-[#f2f3f5] p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl text-gray-900">Contact Messages</h1>
          <p className="text-gray-600 mt-1">Total contacts: {contacts.length}</p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ContactsTable initialContacts={contacts} />
        </div>
      </div>
    </div>
  );
}
