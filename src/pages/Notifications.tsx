import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertCircle, AlertTriangle, Info, Check, Trash2, Filter, CheckCheck } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { useWebSocketSimulation } from '@/hooks/useWebSocketSimulation';
import { cn } from '@/lib/utils';
import { Alert } from '@/lib/mockData';

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

const Notifications = () => {
  const { alerts: liveAlerts } = useWebSocketSimulation();
  const [alerts, setAlerts] = useState<Alert[]>(liveAlerts);
  const [filter, setFilter] = useState<'all' | 'unread' | 'error' | 'warning' | 'info'>('all');

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

  const handleAcknowledge = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  };

  const handleDelete = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const handleMarkAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, acknowledged: true })));
  };

  const handleClearAll = () => {
    setAlerts([]);
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !alert.acknowledged;
    return alert.type === filter;
  });

  const unreadCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header notificationCount={unreadCount} />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Bell className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Notifications</h1>
                <p className="text-sm text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleMarkAllRead}
                disabled={unreadCount === 0}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Mark all read</span>
              </button>
              <button
                onClick={handleClearAll}
                disabled={alerts.length === 0}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 text-sm font-medium text-destructive hover:bg-destructive/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Clear all</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            {(['all', 'unread', 'error', 'warning', 'info'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap',
                  filter === f
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                )}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f === 'unread' && unreadCount > 0 && ` (${unreadCount})`}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {filteredAlerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Check className="mb-3 h-12 w-12" />
                <p className="text-lg font-medium">No notifications</p>
                <p className="text-sm">
                  {filter !== 'all' ? 'Try changing the filter' : 'You\'re all caught up!'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredAlerts.map((alert, index) => {
                  const Icon = alertIcons[alert.type];
                  return (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        'flex items-start gap-4 p-4 sm:p-5 transition-colors hover:bg-secondary/30',
                        !alert.acknowledged && 'bg-primary/5'
                      )}
                    >
                      <div className={cn(
                        'mt-1 flex-shrink-0 rounded-full p-2',
                        alert.type === 'error' && 'bg-destructive/10',
                        alert.type === 'warning' && 'bg-warning/10',
                        alert.type === 'info' && 'bg-muted'
                      )}>
                        <Icon className={cn('h-4 w-4', alertIconColors[alert.type])} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-foreground">{alert.service}</span>
                          {!alert.acknowledged && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                          )}
                          <span className={cn(
                            'px-2 py-0.5 rounded text-[10px] font-medium uppercase',
                            alert.type === 'error' && 'bg-destructive/10 text-destructive',
                            alert.type === 'warning' && 'bg-warning/10 text-warning',
                            alert.type === 'info' && 'bg-muted text-muted-foreground'
                          )}>
                            {alert.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {alert.message}
                        </p>
                        <span className="text-xs text-muted-foreground/70">
                          {formatTimeAgo(alert.timestamp)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!alert.acknowledged && (
                          <button
                            onClick={() => handleAcknowledge(alert.id)}
                            className="rounded-lg p-2 hover:bg-secondary transition-colors"
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4 text-muted-foreground" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(alert.id)}
                          className="rounded-lg p-2 hover:bg-destructive/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Notifications;
