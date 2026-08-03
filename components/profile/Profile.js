// React
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// Redux
import { useSelector } from "react-redux";
// Config
import { API_URL } from "../../config";
// Composants : 
import GoldDivider from "../ui-kit/GoldDivider"
import BookCover from "../library/BookCover"
import Spinner from "../ui-kit/Spinner"
// Styles
import styles from "./Profile.module.css";

function ProfilePage() {
  const user = useSelector((state) => state.user.value);
  const router = useRouter();
  const [readBooks, setReadBooks] = useState([]); //Livres lus
  const [toRead, setToRead] = useState([]); // Livres à lire
  const [stats, setStats] = useState({
    commentCount: 0,
    fragmentsCurrent: 0,
    fragmentsTotal: 0,
    badges: null
  });
  const [loading, setLoading] = useState(true);
 
/**
 * Récupération des données utilisateurs : livres lus, à lire et statistiques
 */
useEffect(() => {
  if (!user.token) return; 

  const fetchLibraries = async () => {
    try {
      const headers = { 
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${user.token}`,
      }

      const [resRead, resToRead, resStats] = await Promise.all([
        fetch(`${API_URL}/users/readBooks`, {headers}),
        fetch(`${API_URL}/users/toRead`, {headers}),
        fetch(`${API_URL}/users/stats`, {headers}),
      ]);

      const dataRead = await resRead.json();
      const dataToRead = await resToRead.json();
      const dataStats = await resStats.json();

      if (dataRead.result) setReadBooks(dataRead.readBooks);
      if (dataToRead.result) setToRead(dataToRead.toRead);
      if (dataStats.result) setStats(dataStats.stats);

    } catch (err) {
      console.error("Erreur lors du chargement des bibliothèques :", err);
    } finally {
      setLoading(false);
    }
  };

  fetchLibraries(); 
}, [user.token]); 

  /**
   * Supprimer un livre d'une des listes
   */
  const handleRemoveBook = async (type, bookId) => {
    if (!user.token) return; 

    try {
      //const route = type === "read" ? "toggleReadBook" : "toggleToRead";

      const res = await fetch(
        `${API_URL}/users/toggleBook/${type}/${bookId}`,{ 
          method: "PUT",
          headers : { 
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${user.token}`,
          }
        }
      );

      const data = await res.json();

      if (data.result) {
        if (type === "read") {
          // On met à jour la liste des livres lus localement
          setReadBooks((prev) => prev.filter((b) => b._id !== bookId));
        } else {
          // Idem pour les livres à lire
          setToRead((prev) => prev.filter((b) => b._id !== bookId));
        }
      }
    } catch (err) {
      console.error("Erreur suppression livre:", err);
    }
  };

if (!user.token) {
  return (
    <div className={styles.profileContainer}>
      <p>Vous devez être connecté pour voir votre profil.</p>
    </div>
  );
}

const badges = stats?.badges?.map((badge, i)=> {
  if (i===0) return `${badge}`
  else return (` - ${badge}`)
})

  return (
    <div className={styles.layout}>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Bonjour {user.username}</h2>
          <p>Bienvenue dans votre espace personnel.</p>
        </div>

        <GoldDivider />

         <div className={styles.statsCard}>
          {loading ? <Spinner/> :
            <>
              <p>
                <strong>Fragments actuels :</strong> {stats.fragmentsCurrent}
              </p>
              <p>
                <strong>Fragments collectés :</strong> {stats.fragmentsTotal}
              </p>
              <p>
                <strong>Commentaires publiés :</strong> {stats.commentCount}
              </p>
              <p>
                <strong>Distinction :</strong> {badges}
              </p>
            
            </>
          }
          </div>

          <GoldDivider />

        {/* --- Livres lus --- */}
        <h3 className={styles.libraryTitle}>Livres lus</h3>
          <div className={styles.libraryContainer}>
            {loading ? <Spinner/> : 
            <>
            {readBooks.map((book) => (
              <div key={book._id} className={styles.bookContainer}>
                <button className={styles.cover} onClick={() => router.push(`/library/${book._id}`)}>
                  <BookCover title={book.title} author={book.author} color={book.color} />
                </button>
                
                <button className={styles.closeButton} onClick={() => handleRemoveBook("read", book._id)}>×</button> 
                
              </div>
            ))}
            </>
            }
          </div>
        

        <GoldDivider />

        {/* --- Livres à lire --- */}
        <h3 className={styles.libraryTitle}>Livres à lire</h3>
        
          <div className={styles.libraryGrid}>
            {loading ? <Spinner/> : 
            <>
              {toRead.map((book) => (
                <div key={book._id} className={styles.bookContainer} >
                    <button className={styles.cover} onClick={() => router.push(`/library/${book._id}`)}>
                      <BookCover title={book.title} author={book.author} color={book.color} />
                    </button>
                    <button className={styles.closeButton} onClick={() => handleRemoveBook("toRead", book._id)}>×</button>                  
                </div>
              ))}
            </>
            }
          </div>
      
      </div>

    </div>
  );
}

export default ProfilePage;