import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useExternalBooks from '../hooks/useExternalBooks';
import useBooks from '../hooks/useBooks';
import Button from './ui-kit/Button';
import BookInCollect from './BookInCollect';
import SignForm from './SignForm'; 
import LastBook from './library/LastBook';
import GoldDivider from './ui-kit/GoldDivider';
import Spinner from './ui-kit/Spinner';
import ProgressBar from './ProgressBar';
import styles from '../styles/Home.module.css';

function Home() {
  const user = useSelector((state) => state.user.value); 
  const [showSignForm, setShowSignForm] = useState(false); // formulaire d'inscription
  const {externalBooks, loading, fetchExternalBooks} = useExternalBooks()
  const {books, fetchBooks} = useBooks()

  useEffect(() => {
    fetchBooks()
    fetchExternalBooks(); // Récupération des livres en cours de collecte
  }, []);


  const bookInCollect = useMemo(() => {
    return externalBooks.filter(book => book.status ==="validated").map((data) => {
    const {_id, title, author, fragmentsCollected, fragmentsRequired} = data
    return <BookInCollect key={_id} title={title} author={author} fragmentsCollected={fragmentsCollected} fragmentsRequired={fragmentsRequired}/>
  })}, [externalBooks])

  return (
    <main className={styles.container}> 
      <h3 style={{color: 'red'}}>Site en construction : prototype</h3>
      
      <div className={styles.section}>
       
        <Image src="/logoPantheon.png" alt="Logo" width={180} height={180} />
        <h1 className={styles.title}>MNEMOSYM</h1>
        <h2 className={styles.subtitle}>Une bibliothèque collaborative limitée à 1 000 oeuvres choisies par la communauté</h2>
        
        <div className={styles.btnSection}>
          {!user.token &&
          <Button color="gold" onClick={()=>setShowSignForm(true)}>Rejoindre la communauté</Button>
          }

          {/* Fermeture du formulaire */}
          {showSignForm && <SignForm onClose={() => setShowSignForm(false)} />} 

          <Button href="/projet" color="blue">Le projet</Button>

        </div>

      </div>
        
      <GoldDivider/>
        
      <div className={styles.section}>
        <ProgressBar bookCount = {books.length} />
      
        <h3 className={styles.sectionTitle}>Dernier livre ajouté</h3>
        
        <LastBook showBtn={false}/>

        <Button href="/library" color="blue">Accéder à la bibliothèque</Button>

      </div>

      <GoldDivider/>

      <div className={styles.section}>

        <p className={styles.sectionTitle}>Livre en cours de collecte de fragments</p>
       
        <div className={styles.bookInCollect}>
        {loading ? <Spinner/> : (bookInCollect.length === 0 ? <p>Aucun livre en cours de collecte</p> : bookInCollect )}
        </div>
    
        <Button href="/fragment" color="blue">Participer à la collecte</Button>

      </div>
      
    </main>
  );
}

export default Home;