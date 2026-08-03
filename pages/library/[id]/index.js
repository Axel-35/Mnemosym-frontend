import { useRouter } from "next/router";
//import Head from "next/head";
//import { API_URL } from "../../../config"
import BookPage from "../../../components/library/BookPage";

export default function BookIndex() {
    const router = useRouter();
  const { id } = router.query; 
  if (!id) return null;
  return (
    <>
    {/*
    <Head>
      <title>Mnemosym - {title} de {author}</title>
      <meta name="description" content={`${synopsis} - Livre disponible sur Mnemosym`}></meta>
    </Head>
      */
    }

    <BookPage bookId={id} />
    </>
  )
}
/*
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`${API_URL}/books/${id}`);
    const data = await res.json();

    if (!data.result) {
      return { notFound: true };
    }

    const book = data.book;

    return {
      props: {
        bookId: id,
        title: book.title,
        author: book.author || "Auteur inconnu",
        synopsis : book.synopsis ? `${book.synopsis.slice(0,160 )}...` : "Découvrez le livre sur Mnemosym..."
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}*/