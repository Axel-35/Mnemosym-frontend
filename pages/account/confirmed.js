// React
import { useState, useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/user";
// config
import { API_URL } from "../../config";

export default function AccountConfirmed() {
  const user = useSelector((state) => state.user.value); 
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')

  useEffect(()=> {
    const refreshUser = async()=> {
      try {
        const response = await fetch(`${API_URL}/users/refresh`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization' : `Bearer ${user.token}`,
        }
        })
        const data = await response.json()

        if(data) {
            dispatch(login({ username: data.username, token: data.token, fragment: data.fragment, isEmailConfirmed: data.isEmailConfirmed }))
            setMessage(data.message)
        }    
      } catch (error) {
        console.error('Erreur serveur', error)
      }
    }
    refreshUser()
  }, [user.token, dispatch])

  return (
    <>
    {message ? <h1 style={{"margin":"40px"}}>Bonjour {user.username}! {message}</h1> : <h1>Erreur lors de l'activation du compte, veuillez réessayer</h1>}
    
    </>
  );
}