import Head from 'next/head';
import Project from '../components/Project';

function ProjectPage() {
  return (
  <>
    <Head>
      <title>Le projet Mnemosym - Bibliothèque numérique collaborative</title>
      <meta name="description" content="Découvrez le projet Mnemosym : une bibliothèque numérique collaborative construite par la communauté, volontairement limitée à 1 000 œuvres."></meta>
    </Head>
    <Project />
  
  </>
  )
}

export default ProjectPage;
