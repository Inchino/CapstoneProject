const AUTH_API_URL = "https://localhost:7182/api/Auth"

export async function registerUser(userData) {
  const response = await fetch(`${AUTH_API_URL}/register`, {
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
  const response = await fetch(`${AUTH_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const contentType = response.headers.get("content-type");

  if (response.ok) {
    const data = await response.json();
    return data.token;
  } else {
    const errorText = contentType?.includes("application/json")
      ? (await response.json())
      : await response.text();
    throw new Error(errorText || "Errore nel login.");
  }
}
