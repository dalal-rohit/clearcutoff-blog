// import { siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
const seoConfig: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  "terms-and-conditions": {
    title: "Terms & Conditions - Clear Cutoff",
    description:
      "Read our terms & conditions for using Clear Cutoff’s exam preparation platform. Stay informed before you start.",
  },
  "privacy-policy": {
    title: "Privacy Policy - Clear Cutoff",
    description:
      "Concerned about your privacy? Read our privacy policy and be assured. We care about your privacy!",
  },
  "contact-us": {
    title: "Contact Clear Cutoff - We're Here to Help",
    description:
      "Have questions about REET, HTET, or CTET prep? Contact Clear Cutoff support for quick assistance.",
  },
  "refund-policy": {
    title: "Refund Policy - Clear Cutoff",
    description:
      "Understand our refund policy for test series and courses at Clear Cutoff. Learn about eligibility & process.",
  },
};

type Props = {
  params: { pageinfo: string };
};

// This runs on the server and lets you generate dynamic meta
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = seoConfig[params.pageinfo];

  if (!page) {
    return {
      title: "Clear Cutoff",
      description:
        "Prepare smarter for competitive exams with Clear Cutoff's AI-powered platform.",
    };
  }
  // ✅ Replace with DB / API call for real data
  const courseData = {
    title: page.title,
    description: page.description,
    image: `https://clearcutoff.in/og-images/${params.pageinfo}.png`, // fallback to default if not exist
  };

  return {
    title: page.title,
    description: courseData.description,
    openGraph: {
      title: courseData.title,
      description: courseData.description,
      url: `https://clearcutoff.in/teaching/${params.pageinfo}`,
      siteName: "Clear Cutoff",
      images: [
        {
          url: courseData.image,
          width: 1200,
          height: 630,
          alt: courseData.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: courseData.title,
      description: courseData.description,
      images: [courseData.image],
    },
  };
}

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black">
        <main>{children}</main>
      </body>
    </html>
  );
}
