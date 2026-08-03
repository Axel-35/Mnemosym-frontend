import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value : [], // liste des livres dans la bibliothèque 
  current : null, // livre sélectionné pour la lecture récupéré via <Book /> selectBook()
  count : 0, // nbr de livre dans la bibliothèque
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // Ajouter au chargement la page la liste de livres de la BDD Book dans le store. 
    // Si ajout d'un nouveau livre, remplacer le tableau précédent
    setBooks: (state, action) => {
      state.value = action.payload
    },
    setCurrentBook: (state, action) => { // Récupérer le livre sélectionné dans Book.js au clique "Accéder au livre"
      state.current = action.payload
    }
  },
});

export const { setBooks, setCurrentBook } = booksSlice.actions;
export default booksSlice.reducer;
