const ProgressBar = ({ label, current, total, color }: any) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm font-medium text-gray-500">
        {current} / {total} Available
      </span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full ${color}`}
        style={{ width: `${(current / total) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default ProgressBar;
