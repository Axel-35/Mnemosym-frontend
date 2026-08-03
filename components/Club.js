// React 
import { useEffect, useState } from "react";
// Next
import { useRouter } from "next/router";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setCurrentBook } from "../reducers/books";
// config
import { API_URL } from "../config";
// style
import styles from "../styles/ClubPage.module.css";

function Club() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value); 

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger tous les commentaires du "club" classé par nb de like
  useEffect(() => {
    const fetchComments = async() => {
      try {
        const res = await fetch(`${API_URL}/comments`)
        if(!res.ok) throw new Error (`HTTP error! status: ${res.status}`)
        const data = await res.json() //{ result: true, comments: sorted }
        if (data.result && Array.isArray(data.comments)) setComments(data.comments);
        
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires", error)
      } finally {
        setLoading(false)
    }
    }
    fetchComments()
  }, []);

  // === Fonction de Like / Dislike ===
  const handleLikeToggle = async (commentId) => {
    if (!user.token) return alert("Connectez-vous pour liker un commentaire.");
      
    try {
      const res = await fetch(`${API_URL}/comments/likeComment`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: user.token, commentId }),
      });

      const data = await res.json();

      if (data.result) {
        // Mise à jour du commentaire concerné dans la liste
        setComments((prev) =>
          prev.map((c) => {
            if (c._id !== commentId) return c;

            const alreadyLiked = c.isLike.includes(user.token);

            // Met à jour le tableau des likes localement
            const updatedLikes = alreadyLiked
              ? c.isLike.filter((t) => t !== user.token) // Dislike
              : [...c.isLike, user.token]; // Like

            return {
              ...c,
              isLike: updatedLikes,
              likeCount: data.likeCount ?? updatedLikes.length,
            };
          })
        );
      }
    } catch (err) {
      console.error("Erreur like club:", err);
    }
  };

  if (loading) {
    return <p className={styles.loading}>Chargement des commentaires...</p>;
  }

  return (
    <div className={styles.clubContainer}>
      <h1>Le Club de Lecture</h1>
      <p className={styles.subtitle}>
        Découvrez les commentaires les plus appréciés de la communauté !
      </p>

      {comments.length === 0 ? (
        <p>Aucun commentaire pour le moment.</p>
      ) : (
        <div className={styles.commentList}>
          {comments.map((c) => {
            const liked = c.isLike.includes(user.token);

            return (
              <div key={c._id} className={styles.commentCard}>
                <div className={styles.header}>
                  <strong>{c.author?.username || "Anonyme"}</strong>
                  <div
                    className={styles.likeContainer}
                    onClick={() => handleLikeToggle(c._id)}
                  >
                    <span
                      className={liked ? styles.heartLiked : styles.heart}
                      role="img"
                      aria-label="like"
                    >
                      ♥
                    </span>
                    <span>{c.isLike.length}</span>
                  </div>
                </div>

                <p className={styles.content}>{c.content}</p>
                {c.gaveFragment && (
  <p className={styles.fragmentTag}>💎 Ce commentaire a fait gagner un fragment !💎</p>
)}
<p className={styles.bookRef}>
  📖 Livre :{" "}
  <span
    className={styles.bookLink}
   onClick={() => {
  if (c.book?._id) {
    dispatch(setCurrentBook(c.book)); //On enregistre le bon livre
    router.push(`/library/${c.book._id}`); // Navigation propre
  }
}}
  >
    <em>{c.book?.title || "Inconnu"}</em>
  </span>
</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Club;