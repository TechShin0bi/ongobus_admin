import { cloneElement, ReactElement } from "react";

interface IconProps {
  size?: number;
  className?: string;
  [key: string]: any;
}

const InfoItem = ({ 
  label, 
  value, 
  icon 
}: { 
  label: string; 
  value?: string; 
  icon?: ReactElement<IconProps> 
}) => (
  <div className="space-y-1.5">
    <p className="text-xs font-medium text-slate-500 uppercase tracking-tight">{label}</p>
    <div className="flex items-center gap-2 text-slate-900">
      {icon && <span className="text-slate-400">{cloneElement(icon, { size: 16 })}</span>}
      <p className="font-medium">{value || 'N/A'}</p>
    </div>
  </div>
);

export default InfoItem