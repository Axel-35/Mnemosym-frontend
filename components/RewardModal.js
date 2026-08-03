import { useEffect } from "react";
import styles from "../styles/RewardModal.module.css";

function RewardModal({ onClose, title, sentence }) {

   /* useEffect(() => {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
  }, [onClose]);*/

  return (
    <div className={styles.overlay}>
      
      <div className={styles.modal}>
        <div>
        <button className={styles.btn} onClick={onClose}>×</button>

        </div>
        <div className={styles.text}>
        <h2>{title}</h2>
        <p>{sentence}</p>


        </div>
      </div>
    </div>
  );
}

export default RewardModal;