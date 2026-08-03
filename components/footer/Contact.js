import Link from 'next/link';
import styles from './Footer.module.css'

export default function Contact() {
 
  return (   
    <div className={styles.container}>
      <h1>Contact</h1>
        <div className={styles.contact}>
          <p>Le site est actuellement en phase de développement.<strong>Vous avez accès à la version test dans laquelle vous êtes libre d’interagir comme bon vous semble</strong>.</p>
          <p>Comme il s’agit d’un prototype, vous rencontrerez encore beaucoup de fonctionnalités manquantes, d’imperfections et de bugs, qui seront amenés à être corrigés au fil du temps.</p> 
          <p>N’hésitez pas à nous les indiquer, ainsi que toutes suggestions que vous pourriez avoir dans le formulaire de la page <Link href="/projet">Le Projet</Link> (disponible après inscription), ou directement via l'adresse mail <strong><a href="mailto:contact@mnemosym.com">contact@mnemosym.com</a></strong>.</p>
          <p>Vos retours ont un réel impact sur le développement du site.</p>
        </div>
    </div>
  );
}
