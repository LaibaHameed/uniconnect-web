// ============================================================
// FILE: components/profile/BasicInfoSection.jsx
// ============================================================
"use client";

import { User } from "lucide-react";
import { Input, TextArea } from "./FormFields";

export const BasicInfoSection = ({ register, errors, watch, isEditing }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center">
        <User className="w-5 h-5 mr-2 text-emerald-600" />
        Basic
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <Input
            name="fullName"
            placeholder="Enter full name"
            register={register}
            errors={errors}
            watch={watch}
            isEditing={isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <Input
            name="username"
            placeholder="e.g. mfaisal_92"
            register={register}
            errors={errors}
            watch={watch}
            isEditing={isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <Input
            name="phone"
            placeholder="03xx..."
            register={register}
            errors={errors}
            watch={watch}
            isEditing={isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
          <Input
            name="whatsappNumber"
            placeholder="03xx..."
            register={register}
            errors={errors}
            watch={watch}
            isEditing={isEditing}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <TextArea
            name="bio"
            placeholder="Short bio..."
            register={register}
            errors={errors}
            watch={watch}
            isEditing={isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
          <TextArea
            name="skills"
            placeholder="NestJS, Next.js..."
            register={register}
            errors={errors}
            watch={watch}
            isEditing={isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
          <TextArea
            name="interests"
            placeholder="Cybersecurity..."
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