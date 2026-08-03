import Head from "next/head";
import Library from "../../components/library/Library"

function LibraryPage() {
  

  return (
    <>
    <Head>
      <title>Bibliothèque Mnemosym</title>
      <meta name="description" content="Explorez la bibliothèque Mnemosym : des oeuvres ajoutées fragment après fragment par la communauté."></meta>
    </Head>
      <Library />
    </>
  )
}

export default LibraryPage;