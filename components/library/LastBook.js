import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useBooks from "../../hooks/useBooks";
import useBookStatus from "./hooks/useBookStatus";
import BookCard from "./BookCard";
import Spinner from "../ui-kit/Spinner";

function LastBook({hide, showBtn=true}) {
  const router = useRouter();
  const user  = useSelector((state) => state.user.value);

  const {isRead, toRead, toggleRead, toggleToRead} = useBookStatus(user?.token) 
  const {lastBook, loading, fetchLastBook} = useBooks()

  useEffect(() => {
    fetchLastBook();
  }, []);

  const selectedBook = (id) => {
    router.push(`/library/${id}`);
  }
    
  if (hide) return null;

  return (
    <>
      { loading ? (<Spinner/>) : 
      ( lastBook ?  <BookCard 
      {...lastBook} 
      selectedBook={selectedBook}
      toggleRead={toggleRead}
      isRead={isRead[lastBook._id]}
      toggleToRead={toggleToRead}
      toRead={toRead[lastBook._id]}
      btnString={showBtn ? "Découvrir le livre" : undefined}
      bgColor="#d4af7f80"
      /> : <p>Aucun livre dans la bibliothèque pour le moment</p>
      )
      }
    </>
  );
}

export default LastBook;
