import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Activity, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Server,
  Globe,
  Settings,
  History,
  TrendingUp,
  Zap
} from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { MetricsChart } from '@/components/dashboard/MetricsChart';
import { LogsViewer } from '@/components/dashboard/LogsViewer';
import { useWebSocketSimulation } from '@/hooks/useWebSocketSimulation';
import { cn } from '@/lib/utils';

// Service configuration data
const serviceConfigs: Record<string, {
  version: string;
  port: number;
  replicas: number;
  memory: string;
  cpu: string;
  healthCheckPath: string;
  timeout: number;
  retries: number;
}> = {
  'user-service': {
    version: '2.4.1',
    port: 3001,
    replicas: 3,
    memory: '512Mi',
    cpu: '250m',
    healthCheckPath: '/health',
    timeout: 30,
    retries: 3,
  },
  'api-gateway': {
    version: '3.1.0',
    port: 8080,
    replicas: 5,
    memory: '1Gi',
    cpu: '500m',
    healthCheckPath: '/status',
    timeout: 60,
    retries: 5,
  },
  'payment-service': {
    version: '1.8.3',
    port: 3002,
    replicas: 2,
    memory: '768Mi',
    cpu: '300m',
    healthCheckPath: '/health',
    timeout: 45,
    retries: 3,
  },
  'notification-service': {
    version: '2.0.5',
    port: 3003,
    replicas: 2,
    memory: '256Mi',
    cpu: '100m',
    healthCheckPath: '/ping',
    timeout: 15,
    retries: 2,
  },
  'analytics-service': {
    version: '1.2.0',
    port: 3004,
    replicas: 1,
    memory: '2Gi',
    cpu: '1000m',
    healthCheckPath: '/health',
    timeout: 120,
    retries: 1,
  },
  'storage-service': {
    version: '2.1.2',
    port: 3005,
    replicas: 4,
    memory: '1Gi',
    cpu: '400m',
    healthCheckPath: '/health',
    timeout: 30,
    retries: 3,
  },
};

