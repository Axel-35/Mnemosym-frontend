// React
import { useState } from "react";
// Redux
import { useSelector } from "react-redux";
// Config
import { API_URL } from "../config";
// Style
import styles from '../styles/ResendEmail.module.css';

function ResendEmail() {
  const user = useSelector((state) => state.user.value);

  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState('')
  const [messageError, setMessageError] = useState('')
  const [errorServer, setErrorServer] = useState('')

  const handleClick = async()=> {
    if(loading) return; // garde fou double clique 

    setMessage('')
    setMessageError('')
    setLoading(true)
    setErrorServer('')
    try {
      const res = await fetch(`${API_URL}/users/resendEmailToken`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization' : `Bearer ${user.token}`,
        }
        })
        if(!res.ok) setMessageError(data.error) 
    
        const data = await res.json()
        if(data.emailSent) setMessage(data.message)
       
    } catch (error) {
        console.error("Erreur réseau :", error);
        setErrorServer("Une erreur s'est produite, veuillez réessayer plus tard")
    } finally {
      setLoading(false)
    }
  }

  return (
   
    <div className={styles.container}>
      <p >Le lien pour activer votre compte a été envoyé par mail. S'il est expiré, vous pouvez en générer un nouveau :</p>
       <button className={styles.btn} onClick={handleClick} disabled={loading}>
        {loading ? <p>Envoi du lien en cours...</p> :<p>Demander un nouveau lien </p>}
      </button> 
      {message && <p>{message}</p>}
      {messageError && <p>{messageError}</p>}
      {errorServer && <p>{errorServer}</p>}
    </div>

  );
}

export default ResendEmail;