import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Github, GitBranch, Check } from 'lucide-react';

interface LoadingModalProps {
  isOpen: boolean;
  type: 'signin' | 'repos' | 'import';
  progress?: number;
}

const loadingConfig = {
  signin: {
    icon: Github,
    title: 'Signing in with GitHub',
    description: 'Authenticating your account...',
    steps: ['Connecting to GitHub', 'Verifying credentials', 'Loading profile'],
  },
  repos: {
    icon: GitBranch,
    title: 'Fetching Repositories',
    description: 'Loading your GitHub repositories...',
    steps: ['Connecting to GitHub API', 'Fetching repository list', 'Preparing data'],
  },
  import: {
    icon: GitBranch,
    title: 'Importing Project',
    description: 'Setting up your monitoring...',
    steps: ['Analyzing repository', 'Configuring services', 'Starting monitors'],
  },
};

export const LoadingModal = ({ isOpen, type, progress = 0 }: LoadingModalProps) => {
  const config = loadingConfig[type];
  const Icon = config.icon;
  
  const currentStep = Math.min(Math.floor(progress / 33), 2);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="relative"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                    <Icon className="h-8 w-8 text-foreground" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
              </div>

              {/* Title & Description */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-1">{config.title}</h3>
                <p className="text-sm text-muted-foreground">{config.description}</p>
              </div>

              {/* Progress Steps */}
              <div className="space-y-3 mb-6">
                {config.steps.map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0">
                      {index < currentStep ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-success/20"
                        >
                          <Check className="h-3.5 w-3.5 text-success" />
                        </motion.div>
                      ) : index === currentStep ? (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                          <Loader2 className="h-3.5 w-3.5 text-primary animate-spin" />
                        </div>
                      ) : (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <span className={`text-sm ${
                      index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