// Incident history data
const generateIncidents = (serviceId: string) => {
  const incidents = [
    { 
      id: 1, 
      type: 'outage', 
      title: 'Service Unavailable', 
      description: 'Complete service outage due to database connection failure',
      startTime: new Date(Date.now() - 86400000 * 7),
      endTime: new Date(Date.now() - 86400000 * 7 + 1800000),
      resolved: true,
    },
    { 
      id: 2, 
      type: 'degradation', 
      title: 'High Latency', 
      description: 'Response times elevated above threshold',
      startTime: new Date(Date.now() - 86400000 * 3),
      endTime: new Date(Date.now() - 86400000 * 3 + 3600000),
      resolved: true,
    },
    { 
      id: 3, 
      type: 'warning', 
      title: 'Memory Usage Spike', 
      description: 'Memory consumption reached 90% of allocated resources',
      startTime: new Date(Date.now() - 86400000),
      endTime: new Date(Date.now() - 86400000 + 900000),
      resolved: true,
    },
  ];

  if (serviceId === 'analytics-service') {
    incidents.unshift({
      id: 0,
      type: 'outage',
      title: 'Critical Error Rate',
      description: 'Error rate exceeded 15%, investigating root cause',
      startTime: new Date(Date.now() - 3600000),
      endTime: null as unknown as Date,
      resolved: false,
    });
  }

  return incidents;
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { services, logs, isConnected, lastUpdate } = useWebSocketSimulation(2000);
  const [activeTab, setActiveTab] = useState<'metrics' | 'incidents' | 'config' | 'logs'>('metrics');

  const service = services.find(s => s.id === serviceId);
  const config = serviceId ? serviceConfigs[serviceId] : null;
  const incidents = serviceId ? generateIncidents(serviceId) : [];

  const serviceLogs = useMemo(() => 
    logs.filter(log => log.service === service?.name),
    [logs, service?.name]
  );

  // Generate metrics data
  const metricsData = useMemo(() => {
    if (!service) return { responseTime: [], errorRate: [], requestCount: [], memory: [], cpu: [] };
    
    const generateTimeSeries = (baseValue: number, variance: number, count = 24) => 
      Array.from({ length: count }, (_, i) => {
        const hour = new Date(Date.now() - (count - i) * 3600000);
        return {
          timestamp: hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          value: Math.max(0, baseValue + (Math.random() - 0.5) * variance),
        };
      });

    return {
      responseTime: generateTimeSeries(service.responseTime, 50),
      errorRate: generateTimeSeries(service.errorRate, 2),
      requestCount: generateTimeSeries(service.requestCount / 24, 500),
      memory: generateTimeSeries(65, 20),
      cpu: generateTimeSeries(45, 30),
    };
  }, [service]);

  if (!service || !config) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-foreground mb-2">Service Not Found</h1>
          <p className="text-muted-foreground mb-4">The requested service does not exist.</p>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-primary hover:underline"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const statusIcon = service.status === 'healthy' ? CheckCircle2 : 
                     service.status === 'warning' ? AlertTriangle : XCircle;
  const statusColor = service.status === 'healthy' ? 'text-success' : 
                      service.status === 'warning' ? 'text-warning' : 'text-destructive';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Back button and header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-secondary">
                <Server className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-foreground">{service.name}</h1>
                  <span className={cn('flex items-center gap-1.5 text-sm font-medium', statusColor)}>
                    {service.status === 'healthy' && <CheckCircle2 className="w-4 h-4" />}
                    {service.status === 'warning' && <AlertTriangle className="w-4 h-4" />}
                    {service.status === 'critical' && <XCircle className="w-4 h-4" />}
                    {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
              </div>
            </div>

            {/* Connection status */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className={cn(
                'w-2 h-2 rounded-full',
                isConnected ? 'bg-success animate-pulse' : 'bg-muted'
              )} />
              {isConnected ? 'Live' : 'Connecting...'}
              <span className="text-muted-foreground/60">
                Updated {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <StatCard
            icon={Activity}
            label="Uptime"
            value={`${service.uptime}%`}
            trend={service.uptime > 99 ? 'up' : 'down'}
          />
          <StatCard
            icon={Clock}
            label="Response Time"
            value={`${service.responseTime}ms`}
            trend={service.responseTime < 100 ? 'up' : 'down'}
          />
          <StatCard
            icon={Zap}
            label="Requests/hr"
            value={service.requestCount.toLocaleString()}
            trend="up"
          />
          <StatCard
            icon={AlertTriangle}
            label="Error Rate"
            value={`${service.errorRate}%`}
            trend={service.errorRate < 1 ? 'up' : 'down'}
          />
        </motion.div>

        {/* Tab navigation */}
        <div className="flex items-center gap-1 border-b border-border mb-6">
          {[
            { id: 'metrics', label: 'Metrics', icon: TrendingUp },
            { id: 'incidents', label: 'Incidents', icon: History },
            { id: 'config', label: 'Configuration', icon: Settings },
            { id: 'logs', label: 'Logs', icon: Activity },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
                activeTab === tab.id 
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.id === 'incidents' && incidents.filter(i => !i.resolved).length > 0 && (
                <span className="w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                  {incidents.filter(i => !i.resolved).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'metrics' && (
            <div className="grid gap-4 md:grid-cols-2">
              <MetricsChart
                title="Response Time (24h)"
                data={metricsData.responseTime}
                color="hsl(220, 10%, 55%)"
                unit="ms"
              />
              <MetricsChart
                title="Error Rate (24h)"
                data={metricsData.errorRate}
                color="hsl(220, 10%, 45%)"
                unit="%"
              />
              <MetricsChart
                title="Request Volume (24h)"
                data={metricsData.requestCount}
                color="hsl(220, 10%, 60%)"
                unit=" req"
              />
              <MetricsChart
                title="Memory Usage (24h)"
                data={metricsData.memory}
                color="hsl(220, 10%, 50%)"
                unit="%"
              />
            </div>
          )}

          {activeTab === 'incidents' && (
            <div className="space-y-4">
              {incidents.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No incidents recorded</p>
                </div>
              ) : (
                incidents.map(incident => (
                  <motion.div
                    key={incident.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      'rounded-lg border p-4',
                      !incident.resolved 
                        ? 'border-destructive/50 bg-destructive/5' 
                        : 'border-border bg-card'
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          'w-2 h-2 rounded-full',
                          incident.type === 'outage' ? 'bg-destructive' :
                          incident.type === 'degradation' ? 'bg-warning' : 'bg-muted-foreground'
                        )} />
                        <h3 className="font-medium text-foreground">{incident.title}</h3>
                        {!incident.resolved && (
                          <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded bg-destructive/20 text-destructive">
                            Active
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {incident.startTime.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Started: {incident.startTime.toLocaleTimeString()}</span>
                      {incident.resolved && incident.endTime && (
                        <>
                          <span>Resolved: {incident.endTime.toLocaleTimeString()}</span>
                          <span>Duration: {Math.round((incident.endTime.getTime() - incident.startTime.getTime()) / 60000)} min</span>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {activeTab === 'config' && (
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Service Configuration
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ConfigItem label="Version" value={config.version} />
                <ConfigItem label="Port" value={config.port.toString()} />
                <ConfigItem label="Replicas" value={config.replicas.toString()} />
                <ConfigItem label="Memory Limit" value={config.memory} />
                <ConfigItem label="CPU Limit" value={config.cpu} />
                <ConfigItem label="Health Check" value={config.healthCheckPath} />
                <ConfigItem label="Timeout" value={`${config.timeout}s`} />
                <ConfigItem label="Max Retries" value={config.retries.toString()} />
                <ConfigItem label="Region" value="US East (N. Virginia)" icon={Globe} />
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="h-[500px]">
              <LogsViewer logs={serviceLogs} />
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  trend?: 'up' | 'down';
}

const StatCard = ({ icon: Icon, label, value, trend }: StatCardProps) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold font-mono text-foreground">{value}</span>
      {trend && (
        <span className={cn(
          'text-xs',
          trend === 'up' ? 'text-success' : 'text-destructive'
        )}>
          {trend === 'up' ? '↑' : '↓'}
        </span>
      )}
    </div>
  </div>
);

interface ConfigItemProps {
  label: string;
  value: string;
  icon?: React.ElementType;
}

const ConfigItem = ({ label, value, icon: Icon }: ConfigItemProps) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
    <span className="text-sm text-muted-foreground">{label}</span>
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-3 h-3 text-muted-foreground" />}
      <span className="text-sm font-mono text-foreground">{value}</span>
    </div>
  </div>
);

export default ServiceDetail;
