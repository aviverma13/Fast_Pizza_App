// import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import EmptyCart from '../cart/EmptyCart';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import { useFetcher } from 'react-router-dom';
import { useEffect } from 'react';

function Cart() {
  const username = useSelector((store) => store.user.username);
  const fetcher = useFetcher();
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher]);
  const isFetcherLoading = fetcher.state === 'loading';

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold ">
        Your cart, <span className="uppercase">{username}</span>
      </h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem
            item={item}
            key={item.pizzaId}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId).ingredients ??
              []
            }
            isFetcherLoading={isFetcherLoading}
          />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
