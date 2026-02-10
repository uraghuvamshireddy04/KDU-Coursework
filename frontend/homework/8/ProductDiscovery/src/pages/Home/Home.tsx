import { useEffect } from "react"
import styles from "./Home.module.scss"
import ProductCard from "../../components/ProductCard/ProductCard";
import { useProductContext } from "../../context/ProductContext";
import Spinner from "../../components/Spinner/Spinner";
import ErrorPage from "../../components/ErrorPage/Error";

const Home = () => {
    const {products, getProducts, loading, error} = useProductContext();
    useEffect(()=>{
        getProducts()
    },[]);
    if (loading) return <Spinner />;
    if (error) return <ErrorPage />;
  return (
    (products.length) ? <div>
        <h2 className={styles.heading}>All Products</h2>
         <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>:<p className={styles.noProducts}>No products found</p>
  )
}

export default Home