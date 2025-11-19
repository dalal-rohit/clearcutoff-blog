// src/lib/utils/schema.ts
// export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
//   return {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     "itemListElement": items.map((item, index) => ({
//       "@type": "ListItem",
//       "position": index + 1,
//       "name": item.name,
//       "item": item.url,
//     })),
//   };
// }


export function getBreadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@name": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.url && { "item": item.url })
    })),
  };
}
