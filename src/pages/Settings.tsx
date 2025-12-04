import { ArrowLeft, ChevronRight, Settings as SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BackupSync } from '@/components/BackupSync';
import { useToast } from '@/hooks/use-toast';
import { hapticFeedback } from '@/lib/haptics';
import { storage } from '@/lib/storage';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.jarify.app';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClearData = async () => {
    await hapticFeedback.warning();
    storage.clearAll();
    toast({
      title: 'Data Cleared',
      description: 'All your data has been deleted.',
      variant: 'destructive',
    });
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Jarify - Savings App',
          text: 'Check out Jarify, the best savings app!',
          url: PLAY_STORE_LINK,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      window.open(PLAY_STORE_LINK, '_blank');
    }
  };

  const handleRateApp = () => {
    window.open(PLAY_STORE_LINK, '_blank');
  };

  const handleDownloadData = () => {
    const data = {
      jars: localStorage.getItem('jarify_jars'),
      categories: localStorage.getItem('jarify_categories'),
      notes: localStorage.getItem('jarify_notes'),
      darkMode: localStorage.getItem('jarify_darkMode'),
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jarify-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: 'Download Complete',
      description: 'Your data has been downloaded.',
    });
  };

  const SettingsItem = ({ label, onClick }: { label: string; onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-4 px-4 text-foreground hover:bg-accent/50 transition-colors border-b border-border/50"
    >
      <span className="text-base">{label}</span>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );

  const SectionHeader = ({ icon, label }: { icon?: React.ReactNode; label: string }) => (
    <div className="flex items-center gap-2 px-4 py-3 text-muted-foreground">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 mb-2 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-full hover:bg-accent transition-colors"
            >
              <ArrowLeft className="text-foreground" size={24} />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
          </div>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto">
        {/* Data Management Section */}
        <div className="bg-card rounded-lg mb-4 mx-4 overflow-hidden shadow-sm">
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
            renderAsListItems={true}
          />
          <SettingsItem label="Download my data" onClick={handleDownloadData} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="w-full flex items-center justify-between py-4 px-4 text-destructive hover:bg-destructive/10 transition-colors">
                <span className="text-base">Delete app data</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete all data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all your data including goals, categories, and notes. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearData} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Other Section */}
        <SectionHeader icon={<SettingsIcon className="w-4 h-4" />} label="Other" />
        <div className="bg-card rounded-lg mx-4 overflow-hidden shadow-sm">
          <SettingsItem label="Share with friends" onClick={handleShare} />
          <SettingsItem label="Terms of Service" onClick={() => window.open('https://jarify.app/terms', '_blank')} />
          <SettingsItem label="Help and feedback" onClick={() => window.open('mailto:support@jarify.app', '_blank')} />
          <SettingsItem label="Privacy" onClick={() => window.open('https://jarify.app/privacy', '_blank')} />
          <button
            onClick={handleRateApp}
            className="w-full flex items-center justify-between py-4 px-4 text-foreground hover:bg-accent/50 transition-colors"
          >
            <span className="text-base">Rate app</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* App Info */}
        <div className="text-center mt-8 px-4">
          <p className="text-sm text-muted-foreground">Jarify Version 1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">© 2025 Jarify. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;

