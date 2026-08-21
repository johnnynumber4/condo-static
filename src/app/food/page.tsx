import type { Metadata } from 'next';
import FoodContent from './FoodContent';

export const metadata: Metadata = {
  title: 'Eat & Drink',
  description:
    'Calabash seafood buffets, Cafe Old Vienna, the Murrells Inlet MarshWalk and the local breweries — where to eat near Paradise 252.',
};

export default function FoodPage() {
  return <FoodContent />;
}
