const SectionCard = ({ children, className = "" }) => (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}>
        {children}
    </div>
);

export default SectionCard;