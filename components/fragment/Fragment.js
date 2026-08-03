// React
import { useState, useEffect } from 'react';
// Redux
import { useSelector } from 'react-redux';
// Config
import { API_URL } from "../../config"
// Hooks
import useExternalBooks from "../../hooks/useExternalBooks"
import useBooks from '../../hooks/useBooks';
// Componants 
import ProgressBar from '../ProgressBar';
import ResendEmail from '../ResendEmail';
import Spinner from "../ui-kit/Spinner"
import FragmentBookCard from './FragmentBookCard';
// Style
import styles from './Fragment.module.css';

function Fragment() {
  const user = useSelector((state) => state.user.value);
  
  const [fragmentCountUser, setFragmentCountUser] = useState(null);
  const [searchBook, setSearchBook] = useState(''); 

  const [userBook, setUserBook] = useState('')
  const [userAuthor, setUserAuthor] = useState('')

  const [inDatabase, setInDatabase] = useState(true)
  const [rejectedMessage, setRejectedMessage] = useState("")

  const {externalBooks, loading, fetchExternalBooks} = useExternalBooks()
  const {books, fetchBooks} = useBooks()
  const fragmentsRequired = books?.length+1 ?? null
 
  useEffect(() => {
    fetchExternalBooks(); 
    fetchBooks();
  }, []);

  
  const addExternalBookByTitle = async () => {
    setRejectedMessage('')
    try {
      const res = await fetch(`${API_URL}/externalBooks/title`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: searchBook }),
      });
      const data = await res.json(); // {result: true, data: savedBook}
   
      if (data.result) {
        fetchExternalBooks(); // charger la liste des livres
        setSearchBook('');
      }
      if(!data.result ) {
        setInDatabase(false)
        setSearchBook('');
      }
      if(!data.result && data.UXmessage) {
        setInDatabase(true)
        setRejectedMessage(data.UXmessage)
        setSearchBook('');
      }

    } catch(error){
      console.error(`Erreur lors de l'ajout d'un livre:`, error);
    }
  };

  
  useEffect(() => {
    async function fetchUserFragments() {
      if (!user.token) return;

      try {
        const res = await fetch(`${API_URL}/users/fragments`, {
          headers: { 
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${user.token}`,
         },
        });
        const data = await res.json();
        if (data.result) {
          setFragmentCountUser(data.fragments);
        }
      } catch (err) {
        console.error('Erreur de récupération des fragments utilisateur :', err);
      }
    }
    fetchUserFragments();
  }, [user.token]);

  /**
   * Attribution d'un fragment à un livre
   * Si le livre obtient le nombre de fragments requis, il rejoint la bibliothèque
   */
  const giveFragment = async (bookId) => {
    if (!user.token) return;
   
    try {
      const res = await fetch(`${API_URL}/externalBooks/giveFragment`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${user.token}`,
         },
        body: JSON.stringify({ bookId }),
      });
      const data = await res.json();

      if (data.result) {
        setFragmentCountUser(data.userFragments);
        await fetchExternalBooks();
        if (data.transferred) {
        await fetchBooks()
        }
      } 
    } catch (err) {
      console.error('Erreur lors du don de fragment :', err);
    }
  };

  /**
   * Ajout d'un livre par un utilisateur s'il est absent de la base de données Gutenberg
   */
  const addUserBook = async() => {
    try {
      const res = await fetch(`${API_URL}/externalBooks/pending`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: userBook, author: userAuthor }), 
      });
      const data = await res.json(); // {result: true, data: savedBook}
      
      if (data.result) {
        fetchExternalBooks(); // On relance la requête pour charger les livres 
        setUserBook('');
        setUserAuthor('')
      }
      if(!data.result) {
        setUserBook('');
        setUserAuthor('')
      }
    } catch(error){
      console.error(`Erreur lors de l'ajout d'un livre:`, error);
    }
  }
  
  // Retire les livres avec le status "rejected"
  const validBooks = externalBooks.filter((book) => book.status !== "rejected");
  
  return (
    <main className={styles.main}>
      
      { user.token && !user.isEmailConfirmed &&  <ResendEmail /> }
    
      <div className={styles.hero}>
        <h1 className={styles.title}>✨ Fragment ✨</h1>
        <h2 className={styles.subtitle}>Collectez, débloquez, explorez</h2>
        <p className={styles.description}>
        Les fragments incarnent la contribution des lecteurs à Mnemosym.
        En participant à la vie du site, les membres de la communauté génèrent des fragments qu’ils peuvent utiliser pour débloquer de nouvelles œuvres et enrichir la bibliothèque.
      </p>
      </div>

      <ProgressBar bookCount={books.length}/>

      <div className={styles.dataFragments}>

        <div className={styles.sectionCount}>
          <h2>Fragments requis pour le prochain livre</h2>

          <div className={styles.fragmentRow}>
            <span className={styles.counter}>{fragmentsRequired}</span>
            <img src="/frag2.png" alt="fragment" className={styles.banner} />
          </div>
        </div>

        <div className={styles.sectionCount}>
          <h2>Fragments collectés</h2>

          <div className={styles.fragmentRow}>
            <span className={styles.counter}>{fragmentCountUser ?? '-'}</span>
            <img src="/frag2.png" alt="fragment" className={styles.banner} />
          </div> 
        </div>

      </div>
     
      <h2 className={styles.fragmentRow}>Livres proposés par la communauté :</h2>
      
      <div className={styles.bookInCollect}>
        {loading ? <Spinner/> : validBooks.map((book) => ( 
        <FragmentBookCard 
          key={book._id}
          {...book}
          fragmentCountUser={fragmentCountUser}
          isEmailConfirmed={user.isEmailConfirmed}
          giveFragment={giveFragment}
        />)
        )}
      </div>

      <div className={styles.searchSection}>
        { user.token ?
        (<>
          <input type="text" placeholder="Titre du nouveau livre" value={searchBook} onChange={(e) => setSearchBook(e.target.value)} />
          <button className={styles.ConnexionButton} onClick={addExternalBookByTitle}>Ajouter un livre</button>
        </>) :
        <h2>Connectez vous pour participer à la collecte</h2>
        }
      </div>

      {!inDatabase &&
      <div className={styles.searchMessage}>
        <p>Le livre recherché ne figure pas dans la base de données</p>
        <p>Assurez vous que le livre appartient bien au domaine public (auteur décédé depuis plus de 70 ans)</p>
        <p>Si ce n'est pas le cas, merci d'indiquer le titre et l'auteur dans les champs de saisis ci dessous </p>
        <div className={styles.searchSection}>
         <input type="text" placeholder="Titre du nouveau livre" value={userBook} onChange={(e) => setUserBook(e.target.value)} />
          <input type="text" placeholder="Nom de l'auteur" value={userAuthor} onChange={(e) => setUserAuthor(e.target.value)} />
          <button className={styles.ConnexionButton} onClick={addUserBook}>Proposer un livre</button>
          </div>
      </div>
      }
      {rejectedMessage && <p className={styles.rejectedMessage}>{rejectedMessage}</p>}
      
      <div className={styles.sectionFragment}> 

        <h2 className={styles.fragmentTitle}> <img src="/frag2.png" alt="fragment" className={styles.banner} />Comment collecter des fragments ? <img src="/frag2.png" alt="fragment" className={styles.banner} /></h2>

        <div className={styles.infoFragment}>
          <span className={styles.icon}>🆕</span>
          <p><strong>Création d’un compte :</strong> permet de gagner le droit de participer à la collecte de fragment. Un utilisateur obtient un fragment lors de son inscription.</p>
        </div>

        <div className={styles.infoFragment}>
          <span className={styles.icon}>📝</span>
          <p><strong>Participation au Club de lecture :</strong> chaque commentaire de plus de 2 000 charactères permet de générer un fragment (dans la limite d'un fragment par oeuvre).</p>
        </div>
          
        <div className={styles.infoFragment}>
          <span className={styles.icon}>🎉</span>
          <p><strong>Récompenses indiviuelles et collectives :</strong> les utilisateurs obtiennent des fragments lorsque des paliers symboliques sont atteints (exemple : 10 commentaires publiés, 100 fragmnets collectés, 100 livres dans la bibliothèques, etc).</p>
        </div>
          
      </div>
      
    </main>
  );
}

export default Fragment;