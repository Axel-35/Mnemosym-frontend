import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../config"
import styles from "./Admin.module.css"

function AdminForm() {

  const user = useSelector((state) => state.user.value);
  const [formData, setFormData] = useState([]);
  
  const fetchAdminForms = useCallback(async()=> {
    try {
      const res = await fetch(`${API_URL}/forms`, {
        headers: { "Content-Type": "application/json", 'Authorization' : `Bearer ${user.token}`},
      }
      )
      // if (!res.ok) ...
      const data = await res.json()
      if (data.result) {
        setFormData(data.forms)
      }
    } catch (error) {
        console.error("Erreur lors de la récupération des formulaires:", error)
      }
  }, [])

  useEffect(()=> {
    if (user.isAdmin) fetchAdminForms(); 
    }, [user.isAdmin, fetchAdminForms])

  if(!user.isAdmin) {
    return (
      <div>
        <p>Error 404</p>
      </div>
    );
  }

  const forms = useMemo(()=> 
    formData?.map((form)=> {
    const date = new Date(form.createdAt)
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()
    const createdAt = `${day}/${month}/${year}`
        
    return (
      <div key={form._id} className={styles.form}>
        <h3><strong>Auteur : {form?.author?.username}</strong></h3>
        <p><strong>Posté le : </strong>{createdAt}</p>
        <p><strong>Intérêt pour le projet : </strong>{form?.interested}</p>
        <p><strong>Futur contributeur : </strong>{form?.contributor}</p>
        <p><strong>Si non pourquoi : </strong>{form?.ifNoWhy}</p>
        <p><strong> Message : </strong>{form?.message}</p>
      </div>
    )
    })
    ,[formData])

return (
    <div>
        {user.isAdmin &&
        <>
        <h1 className={styles.title}>Formulaires de contribution</h1>
        <div className={styles.container}>{forms}</div>
        </>
        }
    </div>
)

}

export default AdminForm;
