// ============================================================
// FILE: components/profile/UniversitySection.jsx
// ============================================================
"use client";

import { GraduationCap } from "lucide-react";
import { Input, SelectField } from "./FormFields";
import { PAK_UNIVERSITIES, COMMON_DEPARTMENTS } from "@/components/constants/educationData";

export const UniversitySection = ({ register, errors, watch, isEditing }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-emerald-600" />
                University
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* University dropdown */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                    <SelectField
                        name="universityName"
                        placeholder="Select university"
                        options={PAK_UNIVERSITIES}
                        register={register}
                        errors={errors}
                        watch={watch}
                        isEditing={isEditing}
                    />
                </div>

                {/* Campus stays input (free text) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Campus</label>
                    <Input
                        name="campus"
                        placeholder="Main Campus"
                        register={register}
                        errors={errors}
                        watch={watch}
                        isEditing={isEditing}
                    />
                </div>

                {/* Department dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <SelectField
                        name="department"
                        placeholder="Select department"
                        options={COMMON_DEPARTMENTS}
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
