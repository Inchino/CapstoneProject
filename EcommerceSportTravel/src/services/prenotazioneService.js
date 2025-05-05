const PRENOTAZIONE_API_URL = "https://localhost:7182/api/Prenotazione";

// Funzione per ottenere gli header con token
const getAuthHeaders = (token) => {
  if (!token) throw new Error("Token mancante: accesso non autorizzato.");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Creazione prenotazione
export async function creaPrenotazione(data, token) {
  const res = await fetch(PRENOTAZIONE_API_URL, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Errore nella creazione della prenotazione.");
  }

  return await res.json();
}

// Recupero prenotazioni dell’utente loggato
export async function getMiePrenotazioni(token) {
  const res = await fetch(`${PRENOTAZIONE_API_URL}/mie`, {
    headers: getAuthHeaders(token),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Errore durante il recupero delle prenotazioni.");
  }

  return await res.json();
}