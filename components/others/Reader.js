// Next 
import { useRouter } from "next/router";
// React
import { useMemo, useState, useEffect, useRef, useLayoutEffect } from "react";
// Config
import { API_URL } from "../../config";
// Composants 
import PagesViewer from "./PagesViewer"
import styles from './Reader.module.css';

export default function Reader() {
  const router = useRouter();
  const { id } = router.query; // récupère le paramètre dynamique

  const [book, setBook] = useState(null)

  const containerRef = useRef(null)
  const containerRefO = useRef(null)
  const [pages, setPages] = useState(null)
  const [layoutReady, setLayoutReady] = useState(false)

  useLayoutEffect (()=> {
  if (containerRef.current && containerRefO.current) {
  const pageRect = containerRefO.current.getBoundingClientRect();
  const ghost = containerRef.current;
  ghost.style.width = pageRect.width + "px";
  ghost.style.height = pageRect.height + "px";

  const height = ghost.clientHeight
  const width = ghost.clientWidth

  setLayoutReady(true)
  }
  }, [])

  useEffect(() => {
  if (!id) return;

  fetch(`${API_URL}/books/${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.result) setBook(data.book)
    })
    .catch((err) => console.error("Erreur chargement livre:", err));
  }, [id]);

  const  words = useMemo(()=> book?.content.split(' ') || [], [book?.content]) // Array   
/**
 * Crée un tableau de pages à partir d'un tableau de mots.
 * @param {Array<string>} words - Tableau de mots.
 * @return {Array<string>} pages - Tableau de pages.
 */
  function createPages(words) {
  const pages = [];
  const ghostPage = containerRef.current; // ghost page attachée au DOM
  ghostPage.innerHTML = "" // on part d'une page vide avant la boucle 
  let currentText = ""; // accumule les mots jusqu'à la page plein

  let i=0
  while (i<words.length) {
    const textNode = document.createTextNode(`${words[i]} `) // création du noeud pour ajouter un mot
    ghostPage.appendChild(textNode) // ajout du mot dans le DOM
    currentText += `${words[i]} ` // ajoute le mot + espace

    if (ghostPage.scrollHeight > ghostPage.clientHeight) {
      //rollback DOM
      ghostPage.removeChild(textNode)
      
      //rollback texte
      const wordText = currentText.trim()
      const wordArray = wordText.split(' ')
      wordArray.pop()
      currentText = wordArray.join(' ')
      if (currentText !== "") currentText += " ";

      // Si un mot dépasse la page 
      if (currentText === "") {
        pages.push(`${words[i]} `)
        ghostPage.innerHTML = ""
        currentText = ""
        i++
        continue
    }
      // Si tout est OK
      pages.push(currentText);

      // Réinitialise ghostPage pour la nouvelle page
      ghostPage.innerHTML = `${words[i]} `; // réutilise le mot débordant
      currentText = `${words[i]} `; // i reste le même pour retravailler ce mot
    } else {
      i++
    } 
  }
  // gestion de la dernière page 
  if (currentText.trim() !=="") {
      pages.push(currentText)
     }
     // nettoyage de ghostPage pour préparer les autres modes de calcul
    ghostPage.innerHTML = "" 
  return pages;
  
}

// const  memoizedPages = useMemo(()=> createPages(words), [layoutReady, words])
  useLayoutEffect(()=>{
    if (layoutReady && words?.length>0) setPages(createPages(words)) 
  }
  ,[layoutReady, words])


  if (!pages || pages.length === 0) {
  return (
    <div className={styles.readWrapper}>
      <h2 className={styles.title}>Livre en cours de chargement📕</h2>
    </div>
  );
  }

  return (

    <div className={styles.reader}>

      <PagesViewer title={book.title} pages={pages} author={book.author}/>;
        {/*Page modèle mesure les ref du DOM*/}
      <div className={styles.ghostPage} ref={containerRefO}></div>
        {/*Div fantôme qui sert à fixer la taille de la div qui contient le texte */}
      <div className={styles.ghostPage} ref={containerRef}></div>
       
        
    </div>

  )
  
}


