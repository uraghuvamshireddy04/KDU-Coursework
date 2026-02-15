import Payment from "../../components/Payment"
import Preferences from "../../components/Preferences"
import Summary from "../../components/Summary"
import styles from "./Home.module.scss"

const Home = () => {
  return (
    <div className={styles.home}>
        <div className={styles.heading}>
        <h2>Book your cleaning</h2>
        <p>Its time to book our cleaning service for your home or apartment.</p>
        </div>
        <div className={styles.main}>
            <div className={styles.formPage}>
                <Preferences />
                <Payment />
            </div>
            <div className={styles.summmaryPage}>
                <Summary />
            </div>
        </div>
    </div>
  )
}

export default Home