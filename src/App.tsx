import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SIPCalculator } from '@/components/calculators/SIPCalculator';
import { LumpsumCalculator } from '@/components/calculators/LumpsumCalculator';
import { AdvancedSIPCalculator } from '@/components/calculators/AdvancedSIPCalculator';
import { GoalCalculator } from '@/components/calculators/GoalCalculator';
import { Calculator } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8 lg:p-12">
      <div className="mx-auto">
        
        <header className="mb-8 flex items-center gap-3">
          <Calculator className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Investment Calculator</h1>
        </header>

        <Tabs defaultValue="sip" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="sip">SIP Calculator</TabsTrigger>
            <TabsTrigger value="lumpsum">Lumpsum Calculator</TabsTrigger>
            <TabsTrigger value="advanced">Advanced SIP</TabsTrigger>
            <TabsTrigger value="goal">Goal Calculator</TabsTrigger>
          </TabsList>

          <TabsContent value="sip" className="space-y-4">
            <SIPCalculator />
          </TabsContent>

          <TabsContent value="lumpsum" className="space-y-4">
            <LumpsumCalculator />
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <AdvancedSIPCalculator />
          </TabsContent>

          <TabsContent value="goal" className="space-y-4">
            <GoalCalculator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;