const PARTITA_API_BASE_URL = "https://localhost:7182/api/Partita";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Lista delle partite con paginazione
export const getPartite = async (page = 0, pageSize = 10) => {
  try {
    const res = await fetch(
      `${PARTITA_API_BASE_URL}?page=${page}&pageSize=${pageSize}`,
      {
        headers: getAuthHeaders(),
      }
    );
    if (!res.ok) throw new Error("Errore nel caricamento delle partite");
    return await res.json();
  } catch (error) {
    console.error("[PartitaService - getPartite]", error);
    throw error;
  }
};

// Partita singola per ID
export const getPartitaById = async (id) => {
  try {
    const res = await fetch(`${PARTITA_API_BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Errore nel caricamento della partita");
    return await res.json();
  } catch (error) {
    console.error("[PartitaService - getPartitaById]", error);
    throw error;
  }
};
