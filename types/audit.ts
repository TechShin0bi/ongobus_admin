export interface AuditLog {
    id: string;
    timestamp: string;
    user: string;
    action: string;
    details: string;
    status: 'success' | 'error' | 'warning';
}