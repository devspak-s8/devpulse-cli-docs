import { useState, useEffect } from 'react';

export type OnboardingStep = 'not-started' | 'github-signin' | 'repo-import' | 'completed';

interface OnboardingState {
  step: OnboardingStep;
  isAuthenticated: boolean;
  user: {
    name: string;
    avatar: string;
    username: string;
  } | null;
  importedRepos: string[];
}

export const useOnboarding = () => {
  const [state, setState] = useState<OnboardingState>(() => {
    const saved = localStorage.getItem('devpulse-onboarding');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      step: 'not-started',
      isAuthenticated: false,
      user: null,
      importedRepos: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('devpulse-onboarding', JSON.stringify(state));
  }, [state]);

  const startOnboarding = () => {
    setState(prev => ({ ...prev, step: 'github-signin' }));
  };

  const signInWithGitHub = (onProgress?: (progress: number) => void) => {
    // Simulate GitHub OAuth with progress updates
    if (onProgress) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        onProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 150);
    }
    
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        step: 'repo-import',
        isAuthenticated: true,
        user: {
          name: 'Developer',
          avatar: '',
          username: 'dev-user',
        },
      }));
    }, 1500);
  };

  const importRepos = (repos: string[]) => {
    setState(prev => ({
      ...prev,
      step: 'completed',
      importedRepos: repos,
    }));
  };

  const resetOnboarding = () => {
    setState({
      step: 'not-started',
      isAuthenticated: false,
      user: null,
      importedRepos: [],
    });
    localStorage.removeItem('devpulse-onboarding');
  };

  return {
    ...state,
    startOnboarding,
    signInWithGitHub,
    importRepos,
    resetOnboarding,
    isOnboarding: state.step !== 'completed' && state.step !== 'not-started',
    showDashboard: state.step === 'completed',
  };
};
