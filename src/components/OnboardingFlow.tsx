import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { PiggyBank, CreditCard, ShieldAlert, DollarSign, Calendar, TrendingUp, Unlock, Bell, Crown } from 'lucide-react';
import Welcome from '@/components/Welcome';
import infoHome from '@/assets/info-home.png';
import infoNotes from '@/assets/info-notes.png';
import infoFolders from '@/assets/info-folders.png';
import infoJar from '@/assets/info-jar.png';
import infoTransactions from '@/assets/info-transactions.png';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [income, setIncome] = useState('');
  const [saveAmount, setSaveAmount] = useState('');
  const [timeline, setTimeline] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [priority, setPriority] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [employment, setEmployment] = useState('');
  const [dependents, setDependents] = useState('');
  const [source, setSource] = useState('');
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [plan, setPlan] = useState('yearly');
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images for fast rendering
  useEffect(() => {
    const imagesToPreload = [
      infoHome,
      infoNotes,
      infoFolders,
      infoJar,
      infoTransactions,
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Tiktok_icon.svg/2048px-Tiktok_icon.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2880px-Google_2015_logo.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/YouTube_social_white_squircle_%282017%29.svg/2048px-YouTube_social_white_squircle_%282017%29.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/1745px-Android_robot.svg.png',
    ];

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });

    // Fallback timeout
    const timeout = setTimeout(() => {
      setImagesLoaded(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const goals = [
    { id: 'lose', label: 'Saving Money', icon: PiggyBank },
    { id: 'maintain', label: 'Debt Pay off', icon: CreditCard },
    { id: 'gain', label: 'Emergency', icon: ShieldAlert },
  ];

  const incomeRanges = [
    { id: '1', label: 'Under $1,000', icon: DollarSign },
    { id: '2', label: '$1,000 - $3,000', icon: DollarSign },
    { id: '3', label: '$3,000 - $5,000', icon: DollarSign },
  ];

  const saveAmounts = [
    { id: '1', label: '$50 - $100', icon: PiggyBank },
    { id: '2', label: '$100 - $300', icon: PiggyBank },
    { id: '3', label: '$300 - $500', icon: PiggyBank },
  ];

  const timelines = [
    { id: '1', label: '3 months', icon: Calendar },
    { id: '2', label: '6 months', icon: Calendar },
    { id: '3', label: '1 year or more', icon: Calendar },
  ];

  const debtAmounts = [
    { id: '1', label: 'No debt', icon: ShieldAlert },
    { id: '2', label: 'Under $5,000', icon: CreditCard },
    { id: '3', label: '$5,000 - $20,000', icon: CreditCard },
  ];

  const expenseTypes = [
    { id: '1', label: 'Housing', icon: TrendingUp },
    { id: '2', label: 'Transportation', icon: TrendingUp },
    { id: '3', label: 'Food & Groceries', icon: TrendingUp },
  ];

  const priorities = [
    { id: '1', label: 'Building Emergency Fund', icon: ShieldAlert },
    { id: '2', label: 'Paying Off Debt', icon: CreditCard },
    { id: '3', label: 'Saving for Big Purchase', icon: PiggyBank },
  ];

  const currentSavingsOptions = [
    { id: '1', label: 'Under $500', icon: DollarSign },
    { id: '2', label: '$500 - $2,000', icon: DollarSign },
    { id: '3', label: 'Over $2,000', icon: DollarSign },
  ];

  const employmentOptions = [
    { id: '1', label: 'Full-time', icon: TrendingUp },
    { id: '2', label: 'Part-time', icon: TrendingUp },
    { id: '3', label: 'Self-employed', icon: TrendingUp },
  ];

  const dependentsOptions = [
    { id: '1', label: 'None', icon: Calendar },
    { id: '2', label: '1-2 people', icon: Calendar },
    { id: '3', label: '3+ people', icon: Calendar },
  ];

  const sources = [
    { name: 'TikTok', color: '#000000', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Tiktok_icon.svg/2048px-Tiktok_icon.svg.png' },
    { name: 'YouTube', color: '#000000', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/YouTube_social_white_square_%282017%29.svg/1024px-YouTube_social_white_square_%282017%29.svg.png' },
    { name: 'Google', color: '#000000', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png' },
    { name: 'Play Store', color: '#000000', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_Play_2022_icon.svg/1856px-Google_Play_2022_icon.svg.png' },
    { name: 'Facebook', color: '#000000', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png'},
    { name: 'LinkedIn', color: '#000000', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png' },
  ];

  useEffect(() => {
    if (step === 17) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              setComplete(true);
              setTimeout(() => setShowPaywall(true), 2000);
            }, 500);
            return 100;
          }
          return prev + 1;
        });
      }, 80);
      return () => clearInterval(timer);
    }
  }, [step]);

  const handleContinue = () => {
    if (step < 17) setStep(step + 1);
  };

  // Show welcome screen first
  if (showWelcome) {
    return <Welcome onGetStarted={() => setShowWelcome(false)} />;
  }

  if (showPaywall) {
    return (
      <div className="min-h-screen bg-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-center mb-6">Start your 3-day FREE trial to continue.</h1>
          <div className="flex flex-col items-start mx-auto w-80 relative pb-4">
            {/* Vertical connecting line */}
            <div className="absolute left-[15px] top-[20px] bottom-[28px] w-[14px] bg-black/20"></div>
            
            {/* Circle at the end of the line */}
            <div className="absolute left-[7px] bottom-[12px] w-[30px] h-[30px] rounded-full bg-black/20 z-0"></div>
            
            <div className="flex items-start gap-3 mb-6 relative">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white z-10 flex-shrink-0">
                <Unlock size={16} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="font-semibold">Today</p>
                <p className="text-gray-500 text-sm">Unlock all app features like Calculating, Adding Notes, Unlimited Goals and more.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 mb-6 relative">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white z-10 flex-shrink-0">
                <Bell size={16} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="font-semibold">In 2 Days - Reminder</p>
                <p className="text-gray-500 text-sm">We'll send you a reminder before your trial ends.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 relative">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white z-10 flex-shrink-0">
                <Crown size={16} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="font-semibold">In 3 Days - Billing Starts</p>
                <p className="text-gray-500 text-sm">You'll be charged after 3 days unless you cancel anytime before.</p>
              </div>
            </div>
          </div>

      <div className="mt-10 flex flex-col items-center gap-4">
  <div className="flex gap-3">
    <button
      onClick={() => setPlan('monthly')}
      className={`border rounded-xl p-4 w-36 text-center ${plan === 'monthly' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
    >
      <p className="font-semibold">Monthly</p>
      <p className="text-gray-600 text-sm">$3.99/mo</p>
    </button>

    <button
      onClick={() => setPlan('yearly')}
      className={`border-2 rounded-xl p-4 w-36 text-center relative flex flex-col items-center justify-center ${plan === 'yearly' ? 'border-black' : 'border-gray-200'}`}
    >
      <span className="bg-black text-white text-xs px-2 py-1 rounded-full absolute left-1/2 -translate-x-1/2 -top-2 whitespace-nowrap">
        3 DAYS FREE
      </span>
      <p className="font-semibold text-center">Yearly</p>
      <p className="text-gray-600 text-sm mt-1">$2.35/mo</p>
    </button>
  </div>

  {/* Wrap the conditional text and trial button in a single div */}
  <div className="flex flex-col items-center gap-2">
    {plan === 'yearly' && (
      <p className="text-gray-500 text-sm mt-2">
        3 days free, then $28.20 per year ($2.35/mo)
      </p>
    )}

    <button 
      onClick={onComplete}
      className="bg-black text-white rounded-full w-80 py-4 mt-4 font-semibold text-lg shadow-md"
    >
      Start My 3-Day Free Trial
    </button>
  </div>
</div>
 

</div>

          
            
          </div>
        
     
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-6 relative overflow-y-auto">
      {complete && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />}

      <div>
        <div className="flex items-center gap-4">
          {step >= 1 && (
            <button onClick={() => step === 1 ? setShowWelcome(true) : setStep(step - 1)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <div className="flex-1">
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-black"
                style={{ width: `${(step / 17) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {step === 1 && (
          <section className="mt-8">
  <h1 className="text-2xl font-semibold text-gray-900">What's your main goal?</h1>
  <p className="text-gray-400 mt-2">
    Choose what you want to focus on.
  </p>
  <div className="mt-8 space-y-4">
    {goals.map(g => {
      const IconComponent = g.icon;
      return (
          <button
            key={g.id}
            onClick={() => setGoal(g.label)}
            className={`w-full text-left rounded-2xl py-4 px-4 shadow-sm transition flex items-center gap-3 ${goal === g.label ? 'bg-black text-white' : 'text-gray-800'}`}
            style={goal !== g.label ? { backgroundColor: '#f9f8fd' } : {}}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${goal === g.label ? 'bg-white' : 'bg-gray-200'}`}>
              <IconComponent className={`w-4 h-4 ${goal === g.label ? 'text-black' : 'text-gray-600'}`} />
            </div>
          <span className="text-base font-medium">{g.label}</span>
        </button>
      );
    })}
  </div>
</section>

        )}

        {step === 2 && (
          <section className="mt-8">
            <h1 className="text-2xl font-semibold text-gray-900">How much do you earn monthly?</h1>
            <p className="text-gray-400 mt-2">
              Select your income range.
            </p>
            <div className="mt-8 space-y-4">
              {incomeRanges.map(r => {
                const IconComponent = r.icon;
                return (
                  <button
                    key={r.id}
                    onClick={() => setIncome(r.label)}
                    className={`w-full text-left rounded-2xl py-4 px-4 shadow-sm transition flex items-center gap-3 ${income === r.label ? 'bg-black text-white' : 'text-gray-800'}`}
                    style={income !== r.label ? { backgroundColor: '#f9f8fd' } : {}}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${income === r.label ? 'bg-white' : 'bg-gray-200'}`}>
                      <IconComponent className={`w-4 h-4 ${income === r.label ? 'text-black' : 'text-gray-600'}`} />
                    </div>
                    <span className="text-base font-medium">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="mt-8">
            <h1 className="text-2xl font-semibold text-gray-900">How much can you save each month?</h1>
            <p className="text-gray-400 mt-2">
              Pick an amount you can set aside.
            </p>
            <div className="mt-8 space-y-4">
              {saveAmounts.map(a => {
                const IconComponent = a.icon;
                return (
                  <button
                    key={a.id}
                    onClick={() => setSaveAmount(a.label)}
                    className={`w-full text-left rounded-2xl py-4 px-4 shadow-sm transition flex items-center gap-3 ${saveAmount === a.label ? 'bg-black text-white' : 'text-gray-800'}`}
                    style={saveAmount !== a.label ? { backgroundColor: '#f9f8fd' } : {}}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${saveAmount === a.label ? 'bg-white' : 'bg-gray-200'}`}>
                      <IconComponent className={`w-4 h-4 ${saveAmount === a.label ? 'text-black' : 'text-gray-600'}`} />
                    </div>
                    <span className="text-base font-medium">{a.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="mt-8">
            <h1 className="text-2xl font-semibold text-gray-900">When do you want to reach your goal?</h1>
            <p className="text-gray-400 mt-2">
              Choose your timeline.
            </p>
            <div className="mt-8 space-y-4">
              {timelines.map(t => {
                const IconComponent = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTimeline(t.label)}
                    className={`w-full text-left rounded-2xl py-4 px-4 shadow-sm transition flex items-center gap-3 ${timeline === t.label ? 'bg-black text-white' : 'text-gray-800'}`}
                    style={timeline !== t.label ? { backgroundColor: '#f9f8fd' } : {}}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${timeline === t.label ? 'bg-white' : 'bg-gray-200'}`}>
                      <IconComponent className={`w-4 h-4 ${timeline === t.label ? 'text-black' : 'text-gray-600'}`} />
                    </div>
                    <span className="text-base font-medium">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 5 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8 text-center flex flex-col items-center relative"
          >
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Track Your Progress</h1>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent rounded-3xl blur-2xl opacity-50"></div>
              <img src={infoHome} alt="Progress tracking" loading="eager" decoding="async" fetchPriority="high" className="w-[430px] h-[430px] object-contain mb-6 relative z-10" />
            </motion.div>
          </motion.section>
        )}

        {step === 6 && (
          <section className="mt-8">
            <h1 className="text-2xl font-semibold text-gray-900">Do you have any debt?</h1>
            <p className="text-gray-400 mt-2">
              Let us know your debt amount.
            </p>
            <div className="mt-8 space-y-4">
              {debtAmounts.map(d => {
                const IconComponent = d.icon;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDebtAmount(d.label)}
                    className={`w-full text-left rounded-2xl py-4 px-4 shadow-sm transition flex items-center gap-3 ${debtAmount === d.label ? 'bg-black text-white' : 'text-gray-800'}`}
                    style={debtAmount !== d.label ? { backgroundColor: '#f9f8fd' } : {}}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${debtAmount === d.label ? 'bg-white' : 'bg-gray-200'}`}>
                      <IconComponent className={`w-4 h-4 ${debtAmount === d.label ? 'text-black' : 'text-gray-600'}`} />
                    </div>
                    <span className="text-base font-medium">{d.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 7 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8 text-center flex flex-col items-center relative"
          >
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Save Smart with Jar Goals</h1>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent rounded-3xl blur-2xl opacity-50"></div>
              <img src={infoJar} alt="Jar savings" loading="eager" decoding="async" fetchPriority="high" className="w-[430px] h-[430px] object-contain mb-6 relative z-10" />
            </motion.div>
          </motion.section>
        )}

        {step === 8 && (
          <section className="mt-8">
            <h1 className="text-2xl font-semibold text-gray-900">What's your main expense?</h1>
            <p className="text-gray-400 mt-2">
              Select your largest spending category.
            </p>
            <div className="mt-8 space-y-4">
              {expenseTypes.map(e => {
                const IconComponent = e.icon;
                return (
                  <button
                    key={e.id}
                    onClick={() => setExpenseType(e.label)}
                    className={`w-full text-left rounded-2xl py-4 px-4 shadow-sm transition flex items-center gap-3 ${expenseType === e.label ? 'bg-black text-white' : 'text-gray-800'}`}
                    style={expenseType !== e.label ? { backgroundColor: '#f9f8fd' } : {}}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${expenseType === e.label ? 'bg-white' : 'bg-gray-200'}`}>
                      <IconComponent className={`w-4 h-4 ${expenseType === e.label ? 'text-black' : 'text-gray-600'}`} />
                    </div>
                    <span className="text-base font-medium">{e.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 9 && (
          <section className="mt-8">
            <h1 className="text-2xl font-semibold text-gray-900">What's most important to you?</h1>
            <p className="text-gray-400 mt-2">
              Choose your top financial priority.
            </p>
            <div className="mt-8 space-y-4">
              {priorities.map(p => {
                const IconComponent = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPriority(p.label)}
                    className={`w-full text-left rounded-2xl py-4 px-4 shadow-sm transition flex items-center gap-3 ${priority === p.label ? 'bg-black text-white' : 'text-gray-800'}`}
                    style={priority !== p.label ? { backgroundColor: '#f9f8fd' } : {}}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${priority === p.label ? 'bg-white' : 'bg-gray-200'}`}>
                      <IconComponent className={`w-4 h-4 ${priority === p.label ? 'text-black' : 'text-gray-600'}`} />
                    </div>
                    <span className="text-base font-medium">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 10 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8 text-center flex flex-col items-center relative"
          >
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Organize with Smart Folders</h1>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent rounded-3xl blur-2xl opacity-50"></div>
              <img src={infoFolders} alt="Smart folders" loading="eager" decoding="async" fetchPriority="high" className="w-[430px] h-[430px] object-contain mb-6 relative z-10" />
            </motion.div>
          </motion.section>
        )}

        {step === 11 && (
          <section className="mt-8">
            <h1 className="text-2xl font-semibold text-gray-900">How much have you saved?</h1>
            <p className="text-gray-400 mt-2">
              Select your current savings amount.
            </p>
            <div className="mt-8 space-y-4">
              {currentSavingsOptions.map(s => {
                const IconComponent = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSavings(s.label)}
                    className={`w-full text-left rounded-2xl py-4 px-4 shadow-sm transition flex items-center gap-3 ${currentSavings === s.label ? 'bg-black text-white' : 'text-gray-800'}`}
                    style={currentSavings !== s.label ? { backgroundColor: '#f9f8fd' } : {}}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentSavings === s.label ? 'bg-white' : 'bg-gray-200'}`}>
                      <IconComponent className={`w-4 h-4 ${currentSavings === s.label ? 'text-black' : 'text-gray-600'}`} />
                    </div>
                    <span className="text-base font-medium">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 12 && (
          <section className="mt-8">
            <h1 className="text-2xl font-semibold text-gray-900">What's your work situation?</h1>
            <p className="text-gray-400 mt-2">
              Choose your employment type.
            </p>
            <div className="mt-8 space-y-4">
              {employmentOptions.map(e => {
                const IconComponent = e.icon;
                return (
                  <button
                    key={e.id}
                    onClick={() => setEmployment(e.label)}
                    className={`w-full text-left rounded-2xl py-4 px-4 shadow-sm transition flex items-center gap-3 ${employment === e.label ? 'bg-black text-white' : 'text-gray-800'}`}
                    style={employment !== e.label ? { backgroundColor: '#f9f8fd' } : {}}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${employment === e.label ? 'bg-white' : 'bg-gray-200'}`}>
                      <IconComponent className={`w-4 h-4 ${employment === e.label ? 'text-black' : 'text-gray-600'}`} />
                    </div>
                    <span className="text-base font-medium">{e.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 13 && (
          <section className="mt-8">
            <h1 className="text-2xl font-semibold text-gray-900">How many people depend on you?</h1>
            <p className="text-gray-400 mt-2">
              Select your household size.
            </p>
            <div className="mt-8 space-y-4">
              {dependentsOptions.map(d => {
                const IconComponent = d.icon;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDependents(d.label)}
                    className={`w-full text-left rounded-2xl py-4 px-4 shadow-sm transition flex items-center gap-3 ${dependents === d.label ? 'bg-black text-white' : 'text-gray-800'}`}
                    style={dependents !== d.label ? { backgroundColor: '#f9f8fd' } : {}}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${dependents === d.label ? 'bg-white' : 'bg-gray-200'}`}>
                      <IconComponent className={`w-4 h-4 ${dependents === d.label ? 'text-black' : 'text-gray-600'}`} />
                    </div>
                    <span className="text-base font-medium">{d.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 14 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8 text-center flex flex-col items-center relative"
          >
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Stay on Track with Notes</h1>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent rounded-3xl blur-2xl opacity-50"></div>
              <img src={infoNotes} alt="Notes feature" loading="eager" decoding="async" fetchPriority="high" className="w-[430px] h-[430px] object-contain mb-6 relative z-10" />
            </motion.div>
          </motion.section>
        )}

        {step === 15 && (
          <section className="mt-8">
            <h1 className="text-2xl font-semibold text-gray-900">How did you find us?</h1>
            <p className="text-gray-400 mt-2">Select a platform.</p>

            <div className="mt-6 space-y-4 pb-24">
              {sources.map(s => (
                <button
                  key={s.name}
                  onClick={() => setSource(s.name)}
                  className={`flex items-center gap-3 rounded-2xl py-4 px-4 w-full transition border text-left ${
                    source === s.name ? 'bg-black text-white border-black' : 'text-gray-800 border-gray-100'
                  }`}
                  style={source !== s.name ? { backgroundColor: '#f9f8fd' } : {}}
                >
                  <img src={s.logo} alt={s.name} loading="eager" decoding="async" className="w-6 h-6" style={{ filter: 'none' }} />
                  <span className="text-base font-medium" style={{ color: source === s.name ? '#fff' : s.color }}>{s.name}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 16 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8 text-center flex flex-col items-center relative"
          >
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Complete Transaction History</h1>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent rounded-3xl blur-2xl opacity-50"></div>
              <img src={infoTransactions} alt="Transaction records" loading="eager" decoding="async" fetchPriority="high" className="w-[430px] h-[430px] object-contain mb-6 relative z-10" />
            </motion.div>
          </motion.section>
        )}

        {step === 17 && (
          <section className="mt-20 text-center">
            <h1 className="text-5xl font-bold mb-4">{progress}%</h1>
            <p className="text-lg font-semibold mb-4">We're setting Jars Goals for you</p>

            <div className="w-72 h-2 mx-auto rounded-full bg-gray-200 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 to-blue-500"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="mt-8 rounded-2xl p-5 shadow-lg w-80 mx-auto" style={{ backgroundColor: '#f9f8fd' }}>
              <h2 className="font-semibold text-lg mb-2">Daily recommendation progress</h2>
              {["Goals", "Sticky Notes", "Folders", "Transaction Records", "Calculators"].map((item, i) => (
                <div key={i} className="py-2 text-left">
                  <div className="flex justify-between mb-1">
                    <span>{item}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                    <motion.div
                      className="h-full bg-black"
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {!complete && step < 17 && (
        <div className="fixed bottom-6 left-6 right-6">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={handleContinue}
              className="w-full rounded-full py-5 text-lg font-medium shadow-lg bg-black text-white"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
