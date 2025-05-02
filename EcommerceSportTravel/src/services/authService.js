export async function registerUser(userData) {
  const response = await fetch("https://localhost:7182/api/Auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const text = await response.text();
  if (!response.ok) throw new Error(text);
  return text;
}

export async function loginUser(loginData) {
  const response = await fetch("https://localhost:7182/api/Auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data || "Errore nel login.");
  return data.token;
}
