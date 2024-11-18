export interface InvestmentResult {
  totalInvestment: number;
  totalReturns: number;
  maturityAmount: number;
  yearWiseData: {
    year: number;
    investment: number;
    value: number;
  }[];
}

export function calculateSIP(
  monthlyInvestment: number,
  years: number,
  rateOfReturn: number
): InvestmentResult {
  const monthlyRate = rateOfReturn / 12 / 100;
  const months = years * 12;
  const yearWiseData = [];

  let totalInvestment = monthlyInvestment * months;
  let maturityAmount =
    (monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate));

  // Calculate year-wise data
  for (let year = 1; year <= years; year++) {
    const monthsCompleted = year * 12;
    const investmentTillDate = monthlyInvestment * monthsCompleted;
    const valueTillDate =
      (monthlyInvestment *
        ((Math.pow(1 + monthlyRate, monthsCompleted) - 1) / monthlyRate) *
        (1 + monthlyRate));

    yearWiseData.push({
      year,
      investment: investmentTillDate,
      value: valueTillDate,
    });
  }

  return {
    totalInvestment,
    totalReturns: maturityAmount - totalInvestment,
    maturityAmount,
    yearWiseData,
  };
}

export function calculateLumpsum(
  investment: number,
  years: number,
  rateOfReturn: number
): InvestmentResult {
  const yearWiseData = [];
  const rate = rateOfReturn / 100;
  const maturityAmount = investment * Math.pow(1 + rate, years);

  for (let year = 1; year <= years; year++) {
    yearWiseData.push({
      year,
      investment,
      value: investment * Math.pow(1 + rate, year),
    });
  }

  return {
    totalInvestment: investment,
    totalReturns: maturityAmount - investment,
    maturityAmount,
    yearWiseData,
  };
}

export function calculateAdvancedSIP(
  monthlyInvestment: number,
  years: number,
  rateOfReturn: number,
  annualIncrement: number
): InvestmentResult {
  const monthlyRate = rateOfReturn / 12 / 100;
  const yearWiseData = [];
  let totalInvestment = 0;
  let maturityAmount = 0;

  for (let year = 1; year <= years; year++) {
    const currentMonthlyInvestment =
      monthlyInvestment * Math.pow(1 + annualIncrement / 100, year - 1);
    const monthsInYear = 12;
    
    totalInvestment += currentMonthlyInvestment * monthsInYear;
    let yearValue = 0;

    for (let month = 1; month <= monthsInYear; month++) {
      const monthsRemaining = (years - year) * 12 + (monthsInYear - month + 1);
      yearValue +=
        currentMonthlyInvestment *
        Math.pow(1 + monthlyRate, monthsRemaining);
    }

    maturityAmount = yearValue;
    yearWiseData.push({
      year,
      investment: totalInvestment,
      value: yearValue,
    });
  }

  return {
    totalInvestment,
    totalReturns: maturityAmount - totalInvestment,
    maturityAmount,
    yearWiseData,
  };
}

export function calculateRequiredSIP(
  goalAmount: number,
  years: number,
  rateOfReturn: number
): number {
  const monthlyRate = rateOfReturn / 12 / 100;
  const months = years * 12;

  const monthlyInvestment =
    (goalAmount * monthlyRate) /
    ((Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate));

  return monthlyInvestment;
}

export function calculateRequiredLumpsum(
  goalAmount: number,
  years: number,
  rateOfReturn: number
): number {
  const rate = rateOfReturn / 100;
  return goalAmount / Math.pow(1 + rate, years);
}