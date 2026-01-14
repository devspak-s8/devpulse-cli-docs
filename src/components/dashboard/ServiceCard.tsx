import { motion } from 'framer-motion';
import { Activity, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Service } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  onClick?: () => void;
  isSelected?: boolean;
}

const statusIcons = {
  healthy: CheckCircle,
  warning: AlertTriangle,
  critical: XCircle,
};

const statusColors = {
  healthy: 'text-success',
  warning: 'text-warning',
  critical: 'text-destructive',
};

const statusBgColors = {
  healthy: 'bg-success/10 border-success/30',
  warning: 'bg-warning/10 border-warning/30',
  critical: 'bg-destructive/10 border-destructive/30',
};

export const ServiceCard = ({ service, onClick, isSelected }: ServiceCardProps) => {
  const StatusIcon = statusIcons[service.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'card-glow cursor-pointer rounded-lg border bg-card p-4 transition-all duration-300',
        isSelected && 'ring-2 ring-primary',
        statusBgColors[service.status]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <StatusIcon className={cn('h-4 w-4', statusColors[service.status])} />
            <h3 className="font-semibold text-foreground">{service.name}</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{service.description}</p>
        </div>
        <div className={cn('pulse-dot h-2 w-2 rounded-full', `bg-${service.status === 'healthy' ? 'success' : service.status === 'warning' ? 'warning' : 'destructive'}`)} 
          style={{ 
            backgroundColor: service.status === 'healthy' ? 'hsl(142 70% 45%)' : 
                            service.status === 'warning' ? 'hsl(38 92% 50%)' : 
                            'hsl(0 72% 51%)' 
          }} 
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <Activity className="h-3 w-3 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Uptime</p>
            <p className="font-mono text-sm font-medium text-foreground">{service.uptime}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Response</p>
            <p className="font-mono text-sm font-medium text-foreground">{service.responseTime}ms</p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3">
        <span className="text-xs text-muted-foreground">
          {service.requestCount.toLocaleString()} req/h
        </span>
        <span className={cn(
          'rounded-full px-2 py-0.5 text-xs font-medium',
          service.errorRate > 5 ? 'bg-destructive/20 text-destructive' :
          service.errorRate > 1 ? 'bg-warning/20 text-warning' :
          'bg-success/20 text-success'
        )}>
          {service.errorRate}% errors
        </span>
      </div>
    </motion.div>
  );
};
