 // Création d'une fonction utilitaire pour tous les appels API
async function fetchJSON(API_URL, options = {}) {

const res = await fetch(API_URL, options);
if (!res.ok) throw new Error(`Fetch Error ${API_URL}, status: ${res.status}`);

const data = await res.json(); 

return data   
}

export default fetchJSON