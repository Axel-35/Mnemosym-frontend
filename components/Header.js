// Next 
import Link from 'next/link';
import { useRouter } from 'next/router';
// React
import { useState, useEffect } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/user';
// Composants
import SignForm from './SignForm';
// Styles
import styles from '../styles/Header.module.css';

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    router.push('/');
  };

  /**
   * Fermeture du menu mobile au changement de page ou ouverture du formulaire de connexion
   */
  useEffect (()=> {
    if (isOpen) setIsOpen(false)
  }, [router.pathname, showModal])

  let mobileMenu = (
   <div className={styles.mobile} role="menu">

      <Link href="/projet" className={styles.navLink}>Présentation</Link>
      <Link href="/library" className={styles.navLink}>Bibliothèque</Link>
      <Link href="/fragment" className={styles.navLink}>Fragment</Link>
     
      {user.token ? 
      ( <>
        <Link href="/profile" className={styles.navLink}>Profil</Link>
        <button className={styles.logoutButton} onClick={handleLogout}>Déconnexion</button>
        </>)
         : 
        <button className={styles.mobileLogin} onClick={()=> setShowModal(true)}>Se connecter</button>
      }

   </div>
  )

  let desktopMenu = (
    <div className={styles.desktop} >
      
        <Link href="/projet" className={styles.navLink}>Présentation</Link>
        <Link href="/library" className={styles.navLink}>Bibliothèque</Link>
        <Link href="/fragment" className={styles.navLink}>Fragment</Link>

        {user.token ? (
          router.pathname === '/profile' ? (
            <button className={styles.logoutButton} onClick={handleLogout}>
              Déconnexion
            </button>
          ) : (
            <Link href="/profile" className={styles.navLink}>
              Mon Profil
            </Link>
          )
        ) : (
          <img className= {styles.icone} src="/logo utilisateur.png" alt="icone utilisateur" onClick={() => setShowModal(true)}/>
        )}
   

    </div>
  )

  return (
    <>
      <header className={styles.header}>
      
        <div className={styles.leftSection}>
          <img className={styles.logoIcon} src="/logoPantheon.png" alt="logo pantheon" />
          <Link href="/" className={styles.logo}>
          <h1 className={styles.title}>MNEMOSYM</h1>
          </Link>
        </div>

        <div className={styles.burgerMenu}>
          <button className={styles.burger} onClick={()=>setIsOpen(!isOpen)} aria-label="Ouvrir le menu"
  aria-expanded={isOpen}>
            <div className={styles.burgerDiv}></div>
            <div className={styles.burgerDiv}></div>
            <div className={styles.burgerDiv}></div>
          </button>

          {isOpen && mobileMenu}

        </div>

        {desktopMenu}
        
      </header>
      {showModal && <SignForm onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Header;