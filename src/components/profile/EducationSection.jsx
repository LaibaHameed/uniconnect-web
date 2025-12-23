"use client";

import { GraduationCap } from "lucide-react";
import { Input, Select } from "./FormFields";
import { DEGREE_LEVELS, DEGREE_PROGRAMS } from "@/components/constants/educationData";

export const EducationSection = ({ register, errors, watch, isEditing }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-emerald-600" />
                Education
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <Select
                        name="educationStatus"
                        options={[
                            { value: "CURRENT", label: "Current" },
                            { value: "GRADUATED", label: "Graduated" },
                        ]}
                        register={register}
                        errors={errors}
                        watch={watch}
                        isEditing={isEditing}
                    />
                </div>

                {/* Degree Level (from constants) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Degree Level</label>
                    <Select
                        name="degreeLevel"
                        options={[{ value: "", label: "Not set" }, ...DEGREE_LEVELS]}
                        register={register}
                        errors={errors}
                        watch={watch}
                        isEditing={isEditing}
                    />
                </div>

                {/* Degree Program (dropdown from constants) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Degree Program</label>
                    <Select
                        name="degreeProgram"
                        options={[
                            { value: "", label: "Not set" },
                            ...DEGREE_PROGRAMS.map((p) => ({ value: p, label: p })),
                        ]}
                        register={register}
                        errors={errors}
                        watch={watch}
                        isEditing={isEditing}
                    />
                </div>

                {/* Semester */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                    <Input
                        name="semester"
                        type="number"
                        placeholder="7"
                        register={register}
                        errors={errors}
                        watch={watch}
                        isEditing={isEditing}
                    />
                </div>

                {/* Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                    <Input
                        name="section"
                        placeholder="A"
                        register={register}
                        errors={errors}
                        watch={watch}
                        isEditing={isEditing}
                    />
                </div>

                {/* Student ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Student ID (unique)</label>
                    <Input
                        name="studentId"
                        placeholder="2021-IT-123"
                        register={register}
                        errors={errors}
                        watch={watch}
                        isEditing={isEditing}
                    />
                </div>

                {/* Start Year */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Year</label>
                    <Input
                        name="startYear"
                        type="number"
                        placeholder="2021"
                        register={register}
                        errors={errors}
                        watch={watch}
                        isEditing={isEditing}
                    />
                </div>

                {/* End Year */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Year</label>
                    <Input
                        name="endYear"
                        type="number"
                        placeholder="2025"
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
