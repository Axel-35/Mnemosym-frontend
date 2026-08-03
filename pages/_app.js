// Next
import Head from 'next/head';
import { useRouter } from 'next/router';
// React
import { useState, useEffect } from 'react';
// Redux
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
// Redux-persist 
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
// Reducers
import user from '../reducers/user';
import books from '../reducers/books';
import externalBooks from'../reducers/externalBooks';
// Components 
import Header from '../components/Header';
import Footer from '../components/footer/Footer';
import Cookies from './../components/Cookies';
// Style
import '../styles/globals.css';

const reducers = combineReducers({ user, books, externalBooks });

const persistConfig = { key: 'Mnemosym', storage, whitelist: ['user'] };

const store = configureStore({
 reducer: persistReducer(persistConfig, reducers),
 middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  
  const router = useRouter();
  const [showCookies, setShowCookies] = useState(null)
  const [gaConsent, setGaConsent] = useState(false)
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

  const selectChoice = (choice) => {
    localStorage.setItem("mnemo-cookies", choice)
    if (choice==="accept") setGaConsent(true)
  }

  useEffect(() => {
  const cookieChoice = localStorage.getItem("mnemo-cookies");
  if (cookieChoice === "accept") {
    setGaConsent(true);
  }
  }, []);


  /**
   * Initialisation de GA
   * dataLayer : tableau gloabl de GA qui stocke évènements et commandes avant chargement de GA
   * gtag() : prend des arguments et les ajoute dans dataLayer
   * GA lit les instructions depuis dataLayer pour configurer le tracking
   */  
  useEffect(() => {
    // Affichage bandeau
    if (localStorage.getItem("mnemo-cookies") === null) {
    setShowCookies(true) 
    } else {
    setShowCookies(false)
    }
    
    if (!gaConsent) return

    // Initialisation GA
    window.dataLayer = window.dataLayer || [];
    function gtag(){
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date()); // date et heure de chargement de la bibliothèque GA
    gtag('config', GA_TRACKING_ID); // configure GA avec ID de suivi

    /**
     * Suivi des changements de page
     * NEXT SPA : les pages changent côté navigateuyr sans re-render
     * GA ne voit pas automatiquement le chargement des pages
    */
    const handleRouteChange = (url) => {
      gtag('config', GA_TRACKING_ID, {page_path: url,});
    }
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
    router.events.off('routeChangeComplete', handleRouteChange);
    };
  
}, [gaConsent, router])

  return (
    <Provider store={store}>
       <PersistGate persistor={persistor}>
          <Head>
            <title>Mnemosym</title>
            {gaConsent && (
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
          )}
           <link
    href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap"
    rel="stylesheet"
  />
          
          </Head>
          <div className='layout'>
            <Header />
            <div className='header-spacer' />
            <div className='main'>
              {showCookies && <Cookies onClose={()=>setShowCookies(false)} selectChoice={selectChoice}/>}
              <Component {...pageProps} />
            </div>
            <Footer/>
          </div>
       </PersistGate>
    </Provider>
  );
}

export default App;