import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateRequiredSIP, calculateRequiredLumpsum } from '@/lib/calculator';
import { formatCurrency } from '@/lib/utils';

export function GoalCalculator() {
  const [goalAmount, setGoalAmount] = useState(1000000);
  const [years, setYears] = useState(10);
  const [rateOfReturn, setRateOfReturn] = useState(12);
  const [requiredSIP, setRequiredSIP] = useState(calculateRequiredSIP(1000000, 10, 12));
  const [requiredLumpsum, setRequiredLumpsum] = useState(
    calculateRequiredLumpsum(1000000, 10, 12)
  );

  useEffect(() => {
    setRequiredSIP(calculateRequiredSIP(goalAmount, years, rateOfReturn));
    setRequiredLumpsum(calculateRequiredLumpsum(goalAmount, years, rateOfReturn));
  }, [goalAmount, years, rateOfReturn]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Target Amount</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[goalAmount]}
                onValueChange={([value]) => setGoalAmount(value)}
                min={100000}
                max={10000000}
                step={100000}
                className="flex-1"
              />
              <Input
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(Number(e.target.value))}
                className="w-24"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Time to Goal (Years)</Label>
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
        <Tabs defaultValue="sip" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sip">Monthly SIP</TabsTrigger>
            <TabsTrigger value="lumpsum">Lumpsum</TabsTrigger>
          </TabsList>

          <TabsContent value="sip" className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Required Monthly SIP</Label>
              <p className="text-3xl font-bold text-primary">
                {formatCurrency(requiredSIP)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                To reach your goal of {formatCurrency(goalAmount)} in {years} years
              </p>
            </div>
          </TabsContent>

          <TabsContent value="lumpsum" className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Required One-time Investment</Label>
              <p className="text-3xl font-bold text-primary">
                {formatCurrency(requiredLumpsum)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                To reach your goal of {formatCurrency(goalAmount)} in {years} years
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}