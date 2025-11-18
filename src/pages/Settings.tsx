import { useState, useEffect } from 'react';
import { ArrowLeft, Moon, Sun, Bell, Download, Upload, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { NotificationSettings } from '@/components/NotificationSettings';
import { BackupSync } from '@/components/BackupSync';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { hapticFeedback } from '@/lib/haptics';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app_theme') || 'light';
    setCurrentTheme(savedTheme);
    setDarkMode(savedTheme !== 'light');
  }, []);

  const themes = ['light', 'ocean', 'forest', 'sunset', 'midnight'];
  
  const cycleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    setCurrentTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem('app_theme', nextTheme);
    setDarkMode(nextTheme !== 'light');
  };

  const applyTheme = (themeId: string) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'ocean', 'forest', 'sunset', 'rose', 'midnight', 'minimal', 'nebula', 'obsidian', 'graphite', 'onyx', 'charcoal');
    root.classList.add(themeId);
  };

  const handleClearData = async () => {
    if (window.confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      await hapticFeedback.warning();
      storage.clearAll();
      toast({
        title: 'Data Cleared',
        description: 'All your data has been deleted.',
        variant: 'destructive',
      });
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  // Use semantic tokens from design system
  const bgColor = 'bg-background';
  const cardBg = 'bg-card';
  const textColor = 'text-foreground';
  const textSecondary = 'text-muted-foreground';

  return (
    <div className={`min-h-screen ${bgColor} pb-24`}>
      {/* Header */}
      <div className="sticky top-0 z-30 mb-6 bg-background/90 backdrop-blur-md border-b border-border shadow-lg">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-full hover:bg-accent transition-colors"
            >
              <ArrowLeft className={textColor} size={24} />
            </button>
            <h1 className={`text-2xl sm:text-3xl font-bold ${textColor}`}>Settings</h1>
          </div>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 space-y-4">
        {/* Appearance */}
        <Card className={`${cardBg} p-6 rounded-2xl shadow-lg`}>
          <h2 className={`text-xl font-bold ${textColor} mb-4 flex items-center gap-2`}>
            {darkMode ? <Moon size={24} /> : <Sun size={24} />}
            Appearance
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-semibold ${textColor}`}>Theme</p>
                <p className={`text-sm ${textSecondary}`}>Current: {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}</p>
              </div>
              <Button onClick={cycleTheme} variant="outline">
                Change Theme
              </Button>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className={`${cardBg} p-6 rounded-2xl shadow-lg`}>
          <h2 className={`text-xl font-bold ${textColor} mb-4 flex items-center gap-2`}>
            <Bell size={24} />
            Notifications
          </h2>
          <NotificationSettings />
        </Card>

        {/* Data Management */}
        <Card className={`${cardBg} p-6 rounded-2xl shadow-lg`}>
          <h2 className={`text-xl font-bold ${textColor} mb-4 flex items-center gap-2`}>
            <Download size={24} />
            Data Management
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <BackupSync 
                onExport={() => {
                  toast({
                    title: 'Backup Complete',
                    description: 'Your data has been backed up successfully.',
                  });
                }} 
                onImport={() => {
                  toast({
                    title: 'Data Restored',
                    description: 'Your backup has been restored.',
                  });
                  setTimeout(() => window.location.reload(), 1000);
                }} 
              />
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className={`${cardBg} p-6 rounded-2xl shadow-lg border-2 border-red-500/20`}>
          <h2 className={`text-xl font-bold text-red-600 mb-4 flex items-center gap-2`}>
            <Trash2 size={24} />
            Danger Zone
          </h2>
          <div className="space-y-3">
            <p className={textSecondary}>
              Permanently delete all your data including goals, categories, and notes.
            </p>
            <Button 
              onClick={handleClearData}
              variant="destructive"
              className="w-full"
            >
              Clear All Data
            </Button>
          </div>
        </Card>

        {/* App Info */}
        <Card className={`${cardBg} p-6 rounded-2xl shadow-lg`}>
          <div className="text-center">
            <p className={`text-sm ${textSecondary}`}>Jarify Version 1.0.0</p>
            <p className={`text-xs ${textSecondary} mt-1`}>© 2025 Jarify. All rights reserved.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
