import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wifi, WifiOff } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { DottedWorldMap } from '@/components/dashboard/DottedMap';
import { MetricsChart, MultiLineChart } from '@/components/dashboard/MetricsChart';
import { LogsViewer } from '@/components/dashboard/LogsViewer';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { useWebSocketSimulation } from '@/hooks/useWebSocketSimulation';
import { generateErrorMetrics, generateRequestMetrics } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const Index = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { services, logs, alerts, isConnected, lastUpdate, acknowledgeAlert, reconnect } = useWebSocketSimulation(3000);
  const showDashboard = true;
  
  const errorMetrics = useMemo(() => generateErrorMetrics(), []);
  const requestMetrics = useMemo(() => generateRequestMetrics(), []);

  const filteredLogs = selectedService 
    ? logs.filter(log => log.service === services.find(s => s.id === selectedService)?.name)
    : logs;

  const selectedServiceData = selectedService 
    ? services.find(s => s.id === selectedService) 
    : null;

  const handleServiceClick = (serviceId: string | null) => {
    if (serviceId && serviceId === selectedService) {
      navigate(`/service/${serviceId}`);
    } else {
      setSelectedService(serviceId);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-4 sm:py-6 max-w-7xl">
        {/* Connection status bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: showDashboard ? 1 : 0.3, y: 0 }}
          className="flex items-center justify-between mb-4 px-3 py-2 rounded-lg bg-secondary/50 border border-border"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {isConnected ? (
                <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-success" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              )}
              <span className={cn(
                'text-[10px] sm:text-xs font-medium',
                isConnected ? 'text-success' : 'text-muted-foreground'
              )}>
                {isConnected ? 'Live' : 'Connecting...'}
              </span>
            </div>
            <div className="w-px h-3 sm:h-4 bg-border" />
            <span className="text-[10px] sm:text-xs text-muted-foreground hidden xs:inline">
              Last update: {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
          {!isConnected && (
            <button
              onClick={reconnect}
              className="text-[10px] sm:text-xs text-primary hover:underline"
            >
              Retry
            </button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showDashboard ? 1 : 0.4 }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Stats Overview */}
          <section>
            <h2 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              System Overview
            </h2>
            <StatsOverview services={services} />
          </section>

          {/* Main Grid */}
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            {/* World Map */}
            <section className="lg:col-span-2">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Service Health Map
                </h2>
                {selectedService && showDashboard && (
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-[10px] sm:text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear selection
                  </button>
                )}
              </div>
              <DottedWorldMap 
                services={services}
                selectedService={selectedService}
                onSelectService={showDashboard ? handleServiceClick : () => {}}
              />
              {selectedService && showDashboard && (
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 text-center">
                  Click again to view detailed service page
                </p>
              )}
            </section>

            {/* Alerts Panel */}
            <section>
              <h2 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Alerts
              </h2>
              <AlertsPanel alerts={alerts} onAcknowledge={showDashboard ? acknowledgeAlert : () => {}} />
            </section>
          </div>

          {/* Metrics Section */}
          <section>
            <h2 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {selectedServiceData ? `${selectedServiceData.name} Metrics` : 'System Metrics'}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {selectedServiceData ? (
                <>
                  <MetricsChart
                    title="Error Rate (24h)"
                    data={errorMetrics.find(e => e.service === selectedServiceData.name)?.data || []}
                    color="hsl(220, 10%, 55%)"
                    unit="%"
                  />
                  <MetricsChart
                    title="Request Volume (24h)"
                    data={requestMetrics}
                    color="hsl(220, 10%, 65%)"
                    unit=" req"
                  />
                </>
              ) : (
                <>
                  <MultiLineChart
                    title="Error Rate by Service (24h)"
                    data={errorMetrics}
                  />
                  <MetricsChart
                    title="Total Requests (24h)"
                    data={requestMetrics}
                    color="hsl(220, 10%, 55%)"
                    unit=" req"
                  />
                </>
              )}
            </div>
          </section>

          {/* Logs Section */}
          <section>
            <h2 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {selectedServiceData ? `${selectedServiceData.name} Logs` : 'Recent Logs'}
            </h2>
            <div className="h-[300px] sm:h-[400px]">
              <LogsViewer logs={filteredLogs} />
            </div>
          </section>

          {/* CLI Commands Section */}
          <section>
            <h2 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              CLI Quick Reference
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-border bg-card p-3 sm:p-4"
            >
              <div className="grid gap-2 sm:gap-3 md:grid-cols-2">
                <CLICommand
                  command="devpulse monitor status"
                  description="View global health map and service status"
                />
                <CLICommand
                  command="devpulse monitor logs --service <name>"
                  description="Fetch logs for a specific service"
                />
                <CLICommand
                  command="devpulse monitor metrics --service <name>"
                  description="Display key metrics for a service"
                />
                <CLICommand
                  command="devpulse monitor errors --service <name>"
                  description="Show error graphs for a service"
                />
              </div>
            </motion.div>
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 sm:py-6 mt-6 sm:mt-8 hidden md:block">
        <div className="container mx-auto px-4">
          <p className="text-center text-[10px] sm:text-xs text-muted-foreground">
            DevPulseCLI Service Monitoring • Real-time infrastructure insights
          </p>
        </div>
      </footer>

    </div>
  );
};

interface CLICommandProps {
  command: string;
  description: string;
}

const CLICommand = ({ command, description }: CLICommandProps) => (
  <div className="rounded-lg bg-secondary/50 p-2 sm:p-3">
    <code className="font-mono text-[10px] sm:text-sm text-foreground break-all">{command}</code>
    <p className="mt-1 text-[10px] sm:text-xs text-muted-foreground">{description}</p>
  </div>
);

export default Index;
