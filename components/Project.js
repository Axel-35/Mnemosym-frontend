// React 
import { useState, useCallback } from 'react';
// Redux
import { useSelector } from 'react-redux';
// Config
import { API_URL } from "../config";
// Composants
import Form from './features/Forms';
import RewardModal from './RewardModal';
import PagesView from './features/PagesView';
// Content
import presentation from '../content/presentation';
// Styles
import styles from '../styles/Project.module.css'

export default function Project() {
  const user = useSelector((state) => state.user.value); 
  const [showReward, setShowReward] = useState(false); 

  /**
   * Envoi du formulaire au backend récupéré dans le composant Form
   */
  const handlePost = useCallback(async(form)=> {
    const res = await fetch(`${API_URL}/forms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" , 'Authorization' : `Bearer ${user.token}` },
      body: JSON.stringify({ token: user.token, message:form.comment, interested:form.isInterested, contributor:form.isContributor, ifNoWhy: form.why }),
    });

    const data = await res.json(); // { result: true, comment: populatedComment }
    if (data.result && data.form) { 
      setShowReward(true);
      setTimeout(() => {
      setShowReward(false);
      }, 2000)
    };
  }, [user.token])
  
  return (
    
    <div className={styles.container}>

      <h1 className={styles.title}>MNEMOSYM</h1>
      
      <PagesView pages={presentation.pages} />

      <Form handlePost={handlePost} token={user.token}/>

      {showReward && <RewardModal onClose={() => setShowReward(false)} title="Merci pour votre contribution!" />}
       
    </div>
  );
}
