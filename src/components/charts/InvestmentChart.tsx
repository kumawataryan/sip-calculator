import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { formatCurrency } from '@/lib/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

interface InvestmentChartProps {
  invested: number;
  returns: number;
}

export function InvestmentChart({ invested, returns }: InvestmentChartProps) {
  const data = {
    labels: ['Total Investment', 'Total Returns'],
    datasets: [
      {
        data: [invested, returns],
        backgroundColor: ['#0ea5e9', '#22c55e'],
        borderColor: ['#0284c7', '#16a34a'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${formatCurrency(context.raw)}`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}