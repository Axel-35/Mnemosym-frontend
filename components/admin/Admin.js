import Link from "next/link.js";
import { useSelector } from "react-redux";
import styles from './Admin.module.css'

function Admin() {
  const user = useSelector((state) => state.user.value);

  return (
    <div className={styles.container}>
      {user.isAdmin  &&
      <>
      <h1 className={styles.title}>Page administrateur</h1>
      <div className={styles.links}>
        <Link href="/admin/forms">Accéder au formulaires</Link>
        <Link href="/admin/pending">Livre en attente de validation pour la collecte</Link>
        <Link href="/admin/processing">Livre en attente de récupération de données pour intégration dans la bibliothèque</Link>
      </div>
      </>
      }
    </div>
  );
}

export default Admin;