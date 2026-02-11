import { useEffect } from "react"
import styles from "./Home.module.scss"
import ProductCard from "../../components/ProductCard/ProductCard";
import Spinner from "../../components/Spinner/Spinner";
import ErrorPage from "../../components/ErrorPage/Error";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/reducers";
import { fetchAllProducts } from "../../store/actions/productActions";

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading, searchLoading, error } = useSelector((state: RootState) => state.products); 
    useEffect(()=>{
        dispatch(fetchAllProducts() as any);
    },[dispatch]);
    if (loading || searchLoading) return <Spinner />;
    if (error) return <ErrorPage />;
    const products = items || [];
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