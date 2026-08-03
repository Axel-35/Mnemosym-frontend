import styles from '../styles/BookInCollect.module.css'
import BookCover from './library/BookCover'

function BookInCollect ({title, author, fragmentsCollected, fragmentsRequired}) {

return (
    <div className={styles.card}>
        <BookCover title={title} author={author} />
        <p>Fragments : {fragmentsCollected ?? 0} / {fragmentsRequired}</p>
    </div>
)

}

export default BookInCollect