import { motion } from 'framer-motion';
import { Github, Terminal, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface GitHubSignInPanelProps {
  onSignIn: () => void;
  isVisible: boolean;
}

export const GitHubSignInPanel = ({ onSignIn, isVisible }: GitHubSignInPanelProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    setIsLoading(true);
    onSignIn();
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed right-0 top-0 h-full w-full sm:w-[400px] md:w-[450px] z-50 flex items-center justify-center p-4 sm:p-8"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-8 pb-6 border-b border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
              <Terminal className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                DevPulse<span className="text-muted-foreground">CLI</span>
              </h1>
              <p className="text-xs text-muted-foreground">Service Monitoring</p>
            </div>
          </div>
          
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Welcome to DevPulse
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sign in with GitHub to start monitoring your services and APIs in real-time.
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-foreground text-background font-medium py-3.5 px-4 rounded-xl hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Github className="h-5 w-5" />
                <span>Sign in with GitHub</span>
              </>
            )}
          </button>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        {/* Features preview */}
        <div className="px-8 pb-8">
          <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span className="text-muted-foreground">Real-time service monitoring</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span className="text-muted-foreground">Global health map</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span className="text-muted-foreground">Instant alerts & notifications</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
