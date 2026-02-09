import { useNavigate, useParams } from "react-router"
import Navbar from "../../components/Navbar/Navbar"
import styles from "./ProductDetails.module.scss"
import type { Product } from "../../models/Product";
import { useEffect, useMemo, useState } from "react";
import { getProductById } from "../../api/ProductApi";
import { calculateDiscountedPrice } from "../../utils/priceUtils";

const ProductDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    useEffect(()=>{
        getProductById(Number(id))
        .then(setProduct)
        .catch(()=> setError("Product not found"))
        .finally(()=> setLoading(false));
    },[id])
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return null;

    const discountedPrice = useMemo(() => {
        return calculateDiscountedPrice(product.price, product.discountPercentage);

      }, [product.price, product.discountPercentage]);

  return (

    <>
    <Navbar />
    <div className={styles.card}>
        <div className={styles.buttoncard}>
            <button className={styles.button} onClick={()=> navigate(-1)}>Back</button>
        </div>

        <div className={styles.cards}>
                <div >
                    <img className={styles.image} src={product.thumbnail} alt={product.title} />
                </div>
                <div className={styles.content}>
                    <div className={styles.brand}>{product.brand}</div>
                    <h2 className={styles.title}>{product.title}</h2>
                    <div  className={styles.sc}>
                        <div className={styles.stock}>{product.stock} in stock</div>
                        <div className={styles.category}>{product.category}</div>
                    </div>
                    <div className={styles.prices}>
                        <span className={styles.originalPrice}>${product.price}</span ><span className={styles.price}>${discountedPrice}</span>
                    </div>
                    <div >
                        <h4>Description</h4>
                        <p className={styles.description}>{product.description}</p>
                    </div>
                </div>
            </div>
    </div>
    </>
  )
}

export default ProductDetails