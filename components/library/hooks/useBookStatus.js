import { useState, useEffect, useCallback } from 'react'
import { API_URL } from "../../../config";

export default function useBookStatus(token) {
  const [isRead, setIsRead] = useState({})
  const [toRead, setToRead] = useState({})
  const [error, setError] = useState({success:true, message:''})

  const headers = {'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}`}
    
  /**
  * Récupération des listes "livre lus", "livres à lire"
  */
    useEffect(() => {
      if (!token) {
        setIsRead({})
        setToRead({})
        return 
      } 

      const fetchStatus = async () => {
      try {
        const [resRead, resToRead] = await Promise.all([
          fetch(`${API_URL}/users/readBooks`, {headers}),
          fetch(`${API_URL}/users/toRead`, {headers}),
      ]);
  
      const dataRead = await resRead.json(); 
      setIsRead(dataRead.readBooks?.reduce((acc, book) => {
        acc[book._id]=true
        return acc;
      },{}))
      
      const dataToRead = await resToRead.json();
      setToRead(dataToRead?.toRead?.reduce((acc,book)=>{
        acc[book._id] = true 
        return acc
      }, {}))

      } catch (err) {
      console.error("Erreur lors du chargement des statuts :", err);
      }
      };
      fetchStatus();
    }, [token]); 

    /**
    * Ajouter ou retirer un livre de la liste des "livres lus"
    */
    const toggleRead = useCallback(async(bookId) => {
      if (!token) {
        return setError({success: false, message:"Connectez-vous pour marquer ce livre comme lu !"})
      }
      try {
        const res = await fetch(
          `${API_URL}/users/toggleBook/read/${bookId}`,{ 
            method: "PUT", 
            headers
           }
        );
    
        const data = await res.json(); // { result: true, added } added : <Boolean>
    
        if (data.result) {
          setIsRead(prev => {
            return {...prev, [bookId]: data.added}
          })
        }
      } catch (error) {
        console.error("Erreur toggleReadBook:", error);
      };
    }, [token])

    /**
    * Ajouter ou retirer un livre de la liste des "livres à lire"
    */
    const toggleToRead = useCallback(async(bookId)=> {
    if (!token) return setError({success: false, message:"Connectez-vous pour enregistrer ce livre !"})


    try {
      const res = await fetch(
        `${API_URL}/users/toggleBook/toRead/${bookId}`, { 
          method: "PUT", 
          headers
        }
      );
      const data = await res.json();
      if (data.result) {
        setToRead(prev => {
          return {...prev, [bookId]: data.added}
        })
      } 
      
    } catch (error) {
      console.error("Erreur toggleToRead:", error);
      };
    }, [token])

  return {isRead, toRead, toggleRead, toggleToRead, error}
}