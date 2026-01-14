import { motion } from 'framer-motion';
import { Bell, AlertTriangle, AlertCircle, Info, Check } from 'lucide-react';
import { Alert } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface AlertsPanelProps {
  alerts: Alert[];
  onAcknowledge?: (id: string) => void;
}

const alertIcons = {
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const alertColors = {
  error: 'border-border bg-card',
  warning: 'border-border bg-card',
  info: 'border-border bg-card',
};

const alertIconColors = {
  error: 'text-destructive',
  warning: 'text-warning',
  info: 'text-muted-foreground',
};

export const AlertsPanel = ({ alerts, onAcknowledge }: AlertsPanelProps) => {
  const activeAlerts = alerts.filter((a) => !a.acknowledged);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border bg-card"
    >
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-foreground">Active Alerts</h3>
        </div>
        {activeAlerts.length > 0 && (
          <span className="rounded-full bg-destructive/20 px-2 py-0.5 text-xs font-medium text-destructive">
            {activeAlerts.length} unacknowledged
          </span>
        )}
      </div>

      <div className="max-h-80 overflow-auto p-2">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <Check className="mb-2 h-8 w-8" />
            <p className="text-sm">All systems operational</p>
          </div>
        ) : (
          <div className="space-y-2">
            {alerts.map((alert, index) => {
              const Icon = alertIcons[alert.type];
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'flex items-start gap-3 rounded-lg border p-3 transition-all',
                    alertColors[alert.type],
                    alert.acknowledged && 'opacity-50'
                  )}
                >
                  <Icon className={cn('mt-0.5 h-4 w-4 flex-shrink-0', alertIconColors[alert.type])} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-foreground">{alert.service}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {alert.message}
                    </p>
                  </div>
                  {!alert.acknowledged && onAcknowledge && (
                    <button
                      onClick={() => onAcknowledge(alert.id)}
                      className="flex-shrink-0 rounded bg-secondary px-2 py-1 text-[10px] text-secondary-foreground hover:bg-secondary/80 transition-colors"
                    >
                      Acknowledge
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
