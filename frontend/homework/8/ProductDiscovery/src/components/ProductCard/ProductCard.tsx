import { useNavigate } from "react-router";
import type { Product } from "../../models/Product"
import styles from "./ProductCard.module.scss";
import { calculateDiscountedPrice } from "../../utils/priceUtils";

interface Props{
    product: Product;
}
const ProductCard = ({product}: Props) => {
    const navigate = useNavigate();
    const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);

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
    </div>
  )
}

export default ProductCard