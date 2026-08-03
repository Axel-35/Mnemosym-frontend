import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value : [], // liste des livres dans la bibliothèque.
};

export const externalBooksSlice = createSlice({
  name: 'externalBooks',
  initialState,
  reducers: {
    // Ajouter au chargement la page la liste de livres externalBook de la BDD dans le store. 
    // Si ajout d'un nouveau livre, remplacer le tableau précédent
    setExternalBooks: (state, action) => {
      state.value = action.payload
    }
  },
});

export const { setExternalBooks } = externalBooksSlice.actions;
export default externalBooksSlice.reducer;