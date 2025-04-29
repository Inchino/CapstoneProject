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
