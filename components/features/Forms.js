import React, { useState } from 'react';
import styles from './Form.module.css'
import Button from '../ui-kit/Button'
import SignForm from '../SignForm'; 

const initialForm = {
    isInterested: "",
    isContributor: "",
    why:"",
    comment: "",
}

const Form = React.memo(function Form({handlePost, token}) {
  const [showSignForm, setShowSignForm] = useState(false); // formulaire d'inscription
  const [form, setForm] = useState(initialForm)

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!form.isInterested || !form.isContributor) {
      return alert("Merci de répondre aux champs principaux avant de soumettre le formulaire")
    }

    handlePost(form)
    setForm(initialForm)
  }

  const handleShowSignForm = () => {setShowSignForm(true)}

  return (
    <>  
    {token ? (
      
      <div>
         <form onSubmit={handleSubmit}>
          <div className={styles.form}>
         
        
          <label htmlFor="isInterested" className={styles.question}>Sur un échelle de 1 à 5, quel intérêt portez-vous au projet ?</label>
            <select id="isInterested" className={styles.question} name="isInterested" onChange={handleChange} value={form.isInterested} >
              <option value="">Choisissez...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
       
          <fieldset className={styles.radioContainer}>

            <legend className={styles.question}>Pourriez-vous devenir un futur contributeur (10€/an)?</legend>
             
             <div className={styles.radio}>

              <label>
                <input
                type="radio" 
                name="isContributor" 
                value="Oui" 
                onChange={handleChange} 
                checked={form.isContributor==="Oui"}/>
                Oui
              </label>

              <label>
                <input 
                type="radio" 
                name="isContributor" 
                value="Peut-être" 
                onChange={handleChange} 
                checked={form.isContributor==="Peut-être"}/>
                Peut-etre
              </label>

              <label>
                <input 
                type="radio" 
                name="isContributor"
                value="Non" 
                onChange={handleChange} 
                checked={form.isContributor==="Non"}/>
                Non
                </label>

             </div>
              
    
          </fieldset>
        
          <label htmlFor="why" className={styles.question}>Si non pourquoi ?</label>
            <input 
              id="why"
              name="why"
              className={styles.why}
              type='text'
              value={form.why}
              onChange={handleChange}
              disabled={form.isContributor!=="Non"}
            />
            
          <label htmlFor='comment' className={styles.question}>Laisser nous un message</label>
        
          <textarea
            id='comment'
            name="comment"
            value={form.comment}
            onChange={handleChange}
            placeholder="Une remarque, une suggestion, une fonctionnalité à ajouter, etc ? ..."
          />

          <Button type="submit">Envoyer</Button>
            </div>
          </form> 
        
          <p className={styles.contact}><strong>N'hésitez pas à nous écrire directement à l'adresse mail : <a href="mailto:contact@mnemosym.com">contact@mnemosym.com</a></strong></p>

      </div>
    ) : (
      <>
      <p><strong>Connectez-vous pour accéder au formulaire.</strong></p>
      <Button color="gold" onClick={handleShowSignForm}>Se connecter</Button>
      {showSignForm && <SignForm onClose={() => setShowSignForm(false)} />} 

      </>
    )}
    </>
  );
})

export default Form