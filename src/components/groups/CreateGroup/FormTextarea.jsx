export const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 4, icon: Icon }) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-3 text-gray-400">
                        <Icon className="w-5 h-5" />
                    </div>
                )}
                <textarea
                    className={`w-full border border-gray-300 rounded-lg px-4 py-2.5 ${Icon ? "pl-11" : ""
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={rows}
                />
            </div>
            <p className="text-xs text-gray-500">
                {value.length} / 500 characters
            </p>
        </div>
    );
};