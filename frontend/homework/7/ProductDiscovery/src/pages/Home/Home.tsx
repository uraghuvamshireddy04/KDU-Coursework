import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar/Navbar";
import { getProducts } from "../../api/ProductApi";
import type { Product } from "../../models/Product";
import styles from "./Home.module.scss"
import ProductCard from "../../components/ProductCard/ProductCard";

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(()=>{
        getProducts()
        .then(setProducts)
        .catch(() => setError("Failed to getproducts"))
        .finally(()=> setLoading(false));
    },[]);
    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;
  return (
    <div>
        <Navbar />
        <h2>All Products</h2>
         <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home