import LoadingSpinner from "react-bootstrap/Spinner";
import styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <LoadingSpinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </LoadingSpinner>
    </div>
  );
}
