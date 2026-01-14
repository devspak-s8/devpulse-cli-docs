import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, ChevronRight, X, Maximize2, Minimize2 } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { MetricsChart, MultiLineChart } from '@/components/dashboard/MetricsChart';
import { 
  services, 
  generateLogs, 
  generateErrorMetrics,
  generateRequestMetrics 
} from '@/lib/mockData';

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: Date;
}

const AVAILABLE_COMMANDS = [
  { cmd: 'devpulse monitor status', desc: 'View global health status of all services' },
  { cmd: 'devpulse monitor logs --service <name>', desc: 'Fetch logs for a specific service' },
  { cmd: 'devpulse monitor metrics --service <name>', desc: 'Display metrics chart for a service' },
  { cmd: 'devpulse monitor errors --service <name>', desc: 'Show error rate graph for a service' },
  { cmd: 'devpulse list services', desc: 'List all available services' },
  { cmd: 'help', desc: 'Show available commands' },
  { cmd: 'clear', desc: 'Clear terminal output' },
];

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const logs = useMemo(() => generateLogs(), []);
  const errorMetrics = useMemo(() => generateErrorMetrics(), []);
  const requestMetrics = useMemo(() => generateRequestMetrics(), []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const parseCommand = (cmd: string): CommandOutput => {
    const id = Date.now().toString();
    const timestamp = new Date();
    const parts = cmd.trim().toLowerCase().split(' ');

    // Clear command
    if (cmd.trim() === 'clear') {
      setHistory([]);
      return { id, command: cmd, output: null, timestamp };
    }

    // Help command
    if (cmd.trim() === 'help') {
      return {
        id,
        command: cmd,
        output: (
          <div className="space-y-2">
            <p className="text-muted-foreground">Available commands:</p>
            {AVAILABLE_COMMANDS.map((c, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:gap-4">
                <code className="text-success font-mono text-xs sm:text-sm sm:min-w-[320px]">{c.cmd}</code>
                <span className="text-muted-foreground text-xs sm:text-sm">{c.desc}</span>
              </div>
            ))}
          </div>
        ),
        timestamp,
      };
    }

    // List services
    if (cmd.trim() === 'devpulse list services') {
      return {
        id,
        command: cmd,
        output: (
          <div className="space-y-1">
            <p className="text-muted-foreground mb-2">Available services:</p>
            {services.map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  s.status === 'healthy' ? 'bg-success' :
                  s.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                }`} />
                <code className="text-foreground font-mono text-xs sm:text-sm">{s.id}</code>
                <span className="text-muted-foreground text-xs sm:text-sm">({s.name})</span>
              </div>
            ))}
          </div>
        ),
        timestamp,
      };
    }

    // Monitor status
    if (cmd.trim() === 'devpulse monitor status') {
      return {
        id,
        command: cmd,
        output: (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs sm:text-sm text-muted-foreground">System Status: Operational</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {services.map((s) => (
                <div 
                  key={s.id} 
                  className="rounded-md border border-border bg-secondary/30 p-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${
                      s.status === 'healthy' ? 'bg-success' :
                      s.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                    }`} />
                    <span className="text-xs font-medium text-foreground">{s.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="text-muted-foreground">Uptime</span>
                      <p className="font-mono text-foreground">{s.uptime}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Latency</span>
                      <p className="font-mono text-foreground">{s.responseTime}ms</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
        timestamp,
      };
    }

    // Monitor logs
    if (parts[0] === 'devpulse' && parts[1] === 'monitor' && parts[2] === 'logs') {
      const serviceIndex = parts.indexOf('--service');
      if (serviceIndex === -1 || !parts[serviceIndex + 1]) {
        return {
          id,
          command: cmd,
          output: <p className="text-destructive text-xs sm:text-sm">Error: Please specify a service with --service &lt;name&gt;</p>,
          timestamp,
        };
      }
      const serviceName = parts[serviceIndex + 1];
      const service = services.find(s => s.id === serviceName || s.name.toLowerCase().includes(serviceName));
      if (!service) {
        return {
          id,
          command: cmd,
          output: <p className="text-destructive text-xs sm:text-sm">Error: Service '{serviceName}' not found</p>,
          timestamp,
        };
      }
      const serviceLogs = logs.filter(l => l.service === service.name).slice(0, 10);
      return {
        id,
        command: cmd,
        output: (
          <div className="space-y-1">
            <p className="text-muted-foreground mb-2 text-xs sm:text-sm">Logs for {service.name}:</p>
            {serviceLogs.map((log, i) => (
              <div key={i} className="flex flex-wrap gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono">
                <span className="text-muted-foreground">{log.timestamp.toLocaleTimeString()}</span>
                <span className={`uppercase w-12 ${
                  log.level === 'ERROR' ? 'text-destructive' :
                  log.level === 'WARN' ? 'text-warning' :
                  log.level === 'DEBUG' ? 'text-muted-foreground' : 'text-foreground'
                }`}>[{log.level}]</span>
                <span className="text-foreground break-all">{log.message}</span>
              </div>
            ))}
          </div>
        ),
        timestamp,
      };
    }

    // Monitor metrics
    if (parts[0] === 'devpulse' && parts[1] === 'monitor' && parts[2] === 'metrics') {
      const serviceIndex = parts.indexOf('--service');
      if (serviceIndex === -1 || !parts[serviceIndex + 1]) {
        return {
          id,
          command: cmd,
          output: <p className="text-destructive text-xs sm:text-sm">Error: Please specify a service with --service &lt;name&gt;</p>,
          timestamp,
        };
      }
      const serviceName = parts[serviceIndex + 1];
      const service = services.find(s => s.id === serviceName || s.name.toLowerCase().includes(serviceName));
      if (!service) {
        return {
          id,
          command: cmd,
          output: <p className="text-destructive text-xs sm:text-sm">Error: Service '{serviceName}' not found</p>,
          timestamp,
        };
      }
      return {
        id,
        command: cmd,
        output: (
          <div className="space-y-3">
            <p className="text-muted-foreground text-xs sm:text-sm">Metrics for {service.name}:</p>
            <div className="h-36 sm:h-48">
              <MetricsChart
                title={`${service.name} - Request Volume (24h)`}
                data={requestMetrics}
                color="hsl(220, 10%, 55%)"
                unit=" req"
              />
            </div>
          </div>
        ),
        timestamp,
      };
    }

    // Monitor errors
    if (parts[0] === 'devpulse' && parts[1] === 'monitor' && parts[2] === 'errors') {
      const serviceIndex = parts.indexOf('--service');
      if (serviceIndex === -1 || !parts[serviceIndex + 1]) {
        return {
          id,
          command: cmd,
          output: (
            <div className="space-y-3">
              <p className="text-muted-foreground text-xs sm:text-sm">Error rates across all services:</p>
              <div className="h-36 sm:h-48">
                <MultiLineChart title="Error Rate by Service (24h)" data={errorMetrics} />
              </div>
            </div>
          ),
          timestamp,
        };
      }
      const serviceName = parts[serviceIndex + 1];
      const service = services.find(s => s.id === serviceName || s.name.toLowerCase().includes(serviceName));
      if (!service) {
        return {
          id,
          command: cmd,
          output: <p className="text-destructive text-xs sm:text-sm">Error: Service '{serviceName}' not found</p>,
          timestamp,
        };
      }
      const serviceErrors = errorMetrics.find(e => e.service === service.name);
      return {
        id,
        command: cmd,
        output: (
          <div className="space-y-3">
            <p className="text-muted-foreground text-xs sm:text-sm">Error rate for {service.name}:</p>
            <div className="h-36 sm:h-48">
              <MetricsChart
                title={`${service.name} - Error Rate (24h)`}
                data={serviceErrors?.data || []}
                color="hsl(0, 60%, 50%)"
                unit="%"
              />
            </div>
          </div>
        ),
        timestamp,
      };
    }

    // Unknown command
    return {
      id,
      command: cmd,
      output: (
        <p className="text-destructive text-xs sm:text-sm">
          Command not found: '{cmd}'. Type 'help' for available commands.
        </p>
      ),
      timestamp,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const result = parseCommand(input);
    if (result.output !== null) {
      setHistory(prev => [...prev, result]);
    }
    setCommandHistory(prev => [input, ...prev]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <main className="container mx-auto px-4 py-4 sm:py-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <TerminalIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <h1 className="text-base sm:text-lg font-semibold text-foreground">DevPulse CLI</h1>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded hover:bg-secondary transition-colors"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              <button
                onClick={() => setHistory([])}
                className="p-1.5 rounded hover:bg-secondary transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Terminal Window */}
          <div 
            className={`rounded-lg border border-border bg-card overflow-hidden transition-all ${
              isFullscreen ? 'fixed inset-4 z-50' : ''
            }`}
          >
            {/* Window Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-secondary/50 border-b border-border">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive/60" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-warning/60" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-success/60" />
              <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-muted-foreground font-mono">bash — devpulse</span>
            </div>

            {/* Output Area */}
            <div 
              ref={outputRef}
              className={`p-3 sm:p-4 overflow-y-auto font-mono text-xs sm:text-sm ${
                isFullscreen ? 'h-[calc(100vh-180px)]' : 'h-[350px] sm:h-[500px]'
              }`}
              onClick={() => inputRef.current?.focus()}
            >
              {/* Welcome Message */}
              <div className="mb-4 text-muted-foreground">
                <pre className="text-success text-[8px] sm:text-xs leading-relaxed overflow-x-auto">{`
  ____             ____        _          
 |  _ \\  _____   _|  _ \\ _   _| |___  ___ 
 | | | |/ _ \\ \\ / / |_) | | | | / __|/ _ \\
 | |_| |  __/\\ V /|  __/| |_| | \\__ \\  __/
 |____/ \\___| \\_/ |_|    \\__,_|_|___/\\___|
                                         
`}</pre>
                <p className="text-[10px] sm:text-xs">Welcome to DevPulse CLI. Type 'help' for available commands.</p>
              </div>

              {/* Command History */}
              <AnimatePresence>
                {history.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                      <ChevronRight className="w-3 h-3 text-success" />
                      <span className="text-success">$</span>
                      <span className="text-foreground text-xs sm:text-sm break-all">{item.command}</span>
                    </div>
                    <div className="mt-2 ml-4 sm:ml-5">
                      {item.output}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center gap-1.5 sm:gap-2">
                <ChevronRight className="w-3 h-3 text-success flex-shrink-0" />
                <span className="text-success flex-shrink-0">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-foreground outline-none font-mono text-xs sm:text-sm min-w-0"
                  placeholder="Type a command..."
                  autoFocus
                />
              </form>
            </div>
          </div>

          {/* Quick Commands */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {['devpulse monitor status', 'devpulse list services', 'help'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                  inputRef.current?.focus();
                }}
                className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-secondary/50 border border-border text-[10px] sm:text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Terminal;
