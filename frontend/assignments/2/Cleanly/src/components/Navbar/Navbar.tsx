import styles from "./Navbar.module.scss"

const Navbar = () => {
  return (
    <div className={styles.nav}>
        <div className={styles.title}>Clean<span>ly</span></div>
        <div className={styles.number}>800-710-8420</div>
    </div>
  )
}

export default Navbar