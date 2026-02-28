export async function apiFetch<T = any>(
  endpoint: string,
  {
    method = "GET",
    headers = {},
    body,
    cache = "no-store",
    timeout = 15000,
  }: {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
    cache?: RequestCache;
    timeout?: number;
  } = {}
): Promise<T | null> {
const baseUrl = process.env.BACKEND_URL;

  if (!baseUrl) {
    console.error("MAIN_BACKEND_URL not set");
    return null;
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const url = `${baseUrl}${endpoint}`;

  try {
    const res = await fetch(url, {
      method,
     headers: {
  Accept: "application/json",
  "Content-Type": "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  ...headers,
},
      body,
      cache,
      signal: controller.signal,
    });

    clearTimeout(id);

    if (!res.ok) {
      console.error("API error:", res.status, url);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Fetch failed:", err, url);
    return null;
  }
}