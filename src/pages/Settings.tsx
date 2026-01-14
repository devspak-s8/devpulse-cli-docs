import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Key,
  Globe,
  Monitor,
  Moon,
  Sun,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/dashboard/Header';
import { useOnboarding } from '@/hooks/useOnboarding';

const Settings = () => {
  const { resetOnboarding } = useOnboarding();
  const [settings, setSettings] = useState({
    theme: 'dark',
    notifications: true,
    emailAlerts: true,
    slackIntegration: false,
    alertThreshold: 95,
    responseTimeThreshold: 500,
    errorRateThreshold: 5,
    refreshInterval: 30,
    timezone: 'UTC',
    dataRetention: '30',
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Page Header */}
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Settings</h1>
              <p className="text-sm text-muted-foreground">Configure your DevPulse preferences</p>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="grid gap-6">
            {/* Appearance */}
            <SettingsSection
              icon={Palette}
              title="Appearance"
              description="Customize how DevPulse looks"
            >
              <SettingsRow label="Theme" description="Choose your preferred color scheme">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateSetting('theme', 'light')}
                    className={`p-2 rounded-lg border transition-colors ${
                      settings.theme === 'light' 
                        ? 'border-foreground bg-secondary' 
                        : 'border-border hover:bg-secondary/50'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateSetting('theme', 'dark')}
                    className={`p-2 rounded-lg border transition-colors ${
                      settings.theme === 'dark' 
                        ? 'border-foreground bg-secondary' 
                        : 'border-border hover:bg-secondary/50'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateSetting('theme', 'system')}
                    className={`p-2 rounded-lg border transition-colors ${
                      settings.theme === 'system' 
                        ? 'border-foreground bg-secondary' 
                        : 'border-border hover:bg-secondary/50'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                </div>
              </SettingsRow>
            </SettingsSection>

            {/* Notifications */}
            <SettingsSection
              icon={Bell}
              title="Notifications"
              description="Manage your alert preferences"
            >
              <SettingsRow label="Push Notifications" description="Receive alerts in your browser">
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(v) => updateSetting('notifications', v)}
                />
              </SettingsRow>
              <SettingsRow label="Email Alerts" description="Get notified via email for critical issues">
                <Switch
                  checked={settings.emailAlerts}
                  onCheckedChange={(v) => updateSetting('emailAlerts', v)}
                />
              </SettingsRow>
              <SettingsRow label="Slack Integration" description="Send alerts to your Slack workspace">
                <Switch
                  checked={settings.slackIntegration}
                  onCheckedChange={(v) => updateSetting('slackIntegration', v)}
                />
              </SettingsRow>
            </SettingsSection>

            {/* Alert Thresholds */}
            <SettingsSection
              icon={Shield}
              title="Alert Thresholds"
              description="Configure when alerts should trigger"
            >
              <SettingsRow 
                label={`Uptime Threshold: ${settings.alertThreshold}%`} 
                description="Alert when uptime drops below this value"
              >
                <div className="w-32">
                  <Slider
                    value={[settings.alertThreshold]}
                    onValueChange={([v]) => updateSetting('alertThreshold', v)}
                    min={90}
                    max={100}
                    step={0.5}
                  />
                </div>
              </SettingsRow>
              <SettingsRow 
                label={`Response Time: ${settings.responseTimeThreshold}ms`} 
                description="Alert when response time exceeds this value"
              >
                <div className="w-32">
                  <Slider
                    value={[settings.responseTimeThreshold]}
                    onValueChange={([v]) => updateSetting('responseTimeThreshold', v)}
                    min={100}
                    max={2000}
                    step={50}
                  />
                </div>
              </SettingsRow>
              <SettingsRow 
                label={`Error Rate: ${settings.errorRateThreshold}%`} 
                description="Alert when error rate exceeds this value"
              >
                <div className="w-32">
                  <Slider
                    value={[settings.errorRateThreshold]}
                    onValueChange={([v]) => updateSetting('errorRateThreshold', v)}
                    min={1}
                    max={20}
                    step={0.5}
                  />
                </div>
              </SettingsRow>
            </SettingsSection>

            {/* Data & Privacy */}
            <SettingsSection
              icon={Database}
              title="Data & Privacy"
              description="Manage your data settings"
            >
              <SettingsRow label="Data Retention" description="How long to keep historical data">
                <Select
                  value={settings.dataRetention}
                  onValueChange={(v) => updateSetting('dataRetention', v)}
                >
                  <SelectTrigger className="w-32 bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </SettingsRow>
              <SettingsRow label="Refresh Interval" description="How often to update dashboard data">
                <Select
                  value={String(settings.refreshInterval)}
                  onValueChange={(v) => updateSetting('refreshInterval', parseInt(v))}
                >
                  <SelectTrigger className="w-32 bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 seconds</SelectItem>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">1 minute</SelectItem>
                    <SelectItem value="300">5 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </SettingsRow>
            </SettingsSection>

            {/* Regional */}
            <SettingsSection
              icon={Globe}
              title="Regional Settings"
              description="Configure your timezone and locale"
            >
              <SettingsRow label="Timezone" description="Used for displaying timestamps">
                <Select
                  value={settings.timezone}
                  onValueChange={(v) => updateSetting('timezone', v)}
                >
                  <SelectTrigger className="w-40 bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    <SelectItem value="Europe/London">London</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </SettingsRow>
            </SettingsSection>

            {/* API Keys */}
            <SettingsSection
              icon={Key}
              title="API Configuration"
              description="Manage API keys and integrations"
            >
              <SettingsRow label="API Key" description="Your DevPulse API key for CLI access">
                <div className="flex items-center gap-2">
                  <Input
                    type="password"
                    value="dp_live_xxxxxxxxxxxxxxxxx"
                    readOnly
                    className="w-48 bg-secondary border-border font-mono text-xs"
                  />
                  <button className="text-xs text-primary hover:underline">
                    Regenerate
                  </button>
                </div>
              </SettingsRow>
            </SettingsSection>

            {/* Danger Zone */}
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Danger Zone</h3>
              <p className="text-sm text-muted-foreground mb-4">
                These actions are irreversible. Please proceed with caution.
              </p>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={resetOnboarding}
                  className="px-4 py-2 rounded-lg border border-destructive/30 text-destructive text-sm hover:bg-destructive/10 transition-colors"
                >
                  Reset Onboarding
                </button>
                <button className="px-4 py-2 rounded-lg border border-destructive/30 text-destructive text-sm hover:bg-destructive/10 transition-colors">
                  Delete All Data
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

interface SettingsSectionProps {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsSection = ({ icon: Icon, title, description, children }: SettingsSectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-lg border border-border bg-card p-6"
  >
    <div className="flex items-start gap-3 mb-4">
      <div className="p-2 rounded-lg bg-secondary">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    <div className="space-y-4 ml-11">
      {children}
    </div>
  </motion.div>
);

interface SettingsRowProps {
  label: string;
  description: string;
  children: React.ReactNode;
}

const SettingsRow = ({ label, description, children }: SettingsRowProps) => (
  <div className="flex items-center justify-between py-2">
    <div>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    {children}
  </div>
);

export default Settings;
