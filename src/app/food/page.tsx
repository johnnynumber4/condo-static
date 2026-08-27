import type { Metadata } from 'next';
import FoodContent from './FoodContent';

export const metadata: Metadata = {
  title: 'Eat & Drink',
  description:
    'Breakfast, Calabash seafood buffets, Cafe Old Vienna, the Boardwalk rooftops and the local breweries: where to eat near Paradise 252.',
  alternates: { canonical: '/food' },
};

export default function FoodPage() {
  return <FoodContent />;
}
