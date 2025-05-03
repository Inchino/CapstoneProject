const API_URL = 'https://localhost:7182/api/Squadra';

export async function getAllSquadre(page = 0, pageSize = 20) {
  try {
    const response = await fetch(`${API_URL}?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) throw new Error('Errore nella fetch delle squadre');
    return await response.json();
  } catch (error) {
    console.error('[getAllSquadre] Errore:', error);
    return [];
  }
}
