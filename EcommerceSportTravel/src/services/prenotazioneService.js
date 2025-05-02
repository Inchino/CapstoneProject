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
