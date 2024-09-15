import { formatCurrency } from '../../utils/helpers';
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="px-6 py-4">
      <div className="flex items-center justify-between">
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients ? 'loading...' : ingredients.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
