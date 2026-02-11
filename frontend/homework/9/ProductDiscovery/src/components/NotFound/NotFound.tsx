import { useNavigate } from "react-router"
import styles from "./Error.module.scss"
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.error}>
      <div> Page Not Found</div>
    <button aria-label="Returns to home page" onClick={() => navigate('/')}>Go to Home</button>
    </div>
  )
}

export default NotFound