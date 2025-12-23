

// ============================================================
// FILE: components/profile/PrivacyLinksSection.jsx
// ============================================================
"use client";

import { Eye } from "lucide-react";
import { Input, Select, ReadOnly } from "./FormFields";

export const PrivacyLinksSection = ({ register, errors, watch, isEditing }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-emerald-600" />
                Privacy & Links
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                    <Select
                        name="profileVisibility"
                        options={[
                            { value: "PUBLIC", label: "Public" },
                            { value: "UNIVERSITY_ONLY", label: "University only" },
                            { value: "PRIVATE", label: "Private" },
                        ]}
                        register={register}
                        errors={errors}
                        watch={watch}
                        isEditing={isEditing}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Show email to admins</label>
                    {isEditing ? (
                        <label className="flex items-center gap-2 mt-2">
                            <input type="checkbox" {...register("showEmailToSocietyAdmins")} />
                            <span className="text-sm text-gray-700">Enabled</span>
                        </label>
                    ) : (
                        <ReadOnly v={watch("showEmailToSocietyAdmins") ? "Enabled" : "Disabled"} />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL</label>
                    <Input
                        name="profileImageUrl"
                        placeholder="https://..."
                        register={register}
                        errors={errors}
                        watch={watch}
                        isEditing={isEditing}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                    <Input
                        name="linkedinUrl"
                        placeholder="https://linkedin.com/in/..."
                        register={register}
                        errors={errors}
                        watch={watch}
                        isEditing={isEditing}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                    <Input
                        name="githubUrl"
                        placeholder="https://github.com/..."
                        register={register}
                        errors={errors}
                        watch={watch}
                        isEditing={isEditing}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                    <Input
                        name="instagramUrl"
                        placeholder="https://instagram.com/..."
                        register={register}
                        errors={errors}
                        watch={watch}
                        isEditing={isEditing}
                    />
                </div>
            </div>
        </div>
    );
};