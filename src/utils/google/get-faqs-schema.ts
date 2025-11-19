// src/lib/utils/schema.ts
export function getFaqsSchema(items: { name: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "QAPage",
        "name": "FAQ",
        "headline": "FAQ",
        "mainEntity": items.map((item) => ({
            "@type": "Question",
            "name": item.name,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
            },
        })),
    };
}
