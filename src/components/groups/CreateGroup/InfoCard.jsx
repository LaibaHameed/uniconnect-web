export const InfoCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="shrink-0">
                <Icon className="w-5 h-5 text-blue-600 mt-0.5" />
            </div>
            <div>
                <h3 className="text-sm font-semibold text-blue-900">{title}</h3>
                <p className="text-sm text-blue-700 mt-1">{description}</p>
            </div>
        </div>
    );
};