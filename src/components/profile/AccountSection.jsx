// ============================================================
// FILE: components/profile/AccountSection.jsx
// ============================================================
"use client";

import { Lock, LogOut } from "lucide-react";

export const AccountSection = ({ onChangePassword, onLogout }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-5">Account</h2>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onChangePassword}
          className="flex items-center justify-center px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
        >
          <Lock className="w-4 h-4 mr-2" />
          Change Password
        </button>

        <button
          onClick={onLogout}
          className="flex items-center justify-center px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};
