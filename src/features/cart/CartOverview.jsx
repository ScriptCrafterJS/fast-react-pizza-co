import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getNumOfItems, getTotalPrice } from './cartSlice';
function CartOverview() {
  const numOfPizzas = useSelector(getNumOfItems);
  const totalPrice = useSelector(getTotalPrice);
  if (numOfPizzas === 0) return null;
  return (
    <div className="flex items-center justify-around bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold sm:space-x-6">
        <span>{numOfPizzas} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart" className="text-stone-400">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
