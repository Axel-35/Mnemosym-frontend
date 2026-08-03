// React
import { useEffect, useState } from "react";
// Redux
import { useSelector } from "react-redux";
// Config
import { API_URL } from "../config";
// Composants
import RewardModal from "./RewardModal";
// Style
import styles from "../styles/CommentSection.module.css";

function CommentSection({ bookId }) {
  const user = useSelector((state) => state.user.value);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showReward, setShowReward] = useState(false); 
  const [error, setError] = useState("")

  useEffect(() => {
    if (!bookId || !user) return;

    fetch(`${API_URL}/comments/${bookId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) setComments(data.comments);
      })
      .catch((err) => console.error("Erreur fetch comments:", err));
  }, [bookId, user.id]);

  // Publier un commentaire
  const handlePost = async () => {
    setError('')
    if (newComment.trim() === "") {
      setError("Vous ne pouvez pas publier un message vide!")
      return }

    try {
      const res = await fetch(`${API_URL}/comments/${bookId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization' : `Bearer ${user.token}`},
        body: JSON.stringify({content: newComment }),
      });
  
      const data = await res.json();
      if (data.result && data.comment) {
        // On ajoute le nouveau commentaire en haut de la liste locale
        setComments([{ ...data.comment, isLike: [], likeCount: 0 }, ...comments]);
        setNewComment("");
        if (data.fragmentEarned) setShowReward(true); 
    } 
    } catch (error) {
      console.error("Erreur POST comments:", error)
      setError("Une erreur est survenue, veuillez réessayer.")
    }
  };

  useEffect(() => {
    if(!showReward) return // inutile de déclancher la modale si showReward est false
    const timer = setTimeout(() => {setShowReward(false)}, 5000);
    return () => {clearTimeout(timer)} 
  }, [showReward])

  // Like / Unlike un commentaire
  const handleLikeToggle = async (commentId) => {
    if (!user.token) return
 
    const res = await fetch(`${API_URL}/comments/likeComment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", 'Authorization' : `Bearer ${user.token}`},
      body: JSON.stringify({commentId }),
    });

    const data = await res.json();

    if (data.result) {
      setComments((prev) =>
        prev.map((comment) => {
          if (comment._id !== commentId) return comment; // On ne touche pas aux autres
          const alreadyLiked = comment.isLike.includes(user.id);
            // Met à jour la liste des utilisateurs ayant liké
          const updatedLikes = alreadyLiked
            ? comment.isLike.filter((t) => t !== user.id)  // unlike
            : [...comment.isLike, user.id]; // like
            // Retourne le commentaire mis à jour
          return {
            ...comment,
            isLike: updatedLikes,
            likeCount: data.likeCount ?? updatedLikes.length,
          };
        })
      );
    }
  };

  return (
    <div className={styles.commentSection}>
      <h3>Commentaires</h3>

      {/* Formulaire d’ajout de commentaire */}
      {user.token ? (
        <div className={styles.commentForm}>
          <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Écrivez un commentaire..."/>
          <button onClick={handlePost}>Publier</button>
        </div>
      ) : (
        <p>Connectez-vous pour commenter.</p>
      )}
      {error && <p>{error}</p>}

      {/* Liste des commentaires */}
      <div className={styles.commentList}>
        {comments.length === 0 && <p>Aucun commentaire pour le moment.</p>}

        {comments.map((c) => {
          const liked = c.isLike.includes(user.id);

          return (
            <div key={c._id} className={styles.comment}>
              <div className={styles.commentHeader}>
                <strong>{c.author?.username || "Anonyme"}</strong>
                <span>{new Date(c.createdAt).toLocaleDateString("fr-FR", {day: "2-digit", month: "long", year: "numeric"})}</span>
              </div>

              <p>{c.content}</p>

              {/* Bloc de like */}
              <div className={styles.likeContainer} onClick={() => handleLikeToggle(c._id)}>
                <span className={liked ? styles.heartLiked : styles.heart} role="img" aria-label="like">♥</span>
                <span>{c.isLike.length}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modale de récompense */}
      {showReward && <RewardModal onClose={() => setShowReward(false)} title="Félicitation !" sentence={<p>Vous venez d'obtenir un nouveau fragment</p>}/>}
    </div>
  );
}

export default CommentSection;