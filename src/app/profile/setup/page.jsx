"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useSetupProfileMutation, useGetMyProfileQuery } from "@/redux/slices/profiles/profilesApi";
import { setProfileCompleted } from "@/redux/slices/auth/authSlice";
import { PAK_UNIVERSITIES, COMMON_DEPARTMENTS, DEGREE_LEVELS, DEGREE_PROGRAMS } from "@/components/constants/educationData";


const ProfileSetupPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const token = useSelector((s) => s?.auth?.token);
    const profileCompleted = useSelector((s) => s?.auth?.profileCompleted);
    const hydrated = useSelector((s) => s?.auth?.hydrated);

    const { data: meData, isLoading: loadingMe } = useGetMyProfileQuery(undefined, { skip: !token });
    const [setupProfile, { isLoading }] = useSetupProfileMutation();

    const [form, setForm] = useState({
        fullName: "",
        username: "",
        universityName: "",
        department: "",
        degreeLevel: "",
        degreeProgram: "",
        semester: "",
    });

    useEffect(() => {
        if (!hydrated) return;

        if (!token) {
            router.replace("/auth/login");
            return;
        }

        if (profileCompleted || meData?.profileCompleted) {
            dispatch(setProfileCompleted(true));
            router.replace("/groups");
        }
    }, [hydrated, token, profileCompleted, meData, router, dispatch]);

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setForm((p) => ({ ...p, [name]: value }));
        } catch (err) {
            console.error(err);
        }
    };

    const validateUsername = (username) => /^[a-z0-9_]{3,20}$/.test(username);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const fullName = form.fullName.trim();
            const username = form.username.trim().toLowerCase();

            if (!fullName) return alert("Full Name is required");
            if (!username) return alert("Username is required");
            if (!validateUsername(username)) {
                return alert("Username must be 3-20 chars, lowercase letters/numbers/underscore only.");
            }

            const payload = {
                fullName,
                username,
                universityName: form.universityName || undefined,
                department: form.department || undefined,
                degreeLevel: form.degreeLevel || undefined,
                degreeProgram: form.degreeProgram || undefined,
                semester: form.semester ? Number(form.semester) : undefined,
            };

            const res = await setupProfile(payload).unwrap();
            dispatch(setProfileCompleted(true));
            alert(res?.message || "Profile created");
            router.replace("/groups");
        } catch (err) {
            const msg = err?.data?.message || err?.error || "Profile setup failed";
            alert(msg);
        }
    };

    if (!hydrated) return null;

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Complete your profile</h1>
                <p className="text-sm text-gray-600 mt-1">
                    You must complete your profile to join or create groups.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Full Name *</label>
                        <input
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="e.g. Laiba Hameed"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Username *</label>
                        <input
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="e.g. laiba_hameed"
                        />
                        <p className="text-xs text-gray-500 mt-1">Lowercase, no spaces, use underscore.</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">University</label>
                        <select
                            name="universityName"
                            value={form.universityName}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="">Select university (optional)</option>
                            {PAK_UNIVERSITIES.map((u) => (
                                <option key={u} value={u}>{u}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Department</label>
                        <select
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="">Select department (optional)</option>
                            {COMMON_DEPARTMENTS.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Degree Level</label>
                        <select
                            name="degreeLevel"
                            value={form.degreeLevel}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="">Select degree level (optional)</option>
                            {DEGREE_LEVELS.map((x) => (
                                <option key={x.value} value={x.value}>{x.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Degree Program</label>
                        <select
                            name="degreeProgram"
                            value={form.degreeProgram}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="">Select program (optional)</option>
                            {DEGREE_PROGRAMS.map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Semester</label>
                        <input
                            name="semester"
                            value={form.semester}
                            onChange={handleChange}
                            type="number"
                            min={1}
                            max={20}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="e.g. 7"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || loadingMe}
                        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2.5 rounded-lg cursor-pointer"
                    >
                        {isLoading ? "Saving..." : "Save Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileSetupPage;
