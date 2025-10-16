"use client";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Image from "next/image";
import { useLang } from "@/hooks/useLang";
import { replacePlaceholders } from "@/utils/utils";
import CardPoints from "./card-points";
import { getImageUrl } from "@/utils/imageService";
// FIX: Removed unused imports for React, Chip, and Typography
// FIX: Removed unused 'id' prop, as flagged in your initial error log.

// FIX: This type describes an object with language keys that hold an array of strings.
type LocalizedStringArray = {
  [key: string]: string[];
};

// FIX: Update the props interface to use our new types.
// 'profile' should also be more specific than a generic 'object'.
interface Props {
  profile?: string | { url: string | null; alt: string | null } | null;
  exam: string | null;
  gender: string | null;
  name: string | null;
  field: string | null;
  review: string | null;
  reviewHighlight: LocalizedStringArray; // This holds an array of strings per language
}

export default function ReviewCard({
  profile,
  name,
  field,
  review,
  exam = "HTET",
  reviewHighlight,
}: Props) {
  const { currentLang } = useLang();

  return (
    // You had an unnecessary Fragment (<>) here, it's been removed.
    <Card
      sx={{
        maxWidth: 364,
        minWidth: 320,
        backgroundColor: "white",
        padding: "24px",
      }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 w-full relative">
          {/* Added relative positioning */}
          <Image
            src={
              typeof profile === "string"
                ? profile
                : getImageUrl(profile?.url) || ""
            }
            alt={
              typeof profile === "string"
                ? "Reviewer"
                : profile?.alt ?? "Reviewer"
            }
            width={48}
            height={48}
            className="rounded-full"
            priority
          />

          <CardPoints
            heading={name}
            subheading={field}
            headingClasses="body-large !font-medium"
            subheadingClasses="text-gray-400 body-small  !font-normal"
          />
          <Box
            sx={{
              position: "absolute",
              padding: "2px 15px",
              top: "0", // Adjusted for better alignment
              right: "0", // Adjusted for better alignment
              fontWeight: "bold",
              color: "#0083ff",
            }}
          >
            <Image
              src="/images/double-quotes.svg"
              alt="Quote"
              width={32}
              height={32}
              priority
            />
          </Box>
        </div>
        <div>
          <CardPoints
            subheading={replacePlaceholders(review, { exam })}
            subHeadingHighlight={reviewHighlight[currentLang]} // This will now work
            subheadingClasses="text-gray-500 body-large !font-normal break-words whitespace-normal"
          />
        </div>
      </div>
    </Card>
  );
}
