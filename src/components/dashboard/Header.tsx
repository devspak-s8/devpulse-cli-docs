import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Terminal, 
  Activity, 
  Settings, 
  Bell, 
  Menu, 
  X,
  Home,
  ChevronUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  notificationCount?: number;
}

export const Header = ({ notificationCount = 2 }: HeaderProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/', icon: Activity, label: 'Dashboard' },
    { to: '/terminal', icon: Terminal, label: 'Terminal' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-secondary">
              <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
            </div>
            <div className="hidden xs:block">
              <h1 className="text-base sm:text-lg font-bold text-foreground">
                DevPulse<span className="text-muted-foreground">CLI</span>
              </h1>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground hidden sm:block">Service Monitoring</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavItem 
                key={item.to}
                to={item.to} 
                icon={item.icon} 
                label={item.label} 
                active={location.pathname === item.to} 
              />
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications - Desktop */}
            <button className="relative rounded-lg bg-secondary p-1.5 sm:p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              {notificationCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive/80 text-[10px] font-bold text-foreground">
                  {notificationCount}
                </span>
              )}
            </button>
            
            {/* User Avatar */}
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground">DP</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1.5 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Bottom Sheet Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm md:hidden"
            />
            
            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            >
              <div className="bg-card border-t border-border rounded-t-2xl shadow-2xl">
                {/* Handle */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
                </div>

                {/* Close button */}
                <div className="flex items-center justify-between px-4 pb-2">
                  <span className="text-sm font-medium text-muted-foreground">Navigation</span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="px-4 pb-6 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-colors',
                        location.pathname === item.to
                          ? 'bg-secondary text-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {/* Safe area for bottom */}
                <div className="h-safe-area-inset-bottom bg-card" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-border bg-background/95 backdrop-blur-lg safe-area-bottom">
        <nav className="flex items-center justify-around h-16">
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors flex-1',
                location.pathname === item.to
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors flex-1 text-muted-foreground"
          >
            <ChevronUp className="h-5 w-5" />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </nav>
      </div>
    </>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const NavItem = ({ to, icon: Icon, label, active }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
      active 
        ? 'bg-secondary text-foreground' 
        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
    )}
  >
    <Icon className="h-4 w-4" />
    {label}
  </Link>
);
