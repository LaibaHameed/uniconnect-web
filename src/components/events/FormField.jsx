export const FormField = ({ label, error, required, hint, children }) => (
    <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center px-1">
            <label className="text-sm font-bold text-zinc-900">
                {label} {required && <span className="text-blue-600">*</span>}
            </label>
            {error && <span className="text-xs font-semibold text-red-600">{error}</span>}
        </div>
        {children}
        {hint && !error && <p className="text-xs text-zinc-400 px-1">{hint}</p>}
    </div>
);