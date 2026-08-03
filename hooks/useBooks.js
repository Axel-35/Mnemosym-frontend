import { useState } from 'react'
import { API_URL } from "../config"

export default function useBooks() {
  const [books, setBooks] = useState([])
  const [currentBook, setCurrentBook] = useState(null)
  const [lastBook, setLastBook] = useState(null)
  const [loading, setLoading] = useState(false)
    
  const fetchBooks = async() => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/books`)
      if(!res.ok) throw new Error (`HTTP error! status: ${res.status}`)
      const data = await res.json()
      if (data.result) setBooks(data.books)
    } catch (error) {
      console.error("Erreur lors du chargement des livres", error);
    } finally {
      setLoading(false)
    }
  }

  const fetchCurrentBook = async(id) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/books/${id}`)
      if(!res.ok) throw new Error (`HTTP error! status: ${res.status}`)
      const data = await res.json()
      if (data.result) setCurrentBook(data.book)
    } catch (error) {
      console.error("Erreur lors du chargement des livres", error);
    } finally {
      setLoading(false)
    }
  }

  const fetchLastBook = async() =>{
    setLoading(true)
    try {
    const res = await fetch(`${API_URL}/books/lastBook`)
    if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const data = await res.json(); 
    if (data.result) setLastBook(data.lastBook)
    } catch (error) {
    console.error("Erreur lors du chargement du livre:", error);
    } finally {
    setLoading(false)
    }
  }

  return {books, lastBook, currentBook, loading, fetchBooks, fetchLastBook, fetchCurrentBook }
}