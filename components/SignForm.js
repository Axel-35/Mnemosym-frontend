import { useRouter } from 'next/router';
// React
import { useState } from 'react'; 
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
// Config
import { API_URL } from "../config";
// Composant 
import RewardModal from './RewardModal';
// Style
import styles from '../styles/SignForm.module.css';

function SignForm({ onClose }) {
  const router = useRouter()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  
  const initialForm = {username: "", email: "", password:""}

  const [signUpForm, setSignUpForm] = useState(initialForm)
  const [signInForm, setSignInForm] = useState(initialForm)

  const [loading, setLoading]= useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [email, setEmail] = useState(null)
  const [resetMsg, setRestMsg] = useState(null)

  const initialErrorForm = {username: "", email:"", password: "", general:""}

  const [signUpError, setSignUpError]= useState(initialErrorForm)
  const [signInError, setSignInError] = useState(initialErrorForm)

  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false)

  const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/
  const emailRegex = /^(?!\.)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:(?!-)[A-Za-z0-9-]+(?<!-)\.)+[A-Za-z]{2,}$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

  /**
   * Inscription d'un utilisateur
   */
  const handleRegister = async(e) => {
  
    e.preventDefault()
    setSignUpError(initialErrorForm)
   
    if (!usernameRegex.test(signUpForm.username)) return setSignUpError(prev => ({...prev, username: "Min 3 caractères, max 30 caractères"})) 
    if(!emailRegex.test(signUpForm.email)) return setSignUpError(prev => ({...prev, email: "Adresse email invalide"}))
      
    if(!passwordRegex.test(signUpForm.password)) return setSignUpError(prev => ({...prev, password: "Min. 8 caractères, avec au moins 1 chiffre."}))
      
    if (loading) return 
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: signUpForm.username, email: signUpForm.email, password: signUpForm.password }),
      })
      const user = await res.json()

      if(!res.ok) return setSignUpError(prev => ({...prev, general: user.message}))

      if(!user.result) {
        setSignUpError(prev => ({...prev, general: user.error}))
      } else {
        dispatch(login({ id: user._id, username: signUpForm.username, token: user.token, fragment: user.fragment, isEmailConfirmed: user.isEmailConfirmed, isAdmin: user.isAdmin }));
        setSignUpForm(initialForm)
        setSignUpError(initialErrorForm)
        router.push('/projet')
       setWelcomeMessage(
      `Félicitation ${signUpForm.username} ! Votre inscription est confirmée et vous gagnez 2 fragments !     
      Afin de bien comprendre le fonctionnement du site, nous vous conseillons de prendre quelques minutes pour lire la page de présentation du projet.`
      );
        setShowMessage(true);
      }
    } catch (error) {
      console.error("Error serveur", error)
    } finally {
      setLoading(false)
    }
  };

  /**
   * Connexion d'un utilisateur
   */
  const handleConnection = async(e) => {
    e.preventDefault()
    setSignInError(initialErrorForm)

    if (loading) return 
    setLoading(true)
  
    try {
      const res = await fetch(`${API_URL}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: signInForm.username, password: signInForm.password }),
      })
      const user = await res.json()
      if(!res.ok) return setSignUpError(prev => ({...prev, general: user.message}))
        
      if(user.result) {
        dispatch(login({ id:user._id, username: signInForm.username, token: user.token, fragment: user.fragment, isAdmin: user.isAdmin, isEmailConfirmed: user.isEmailConfirmed }));
        setSignInForm(initialForm)
        setWelcomeMessage(`Bienvenue ${signInForm.username} !`);
        setShowMessage(true)
        setTimeout(() => {
          onClose(); // Fermeture de la modale d'inscription (inverse data flow, parent Home)
        }, 2000);
      } else {
        setSignInError(prev => ({...prev, general:"⚠️ Nom d'utilisateur ou mot de passe incorrect."}))
      }
    } catch (error) {
      console.error("Error serveur", error)
    } finally {
      setLoading(false)
    }
  };

  /**
   * Synchronisation des champs du formulaire lorsqu'un utilisateur remplis les champs Sign Up
   * Réinitialisation du champ erreur, selon l'input remplis par l'utilisateur 
   */
  const handleSignUp = (e) => {
    setSignUpError(prev => ({...prev, [e.target.name]: '', general:''}))
    setSignUpForm(prev => ({...prev, 
    [e.target.name]: e.target.value} 
   ))
  }

  /**
   * Synchronisation des champs du formulaire lorsqu'un utilisateur remplis les champs Sign In 
   * Réinitialisation du champ erreur, selon l'input remplis par l'utilisateur 
   */
  const handleSignIn = (e) => {
    setSignInError(prev => ({...prev, [e.target.name]: '', general:''})) 
    setSignInForm(prev => ({...prev, 
    [e.target.name]: e.target.value} 
   ))
  }

  const handleCloseReward = () => {
  setShowMessage(false);
  setWelcomeMessage('');
};

const handleResetPassword = () => {
  setEmail('')

  const fetchResetPassword = async() => {
    try {
        const res = await fetch(`${API_URL}/users/forgotPassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if(data.result) {
        setRestMsg(data.message)
      }

    } catch (error) {
      console.error("Error serveur", error)
    }
  }
  fetchResetPassword()
}
  /**
   * Modale d'inscription.
   * Si utilisateur inscrit ou créé, user.token existe et modale se ferme
   */
  let modalContent;
  if (!user.token) { 
    modalContent = (
      <div className={styles.modalContainer}>
        {/* Fermerture de la modale (inverse data flow) */}
        <button className={styles.closeButton} onClick={onClose}>×</button>

        {/* SIGN IN SECTION */}

        <form onSubmit={handleConnection} className={styles.registerSection}>
          <p>Connexion</p>
          <input type="text" placeholder="Nom d'utilisateur" name="username" value={signInForm.username} onChange={handleSignIn}/>
          <input type="password" placeholder="Mot de passe" name="password" value={signInForm.password} onChange={handleSignIn}/>
         
          <button className={styles.btn} type='submit' disabled={loading}>Se connecter</button>
          {signInError.general && <p style={{ color: 'red' }}>{signInError.general}</p>}


          <button type="button" className={styles.resetPass} onClick={() => setForgotPassword(true)}>Mot de passe oublié ?</button>

          {forgotPassword && 
          <>
          <input type="text" placeholder="Entrez votre adresse email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/> 

          <button type="button" className={styles.btn} onClick={() => handleResetPassword()}>Réinitialiser le mot de passe</button>
          {resetMsg && <p style={{color:'red'}} >{resetMsg}</p>}
          </>
          }
        </form>

         {/* SIGN UP SECTION */}

        <form onSubmit={handleRegister} className={styles.registerSection}>
          <p>Inscription</p>
          <input type="text" placeholder="Nom d'utilisateur" name="username" value={signUpForm.username} onChange={handleSignUp}/>
          {signUpError.username && <p style={{ color: 'red' }}>{signUpError.username}</p>}

          <input type="text" placeholder="Adresse e-mail" name="email" value={signUpForm.email} onChange={handleSignUp}/>
          {signUpError.email && <p style={{ color: 'red' }}>{signUpError.email}</p>}

          <input type="password" placeholder="Mot de passe" name="password" value={signUpForm.password} onChange={handleSignUp}/>
          {signUpError.password && <p style={{ color: 'red' }}>{signUpError.password}</p>}
          <button type="submit" disabled={loading} className={styles.btn}>S'inscrire</button>

          {signUpError.general && <p style={{ color: 'red' }}>{signUpError.general}</p>}
        </form>
      </div>
    );
  }

  return (
    <>
      {modalContent}
      {showMessage && (
        <div className={styles.welcomeOutside}>
          <RewardModal onClose={handleCloseReward} sentence={welcomeMessage} title='Bienvenue'/>
        </div>
      )}
    </>
  );
}

export default SignForm;