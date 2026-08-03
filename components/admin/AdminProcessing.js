import { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../config";
import styles from './Admin.module.css'
import ProcessingBook from "./ProcessingBook";

function AdminProcessing() {
  const user = useSelector((state) => state.user.value);

  const [processingBooks, setProcessingBooks] = useState([])
  const [fetchTextMessage, setFetchTextMessage] = useState("")
  const [urlTextMessage, setUrlTextMessage] = useState("")
  const [synopsisMessage, setSynopsisMessage] = useState("")
  const [licenseMessage, setLicenseMessage] = useState("")
  const [textMessage, setTextMessage] = useState("")


  const fetchProcessing = useCallback(async()=> {
      try {
        const res = await fetch(`${API_URL}/books/processing`, {
        headers: { 
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${user.token}` },
        })
        
        const data = await res.json();
        //if (!res.ok) ...
  
        if (data.result) setProcessingBooks(data.processingBooks)
          
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err);
      } 
    },[user])

  useEffect(()=> {
    if (user.isAdmin) fetchProcessing(); 
  }, [user.isAdmin, fetchProcessing])

  if(!user.isAdmin) {
    return (
      <div className={styles.profileContainer}>
        <p>Error 404</p>
      </div>
  );
    }

    // Récupération des textes ayant comme source API Gutendex
  // Récupération de l'id avec <ProcessingBooks>
  const fetchText = useCallback(async(id)=> {
    try {
      const res = await fetch(`${API_URL}/books/${id}/fetchText`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${user.token}` }})
        
      const data = await res.json()

      if (data.result) {
        setFetchTextMessage(data.message)
        fetchProcessing()
      }
      
    } catch (error) {
      console.error("Erreur lors de la récupération du texte :", error);
    }
  }, [fetchProcessing, user])
  

  // Récupération du texte via un URL
  // Récupération de l'id et de l'url avec <ProcessingBooks>
  const setText = useCallback(async(id,url)=>{
     try {
      const res = await fetch(`${API_URL}/books/${id}/setText`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${user.token}` },
      body: JSON.stringify({ url })
    })

    const data = await res.json()

    if (data.result) {
      setUrlTextMessage(data.message)
      fetchProcessing()
    } 
    } catch (error) {
      console.error("Erreur lors du chargement du texte :", error.message);
    }
  }, [fetchProcessing, user])
 
  const postSynopsis = useCallback(async(id, synopsis)=> {
  try {
      const res = await fetch(`${API_URL}/books/${id}/synopsis`, {
      method: "PATCH",
      headers: { 
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${user.token}`,
      },
      body: JSON.stringify({ synopsis })
    })

    const data = await res.json()
      
    if (data.result) {
      setSynopsisMessage(data.message)
      fetchProcessing()
    } 
    } catch (error) {
      console.error("Erreur lors du chargement du texte :", error.message);
    }
  }, [fetchProcessing, user])

  const postLicense = useCallback(async(id, license)=> {
  try {
      const res = await fetch(`${API_URL}/books/${id}/license`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${user.token}` },
      body: JSON.stringify({ license })
    })

    const data = await res.json()
      
    if (data.result) {
      setLicenseMessage(data.message)
      fetchProcessing()
    } 
    } catch (error) {
      console.error("Erreur lors du chargement du texte :", error.message);
    }
  }, [fetchProcessing, user])

   const postText = useCallback(async(id, text)=> {
  try {
      const res = await fetch(`${API_URL}/books/${id}/text`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${user.token}` },
      body: JSON.stringify({ text })
    })

    const data = await res.json()

    if (data.result) {
      setTextMessage(data.message)
      fetchProcessing()
    } 
    } catch (error) {
      console.error("Erreur lors du chargement du texte :", error.message);
    }
  }, [fetchProcessing, user])

  const completedBook = useCallback(async(id) => {

    try {
      const res = await fetch(`${API_URL}/books/${id}/completed`, {
      method: "PATCH",
     headers: { 
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${user.token}` }})
      const data = await res.json()
      if (data.result) {  
        fetchProcessing()
      }
    } catch (error) {
      console.error("Erreur lors du changement de status :", error.message);
    }
  }, [fetchProcessing, user] )
  
  const processing = useMemo(()=> processingBooks?.map((book)=> {
    const {title, author, status, synopsis, license, textFetch, source, textAdded, synopsisAdded, licenseAdded} = book
    return (
      <div key={book._id}>
    <ProcessingBook id={book._id} 
      title={title} 
      author={author} 
      synopsis={synopsis} 
      license={license}
      content={textFetch}
      textAdded={textAdded}
      synopsisAdded={synopsisAdded}
      licenseAdded={licenseAdded}
      source={source}
      fetchText={fetchText} 
      setText={setText}
      postSynopsis={postSynopsis}
      postLicense={postLicense}
      postText={postText}
      completedBook={completedBook}
      />
    </div>
    )
  })
  ,[processingBooks, fetchText, setText, postSynopsis, postLicense])
  


  return (
    <div>
        {user.isAdmin  &&
      <>
        <h2 className={styles.title}>Livres en attente de récupération de données :</h2>
        <div className={styles.container}>
          {processing} 
          {fetchTextMessage && <p>{fetchTextMessage}</p>}
          {urlTextMessage && <p>{urlTextMessage}</p>}
          {synopsisMessage && <p>{synopsisMessage}</p>}
          {textMessage && <p>{textMessage}</p>}
        </div>
      </>
      }
    </div>
  )     
}

export default AdminProcessing