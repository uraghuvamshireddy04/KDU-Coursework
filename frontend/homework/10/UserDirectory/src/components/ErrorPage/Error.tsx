import { useNavigate } from "react-router"
import styles from "./Error.module.scss"
const ErrorPage = (error: any) => {
  const navigate = useNavigate();
  return (
    <div className={styles.error}>
      <div> Something went wrong... </div>
      <p>{error}</p>
    <button aria-label="Returns to home page" onClick={() => navigate('/')}>Go to Home</button>
    </div>
  )
}

export default ErrorPage