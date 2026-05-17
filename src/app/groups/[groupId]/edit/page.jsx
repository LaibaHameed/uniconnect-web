"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
    ArrowLeft,
    Users,
    Tag,
    FileText,
    Shield,
    Save,
} from "lucide-react";

import {
    useGetGroupByIdQuery,
    useUpdateGroupMutation,
} from "@/redux/slices/groups/groupsApi";

import { FormInput } from "@/components/groups/CreateGroup/FormInput";
import { FormSelect } from "@/components/groups/CreateGroup/FormSelect";
import { FormTextarea } from "@/components/groups/CreateGroup/FormTextarea";

const EditGroupPage = () => {
    const router = useRouter();
    const { groupId } = useParams();

    const {
        data: group,
        isLoading,
        isError,
    } = useGetGroupByIdQuery(groupId);

    const [
        updateGroup,
        { isLoading: updating },
    ] = useUpdateGroupMutation();

    const [form, setForm] = useState({
        name: "",
        type: "CLUB",
        category: "",
        description: "",
        joinPolicy: "APPROVAL_REQUIRED",
    });

    useEffect(() => {
        try {
            if (group) {
                setForm({
                    name: group.name || "",
                    type: group.type || "CLUB",
                    category: group.category || "",
                    description: group.description || "",
                    joinPolicy:
                        group.joinPolicy || "APPROVAL_REQUIRED",
                });
            }
        } catch (error) {
            console.error(error);
        }
    }, [group]);

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;

            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!form.name.trim()) {
                alert("Group name is required");
                return;
            }

            if (!form.category.trim()) {
                alert("Category is required");
                return;
            }

            const payload = {
                name: form.name.trim(),
                type: form.type,
                category: form.category.trim(),
                description: form.description.trim(),
                joinPolicy: form.joinPolicy,
            };

            await updateGroup({
                groupId,
                body: payload,
            }).unwrap();

            alert("Group updated successfully");

            router.push(`/groups/${groupId}`);
        } catch (error) {
            console.error(error);

            const message =
                error?.data?.message ||
                error?.error ||
                "Failed to update group";

            alert(message);
        }
    };

    const typeOptions = [
        {
            value: "CLUB",
            label: "Club",
        },
        {
            value: "SOCIETY",
            label: "Society",
        },
    ];

    const joinPolicyOptions = [
        {
            value: "APPROVAL_REQUIRED",
            label: "Approval Required",
        },
        {
            value: "OPEN",
            label: "Open",
        },
        {
            value: "INVITE_ONLY",
            label: "Invite Only",
        },
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (isError || !group) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Failed to load group
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <Link
                    href={`/groups/${groupId}`}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Group
                </Link>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Edit Group
                        </h1>

                        <p className="text-gray-600 mt-2">
                            Update your group information and settings
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <FormInput
                            label="Group Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter group name"
                            required
                            icon={Users}
                        />

                        <div className="grid md:grid-cols-2 gap-6">
                            <FormSelect
                                label="Group Type"
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                options={typeOptions}
                                required
                                icon={Tag}
                            />

                            <FormInput
                                label="Category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                placeholder="e.g. Tech, Sports"
                                required
                                icon={Tag}
                            />
                        </div>

                        <FormSelect
                            label="Join Policy"
                            name="joinPolicy"
                            value={form.joinPolicy}
                            onChange={handleChange}
                            options={joinPolicyOptions}
                            required
                            icon={Shield}
                        />

                        <FormTextarea
                            label="Description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe your group..."
                            rows={5}
                            icon={FileText}
                        />

                        <div className="flex gap-3 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() =>
                                    router.push(`/groups/${groupId}`)
                                }
                                className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={updating}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-all"
                            >
                                <Save className="w-4 h-4" />

                                {updating
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditGroupPage;