import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useEffect, type ChangeEvent } from "react";
import type { RootState } from "../../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { clearSearch, fetchAllProducts, searchProducts, setSearchQuery } from "../../store/actions/productActions";
import { CART_PAGE, DEBOUNCE_TIME } from "../../config/Config";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.products.searchQuery);
  const cartItemCount = useSelector((state: RootState) => state.cart.items.length);
  const onChange =(e: ChangeEvent<HTMLInputElement>)=>{
    dispatch(setSearchQuery(e.target.value));
  }

  const clearSearchFunction = () => {
    dispatch(clearSearch() as any);
  }

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        dispatch(searchProducts(searchQuery, controller.signal) as any);
      }else if (searchQuery === "") {
        dispatch(fetchAllProducts() as any);
      }
    }, DEBOUNCE_TIME);

    return () => {
      clearTimeout(timer);
       controller.abort();
      };
    
  }, [searchQuery, dispatch]);

  return (
    <nav className={styles.navbar}>
        <div className={styles.name}>Product Discovery</div>
      <div className={styles.navitems}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>
        Home
      </NavLink>
      <div className={styles.search}>
        <input type="text" value={searchQuery} onChange={onChange} placeholder="Search Products" />
      {searchQuery && <button onClick={clearSearchFunction} aria-label="Clear search">X</button>}

      </div>
      <button className={styles.cartButton} onClick={() => navigate(CART_PAGE)}>Cart  {cartItemCount}</button>
      </div>
    </nav>
  )
}

export default Navbar