import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./Admin.module.css"

const ProcessingBook = React.memo(function ProcessingBook({id, title, author, synopsis, content, license, textAdded, synopsisAdded, licenseAdded, source, fetchText, setText, postSynopsis, postText, postLicense, completedBook}) {
 
  const [url, setUrl] = useState("")
  const [newSynopsis, setNewSynopsis] = useState("")
  const [newText, setNewText] = useState("")
  const [newLicense, setNewLicense] = useState("")

useEffect(()=>setNewText(content), [content])

  const handleClick = () => {
    setText(id, url)
    setUrl("")
  }

  const handlePost = () => {
    postSynopsis(id, newSynopsis)
    setNewSynopsis("")
  }

 const handlePostText = () => {
  postText(id, newText)
  setNewText(null)
 }

 const handlePostLicense = () => {
  postLicense(id, newLicense)
  setNewLicense("")
 }

  if (source==="api"){
    return (
      <>
      <h3>Livre possédant un Gutendex Id</h3>
      
      <div className={styles.processing}>
        <p>Livre : {title}</p>
        <p>Auteur : {author}</p>
        <p>Synopsis : {synopsis}</p>

        {!synopsisAdded && (
          <div className={styles.synopsis}>
          <textarea value={newSynopsis} onChange={(e) => setNewSynopsis(e.target.value)} placeholder="Modifier le synopsis..."/>
          <button type="button" className={styles.button} onClick={handlePost}>Publier</button>
          </div>
        )}

        <p>License : {license}</p>

        {!licenseAdded && (
          <div className={styles.synopsis}>
          <textarea value={newLicense} onChange={(e) => setNewLicense(e.target.value)} placeholder="Ajouter la license..."/>
          <button type="button" className={styles.button} onClick={handlePostLicense}>Publier</button>
          </div>
        )}

        {content && (
          <div className={styles.text}>
          <textarea value={newText} onChange={(e) => setNewText(e.target.value)}/>
          <button type="button" className={styles.button} onClick={handlePostText}>Publier</button>
          </div>
        )}

        <div className={styles.textContainer}>
          <p>Texte ajouté ? : {String(textAdded)}</p>
          {!textAdded && <button type="button" className={styles.button} onClick = {()=>{fetchText(id)}}>Récupérer le texte</button>}
        </div>
        
        {textAdded && synopsisAdded && licenseAdded && (<button type="button" className={styles.button} onClick = {()=>{completedBook(id)}}>Publier le livre</button>)}

    </div>
    </>
    )
  } else {
    return(
      <>
      <h3>Livre provenant d'une source externe</h3>
     
      <div className={styles.processing}>
        <p>Livre : {title}</p>
        <p>Auteur : {author}</p>
        <p>Source : {source}</p>
        <p>Synopsis : {synopsis}</p>
        
         {!synopsisAdded && (
          <div className={styles.synopsis}>
          <p>Modifier le synopsis :</p>
          <textarea value={newSynopsis} onChange={(e) => setNewSynopsis(e.target.value)} placeholder="Modifier le synopsis..."/>
         <button type="button" className={styles.button} onClick={handlePost}>Publier</button>
          </div>
        )}

        <p>License : {license}</p>
        {!licenseAdded && (
          <div className={styles.synopsis}>
          <textarea value={newLicense} onChange={(e) => setNewLicense(e.target.value)} placeholder="Ajouter la license..."/>
          <button type="button" className={styles.button} onClick={handlePostLicense}>Publier</button>
          </div>
        )}

         {content && (
          <div className={styles.text}>
          <textarea value={newText} onChange={(e) => setNewText(e.target.value)}/>
          <button type="button" className={styles.button} onClick={handlePostText}>Publier</button>
          </div>
        )}

         <div className={styles.textContainer}>
            <p>Text récupéré ? : {String(textAdded)}</p>
            {!textAdded  && 
            <>
            <input type="text" className={styles.textInput} placeholder="Récupérer le texte" value={url} onChange={(e) => setUrl(e.target.value)} />
            <button type="button" className={styles.button} onClick = {handleClick}>Récupérer le texte de l'url</button>
            </>
            }
         </div>

        {textAdded && synopsisAdded && licenseAdded && (<button type="button" className={styles.button} onClick = {()=>{completedBook(id)}}>Publier le livre</button>)}
      
    </div>
     </>
    )
  }
})

export default ProcessingBook;