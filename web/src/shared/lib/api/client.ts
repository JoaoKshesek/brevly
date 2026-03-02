export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    let errorBody: unknown;

    try {
      errorBody = await response.json();
    } catch {
      errorBody = await response.text();
    }

    throw {
      status: response.status,
      body: errorBody,
    };
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}
