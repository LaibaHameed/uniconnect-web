// ============================================================
// FILE: components/profile/ProfileHeader.jsx
// ============================================================
"use client";

import { Mail, Edit2, Save, X } from "lucide-react";

export const ProfileHeader = ({
    initial,
    fullName,
    email,
    isEditing,
    isSaving,
    isDirty,
    onEdit,
    onSave,
    onCancel,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="shrink-0">
                    <div className="flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-emerald-500 to-blue-500 text-white text-4xl font-bold shadow-md">
                        {initial}
                    </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {fullName || "Student"}
                    </h1>
                    <div className="flex items-center justify-center sm:justify-start text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{email}</span>
                    </div>
                </div>

                <div className="shrink-0">
                    {!isEditing ? (
                        <button
                            onClick={onEdit}
                            className="flex items-center px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition cursor-pointer"
                        >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={onSave}
                                disabled={isSaving || !isDirty}
                                className="flex items-center px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 transition"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {isSaving ? "Saving..." : "Save"}
                            </button>

                            <button
                                onClick={onCancel}
                                disabled={isSaving}
                                className="flex items-center px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-60 transition"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};