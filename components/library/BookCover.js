import styles from "./BookCover.module.css";

function BookCover({title, author, color}) {

    let bg
    color ? bg = {'background-color' : color} : bg = {'background-color' : "#fff"}

    return (
        <div className={styles.cover} style={bg}>
            <div className={styles.frame}>

            <div className={styles.meta}>
                <p className={styles.title}>{title}</p>
                <div className={styles.goldDivider}></div>
                <p className={styles.author}>{author}</p>
            </div>

            </div>
        </div>
    )
}

export default BookCover
