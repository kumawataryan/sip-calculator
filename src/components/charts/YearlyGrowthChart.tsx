import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { formatCurrency } from '@/lib/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface YearlyGrowthChartProps {
  data: {
    year: number;
    investment: number;
    value: number;
  }[];
}

export function YearlyGrowthChart({ data }: YearlyGrowthChartProps) {
  const chartData = {
    labels: data.map((item) => `Year ${item.year}`),
    datasets: [
      {
        label: 'Investment',
        data: data.map((item) => item.investment),
        backgroundColor: '#0ea5e9',
        borderRadius: 4,
      },
      {
        label: 'Value',
        data: data.map((item) => item.value),
        backgroundColor: '#22c55e',
        borderRadius: 4,
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
            return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value: any) {
            return formatCurrency(value);
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}