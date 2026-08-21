import type { Metadata } from 'next';
import GroceriesContent from './GroceriesContent';

export const metadata: Metadata = {
  title: 'Groceries',
  description:
    'Walmart Neighborhood Market, Piggly Wiggly, Food Lion and Costco — the grocery stores nearest Paradise 252, with maps and directions.',
};

export default function GroceriesPage() {
  return <GroceriesContent />;
}
