import Link from 'next/link';
import styles from './Footer.module.css';

function Footer() {

  return (
    
    <footer className={styles.footer}>
      <div className={styles.link}>
        <Link href="/fondation">Fondation</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/legales">Mentions légales</Link>
      </div>
      <p>© Mnemosym</p>

    </footer>
      
    
  );
}

export default Footer;