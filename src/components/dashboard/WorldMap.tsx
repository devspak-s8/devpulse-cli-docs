import { motion } from 'framer-motion';
import { Service } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface WorldMapProps {
  services: Service[];
  selectedService: string | null;
  onSelectService: (id: string | null) => void;
}

// Service locations on the world map (x, y percentages)
const serviceLocations: Record<string, { x: number; y: number; region: string }> = {
  'user-service': { x: 18, y: 35, region: 'US East' },
  'api-gateway': { x: 48, y: 30, region: 'EU West' },
  'payment-service': { x: 75, y: 40, region: 'Asia Pacific' },
  'notification-service': { x: 25, y: 55, region: 'South America' },
  'analytics-service': { x: 85, y: 65, region: 'Australia' },
  'storage-service': { x: 55, y: 25, region: 'EU Central' },
};

export const WorldMap = ({ services, selectedService, onSelectService }: WorldMapProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative rounded-lg border border-border bg-card p-4 overflow-hidden"
    >
      {/* World Map SVG */}
      <div className="relative aspect-[2/1] w-full">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 1px hsl(220 10% 25%))' }}
        >
          {/* World map paths - simplified continents */}
          <g fill="hsl(220, 12%, 15%)" stroke="hsl(220, 10%, 25%)" strokeWidth="0.5">
            {/* North America */}
            <path d="M50,80 L180,60 L220,80 L250,120 L240,180 L200,220 L150,240 L100,220 L60,180 L40,140 L50,80 Z" />
            <path d="M180,200 L220,180 L260,200 L280,250 L260,300 L220,320 L180,300 L160,250 L180,200 Z" />
            
            {/* South America */}
            <path d="M200,340 L260,320 L300,360 L310,420 L290,480 L240,490 L200,460 L180,400 L200,340 Z" />
            
            {/* Europe */}
            <path d="M420,80 L500,60 L560,80 L580,120 L560,160 L500,180 L440,160 L420,120 L420,80 Z" />
            
            {/* Africa */}
            <path d="M440,200 L520,180 L580,220 L600,300 L580,380 L520,420 L460,400 L420,340 L420,260 L440,200 Z" />
            
            {/* Asia */}
            <path d="M580,60 L700,40 L800,60 L880,100 L900,160 L880,220 L820,260 L740,280 L660,260 L600,220 L580,160 L580,60 Z" />
            <path d="M700,280 L780,260 L840,300 L860,360 L820,400 L760,420 L700,400 L680,340 L700,280 Z" />
            
            {/* Australia */}
            <path d="M780,380 L860,360 L920,380 L940,420 L920,460 L860,480 L800,460 L780,420 L780,380 Z" />
            
            {/* Greenland */}
            <path d="M280,40 L340,30 L380,50 L380,90 L340,100 L300,90 L280,60 L280,40 Z" />
          </g>

          {/* Grid lines */}
          <g stroke="hsl(220, 10%, 18%)" strokeWidth="0.3" strokeDasharray="4,4">
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={`h-${i}`} x1="0" y1={100 + i * 80} x2="1000" y2={100 + i * 80} />
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={`v-${i}`} x1={100 + i * 150} y1="0" x2={100 + i * 150} y2="500" />
            ))}
          </g>
        </svg>

        {/* Service markers */}
        {services.map((service) => {
          const location = serviceLocations[service.id];
          if (!location) return null;

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
              transition={{ delay: 0.2 }}
              className="absolute cursor-pointer group"
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => onSelectService(isSelected ? null : service.id)}
            >
              {/* Pulse ring */}
              <div
                className={cn(
                  'absolute inset-0 rounded-full animate-ping opacity-30',
                  statusColor
                )}
                style={{ width: 24, height: 24, marginLeft: -4, marginTop: -4 }}
              />
              
              {/* Marker dot */}
              <div
                className={cn(
                  'relative w-4 h-4 rounded-full border-2 border-background transition-transform',
                  statusColor,
                  isSelected && 'ring-2 ring-foreground ring-offset-2 ring-offset-background scale-125'
                )}
              />

              {/* Tooltip */}
              <div className={cn(
                'absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 rounded-lg bg-popover border border-border shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10',
                isSelected && 'opacity-100'
              )}>
                <p className="text-xs font-semibold text-foreground">{service.name}</p>
                <p className="text-[10px] text-muted-foreground">{location.region}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-muted-foreground">
                    {service.uptime}% uptime
                  </span>
                  <span className="text-[10px] text-muted-foreground">•</span>
                  <span className="text-[10px] text-muted-foreground">
                    {service.responseTime}ms
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-success" />
          <span className="text-xs text-muted-foreground">Healthy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-warning" />
          <span className="text-xs text-muted-foreground">Warning</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
          <span className="text-xs text-muted-foreground">Critical</span>
        </div>
      </div>
    </motion.div>
  );
};
