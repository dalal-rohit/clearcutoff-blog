// src/lib/api/globals.ts
export async function fetchGlobalSections(locale: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/global-sections?locale=${locale}`,
    { cache: "no-store" }
  );
  return res.json();
}
