
import styles from './Footer.module.css'

export default function Legales() {
 
  
  return (
   <div className={styles.container}>
       <h1>Mentions légales</h1>
      
    <div className={styles.legal}>
          <h3>Site web</h3>
          <ul >
            <li>Nom du projet: Mnemosym</li>
            <li>Responsable: éditeur du site</li>
            <li>Pays: France</li>
            <li>Adresse email de contact : contact@mnemosym.com</li>
          </ul>

          <h3>Hébergeur</h3>
           <ul>
            <li>Nom de l'hébergeur : Vercel Inc.</li>
            <li>Pays: Etat-Unis</li>
            <li>Site web : https://vercel.com/ </li>
          </ul>

          <h3>Données personnelles</h3>
           <ul>
            <li>Les données envoyées par email sont uniquement utilisées pour répondre</li>
            <li>Aucune donnée n'est cédée à des tiers</li>
          </ul>

          <h3>Les oeuvres</h3>
           <ul>
            <li>Les œuvres présentées dans la bibliothèque sont issues du domaine public.  </li>
            <li>Leur reproduction et diffusion sont libres.</li>
            <li>La structure du site, les contenus éditoriaux et le système de fragments sont protégés.</li>
          </ul>
    </div>



</div>
     
          


       

    
   
  );
}
