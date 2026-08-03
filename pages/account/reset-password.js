import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { API_URL } from "../../config";
import styles from "./Account.module.css"

export default function ResetPassword() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageError, setMessageError] = useState('')
  const [loading, setLoading] = useState(false)

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")
    if (token) setToken(token)
  },[])

  const handleReset = async(e) => {
    e.preventDefault()
    setMessage('')
    setMessageError('')

    if (!token) {
      setMessage('Lien invalide ou expiré')
      return
    }

    if(!passwordRegex.test(newPassword)) return setMessageError("Min. 8 caractères, avec au moins 1 chiffre.")
    
    if (loading) return
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/users/newPassword`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({ password: newPassword, token}),
      })
      const data = await res.json()

      if (!res.ok) return setMessageError(data.error)
      
      if(data.result) {
        setMessage(data.message)
        setToken('')
        setNewPassword('')
        setTimeout(()=> {
          router.push('/')
        }, 3000)
      }

    } catch (error) {
      console.error('Erreur serveur', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>

      <p className={styles.title}>Saisissez un nouveau mot de passe :</p>
      <input className={styles.input} type="password" placeholder="Mot de passe" name="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
      <button className={styles.btn} type='submit' onClick={handleReset} >Réinitialiser</button>

      {loading && <p>Réinitialisation...</p>}
      {message && <p className={styles.message}>{message}</p>}
      {messageError && <p className={styles.errorMessage}>{messageError}</p>}
      
    </div>
  );
}