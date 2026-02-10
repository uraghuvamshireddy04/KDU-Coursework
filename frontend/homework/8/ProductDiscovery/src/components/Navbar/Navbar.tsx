import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useProductContext } from "../../context/ProductContext";
import { useEffect, type ChangeEvent } from "react";
import { useDebounce } from "../../utils/debounce";
import { DEBOUNCE_TIME } from "../../config/Config";

const Navbar = () => {
  const {searchQuery, setSearchQuery, clearSearch, searchProducts} = useProductContext();
  const search = useDebounce(searchQuery, DEBOUNCE_TIME);

  useEffect(() => {
  const trimmed = search.trim() ?? "";
  if (trimmed === "") {
    clearSearch();
  } else {
    searchProducts(trimmed);
  }
}, [search]);


  const onChange =(e: ChangeEvent<HTMLInputElement>)=>{
    setSearchQuery(e.target.value);
  }

  return (
    <nav className={styles.navbar}>
        <div className={styles.name}>Product Discovery</div>
      <div className={styles.navitems}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>
        Home
      </NavLink>
      <div className={styles.search}>
        <input type="text" value={searchQuery} onChange={onChange} placeholder="Search Products" />
      {searchQuery && <button onClick={clearSearch}>X</button>}
      </div>
      </div>
    </nav>
  )
}

export default Navbar