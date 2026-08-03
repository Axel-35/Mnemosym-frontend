import styles from "../styles/Cookies.module.css"
function Cookies({onClose, selectChoice}) {

    const handleAccept = () => {
        selectChoice("accept")
        onClose()
    }

    const handleDecline = () => {
        selectChoice("decline")
        onClose()
    }

  return (
    <div className={styles.cookies}>
        <p>Mnemosym utilise des cookies de mesure d'audience afin d'améliorer le site. Vous pouvez accepter ou refuser leur utilisation : <span>
            
            <button className={styles.btn} onClick={handleAccept}>Accepter</button>
            <button className={styles.btn} onClick={handleDecline}>Refuser</button>
            
            </span> 

        </p>
       
    </div>
  );
}

export default Cookies;