export interface Plan {
  name: string;
  description: string;
  monthlyPriceId: string;
  yearlyPriceId: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: string[];
}

const MONTHLY_ID = 'price_1QilL4II4osGGYGe7PhWvcUj';

export const plans: Plan[] = [
  {
    name: 'Pro',
    description: 'Everything you need to get started',
    monthlyPriceId: MONTHLY_ID,
    yearlyPriceId: 'price_YEARLY_ID_HERE',
    monthlyPrice: '$9',
    yearlyPrice: '$90',
    features: ['Feature one', 'Feature two', 'Feature three'],
  },
];
