const API_BASE_URL = "https://localhost:7182/api/PacchettoViaggio";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getPacchettiViaggio = async (page = 0, pageSize = 10) => {
  try {
    const res = await fetch(`${API_BASE_URL}?page=${page}&pageSize=${pageSize}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Errore nel caricamento dei pacchetti viaggio");
    return await res.json();
  } catch (error) {
    console.error("[PacchettoService - getPacchettiViaggio]", error);
    throw error;
  }
};

export const deletePacchettoViaggio = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Errore durante l'eliminazione del pacchetto");
  } catch (error) {
    console.error("[PacchettoService - deletePacchettoViaggio]", error);
    throw error;
  }
};
