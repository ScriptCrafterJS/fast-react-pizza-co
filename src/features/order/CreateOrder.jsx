import { Form, redirect, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { useActionData } from 'react-router-dom';
import Button from '../../ui/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, clearCart, getTotalPrice } from '../cart/cartSlice';
import { fetchAddress } from '../user/userSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isPlacingOrder = navigation.state === 'submitting';
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((store) => store.user);

  const isLoadingAddress = addressStatus === 'loading';

  const cart = useSelector(getCart);
  const [withPriority, setWithPriority] = useState(false);
  const totalPriceWithNoPriority = useSelector(getTotalPrice);
  const priorityPrice = 0.5;
  const totalOrderPrice = withPriority
    ? totalPriceWithNoPriority + priorityPrice
    : totalPriceWithNoPriority;

  const formErrors = useActionData();
  const dispatch = useDispatch();

  if (!cart.length) {
    return <EmptyCart />;
  }
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="m-4 items-center lg:flex">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="customer"
              required
              defaultValue={username}
            />
          </div>
        </div>

        <div className="m-4 items-center lg:flex">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 px-2 py-2 text-center text-sm text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="relative m-4 items-center lg:flex">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              defaultValue={address}
            />

            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 px-2 py-2 text-center text-sm text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {address === '' && (
            <span className="absolute right-[3px] top-[1.7rem] z-50 md:top-[1.8rem] lg:top-[5px]">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoadingAddress}
              >
                {isLoadingAddress ? 'Loading...' : 'Get Position'}
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 items-center gap-5 lg:flex">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position?.longitude && position?.latitude
                ? `${position.longitude},${position.latitude}`
                : ''
            }
          />
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <Button disabled={isPlacingOrder || isLoadingAddress} type="primary">
            {isPlacingOrder
              ? 'Placing order...'
              : `Order now ${formatCurrency(totalOrderPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(data.phone)) {
    errors.phone = 'Please give us a valid number to follow up with your order';
    return errors;
  }

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
