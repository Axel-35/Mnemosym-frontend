// Next 
import { useRouter } from "next/router";
// React
import { useMemo, useState, useEffect } from "react";
// Config
import { API_URL } from "../../config"
// Composants 
import PagesView from "../features/PagesView"
import Spinner from "../ui-kit/Spinner"
// style
import styles from './Read.module.css';

export default function Read() {
  const router = useRouter();
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  const { id } = router.query; 

  useEffect(() => {
  if (!id) return;

  const fetchBook = async() => {
    try {
      const res = await fetch(`${API_URL}/books/${id}`)
      const data = await res.json()

      if(data.result) setBook(data.book); 
      
    } catch (error) {
       console.error("Erreur lors du chargement du livre", error.name, error.message);
    } finally {
      setLoading(false)
    }
  }
  fetchBook()
  }, [id]);

  const wordsPerPage = 260; 
  
  /**
   * Tableau de tous les mots du livre
   * Fallback "[]" le temps du chargement du contenu du livre + Affichage conditionnel "Livre en cours de chargement"
   * @return {Array<string>} words - Tableau de mots.
   */
  const words = book?.content?.split(' ') || []; 

  /**
   * Crée un tableau de pages à partir d'un tableau de mots.
   * La longueur d'une page est définie par la constante wordsPerPage.
   * @param {Array<string>} words - Tableau de mots.
   * @return {Array<string>} pages - Tableau de pages.
   */
  function createPages(words) {
    const pages = [];
    for (let i = 0; i < words.length; i += wordsPerPage) { // Diviser le contenu en pages
    const pageWords = words.slice(i, i + wordsPerPage); // Extraire les mots pour chaque page
    pages.push(pageWords.join(" ")); // Ajouter chaque page au tableau des pages
    }
    return pages 
  }

  const  memoizedPages = useMemo(()=> createPages(words), [words]) 

  return (
  <>
    { loading ? 
    (<div className={styles.spinContainer}><Spinner/></div>)
    :
    (<>
      <PagesView title={book.title} content={book.content} author={book.author} pages={memoizedPages}/>

      <div className={styles.about}>
        <h2>A propos de cette édition :</h2>
        <div dangerouslySetInnerHTML={{ __html: book?.license }} />
      </div>  
    </>)
    }
  </>
);
}


