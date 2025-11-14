import React from "react";
import Link from "next/link";

type Alignment = {
    direction?: "row" | "column";
    gap?: string; // e.g., "4px", "8px"
};

type LinksListProps = {
    alignment?: Alignment;
    icon?: React.ReactNode;
    href?: string;
    label?: string | null;
    onClick?: () => void;
    target?: string;
    cursor?: string;
    className?: string;
    font?: string;
    fontColor?: string;
};

export const LinksList = ({
    alignment = { direction: "row", gap: "4px" },
    icon,
    href,
    label,
    onClick,
    target,
    cursor = "pointer",
    font = "body-large",
    className = "",
    fontColor = "text-white",
}: LinksListProps) => {
    // Render nothing if neither icon nor label is provided
    if (!icon && !label) return null;

    return (
        <div
            className={`flex  items-center ${alignment.direction === "column" ? "flex-col" : "flex-row"} cursor-${cursor} ${className}`}
            style={{ gap: alignment.gap }}
        >

            {icon}
            <Link href={href || "#"} className={`${fontColor} ${font}`} onClick={onClick} target={target}>
                {label}
            </Link>
        </div>
    );
};
