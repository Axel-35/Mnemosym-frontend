import { useState } from 'react'
import { API_URL } from "../config"

export default function useExternalBooks() {
  const [externalBooks, setExternalBooks] = useState([])
  const [loading, setLoading] = useState(false)
    
  const fetchExternalBooks = async() =>{
    setLoading(true)
    try {
    const res = await fetch(`${API_URL}/externalBooks`)
    if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const data = await res.json(); 
    if (data.result) setExternalBooks(data.books)
    } catch (error) {
      console.error("Erreur lors du chargement des livres en cours de collect:", error);
    } finally {
      setLoading(false)
    }
  }

  return {externalBooks, loading, fetchExternalBooks}
}