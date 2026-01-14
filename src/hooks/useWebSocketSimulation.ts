import { useState, useEffect, useCallback } from 'react';
import { Service, LogEntry, Alert, services as initialServices } from '@/lib/mockData';

interface WebSocketState {
  services: Service[];
  logs: LogEntry[];
  alerts: Alert[];
  isConnected: boolean;
  lastUpdate: Date;
}

const generateRandomVariation = (base: number, variance: number) => {
  return Math.max(0, base + (Math.random() - 0.5) * variance);
};

const logMessages = {
  DEBUG: [
    'Processing request payload',
    'Cache hit for user session',
    'Database query executed in 12ms',
    'WebSocket connection established',
    'Memory allocation optimized',
  ],
  INFO: [
    'User authentication successful',
    'Health check passed',
    'Scheduled job completed',
    'API rate limit reset',
    'Connection pool refreshed',
  ],
  WARN: [
    'High memory usage detected (85%)',
    'Slow database query (>500ms)',
    'Rate limit threshold approaching',
    'Deprecated API endpoint called',
    'Connection timeout, retrying...',
  ],
  ERROR: [
    'Failed to connect to database',
    'Payment gateway timeout',
    'Invalid authentication token',
    'Service unavailable: upstream error',
    'Circuit breaker triggered',
  ],
};

export const useWebSocketSimulation = (updateInterval = 3000) => {
  const [state, setState] = useState<WebSocketState>({
    services: initialServices.map(s => ({ ...s })),
    logs: [],
    alerts: [],
    isConnected: false,
    lastUpdate: new Date(),
  });

  const generateNewLog = useCallback((services: Service[]): LogEntry => {
    const levels: LogEntry['level'][] = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
    const weights = [0.3, 0.4, 0.2, 0.1];
    const random = Math.random();
    let cumulative = 0;
    let level: LogEntry['level'] = 'INFO';
    
    for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i];
      if (random < cumulative) {
        level = levels[i];
        break;
      }
    }

    const service = services[Math.floor(Math.random() * services.length)];
    const messages = logMessages[level];

    return {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      service: service.name,
      timestamp: new Date(),
      level,
      message: messages[Math.floor(Math.random() * messages.length)],
    };
  }, []);

  const generateAlert = useCallback((service: Service): Alert | null => {
    if (Math.random() > 0.1) return null;

    const alertTypes: Alert['type'][] = ['error', 'warning', 'info'];
    const messages = {
      error: `Critical: ${service.name} health check failed`,
      warning: `Warning: ${service.name} response time elevated`,
      info: `Info: ${service.name} auto-scaling triggered`,
    };

    const type = service.status === 'critical' ? 'error' : 
                 service.status === 'warning' ? 'warning' : 'info';

    return {
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      service: service.name,
      type,
      message: messages[type],
      timestamp: new Date(),
      acknowledged: false,
    };
  }, []);

  const updateServices = useCallback((prevServices: Service[]): Service[] => {
    return prevServices.map(service => {
      const responseTime = Math.round(generateRandomVariation(service.responseTime, 20));
      const errorRate = parseFloat(generateRandomVariation(service.errorRate, 0.5).toFixed(2));
      const requestCount = service.requestCount + Math.floor(Math.random() * 50);
      
      let status: Service['status'] = 'healthy';
      if (errorRate > 10) status = 'critical';
      else if (errorRate > 2 || responseTime > 200) status = 'warning';

      return {
        ...service,
        responseTime,
        errorRate,
        requestCount,
        status,
        lastChecked: new Date(),
      };
    });
  }, []);

  useEffect(() => {
    // Initial connection simulation
    const connectTimeout = setTimeout(() => {
      setState(prev => ({ ...prev, isConnected: true }));
    }, 500);

    // Generate initial logs
    const initialLogs: LogEntry[] = Array.from({ length: 20 }, () => 
      generateNewLog(initialServices)
    ).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    setState(prev => ({ ...prev, logs: initialLogs }));

    return () => clearTimeout(connectTimeout);
  }, [generateNewLog]);

  useEffect(() => {
    if (!state.isConnected) return;

    const interval = setInterval(() => {
      setState(prev => {
        const updatedServices = updateServices(prev.services);
        const newLog = generateNewLog(updatedServices);
        const newAlert = generateAlert(updatedServices[Math.floor(Math.random() * updatedServices.length)]);

        return {
          ...prev,
          services: updatedServices,
          logs: [newLog, ...prev.logs].slice(0, 100),
          alerts: newAlert ? [newAlert, ...prev.alerts].slice(0, 20) : prev.alerts,
          lastUpdate: new Date(),
        };
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [state.isConnected, updateInterval, updateServices, generateNewLog, generateAlert]);

  const acknowledgeAlert = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      alerts: prev.alerts.map(alert =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      ),
    }));
  }, []);

  const reconnect = useCallback(() => {
    setState(prev => ({ ...prev, isConnected: false }));
    setTimeout(() => {
      setState(prev => ({ ...prev, isConnected: true }));
    }, 1000);
  }, []);

  return {
    ...state,
    acknowledgeAlert,
    reconnect,
  };
};
