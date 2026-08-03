import React, {useMemo, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";
import BookCover from './BookCover'
import styles from "./BookCard.module.css";

const BookCard = React.memo(function BookCard({ bgColor="#D4AF7F30" ,...props}) {
  const [isShort, setIsShort] = useState(true)

  const shortSynopsis = useMemo(() => {
      return props.synopsis?.length > 500 ? props.synopsis.slice(0, 500) + "..." : props.synopsis;
    }, [props.synopsis])

  const synopsis = isShort ? shortSynopsis : props.synopsis

  return (
    <div className={styles.card} style={{backgroundColor : bgColor}}>
      <FontAwesomeIcon
      icon={faBookmark}
      onClick={() => props.toggleRead(props._id) }
      style={{color: props.isRead ? "#d4af7f" : "#aaa"}} // Doré si ajouté, gris sinon
      className={styles.bookmarkIcon}
      title={props.isRead ? "Retirer des livres lus" : "Marquer comme lu"}
      />
      <FontAwesomeIcon
      icon={faHeartCirclePlus}
      onClick={() => props.toggleToRead(props._id)}
      style={{color: props.toRead ? "#d4af7f" : "#aaa"}} // Doré si ajouté, gris sinon
      className={styles.likeIcon}
      title={props.toRead ? "Retirer de la liste à lire" : "Ajouter à lire"}
      />

      <BookCover title={props.title} author={props.author} color={props.color}/>
      
      <div className={styles.bookMeta}>
        <h2 className={styles.title}>{props.title}</h2>
        <h3 className={styles.author}>{props.author}</h3>
        <p className={styles.synopsis}>{synopsis}<span className={styles.readNext} onClick={()=>setIsShort(!isShort)}>
        {props.synopsis?.length>500 ? 
        (isShort ? "Lire plus" : "...Afficher moins")
        : ""}</span></p>
      
       {props.btnString &&
        <button className={styles.btnPrimary} onClick={()=> props.selectedBook(props._id)}>{props.btnString}</button> 

       }
        
      </div>
    </div>
  );
});

export default BookCard;