import styles from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner} aria-live="polite"></div>
    </div>
  );
};

export default Spinner;
