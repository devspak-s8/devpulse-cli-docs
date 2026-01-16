import { motion } from 'framer-motion';
import { User, Github, Mail, Calendar, GitBranch, Activity, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/dashboard/Header';
import { useOnboarding } from '@/hooks/useOnboarding';

const Profile = () => {
  const { user, importedRepos, resetOnboarding } = useOnboarding();

  const stats = [
    { label: 'Repositories', value: importedRepos.length, icon: GitBranch },
    { label: 'Services Monitored', value: 6, icon: Activity },
    { label: 'Uptime Average', value: '99.2%', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Profile Card */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {/* Cover */}
            <div className="h-24 sm:h-32 bg-gradient-to-r from-primary/20 via-secondary to-primary/10" />
            
            {/* Profile Info */}
            <div className="px-4 sm:px-6 pb-6 -mt-12 sm:-mt-14">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                {/* Avatar */}
                <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border-4 border-card bg-secondary">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <User className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 pt-2 sm:pt-0">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                    {user?.name || 'Developer'}
                  </h1>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    @{user?.username || 'dev-user'}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit Profile</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <stat.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connected Repositories */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-primary" />
                <h2 className="font-semibold text-foreground">Connected Repositories</h2>
              </div>
              <span className="text-xs text-muted-foreground">{importedRepos.length} repos</span>
            </div>
            
            <div className="divide-y divide-border">
              {importedRepos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <GitBranch className="mb-3 h-10 w-10" />
                  <p className="text-sm font-medium">No repositories connected</p>
                  <p className="text-xs">Import a repository to get started</p>
                </div>
              ) : (
                importedRepos.map((repo, index) => (
                  <motion.div
                    key={repo}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                        <Github className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{repo}</p>
                        <p className="text-xs text-muted-foreground">Monitoring active</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-success" />
                      <span className="text-xs text-muted-foreground">Connected</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Account Details */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border p-4">
              <User className="h-4 w-4 text-primary" />
              <h2 className="font-semibold text-foreground">Account Details</h2>
            </div>
            
            <div className="divide-y divide-border">
              <div className="flex items-center gap-4 p-4">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm text-foreground">{user?.username}@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <Github className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">GitHub Account</p>
                  <p className="text-sm text-foreground">@{user?.username || 'dev-user'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="text-sm text-foreground">January 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-xl border border-destructive/30 bg-card">
            <div className="flex items-center gap-2 border-b border-destructive/30 p-4">
              <LogOut className="h-4 w-4 text-destructive" />
              <h2 className="font-semibold text-destructive">Danger Zone</h2>
            </div>
            
            <div className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Sign Out</p>
                  <p className="text-xs text-muted-foreground">Sign out and reset onboarding</p>
                </div>
                <button
                  onClick={resetOnboarding}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-sm font-medium text-destructive hover:bg-destructive/20 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
