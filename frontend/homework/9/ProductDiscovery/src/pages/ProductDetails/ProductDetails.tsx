import { useNavigate, useParams } from "react-router"
import styles from "./ProductDetails.module.scss"
import { useEffect } from "react";
import { calculateDiscountedPrice } from "../../utils/priceUtils";
import Spinner from "../../components/Spinner/Spinner";
import ErrorPage from "../../components/ErrorPage/Error";
import type { RootState } from "../../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../store/actions/productActions";
import { addToCart } from "../../store/actions/cartActions";

const ProductDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const dispatch = useDispatch();
    const { selectedProduct, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(()=>{
    if(id) {
        dispatch(getProductById(Number(id)) as any);

    }
    },[id, dispatch]);
    if (loading) return <Spinner />;
    if (error) return <ErrorPage />;
    if (!selectedProduct) return null;

    const discountedPrice = calculateDiscountedPrice(selectedProduct.price, selectedProduct.discountPercentage);
  return (

    <div className={styles.card}>
        <div className={styles.buttoncard}>
            <button className={styles.button} onClick={()=> navigate('/') } aria-label="Return to Home page">Back</button>
        </div>

        <div className={styles.cards}>
                <div >
                <div className={styles.topDetails}>
                     <p className={styles.discount}>-{selectedProduct.discountPercentage}%</p>
                     <p className={styles.rating}>🌟{selectedProduct.rating}</p>
                </div>
                    <img className={styles.image} src={selectedProduct.thumbnail} alt={selectedProduct.title} />
                </div>
                <div className={styles.content}>
                    <div className={styles.brand}>{selectedProduct.brand}</div>
                    <h2 className={styles.title}>{selectedProduct.title}</h2>
                    <div className={styles.sc}>
                        <div className={styles.stock}>{selectedProduct.stock} in stock</div>
                        <div className={styles.category}>{selectedProduct.category}</div>
                    </div>
                    <div className={styles.prices}>
                        <span className={styles.originalPrice}>${selectedProduct.price}</span><span className={styles.price}>${discountedPrice}</span>
                    </div>
                    <div >
                        <h4>Description</h4>
                        <p className={styles.description}>{selectedProduct.description}</p>
                    </div>
                    <button 
            className={styles.detailsAddToCart} 
            onClick={() => dispatch(addToCart(selectedProduct))}>Add to Cart</button>
                </div>
            </div>
    </div>

  )
}

export default ProductDetails