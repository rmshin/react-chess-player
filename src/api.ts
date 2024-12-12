const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || "";

export async function saveGameFenState(fen: string) {
  const response = await fetch(`${API_URL_BASE}/save-state`, {
    method: "POST",
    body: JSON.stringify({ fen }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
