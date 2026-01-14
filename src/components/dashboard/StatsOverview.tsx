import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Server, Activity, AlertTriangle, Zap } from 'lucide-react';
import { Service, services as defaultServices } from '@/lib/mockData';

interface StatsOverviewProps {
  services?: Service[];
}

export const StatsOverview = ({ services = defaultServices }: StatsOverviewProps) => {
  const stats = useMemo(() => [
    {
      label: 'Total Services',
      value: services.length,
      icon: Server,
    },
    {
      label: 'Healthy',
      value: services.filter((s) => s.status === 'healthy').length,
      icon: Activity,
    },
    {
      label: 'Warnings',
      value: services.filter((s) => s.status === 'warning').length,
      icon: AlertTriangle,
    },
    {
      label: 'Avg Response',
      value: `${Math.round(services.reduce((acc, s) => acc + s.responseTime, 0) / services.length)}ms`,
      icon: Zap,
    },
  ], [services]);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-lg border border-border bg-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg p-2 bg-secondary">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
