// Mock data for DevPulseCLI monitoring dashboard

export type ServiceStatus = 'healthy' | 'warning' | 'critical';

export interface Service {
  id: string;
  name: string;
  status: ServiceStatus;
  uptime: number;
  responseTime: number;
  requestCount: number;
  errorRate: number;
  lastChecked: Date;
  description: string;
}

export interface LogEntry {
  id: string;
  service: string;
  timestamp: Date;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

export interface Alert {
  id: string;
  service: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

export interface MetricDataPoint {
  timestamp: string;
  value: number;
}

export interface ErrorMetrics {
  service: string;
  data: MetricDataPoint[];
}

export const services: Service[] = [
  {
    id: 'user-service',
    name: 'User Service',
    status: 'healthy',
    uptime: 99.98,
    responseTime: 45,
    requestCount: 15420,
    errorRate: 0.02,
    lastChecked: new Date(),
    description: 'Authentication and user management',
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    status: 'healthy',
    uptime: 99.99,
    responseTime: 23,
    requestCount: 89230,
    errorRate: 0.01,
    lastChecked: new Date(),
    description: 'Central API routing and load balancing',
  },
  {
    id: 'payment-service',
    name: 'Payment Service',
    status: 'warning',
    uptime: 99.85,
    responseTime: 156,
    requestCount: 4521,
    errorRate: 2.3,
    lastChecked: new Date(),
    description: 'Payment processing and transactions',
  },
  {
    id: 'notification-service',
    name: 'Notification Service',
    status: 'healthy',
    uptime: 99.92,
    responseTime: 67,
    requestCount: 23450,
    errorRate: 0.08,
    lastChecked: new Date(),
    description: 'Email, SMS, and push notifications',
  },
  {
    id: 'analytics-service',
    name: 'Analytics Service',
    status: 'critical',
    uptime: 94.20,
    responseTime: 890,
    requestCount: 1245,
    errorRate: 15.6,
    lastChecked: new Date(),
    description: 'Data analytics and reporting',
  },
  {
    id: 'storage-service',
    name: 'Storage Service',
    status: 'healthy',
    uptime: 99.97,
    responseTime: 34,
    requestCount: 45678,
    errorRate: 0.03,
    lastChecked: new Date(),
    description: 'File storage and CDN management',
  },
];

export const generateLogs = (): LogEntry[] => {
  const levels: LogEntry['level'][] = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
  const messages = {
    DEBUG: [
      'Processing request payload',
      'Cache hit for user session',
      'Database query executed in 12ms',
      'WebSocket connection established',
    ],
    INFO: [
      'User authentication successful',
      'Service started on port 3000',
      'Scheduled job completed',
      'API rate limit reset',
    ],
    WARN: [
      'High memory usage detected (85%)',
      'Slow database query (>500ms)',
      'Rate limit threshold approaching',
      'Deprecated API endpoint called',
    ],
    ERROR: [
      'Failed to connect to database',
      'Payment gateway timeout',
      'Invalid authentication token',
      'Service unavailable: upstream error',
    ],
  };

  return Array.from({ length: 50 }, (_, i) => {
    const level = levels[Math.floor(Math.random() * levels.length)];
    const service = services[Math.floor(Math.random() * services.length)];
    const timestamp = new Date(Date.now() - Math.random() * 3600000);

    return {
      id: `log-${i}`,
      service: service.name,
      timestamp,
      level,
      message: messages[level][Math.floor(Math.random() * messages[level].length)],
    };
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const alerts: Alert[] = [
  {
    id: 'alert-1',
    service: 'Analytics Service',
    type: 'error',
    message: 'Service health check failed - high error rate detected (15.6%)',
    timestamp: new Date(Date.now() - 300000),
    acknowledged: false,
  },
  {
    id: 'alert-2',
    service: 'Payment Service',
    type: 'warning',
    message: 'Response time exceeded threshold (156ms > 100ms)',
    timestamp: new Date(Date.now() - 600000),
    acknowledged: false,
  },
  {
    id: 'alert-3',
    service: 'API Gateway',
    type: 'info',
    message: 'Auto-scaling triggered: 2 new instances deployed',
    timestamp: new Date(Date.now() - 1200000),
    acknowledged: true,
  },
];

export const generateErrorMetrics = (): ErrorMetrics[] => {
  const hours = 24;
  
  return services.map((service) => ({
    service: service.name,
    data: Array.from({ length: hours }, (_, i) => {
      const baseError = service.errorRate;
      const variance = Math.random() * 2 - 1;
      const hour = new Date(Date.now() - (hours - i) * 3600000);
      
      return {
        timestamp: hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        value: Math.max(0, baseError + variance * baseError * 0.5),
      };
    }),
  }));
};

export const generateRequestMetrics = (): MetricDataPoint[] => {
  return Array.from({ length: 24 }, (_, i) => {
    const hour = new Date(Date.now() - (24 - i) * 3600000);
    const baseValue = 5000 + Math.sin(i / 4) * 2000;
    const variance = Math.random() * 1000;
    
    return {
      timestamp: hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      value: Math.floor(baseValue + variance),
    };
  });
};
