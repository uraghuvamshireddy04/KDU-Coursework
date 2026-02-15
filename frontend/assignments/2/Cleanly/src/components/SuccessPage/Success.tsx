import Summary from "../Summary"
import styles from "./Success.module.scss"
const Success = () => {
  return (
    <div className={styles.success}>
      <h2>Booked Successfully</h2>
      <div className={styles.summary}><Summary /></div>
    </div>
  )
}

export default Success