import { useState, useEffect } from 'react';
import { ArrowLeft, Crown, Check, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSubscription } from '@/contexts/SubscriptionContext';

const Pro = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const { tier } = useSubscription();
  const isPremium = tier === 'premium';

  useEffect(() => {
    const savedTheme = localStorage.getItem('app_theme') || 'light';
    setDarkMode(savedTheme !== 'light');
  }, []);

  // Use semantic tokens from design system
  const bgColor = 'bg-background';
  const cardBg = 'bg-card';
  const textColor = 'text-foreground';
  const textSecondary = 'text-muted-foreground';

  const features = [
    { icon: <Sparkles size={20} />, title: 'Unlimited Goals', description: 'Create as many savings goals as you need' },
    { icon: <TrendingUp size={20} />, title: 'Advanced Analytics', description: 'Deep insights into your saving habits' },
    { icon: <Shield size={20} />, title: 'Cloud Backup', description: 'Never lose your data with automatic backups' },
    { icon: <Zap size={20} />, title: 'Priority Support', description: 'Get help faster with premium support' },
  ];

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
            <div className="flex items-center gap-2">
              <Crown className="text-primary" size={28} />
              <h1 className={`text-2xl sm:text-3xl font-bold ${textColor}`}>Jarify Pro</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
        {isPremium ? (
          <Card className={`${cardBg} p-8 rounded-2xl shadow-lg text-center mb-6`}>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Crown className="text-primary" size={40} />
              </div>
            </div>
            <h2 className={`text-2xl font-bold ${textColor} mb-2`}>You're a Pro Member!</h2>
            <p className={textSecondary}>Thank you for supporting Jarify</p>
          </Card>
        ) : (
          <>
            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                  <Crown className="text-white" size={48} />
                </div>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-bold ${textColor} mb-3`}>
                Unlock Premium Features
              </h2>
              <p className={`text-lg ${textSecondary} max-w-2xl mx-auto`}>
                Take your savings journey to the next level with Jarify Pro
              </p>
            </div>

            {/* Pricing Card */}
            <Card className={`${cardBg} p-8 rounded-2xl shadow-2xl mb-8 border-4 border-primary`}>
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className={`text-5xl font-bold ${textColor}`}>$4.99</span>
                  <span className={textSecondary}>/month</span>
                </div>
                <p className={`text-sm ${textSecondary}`}>Cancel anytime</p>
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary-dark hover:to-purple-700 text-white text-lg py-6 rounded-xl shadow-lg">
                Upgrade to Pro
              </Button>
            </Card>
          </>
        )}

        {/* Features Grid */}
        <div className="mb-8">
          <h3 className={`text-2xl font-bold ${textColor} mb-6 text-center`}>Premium Features</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className={`${cardBg} p-6 rounded-xl shadow-lg`}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className={`font-bold ${textColor} mb-1`}>{feature.title}</h4>
                    <p className={`text-sm ${textSecondary}`}>{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits List */}
        <Card className={`${cardBg} p-6 rounded-2xl shadow-lg`}>
          <h3 className={`text-xl font-bold ${textColor} mb-4`}>What's Included</h3>
          <div className="space-y-3">
            {[
              'Unlimited savings goals',
              'Advanced charts and analytics',
              'Cloud sync across devices',
              'Custom categories and themes',
              'Priority customer support',
              'Export data to CSV',
              'Ad-free experience',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="text-white" size={16} />
                </div>
                <span className={textColor}>{benefit}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Pro;
