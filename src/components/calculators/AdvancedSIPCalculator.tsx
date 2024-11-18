import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { calculateAdvancedSIP } from '@/lib/calculator';
import { InvestmentChart } from '@/components/charts/InvestmentChart';
import { YearlyGrowthChart } from '@/components/charts/YearlyGrowthChart';
import { formatCurrency } from '@/lib/utils';

export function AdvancedSIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [rateOfReturn, setRateOfReturn] = useState(12);
  const [annualIncrement, setAnnualIncrement] = useState(10);
  const [result, setResult] = useState(calculateAdvancedSIP(5000, 10, 12, 10));

  useEffect(() => {
    setResult(calculateAdvancedSIP(monthlyInvestment, years, rateOfReturn, annualIncrement));
  }, [monthlyInvestment, years, rateOfReturn, annualIncrement]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Starting Monthly Investment</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[monthlyInvestment]}
                onValueChange={([value]) => setMonthlyInvestment(value)}
                min={500}
                max={100000}
                step={500}
                className="flex-1"
              />
              <Input
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-24"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Annual Increment (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[annualIncrement]}
                onValueChange={([value]) => setAnnualIncrement(value)}
                min={0}
                max={50}
                step={1}
                className="flex-1"
              />
              <Input
                type="number"
                value={annualIncrement}
                onChange={(e) => setAnnualIncrement(Number(e.target.value))}
                className="w-24"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Investment Period (Years)</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[years]}
                onValueChange={([value]) => setYears(value)}
                min={1}
                max={30}
                step={1}
                className="flex-1"
              />
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-24"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Expected Return Rate (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[rateOfReturn]}
                onValueChange={([value]) => setRateOfReturn(value)}
                min={1}
                max={30}
                step={0.5}
                className="flex-1"
              />
              <Input
                type="number"
                value={rateOfReturn}
                onChange={(e) => setRateOfReturn(Number(e.target.value))}
                className="w-24"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground">Total Investment</Label>
            <p className="text-2xl font-bold">
              {formatCurrency(result.totalInvestment)}
            </p>
          </div>
          <div>
            <Label className="text-muted-foreground">Total Returns</Label>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(result.totalReturns)}
            </p>
          </div>
          <div className="col-span-2">
            <Label className="text-muted-foreground">Maturity Amount</Label>
            <p className="text-3xl font-bold text-primary">
              {formatCurrency(result.maturityAmount)}
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <InvestmentChart
            invested={result.totalInvestment}
            returns={result.totalReturns}
          />
          <YearlyGrowthChart data={result.yearWiseData} />
        </div>
      </Card>
    </div>
  );
}