import BookCover from "../library/BookCover"
import styles from "./Fragment.module.css"

export default function FragmentBookCard({isEmailConfirmed, giveFragment, fragmentCountUser, ...props}) {
  //console.log(props.fragmentsRequired, props.fragmentsCollected)
    
    const isValidated = props.status === "validated" // envoie true si le livre à le status validé
    const hasFragments = fragmentCountUser > 0 
    const needFragments = Number(props.fragmentsCollected ?? 0) < props.fragmentsRequired
    let content = ""

    if (!isValidated){
      content=<p >En attente de validation</p>
    } else if(!hasFragments) { // isValidated && !hasFragments
      content=(<p>Fragments insuffisants</p>)
    } else if (!needFragments) { // isValidated && hasFragments && !isComplete
      content=<p className={styles.completeMessage}>✅ Fragments complets</p>
    } else {  // isValidated && hasFragments && needFragments
       content=<button className={styles.button} onClick={() => giveFragment(props._id)}> + 1 <img src="/cristal4.png" alt="fragment" style={{"height" : "25px"}} /></button>
    }

    return (
      <div className={styles.bookCard}>
        <BookCover title={props.title} author={props.author} />
        <p>Fragments : {props.fragmentsCollected ?? 0} / {props.fragmentsRequired}</p>
        {isEmailConfirmed ? content : <p>Activer votre compte pour déposer un fragment</p>}
      </div>
    );
}