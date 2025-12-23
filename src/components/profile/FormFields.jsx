// ============================================================
// FILE: components/profile/FormFields.jsx
// ============================================================
"use client";

export const ReadOnly = ({ v }) => (
    <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900 border border-gray-200">
        {v || "Not provided"}
    </div>
);

export const Input = ({ name, type = "text", placeholder, register, errors, watch, isEditing }) =>
    isEditing ? (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                {...register(name)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
            {errors?.[name] ? (
                <p className="text-sm text-red-600 mt-1">{errors[name].message}</p>
            ) : null}
        </div>
    ) : (
        <ReadOnly v={watch(name)} />
    );

export const TextArea = ({ name, placeholder, register, errors, watch, isEditing }) =>
    isEditing ? (
        <div>
            <textarea
                rows={3}
                placeholder={placeholder}
                {...register(name)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
            {errors?.[name] ? (
                <p className="text-sm text-red-600 mt-1">{errors[name].message}</p>
            ) : null}
        </div>
    ) : (
        <ReadOnly v={watch(name)} />
    );

export const Select = ({ name, options, register, errors, watch, isEditing }) =>
    isEditing ? (
        <div>
            <select
                {...register(name)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
            {errors?.[name] ? (
                <p className="text-sm text-red-600 mt-1">{errors[name].message}</p>
            ) : null}
        </div>
    ) : (
        <ReadOnly v={watch(name)} />
    );


export const SelectField = ({ name, register, errors, watch, isEditing, options = [], placeholder = "Select..." }) => {
    const value = watch?.(name);

    if (!isEditing) {
        return (
            <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900 border border-gray-200">
                {value || "Not provided"}
            </div>
        );
    }

    return (
        <div>
            <select
                {...register(name)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                defaultValue=""
            >
                <option value="">{placeholder}</option>
                {options.map((opt) => {
                    const v = typeof opt === "string" ? opt : opt.value;
                    const label = typeof opt === "string" ? opt : opt.label;
                    return (
                        <option key={v} value={v}>
                            {label}
                        </option>
                    );
                })}
            </select>

            {errors?.[name] ? (
                <p className="text-sm text-red-600 mt-1">{errors[name].message}</p>
            ) : null}
        </div>
    );
};
