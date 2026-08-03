import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../config"
import styles from "./Admin.module.css"

function AdminPending() {
  const user = useSelector((state) => state.user.value);

  const [pendingBooks, setPendingBooks] = useState([])

  const fetchPending = useCallback(async()=> {
    try {
        const res = await fetch(`${API_URL}/externalBooks/pending`, {
        headers: { 
          "Content-Type": "application/json",
          'Authorization' : `Bearer ${user.token}` },
        })
        // if (!res.ok)...
        const data = await res.json()
        if (data.result) {
            setPendingBooks(data.pendingBooks)
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des livres en attente de validation :", error)
    }
  }, []) 


  useEffect(()=> {
    if (user.isAdmin) fetchPending(); 
    
  }, [user.isAdmin, fetchPending])


  if(!user.isAdmin) {
    return (
      <div>
        <p>Error 404</p>
      </div>
    );
  }

  const selectStatus = useCallback(async(id, status) =>{
     try {
       const res = await fetch(`${API_URL}/externalBooks/${id}/status`, {
          method: "PATCH", 
           headers: { 
          "Content-Type": "application/json",
          'Authorization' : `Bearer ${user.token}` },
          body: JSON.stringify({ status })
        })
  
        const data = await res.json()
       
        if (data.result) fetchPending()
      
     } catch (error) {
      console.error("Erreur lors du changement de status :", error.message);
     }
  
    }, [fetchPending])

    const pending = useMemo(()=> pendingBooks?.map((book)=> {
    const {_id, title, author, status} = book
    return (
      <div key={book._id} className={styles.pending}>
        <p>Livre : {title}</p>
        <p>Auteur : {author}</p>
        <p>Status : {status}</p>
        <button onClick = {()=>{selectStatus(_id, "validated")}}>Valider</button>
        <button onClick = {()=>{selectStatus(_id, "rejected")}}>Refuser</button>
      </div>
    )
  })
  ,[pendingBooks, selectStatus])

  return (
    <div>
      {user.isAdmin &&
        <>
        <h2 className={styles.title}>Livre en attente de validation</h2>
        <div className={styles.container}>{pending}</div>
        </>
        }
    </div>
  )
}

export default AdminPending

