import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Folder, GitBranch, Loader2, Check, Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface RepoImportPanelProps {
  onImport: (repos: string[]) => void;
  isVisible: boolean;
}

const mockRepos = [
  { name: 'api-gateway', fullName: 'dev-user/api-gateway', language: 'TypeScript', updatedAt: '2 days ago' },
  { name: 'payment-service', fullName: 'dev-user/payment-service', language: 'Go', updatedAt: '5 days ago' },
  { name: 'user-auth', fullName: 'dev-user/user-auth', language: 'Python', updatedAt: '1 week ago' },
  { name: 'notification-hub', fullName: 'dev-user/notification-hub', language: 'TypeScript', updatedAt: '2 weeks ago' },
  { name: 'analytics-engine', fullName: 'dev-user/analytics-engine', language: 'Rust', updatedAt: '3 weeks ago' },
];

export const RepoImportPanel = ({ onImport, isVisible }: RepoImportPanelProps) => {
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [config, setConfig] = useState({
    rootFolder: '',
    serviceName: '',
    apiBaseUrl: '',
    buildCommand: '',
    startCommand: '',
  });

  const filteredRepos = mockRepos.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleRepo = (repoName: string) => {
    setSelectedRepos(prev => 
      prev.includes(repoName) 
        ? prev.filter(r => r !== repoName)
        : [...prev, repoName]
    );
  };

  const handleImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      onImport(selectedRepos);
    }, 2000);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed right-0 top-0 h-full w-full md:w-[65%] lg:w-[55%] xl:w-[50%] z-50 flex items-center md:items-start justify-center p-4 pt-12 sm:p-6 sm:pt-8 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Check className="h-4 w-4 text-success" />
            <span>Signed in as dev-user</span>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Import Your Repositories
          </h2>
          <p className="text-sm text-muted-foreground">
            Select the repositories you want to monitor. DevPulse will analyze your services and set up monitoring automatically.
          </p>
        </div>

        {/* Search */}
        <div className="px-6 sm:px-8 pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
        </div>

        {/* Repo List */}
        <div className="p-6 sm:p-8 space-y-2 max-h-[280px] overflow-y-auto">
          {filteredRepos.map((repo) => (
            <motion.button
              key={repo.name}
              onClick={() => toggleRepo(repo.name)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                selectedRepos.includes(repo.name)
                  ? 'bg-secondary border-foreground/20'
                  : 'bg-secondary/30 border-border hover:bg-secondary/50'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                selectedRepos.includes(repo.name)
                  ? 'bg-foreground border-foreground'
                  : 'border-muted-foreground'
              }`}>
                {selectedRepos.includes(repo.name) && (
                  <Check className="h-3 w-3 text-background" />
                )}
              </div>
              <GitBranch className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{repo.name}</p>
                <p className="text-xs text-muted-foreground">{repo.fullName}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-muted-foreground">{repo.language}</p>
                <p className="text-xs text-muted-foreground/60">{repo.updatedAt}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Configuration */}
        <div className="px-6 sm:px-8 pb-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {showAdvanced ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span>Advanced Configuration</span>
          </button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Root Folder Path</label>
                      <div className="relative">
                        <Folder className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="./src"
                          value={config.rootFolder}
                          onChange={(e) => setConfig(prev => ({ ...prev, rootFolder: e.target.value }))}
                          className="pl-10 bg-secondary border-border"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Service Name</label>
                      <Input
                        placeholder="my-service"
                        value={config.serviceName}
                        onChange={(e) => setConfig(prev => ({ ...prev, serviceName: e.target.value }))}
                        className="bg-secondary border-border"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">API Base URL</label>
                    <Input
                      placeholder="https://api.example.com"
                      value={config.apiBaseUrl}
                      onChange={(e) => setConfig(prev => ({ ...prev, apiBaseUrl: e.target.value }))}
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Build Command</label>
                      <Input
                        placeholder="npm run build"
                        value={config.buildCommand}
                        onChange={(e) => setConfig(prev => ({ ...prev, buildCommand: e.target.value }))}
                        className="bg-secondary border-border font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Start Command</label>
                      <Input
                        placeholder="npm start"
                        value={config.startCommand}
                        onChange={(e) => setConfig(prev => ({ ...prev, startCommand: e.target.value }))}
                        className="bg-secondary border-border font-mono text-sm"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground/60 italic">
                    DevPulse does not deploy your app. Commands are optional and used only for local inspection.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 sm:p-8 border-t border-border bg-secondary/20">
          <button
            onClick={handleImport}
            disabled={selectedRepos.length === 0 || isImporting}
            className="w-full flex items-center justify-center gap-3 bg-foreground text-background font-medium py-3.5 px-4 rounded-xl hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isImporting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Importing {selectedRepos.length} project{selectedRepos.length > 1 ? 's' : ''}...</span>
              </>
            ) : (
              <span>Import {selectedRepos.length > 0 ? `${selectedRepos.length} Project${selectedRepos.length > 1 ? 's' : ''}` : 'Project'}</span>
            )}
          </button>
          {selectedRepos.length === 0 && (
            <p className="text-xs text-muted-foreground text-center mt-3">
              Select at least one repository to continue
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
