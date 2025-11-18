import { useState } from 'react';
import { Settings, Lightbulb, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { SavingsInfoCards, DebtInfoCards } from '@/components/InfoCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Tools = () => {
  const navigate = useNavigate();
  
  // Compound Interest Calculator
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundResult, setCompoundResult] = useState<number | null>(null);

  // Loan EMI Calculator
  const [loanAmount, setLoanAmount] = useState('');
  const [loanRate, setLoanRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emiResult, setEmiResult] = useState<number | null>(null);

  // Savings Goal Calculator
  const [targetAmount, setTargetAmount] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [savingsResult, setSavingsResult] = useState<number | null>(null);

  const calculateCompoundInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    
    if (p && r && t) {
      const amount = p * Math.pow((1 + r), t);
      setCompoundResult(amount);
    }
  };

  const calculateEMI = () => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(loanRate) / (12 * 100);
    const n = parseFloat(loanTenure) * 12;
    
    if (p && r && n) {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmiResult(emi);
    }
  };

  const calculateSavingsTime = () => {
    const target = parseFloat(targetAmount);
    const current = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    
    if (target && monthly && current >= 0) {
      const remaining = target - current;
      const months = Math.ceil(remaining / monthly);
      setSavingsResult(months);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Financial Calculators</h1>
          <button
            onClick={() => navigate('/settings')}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <Settings size={20} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        
        {/* Compound Interest Calculator */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Compound Interest Calculator</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="principal">Principal Amount ($)</Label>
              <Input
                id="principal"
                type="number"
                placeholder="10000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                placeholder="5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="time">Time Period (Years)</Label>
              <Input
                id="time"
                type="number"
                placeholder="10"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <Button onClick={calculateCompoundInterest} className="w-full">
              Calculate
            </Button>
            {compoundResult !== null && (
              <div className="mt-4 p-4 bg-green-500/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Future Value:</p>
                <p className="text-2xl font-bold text-green-600">
                  ${compoundResult.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Interest Earned: ${(compoundResult - parseFloat(principal)).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Loan EMI Calculator */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Loan EMI Calculator</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="loanAmount">Loan Amount ($)</Label>
              <Input
                id="loanAmount"
                type="number"
                placeholder="50000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="loanRate">Annual Interest Rate (%)</Label>
              <Input
                id="loanRate"
                type="number"
                placeholder="8"
                value={loanRate}
                onChange={(e) => setLoanRate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="loanTenure">Loan Tenure (Years)</Label>
              <Input
                id="loanTenure"
                type="number"
                placeholder="5"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
              />
            </div>
            <Button onClick={calculateEMI} className="w-full">
              Calculate EMI
            </Button>
            {emiResult !== null && (
              <div className="mt-4 p-4 bg-black/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Monthly EMI:</p>
                <p className="text-2xl font-bold text-black dark:text-white">
                  ${emiResult.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Total Payment: ${(emiResult * parseFloat(loanTenure) * 12).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Total Interest: ${(emiResult * parseFloat(loanTenure) * 12 - parseFloat(loanAmount)).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Savings Goal Calculator */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Savings Goal Calculator</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="targetAmount">Target Amount ($)</Label>
              <Input
                id="targetAmount"
                type="number"
                placeholder="20000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="currentSavings">Current Savings ($)</Label>
              <Input
                id="currentSavings"
                type="number"
                placeholder="5000"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
              <Input
                id="monthlyContribution"
                type="number"
                placeholder="500"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
              />
            </div>
            <Button onClick={calculateSavingsTime} className="w-full">
              Calculate Time
            </Button>
            {savingsResult !== null && (
              <div className="mt-4 p-4 bg-purple-500/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Time to Reach Goal:</p>
                <p className="text-2xl font-bold text-purple-600">
                  {savingsResult} months
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  ({(savingsResult / 12).toFixed(1)} years)
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Financial Tips Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="text-yellow-500" />
            Financial Tips & Strategies
          </h2>
          <Tabs defaultValue="savings" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="savings" className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Savings Tips
              </TabsTrigger>
              <TabsTrigger value="debt" className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Debt Payoff
              </TabsTrigger>
            </TabsList>
            <TabsContent value="savings">
              <SavingsInfoCards />
            </TabsContent>
            <TabsContent value="debt">
              <DebtInfoCards />
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </div>
  );
};

export default Tools;
