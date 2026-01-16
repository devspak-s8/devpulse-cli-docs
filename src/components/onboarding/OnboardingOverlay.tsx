import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitHubSignInPanel } from './GitHubSignInPanel';
import { RepoImportPanel } from './RepoImportPanel';
import { LoadingModal } from './LoadingModal';
import { OnboardingStep } from '@/hooks/useOnboarding';

interface OnboardingOverlayProps {
  step: OnboardingStep;
  onSignIn: (onProgress?: (progress: number) => void) => void;
  onImport: (repos: string[]) => void;
  onStart: () => void;
}

export const OnboardingOverlay = ({ step, onSignIn, onImport, onStart }: OnboardingOverlayProps) => {
  const isActive = step !== 'completed';
  const [loadingType, setLoadingType] = useState<'signin' | 'repos' | 'import' | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleShowLoader = (type: 'signin' | 'repos' | 'import') => {
    setLoadingType(type);
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoadingType(null), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <>
      <LoadingModal isOpen={loadingType !== null} type={loadingType || 'signin'} progress={loadingProgress} />
      
      {/* Blur overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      {/* Welcome CTA for not-started state */}
      <AnimatePresence>
        {step === 'not-started' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl font-bold text-foreground mb-4"
              >
                DevPulse<span className="text-muted-foreground">CLI</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
              >
                Monitor your services globally with real-time insights and instant alerts.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={onStart}
                className="bg-foreground text-background font-medium py-3.5 px-8 rounded-xl hover:bg-foreground/90 transition-colors"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-in panels */}
      <AnimatePresence mode="wait">
        {step === 'github-signin' && (
          <GitHubSignInPanel
            key="github-signin"
            onSignIn={onSignIn}
            isVisible={true}
            onShowLoader={handleShowLoader}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'repo-import' && (
          <>
            {/* Keep GitHub panel visible but dimmed behind */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="fixed right-0 top-0 h-full w-full sm:w-[400px] md:w-[450px] z-45 flex items-center justify-center p-4 sm:p-8 pointer-events-none"
            >
              <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl h-[500px] opacity-50 blur-[2px]" />
            </motion.div>
            <RepoImportPanel
              key="repo-import"
              onImport={onImport}
              isVisible={true}
              onShowLoader={handleShowLoader}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

