// React
import { useEffect, useState } from "react";
// Next
import { useRouter } from "next/router";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBook } from "../../reducers/books";
// Config
import { API_URL } from "../../config";
// Composants 
import CommentSection from "../../components/CommentSection";
import BookCard from "./BookCard";
import GoldDivider from "../ui-kit/GoldDivider";
import Spinner from "../ui-kit/Spinner";
// CSS
import styles from "./BookPage.module.css";
// Hook
import useBookStatus from "./hooks/useBookStatus";

function BookPage({ bookId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [bookData, setBookData] = useState(null);
  const [addedAt, setAddedAt] = useState('')
  const [contributorsData, setContributorsData] = useState(null)
  const [loading, setLoading] = useState(true)

  const {isRead, toRead, toggleRead, toggleToRead} = useBookStatus(user?.token)
  
  useEffect(() => {
    if (!bookId) return;

    const fetchBook = async() => {
      try {
        const res = await fetch(`${API_URL}/books/${bookId}`)
        const data = await res.json()
  
        if(data.result) {
          setBookData(data.book);
          setAddedAt(data.book.createdAt)
          //dispatch(setCurrentBook(data.book)); 
        }
      } catch (error) {
        console.error("Erreur lors du chargement du livre", error.name, error.message);
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [bookId, dispatch]); 

  useEffect(()=> {
  if (!bookId) return 
  
  const fetchContributors = async() => {
    try {
      const res = await fetch(`${API_URL}/fragmentContributions/${bookId}`)
      if(!res.ok) throw new Error (`HTTP error! status: ${res.status}`)
      const data = await res.json()
      if (data.result) {
        setContributorsData(data.contributors)
      }
    } catch (error) {
      console.error("Erreur lors du chargement des contributeurs", error.name, error.message);
    }
  }
  fetchContributors()

  },[bookId, bookData])

  const bookAddedAt = new Date(addedAt).toLocaleDateString("fr-FR", {day: "2-digit", month: "long", year: "numeric"})
  
  const selectedBook = (id) => {
    if (bookData) {
      router.push(`/library/${id}/read`);
    }
  }
 
  const contributors = contributorsData?.map((data, i) => {
    const contributor = ` ${data.contributor.username} - ${data.fragments} `
    return (
      <span key={i}>
      {contributor};
      </span>
    )
  })

  return (

    <div className={styles.bookContainer}>
    {loading ? <Spinner/> : 
    <>
      <h1 className={styles.bookHeroTitle}>{bookData.title}</h1>
      <div className={styles.contributors}>
      <p>Ce livre a été ajouté le {bookAddedAt} grâce aux fragments de : {contributors}</p>
     
      </div>
      
        <BookCard key={bookData._id} {...bookData} 
          selectedBook={selectedBook}
          toggleRead={toggleRead}
          isRead={isRead[bookData._id]}
          toggleToRead={toggleToRead}
          toRead={toRead[bookData._id]}
          btnString="Accéder au livre"/>
    
     
      <GoldDivider />
      <CommentSection bookId={bookData._id} />
    
    </>
  }
    </div>
  );
}

export default BookPage;
