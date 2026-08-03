import { useState, useEffect } from "react";
import styles from "./PagesView.module.css"

export default function PagesView({title, author, pages}) {

  /**
   * Indexe de la page
   * Sur mobile 1 page, sur desktop double page 
   */
  const [currentPage, setCurrentPage] = useState(0); 
  const [isDesktop, setIsDesktop] = useState(false) 
  
  /**
   * Détermine la largeur de l'écran : window.innerWidth
   * @returns {Boolean} : true -> isDesktop, false -> isMobile
   */
  const breakPoint = () => window.innerWidth >= 768 

  /**
   * Permet de déterminer le type de dispositif : écran ou mobile
   */
  const handleResize = () => { setIsDesktop(breakPoint())}

  /**
   * Mise en place du listener au montage 
   * Remove du listener au démontage pour éviter que handleResize s'exécute si changement de page
   * A chaque resize, isDesktop est mis à jour et provoque un re-rendu du composant
   * Si le breakPoint est atteint : mobile ou desktop
   */
  useEffect(()=> { 
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => { window.removeEventListener("resize", handleResize) };
  },[])
/**
 * Passage en desktop → conversion de la page courante mobile en double-page
 * Passage en mobile → conversion de la double-page desktop en page unique
 */
  useEffect(() => {
    isDesktop ? setCurrentPage(Math.floor(currentPage / 2)) : setCurrentPage(currentPage * 2);
}, [isDesktop]);

  /**
   * Donne l'index de la page pour la navigation 
   * Pour un écran mobile : index pour lecture sur 1 seule page 
   * Pour un écran desktop : index pour lecture double page
   * @param {Number} currentPage 
   * @param {Boolean} isDesktop 
   * @returns {Array<Number>} 1 ou 2 élèments suivant le taille de la page 
   */
  function getIndex(currentPage, isDesktop) {
    if(isDesktop) {
      const left = currentPage*2; // Page de gauches => page paire 
      const right = currentPage*2 + 1; // Page de droite => page impaire 
      return [left, right].filter(i => i<pages.length)
    } else {
      return [currentPage]
    }
  }

  const pageIndexes = getIndex(currentPage, isDesktop) // mobile : [1] , desktop : [1,2]

  const totalSinglePages = pages.length;
  const totalDoublePages = Math.ceil(pages.length / 2); // Nombre total de pages doubles

  const step = 1
 
  const nextPage = () => {
    if (currentPage < (isDesktop ? totalDoublePages -1 : totalSinglePages)) setCurrentPage(prev => prev + step)
  };

  const previousPage = () => {
    if (currentPage > 0)  setCurrentPage(prev => prev - step); // Aller à la page précédente
  };

  const contentPage = pageIndexes.map((page,i) => {
    const pageNumber = page+1
    const pageStyle = i===0 ? styles.leftPage : styles.rightPage

    return (
      <div key={i} className={isDesktop ? styles.page : pageStyle}>
        
        <div dangerouslySetInnerHTML={{ __html: pages[page] }} />

        <div className={styles.pageFooter}>
            <span>Page {pageNumber} / {pages.length}</span>
        </div>

      </div>
    )
  })

return (
  <div className={styles.layout}>
    { (title && author) &&
      <h1 className={styles.title}>{title} <span style={{ fontWeight: "normal", color: "#555" }}>– {author}</span>
      </h1>
    }

    <div className={styles.container}>
        
      <div className={styles.navigation}>
        <button className={styles.btn} onClick={previousPage}>←</button>
        <button className={styles.btn} onClick={nextPage}>→</button>
      </div>
      
      <div className={styles.reader}>
          {contentPage}
      </div>

    </div>
      
  </div>

    )

}