export default function StatCard({ label, value, icon: Icon }) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{label}</p>
                    <p className="mt-2 text-3xl font-bold text-black">{value}</p>
                </div>
                {Icon && (
                    <div className="rounded-full bg-gray-100 p-3">
                        <Icon className="h-6 w-6 text-gray-700" />
                    </div>
                )}
            </div>
        </div>
    );
}
