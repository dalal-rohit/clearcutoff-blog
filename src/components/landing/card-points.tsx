import clsx from "clsx";
import Image from "next/image";

interface CustomizableHeaderProps {
  // Content props
  showIcon?: boolean;
  icon?: React.ReactNode;
  heading?: string | null;
  subheading?: string | null;
  highlightText?: string | string[]; // Text to highlight in the heading
  subHeadingHighlight?: string | string[]; // Text to highlight in the heading

  // Styling props
  highlightColor?: string;

  // classes
  headingClasses?: string;
  subheadingClasses?: string;

  // Font weight props
  headingWeight?: "normal" | "medium" | "semibold" | "bold" | "extrabold";
  subheadingWeight?: "normal" | "medium" | "semibold" | "bold";

  // Alignment props
  alignment?: "left" | "center" | "right";
  mobileAlignment?: "left" | "center" | "right";

  // Container props
  className?: string;
}

export default function CardPoints({
  showIcon = false,
  icon = (
    <Image
      src="/images/fill-bage.svg"
      alt="points"
      width={24}
      height={24}
      className="w-6 h-6"
    />
  ),
  heading,
  subheading,
  highlightText,
  subHeadingHighlight = "text-gray-600",
  highlightColor = "text-[#0083ff]",
  alignment = "left",
  mobileAlignment = "left",
  headingClasses = "",
  subheadingClasses = "",
  className,
}: CustomizableHeaderProps) {
  // Weight mappings
  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  };

  const marginClasses = subheading ? "" : "!m-0";

  // Alignment mappings
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const mobileAlignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  // Function to highlight text in heading
  const renderHeading = () => {
    if (!highlightText) return heading;

    const highlights = Array.isArray(highlightText)
      ? highlightText
      : [highlightText];

    const regex = new RegExp(`(${highlights.join("|")})`, "gi");

    const parts = heading?.split(regex);

    return parts?.map((part, index) =>
      highlights.includes(part) ? (
        <span key={index} className={highlightColor}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  const renderSubHeading = () => {
    if (!subheading) return null;

    if (!subHeadingHighlight) return subheading;

    const highlights = Array.isArray(subHeadingHighlight)
      ? subHeadingHighlight
      : [subHeadingHighlight];

    const regex = new RegExp(`(${highlights.join("|")})`, "gi");

    const parts = subheading.split(regex);

    return parts.map((part, index) =>
      highlights.includes(part) ? (
        <span key={index} className={highlightColor}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className={clsx(`w-full ${showIcon ? "flex gap-3" : ""}`, className)}>
      {showIcon && icon && (
        <div className="flex items-center justify-center w-[24px] h-[24px]">
          {typeof icon === "string" ? (
            <Image
              src={icon}
              alt="icon"
              width={24}
              height={24}
              className="w-[24px] h-[24px] object-contain"
            />
          ) : (
            <div className="w-[24px] h-[24px] [&>*]:w-full [&>*]:h-full [&>*]:object-contain">
              {icon}
            </div>
          )}
        </div>
      )}

      <div
        className={clsx(
          `${showIcon ? "" : "mx-auto"}`,
          `md:${alignmentClasses[alignment]}`,
          `${mobileAlignmentClasses[mobileAlignment]}`
        )}
      >
        <h1 className={clsx(headingClasses, marginClasses, "")}>
          {renderHeading()}
        </h1>

        {subheading && (
          <p className={clsx(subheadingClasses, "leading-relaxed")}>
            {renderSubHeading()}
          </p>
        )}
      </div>
    </div>
  );
}
