const PARTITA_API_URL = "https://localhost:7182/api/Partita";

export const getPartite = async (page = 0, pageSize = 10) => {
  try {
    const res = await fetch(
      `${PARTITA_API_URL}?page=${page}&pageSize=${pageSize}`
    );
    if (!res.ok) throw new Error("Errore nel caricamento delle partite");
    return await res.json();
  } catch (error) {
    console.error("[PartitaService - getPartite]", error);
    throw error;
  }
};

export const getPartitaById = async (id) => {
  try {
    const res = await fetch(`${PARTITA_API_URL}/${id}`);
    if (!res.ok) throw new Error("Errore nel caricamento della partita");
    return await res.json();
  } catch (error) {
    console.error("[PartitaService - getPartitaById]", error);
    throw error;
  }
};