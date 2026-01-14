import { useMemo } from 'react';
import DottedMapLib from 'dotted-map';
import { motion } from 'framer-motion';
import { Service } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface DottedMapProps {
  services: Service[];
  selectedService: string | null;
  onSelectService: (id: string | null) => void;
}

// Service locations with lat/lng coordinates
const serviceLocations: Record<string, { lat: number; lng: number; region: string }> = {
  'user-service': { lat: 40.7128, lng: -74.006, region: 'US East (New York)' },
  'api-gateway': { lat: 51.5074, lng: -0.1278, region: 'EU West (London)' },
  'payment-service': { lat: 35.6762, lng: 139.6503, region: 'Asia Pacific (Tokyo)' },
  'notification-service': { lat: -23.5505, lng: -46.6333, region: 'South America (São Paulo)' },
  'analytics-service': { lat: -33.8688, lng: 151.2093, region: 'Australia (Sydney)' },
  'storage-service': { lat: 50.1109, lng: 8.6821, region: 'EU Central (Frankfurt)' },
};

// Convert lat/lng to x/y percentages for positioning
const latLngToPercent = (lat: number, lng: number) => {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
};

export const DottedWorldMap = ({ services, selectedService, onSelectService }: DottedMapProps) => {
  const svgMap = useMemo(() => {
    const map = new DottedMapLib({ height: 60, grid: 'diagonal' });
    
    return map.getSVG({
      radius: 0.35,
      color: 'hsl(220, 10%, 25%)',
      shape: 'circle',
      backgroundColor: 'transparent',
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative rounded-lg border border-border bg-card p-6 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Live Status
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {services.filter(s => s.status === 'healthy').length}/{services.length} Services Healthy
        </span>
      </div>

      {/* Map Container */}
      <div className="relative aspect-[2/1] w-full">
        {/* Dotted Map SVG */}
        <div 
          className="absolute inset-0 opacity-60"
          dangerouslySetInnerHTML={{ __html: svgMap }}
          style={{
            width: '100%',
            height: '100%',
          }}
        />

        {/* Connection lines between services */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(220, 10%, 30%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(220, 10%, 40%)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(220, 10%, 30%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {services.slice(0, 3).map((service, i) => {
            const loc1 = serviceLocations[service.id];
            const loc2 = serviceLocations[services[(i + 1) % services.length].id];
            if (!loc1 || !loc2) return null;
            const pos1 = latLngToPercent(loc1.lat, loc1.lng);
            const pos2 = latLngToPercent(loc2.lat, loc2.lng);
            return (
              <motion.line
                key={`line-${i}`}
                x1={pos1.x}
                y1={pos1.y}
                x2={pos2.x}
                y2={pos2.y}
                stroke="url(#lineGradient)"
                strokeWidth="0.15"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: i * 0.3 }}
              />
            );
          })}
        </svg>

        {/* Service markers */}
        {services.map((service, index) => {
          const location = serviceLocations[service.id];
          if (!location) return null;

          const position = latLngToPercent(location.lat, location.lng);
          const isSelected = selectedService === service.id;
          const statusColor = 
            service.status === 'healthy' ? 'bg-success' :
            service.status === 'warning' ? 'bg-warning' :
            'bg-destructive';

          return (
            <motion.div
              key={service.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
              className="absolute cursor-pointer group z-10"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => onSelectService(isSelected ? null : service.id)}
            >
              {/* Outer pulse ring */}
              <motion.div
                className={cn('absolute rounded-full', statusColor)}
                style={{ 
                  width: 32, 
                  height: 32, 
                  marginLeft: -12, 
                  marginTop: -12,
                  opacity: 0.15 
                }}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.15, 0, 0.15]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              
              {/* Inner pulse ring */}
              <motion.div
                className={cn('absolute rounded-full', statusColor)}
                style={{ 
                  width: 20, 
                  height: 20, 
                  marginLeft: -6, 
                  marginTop: -6,
                  opacity: 0.3 
                }}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.2
                }}
              />
              
              {/* Marker dot */}
              <motion.div
                className={cn(
                  'relative w-2 h-2 rounded-full transition-all duration-200',
                  statusColor,
                  isSelected && 'ring-2 ring-foreground/50 ring-offset-1 ring-offset-background w-3 h-3'
                )}
                whileHover={{ scale: 1.5 }}
              />

              {/* Tooltip */}
              <div className={cn(
                'absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-3 py-2 rounded-md bg-popover/95 backdrop-blur-sm border border-border shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-20',
                isSelected && 'opacity-100'
              )}>
                <div className="flex items-center gap-2 mb-1">
                  <div className={cn('w-1.5 h-1.5 rounded-full', statusColor)} />
                  <p className="text-xs font-semibold text-foreground">{service.name}</p>
                </div>
                <p className="text-[10px] text-muted-foreground mb-2">{location.region}</p>
                <div className="flex items-center gap-3 pt-1 border-t border-border/50">
                  <div className="text-center">
                    <p className="text-[10px] font-mono text-foreground">{service.uptime}%</p>
                    <p className="text-[8px] text-muted-foreground">Uptime</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-mono text-foreground">{service.responseTime}ms</p>
                    <p className="text-[8px] text-muted-foreground">Latency</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-mono text-foreground">{service.errorRate}%</p>
                    <p className="text-[8px] text-muted-foreground">Errors</p>
                  </div>
                </div>
                {/* Tooltip arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-[10px] text-muted-foreground">Healthy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-[10px] text-muted-foreground">Warning</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <span className="text-[10px] text-muted-foreground">Critical</span>
          </div>
        </div>
        {selectedService && (
          <button
            onClick={() => onSelectService(null)}
            className="text-[10px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
          >
            Clear selection
          </button>
        )}
      </div>
    </motion.div>
  );
};
