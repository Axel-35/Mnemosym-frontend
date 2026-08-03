import Head from 'next/head';
import Home from '../components/Home';

function Index() {
  
  return (
  <>
  <Head>
    <title>Mnemosym - Bibliothèque collaborative</title>
    <meta name="description" content="Mnemosym est une bibliothèque numérique collaborative construite par la communauté et limitée à 1 000 oeuvres."></meta>
  </Head>
  
  <Home />
  </>
  )
}

export default Index;
