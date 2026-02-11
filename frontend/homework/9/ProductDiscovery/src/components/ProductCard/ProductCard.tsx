import { useNavigate } from "react-router";
import styles from "./ProductCard.module.scss";
import { calculateDiscountedPrice } from "../../utils/priceUtils";
import type { Product } from "../../store/types";
import { addToCart } from "../../store/actions/cartActions";
import { useDispatch } from "react-redux";

interface Props{
    product: Product;
}
const ProductCard = ({product}: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
    const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    dispatch(addToCart(product));
  };
  return (
    <div className={styles.card} onClick={()=> navigate(`/product/${product.id}`)}>
        <div className={styles.topDetails}>
            <p className={styles.discount}>-{product.discountPercentage}%</p>
            <p className={styles.rating}>🌟{product.rating}</p>
        </div>

        <img className={styles.image} src={product.thumbnail} alt={product.title} />
        <p className={styles.brand}>{product.brand}</p>
        <h3 className={styles.title}>{product.title}</h3>
      <p>
       <span className={styles.originalPrice}>${product.price}</span> <span className={styles.price}>${discountedPrice}</span>
      </p>
      <p className={styles.stock}>{product.stock} in stock</p>
      <button aria-label="Add item to cart" onClick={handleAddToCart}>Add to cart</button>
    </div>
  )
}

export default ProductCard