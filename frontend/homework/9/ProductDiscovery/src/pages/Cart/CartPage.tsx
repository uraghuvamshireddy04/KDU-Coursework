import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import type { RootState } from '../../store/reducers';
import * as cartActions from '../../store/actions/cartActions'; 
import styles from "./Cart.module.scss"

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  if (items.length === 0) {
    return (
      <div className={styles.cartEmpty}>
        <p>Cart is empty.</p>
        <button onClick={() => navigate('/')} aria-label="Go to home page">Shop Now</button>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.items}>
        {items.map(item => (
        <div key={item.id} className={styles.cartitem}>
          <img src={item.thumbnail} alt={item.title} />
          <div className={styles.details}>
            <h3>{item.title}</h3>
            <p>${item.price}</p>
          </div>
          <p>${(item.price * item.quantity).toFixed(2)}</p>
          <button onClick={() => dispatch(cartActions.updateQuantity(item.id, -1))} aria-label='Decrease item quantity by 1'>-</button>
          <p>{item.quantity}</p>
          <button onClick={() => dispatch(cartActions.updateQuantity(item.id, 1))} aria-label='Increase item quantity by 1'>+</button>
          <button onClick={() => dispatch(cartActions.removeFromCart(item.id))} aria-label='Remove item from cart'>Remove</button>
        </div>
      ))}
      </div>
      <div className={styles.summary}>
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        <button onClick={() => navigate('/')} aria-label='Go to home page'>Continue Shopping</button>
      </div>
    </div>
  );
};

export default CartPage;