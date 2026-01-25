const StatusRow = ({ label, value, variant }: { label: string; value: string; variant: string }) => {
    const styles: Record<string, string> = {
        success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        danger: 'bg-red-100 text-red-700 border-red-200',
        blue: 'bg-blue-100 text-blue-700 border-blue-200',
        gray: 'bg-slate-100 text-slate-700 border-slate-200',
    };

    return (
        <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">{label}</span>
            <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded border ${styles[variant]}`}>
                {value}
            </span>
        </div>
    );
};

export default StatusRow