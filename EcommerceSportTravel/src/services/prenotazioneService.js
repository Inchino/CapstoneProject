export async function creaPrenotazione(data, token) {
  const res = await fetch("https://localhost:7182/api/Prenotazione", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Errore nella creazione della prenotazione.");
  }

  return await res.json();
}

export async function getMiePrenotazioni(token) {
  const res = await fetch("https://localhost:7182/api/Prenotazione/mie", {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Errore durante il recupero delle prenotazioni.");
  }

  return await res.json();
}
