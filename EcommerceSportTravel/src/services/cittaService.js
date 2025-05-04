const API_URL = 'https://localhost:7182/api/citta';

export async function getCittaById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Errore nel recupero della città');
    return await response.json();
  } catch (error) {
    console.error('[getCittaById] Errore:', error);
    return null;
  }
}
