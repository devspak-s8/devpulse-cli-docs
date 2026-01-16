import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertCircle, AlertTriangle, Info, Check, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Alert } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface NotificationDropdownProps {
  alerts: Alert[];
  onAcknowledge?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

const alertIcons = {
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const alertIconColors = {
  error: 'text-destructive',
  warning: 'text-warning',
  info: 'text-muted-foreground',
};

export const NotificationDropdown = ({ alerts, onAcknowledge, onDismiss }: NotificationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length;

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-lg bg-secondary p-1.5 sm:p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={`Notifications${unacknowledgedCount > 0 ? ` (${unacknowledgedCount} unread)` : ''}`}
      >
        <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
        {unacknowledgedCount > 0 && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground"
          >
            {unacknowledgedCount > 9 ? '9+' : unacknowledgedCount}
          </motion.span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
            />

            {/* Dropdown Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                "absolute z-50 mt-2 rounded-xl border border-border bg-card shadow-2xl",
                "right-0 w-[calc(100vw-2rem)] sm:w-96",
                "md:right-0"
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border p-4">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                </div>
                <div className="flex items-center gap-2">
                  {unacknowledgedCount > 0 && (
                    <span className="rounded-full bg-destructive/20 px-2 py-0.5 text-xs font-medium text-destructive">
                      {unacknowledgedCount} new
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-1 hover:bg-secondary transition-colors md:hidden"
                    aria-label="Close notifications"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                {alerts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <Check className="mb-2 h-8 w-8" />
                    <p className="text-sm">No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {alerts.slice(0, 10).map((alert, index) => {
                      const Icon = alertIcons[alert.type];
                      return (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={cn(
                            'flex items-start gap-3 p-4 transition-colors hover:bg-secondary/50',
                            !alert.acknowledged && 'bg-primary/5'
                          )}
                        >
                          <div className={cn(
                            'mt-0.5 flex-shrink-0 rounded-full p-1.5',
                            alert.type === 'error' && 'bg-destructive/10',
                            alert.type === 'warning' && 'bg-warning/10',
                            alert.type === 'info' && 'bg-muted'
                          )}>
                            <Icon className={cn('h-3.5 w-3.5', alertIconColors[alert.type])} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-foreground">{alert.service}</span>
                              {!alert.acknowledged && (
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                              )}
                            </div>
                            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                              {alert.message}
                            </p>
                            <span className="mt-1 text-[10px] text-muted-foreground/70">
                              {formatTimeAgo(alert.timestamp)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {!alert.acknowledged && onAcknowledge && (
                              <button
                                type="button"
                                onClick={() => onAcknowledge(alert.id)}
                                className="rounded p-1 hover:bg-secondary transition-colors"
                                title="Mark as read"
                                aria-label="Mark as read"
                              >
                                <Check className="h-3.5 w-3.5 text-muted-foreground" />
                              </button>
                            )}
                            {onDismiss && (
                              <button
                                type="button"
                                onClick={() => onDismiss(alert.id)}
                                className="rounded p-1 hover:bg-secondary transition-colors"
                                title="Dismiss"
                                aria-label="Dismiss notification"
                              >
                                <X className="h-3.5 w-3.5 text-muted-foreground" />
                              </button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-border p-3">
                <Link
                  to="/notifications"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-secondary py-2 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors"
                >
                  View All Notifications
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
