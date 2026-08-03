import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import useBookStatus from './hooks/useBookStatus'
import useBooks from '../../hooks/useBooks';
import BookCard from './BookCard';
import LastBook from "./LastBook";
import ProgressBar from '../ProgressBar';
import GoldDivider from '../ui-kit/GoldDivider';  
import Spinner from '../ui-kit/Spinner';
import styles from "./Library.module.css"; 

function Library() {
  const router = useRouter();
  const user = useSelector((state) => state.user.value); // {result: true, token: 'xxxx', fragment: <Number>}
  
  const {books, loading, fetchBooks} = useBooks()
  const {isRead, toRead, toggleRead, toggleToRead, error} = useBookStatus(user?.token)

  const [search, setSearch] = useState(''); 
  
  useEffect(()=> {
    fetchBooks()
  },[])

  /**
   * Retrait du dernier livre ajouté, qui fera l'objet d'un composant à part
   */
  const libraryBooks = useMemo(()=>  books.slice(1),[books])

  /**
   * Rechecher des livres
   */
  const filteredBooks = useMemo(()=> {
    return libraryBooks.filter(book =>
    (book.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (book.author || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [libraryBooks, search])

  const selectedBook = useCallback((id)=> {
    router.push(`/library/${id}`)
  }, [router])

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>La bibliothèque</h1>

      {!error.success && <p>{error.message}</p>}

      <ProgressBar bookCount={books.length}/>

      <GoldDivider/>

      <h2 className={styles.subtitle}>Nouvelle entrée</h2>

      <LastBook hide={search.length > 0} />
      
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un livre..."
        className={styles.searchInput}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <GoldDivider/>

       <h2 className={styles.subtitle}>Oeuvres ajoutées</h2>
       
      { loading ? <Spinner/> :
      filteredBooks.length === 0 ? (
        <p className={styles.noResult}>Aucun livre ne correspond à votre recherche.</p>
        ) : (
        filteredBooks.map((data) => 
        <BookCard key={data._id} {...data} 
        selectedBook={selectedBook}
        toggleRead={toggleRead}
        isRead={isRead[data._id]}
        toggleToRead={toggleToRead}
        toRead={toRead[data._id]}
        btnString="Accéder au livre"/>)
      )
      } 
    </div>
  );
}

export default Library;