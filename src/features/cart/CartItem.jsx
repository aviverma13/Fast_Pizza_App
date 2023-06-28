import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import DeleteButton from './DeleteButton';
import UpdateItemQuentity from './UpdateItemQuentity';
import { getCurrentQuentityById } from '../cart/cartSlice';

function CartItem({ item, ingredients, isFetcherLoading }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentQuentityById(pizzaId));
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name} <br />
        {isFetcherLoading ? (
          'Loading...'
        ) : (
          <span className="mt-2">{ingredients.join(', ')}</span>
        )}
      </p>

      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuentity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteButton pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
