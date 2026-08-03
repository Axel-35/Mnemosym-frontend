import styles from '../styles/ProgressBar.module.css'
// progressBar à placer dans ui-kit

function ProgressBar({bookCount}) {

  const progress = bookCount
  const totalTarget = 1000;
  const percent = Math.min((progress / totalTarget) * 100, 100);

  return (
    <div className={styles.progressContainer}>
        <p className={styles.progressLabel}>{progress} oeuvres sur {totalTarget} ont rejoint la bibliothèque</p>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${percent}%` }}/>
        </div>
    </div>
  );
}

export default ProgressBar;