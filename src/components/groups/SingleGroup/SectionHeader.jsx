const SectionHeader = ({ title, children }) => (
    <div className="flex items-center justify-between px-8 pt-7 pb-5 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        {children}
    </div>
);

export default SectionHeader