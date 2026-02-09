import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <div className={styles.name}>Product Discovery</div>
      <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>
        Home
      </NavLink>
    </nav>
  )
}

export default Navbar