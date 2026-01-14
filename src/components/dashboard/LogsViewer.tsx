import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { LogEntry } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface LogsViewerProps {
  logs: LogEntry[];
}

const levelColors = {
  DEBUG: 'text-muted-foreground',
  INFO: 'text-foreground',
  WARN: 'text-foreground',
  ERROR: 'text-foreground',
};

const levelBadgeColors = {
  DEBUG: 'bg-secondary text-muted-foreground',
  INFO: 'bg-secondary text-foreground',
  WARN: 'bg-warning/20 text-warning',
  ERROR: 'bg-destructive/20 text-destructive',
};

export const LogsViewer = ({ logs }: LogsViewerProps) => {
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<LogEntry['level'] | 'ALL'>('ALL');

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch = 
        log.message.toLowerCase().includes(search.toLowerCase()) ||
        log.service.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = selectedLevel === 'ALL' || log.level === selectedLevel;
      return matchesSearch && matchesLevel;
    });
  }, [logs, search, selectedLevel]);

  const levels: (LogEntry['level'] | 'ALL')[] = ['ALL', 'DEBUG', 'INFO', 'WARN', 'ERROR'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-full flex-col rounded-lg border border-border bg-card"
    >
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary border-border"
            />
          </div>
          <div className="flex items-center gap-1">
            <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={cn(
                  'rounded-md px-2 py-1 text-xs font-medium transition-colors',
                  selectedLevel === level
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2">
        <AnimatePresence mode="popLayout">
          {filteredLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: index * 0.02 }}
              className="flex items-start gap-3 rounded-md p-2 hover:bg-secondary/50 transition-colors"
            >
              <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-semibold', levelBadgeColors[log.level])}>
                {log.level}
              </span>
              <span className="font-mono text-xs text-muted-foreground min-w-[70px]">
                {log.timestamp.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit' 
                })}
              </span>
              <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-secondary-foreground min-w-[100px] text-center">
                {log.service}
              </span>
              <span className={cn('terminal-text flex-1', levelColors[log.level])}>
                {log.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t border-border p-2">
        <p className="text-xs text-muted-foreground">
          Showing {filteredLogs.length} of {logs.length} log entries
        </p>
      </div>
    </motion.div>
  );
};
