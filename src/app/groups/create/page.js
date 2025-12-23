"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Users, 
  Tag, 
  FileText, 
  Shield,
  Sparkles,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useCreateGroupMutation } from "@/redux/slices/groups/groupsApi";
import { InfoCard } from "@/components/groups/CreateGroup/InfoCard";
import { FormInput } from "@/components/groups/CreateGroup/FormInput";
import { FormSelect } from "@/components/groups/CreateGroup/FormSelect";
import { FormTextarea } from "@/components/groups/CreateGroup/FormTextarea";

// Main CreateGroupPage Component
const CreateGroupPage = () => {
  const router = useRouter();
  const [createGroup, { isLoading }] = useCreateGroupMutation();

  const [form, setForm] = useState({
    name: "",
    type: "CLUB",
    category: "",
    description: "",
    joinPolicy: "APPROVAL_REQUIRED",
  });

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      setForm((p) => ({ ...p, [name]: value }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!form.name.trim() || !form.category.trim()) {
        alert("Name and category are required");
        return;
      }

      const res = await createGroup({
        ...form,
        name: form.name.trim(),
        category: form.category.trim(),
        description: form.description.trim(),
      }).unwrap();

      router.push(`/groups/${res._id}`);
    } catch (err) {
      const msg = err?.data?.message || err?.error || "Create failed";
      alert(msg);
    }
  };

  const typeOptions = [
    { value: "CLUB", label: "Club" },
    { value: "SOCIETY", label: "Society" },
  ];

  const joinPolicyOptions = [
    { value: "APPROVAL_REQUIRED", label: "Approval Required" },
    { value: "OPEN", label: "Open" },
    { value: "INVITE_ONLY", label: "Invite Only" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          href="/groups"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Groups
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Club or Society
              </h1>
              <p className="text-gray-600">
                Start a new community and bring people together around shared interests
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mb-6">
          <InfoCard
            icon={AlertCircle}
            title="Important Information"
            description="Your group will be submitted for approval. Once approved, members can start joining based on your selected join policy."
          />
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            {/* Group Name */}
            <FormInput
              label="Group Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter group name"
              required
              icon={Users}
            />

            {/* Type and Category Row */}
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
                placeholder="e.g. Tech, Sports, Cultural"
                required
                icon={Tag}
              />
            </div>

            {/* Join Policy */}
            <FormSelect
              label="Join Policy"
              name="joinPolicy"
              value={form.joinPolicy}
              onChange={handleChange}
              options={joinPolicyOptions}
              required
              icon={Shield}
            />

            {/* Join Policy Description */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Join Policy Guide:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li><strong>Approval Required:</strong> Admin must approve each member</li>
                    <li><strong>Open:</strong> Anyone can join instantly</li>
                    <li><strong>Invite Only:</strong> Members can only join via invitation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Description */}
            <FormTextarea
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tell people what your group is about, what activities you'll do, and why they should join..."
              rows={5}
              icon={FileText}
            />

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push("/groups")}
                className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all shadow-sm cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Create Group"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPage;