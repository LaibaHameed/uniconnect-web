export const FilterSelect = ({ label, value, onChange, options }) => {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600">{label}</label>
            <select
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={value}
                onChange={onChange}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};