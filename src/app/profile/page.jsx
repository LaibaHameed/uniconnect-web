// ============================================================
// FILE: app/profile/page.jsx (Main Page)
// ============================================================
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { logout } from "@/redux/slices/auth/authSlice";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/slices/profiles/profilesApi";
import { profileSchema } from "@/validations/profileSchema";

import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { BasicInfoSection } from "@/components/profile/BasicInfoSection";
import { EducationSection } from "@/components/profile/EducationSection";
import { UniversitySection } from "@/components/profile/UniversitySection";
import { PrivacyLinksSection } from "@/components/profile/PrivacyLinksSection";
import { AccountSection } from "@/components/profile/AccountSection";

const ProfilePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const token = useSelector((s) => s?.auth?.token);
  const userEmail = useSelector((s) => s?.auth?.userEmail);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!token) router.replace("/auth/login");
  }, [token, router]);

  const { data, isLoading, isError, refetch } = useGetMyProfileQuery(undefined, {
    skip: !token,
  });

  const [updateMyProfile, { isLoading: isSaving }] = useUpdateMyProfileMutation();

  const defaults = useMemo(
    () => ({
      fullName: "",
      username: "",
      educationStatus: "CURRENT",
      degreeLevel: "",
      degreeProgram: "",
      startYear: "",
      endYear: "",
      semester: "",
      section: "",
      studentId: "",
      universityName: "",
      campus: "",
      department: "",
      phone: "",
      whatsappNumber: "",
      bio: "",
      skills: "",
      interests: "",
      profileImageUrl: "",
      linkedinUrl: "",
      githubUrl: "",
      instagramUrl: "",
      profileVisibility: "PUBLIC",
      showEmailToSocietyAdmins: true,
    }),
    []
  );

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: defaults,
    resolver: yupResolver(profileSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    const profile = data?.profile;
    if (!profile) return;

    reset({
      ...defaults,
      ...profile,
      degreeLevel: profile?.degreeLevel ?? "",
      degreeProgram: profile?.degreeProgram ?? "",
      startYear: profile?.startYear ?? "",
      endYear: profile?.endYear ?? "",
      semester: profile?.semester ?? "",
      section: profile?.section ?? "",
      studentId: profile?.studentId ?? "",
      universityName: profile?.universityName ?? "",
      campus: profile?.campus ?? "",
      department: profile?.department ?? "",
      phone: profile?.phone ?? "",
      whatsappNumber: profile?.whatsappNumber ?? "",
      bio: profile?.bio ?? "",
      skills: profile?.skills ?? "",
      interests: profile?.interests ?? "",
      profileImageUrl: profile?.profileImageUrl ?? "",
      linkedinUrl: profile?.linkedinUrl ?? "",
      githubUrl: profile?.githubUrl ?? "",
      instagramUrl: profile?.instagramUrl ?? "",
      profileVisibility: profile?.profileVisibility ?? "PUBLIC",
      showEmailToSocietyAdmins: profile?.showEmailToSocietyAdmins ?? true,
    });
  }, [data, reset, defaults]);

  const getInitial = () => {
    const n = watch("fullName") || userEmail || "U";
    return String(n).trim().charAt(0).toUpperCase();
  };

  const buildPayload = (values) => {
    const cleanStr = (v) => {
      const s = typeof v === "string" ? v.trim() : "";
      return s.length ? s : undefined;
    };

    const cleanNum = (v) => {
      if (v === "" || v == null) return undefined;
      const n = Number(v);
      return Number.isFinite(n) ? n : undefined;
    };

    const payload = {
      fullName: cleanStr(values.fullName),
      username: cleanStr(values.username)?.toLowerCase(),
      educationStatus: values.educationStatus,
      degreeLevel: cleanStr(values.degreeLevel),
      degreeProgram: cleanStr(values.degreeProgram),
      startYear: cleanNum(values.startYear),
      endYear: cleanNum(values.endYear),
      semester: cleanNum(values.semester),
      section: cleanStr(values.section),
      studentId: cleanStr(values.studentId),
      universityName: cleanStr(values.universityName),
      campus: cleanStr(values.campus),
      department: cleanStr(values.department),
      phone: cleanStr(values.phone),
      whatsappNumber: cleanStr(values.whatsappNumber),
      bio: cleanStr(values.bio),
      skills: cleanStr(values.skills),
      interests: cleanStr(values.interests),
      profileImageUrl: cleanStr(values.profileImageUrl),
      linkedinUrl: cleanStr(values.linkedinUrl),
      githubUrl: cleanStr(values.githubUrl),
      instagramUrl: cleanStr(values.instagramUrl),
      profileVisibility: values.profileVisibility,
      showEmailToSocietyAdmins: !!values.showEmailToSocietyAdmins,
    };

    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);
    return payload;
  };

  const onSave = async (values) => {
    try {
      const payload = buildPayload(values);
      await updateMyProfile(payload).unwrap();
      setIsEditing(false);
      await refetch();
      alert("Profile updated");
    } catch (err) {
      const msg = err?.data?.message || err?.error || "Update failed";
      alert(msg);
    }
  };

  const onCancel = () => {
    const profile = data?.profile || {};
    reset({
      ...defaults,
      ...profile,
      degreeLevel: profile?.degreeLevel ?? "",
      studentId: profile?.studentId ?? "",
    });
    setIsEditing(false);
  };

  const onLogout = () => {
    dispatch(logout());
    router.replace("/");
  };

  if (!token) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto bg-white border rounded-xl p-6">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto bg-white border rounded-xl p-6">
          Failed to load.
          <button onClick={() => refetch()} className="ml-2 text-blue-600 underline">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <ProfileHeader
          initial={getInitial()}
          fullName={watch("fullName")}
          email={userEmail}
          isEditing={isEditing}
          isSaving={isSaving}
          isDirty={isDirty}
          onEdit={() => setIsEditing(true)}
          onSave={handleSubmit(onSave)}
          onCancel={onCancel}
        />

        <BasicInfoSection
          register={register}
          errors={errors}
          watch={watch}
          isEditing={isEditing}
        />

        <EducationSection
          register={register}
          errors={errors}
          watch={watch}
          isEditing={isEditing}
        />

        <UniversitySection
          register={register}
          errors={errors}
          watch={watch}
          isEditing={isEditing}
        />

        <PrivacyLinksSection
          register={register}
          errors={errors}
          watch={watch}
          isEditing={isEditing}
        />

        <AccountSection
          onChangePassword={() => router.push("/auth/change-password")}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
};

export default ProfilePage;