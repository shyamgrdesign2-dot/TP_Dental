import { jsx as _jsx } from "react/jsx-runtime";
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
function Spinner({ className, ...props }) {
    return (_jsx(RefreshCw, { size: 16, role: "status", "aria-label": "Loading", className: cn('animate-spin', className), ...props }));
}
export { Spinner };
