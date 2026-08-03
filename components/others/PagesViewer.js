import { useRef, useEffect, useLayoutEffect, useState, use } from 'react';
// CSS 
import styles from './Reader.module.css';

export default function PagesViewer({title, author, pages}) {
 
  // Index de la page ou de la double page 
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  const breakPoint = () => window.innerWidth >= 768 // true ou false
  const handleResize = () => setIsDesktop(breakPoint())
  useEffect(()=> {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {window.removeEventListener("resize", handleResize)}
  }, [])

  /**
   * Changement de l'index  : Desktop <--> Mobile 
   */
  useEffect(()=>{
    isDesktop ? setCurrentPageIndex(Math.floor(currentPageIndex/2)) : setCurrentPageIndex(currentPageIndex*2)
  }
    , [isDesktop])

  /**
   * Numéro de la page pour la navigation, calculé à partir de l'index
   * Mobile 1 index comporte 1 page
   * Desktop : 1 index comporte 2 pages
   */
  function getIndex(currentPageIndex, isDesktop) {
    if (isDesktop) {
      const left = currentPageIndex*2 //gauche -> pair
      const right = currentPageIndex*2 +1 //droite -> impair
      return [left, right].filter(i => i< pages?.length)
    } else {
      return [currentPageIndex]
    }
  }
  const pageIndexes = getIndex(currentPageIndex, isDesktop)

  const totalSinglePage = pages?.length
  const totalDoublePages = Math.ceil(pages?.length/2)

  const step = 1
  const nextPage = () => {
    if (currentPageIndex < (isDesktop ? totalDoublePages-1 : totalSinglePage) ) setCurrentPageIndex(prev => prev+step)
  }

  const previousPage = () => {
    if (currentPageIndex > 0) setCurrentPageIndex(prev => prev-step)
  }

  const contentPages = pageIndexes.map((page,i)=> {
    if (!pages || pages.length === 0) return null
    const pageNumber = page + 1 // correction du décalage de 0 des indexes
    const pageStyle = i===0 ? styles.leftPage : styles.rightPage

    return (
      <div key={i} className={isDesktop ? styles.page : pageStyle}>
        
        {pages[page]} 

        <div className={styles.pageFooter}>
            <span>Page {pageNumber} / {pages.length}</span>
        </div>

      </div>
    )
  })

  
return (
  <div className={styles.readWrapper}>
    <h1 className={styles.title}>{title} <span style={{ fontWeight: "normal", color: "#555" }}>– {author}</span>
    </h1>

    <div className={styles.container}>  

      <div className={styles.navigation}>
            <button className={styles.btnSecondary} onClick={previousPage}>← Page précédente</button>
            <button className={styles.btnSecondary} onClick={nextPage}>Page suivante →</button>
      </div>

        {contentPages}
        
  

    </div>
    
  </div>
  )
}