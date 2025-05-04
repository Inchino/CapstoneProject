const API_URL = 'https://localhost:7182/api/squadra';

export async function getSquadraById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Errore nel recupero della squadra');
    return await response.json();
  } catch (error) {
    console.error('[getSquadraById] Errore:', error);
    return null;
  }
}

export async function getAllSquadre() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Errore nel recupero delle squadre');
    return await response.json();
  } catch (error) {
    console.error('[getAllSquadre] Errore:', error);
    return [];
  }
}
