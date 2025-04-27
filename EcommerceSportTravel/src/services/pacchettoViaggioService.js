const API_BASE_URL = "https://localhost:7182/api/PacchettoViaggio";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Lista pacchetti con paginazione
export const getPacchettiViaggio = async (page = 0, pageSize = 10) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}?page=${page}&pageSize=${pageSize}`,
      {
        headers: getAuthHeaders(),
      }
    );
    if (!res.ok)
      throw new Error("Errore nel caricamento dei pacchetti viaggio");
    return await res.json();
  } catch (error) {
    console.error("[PacchettoService - getPacchettiViaggio]", error);
    throw error;
  }
};

// Dettaglio pacchetto per ID
export const getPacchettoViaggioById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Errore nel recupero del pacchetto");
    return await res.json();
  } catch (error) {
    console.error("[PacchettoService - getPacchettoViaggioById]", error);
    throw error;
  }
};

// Creazione pacchetto
export const createPacchettoViaggio = async (dto) => {
  try {
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(dto),
    });

    if (!res.ok) throw new Error("Errore nella creazione del pacchetto");

    // Verifica se la risposta ha del testo
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("[PacchettoService - createPacchettoViaggio]", error);
    throw error;
  }
};

// Modifica pacchetto
export const updatePacchettoViaggio = async (dto) => {
  try {
    if (!dto.id)
      throw new Error("ID mancante per l'aggiornamento del pacchetto");

    const res = await fetch(`${API_BASE_URL}/${dto.id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(dto),
    });

    if (!res.ok) throw new Error("Errore nell'aggiornamento del pacchetto");

    const text = await res.text();
    return text ? JSON.parse(text) : null; // 🔥 fix parsing
  } catch (error) {
    console.error("[PacchettoService - updatePacchettoViaggio]", error);
    throw error;
  }
};

// Eliminazione pacchetto
export const deletePacchettoViaggio = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Errore nell'eliminazione del pacchetto");
  } catch (error) {
    console.error("[PacchettoService - deletePacchettoViaggio]", error);
    throw error;
  }
};
