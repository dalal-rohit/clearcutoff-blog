// InfiniteScroll.tsx
import React from "react";

type InfiniteScrollProps = {
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  children: React.ReactNode;
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  direction = "left",
  speed = 20,
  pauseOnHover = true,
}) => {
  const animationName = direction === "left" ? "scroll-left" : "scroll-right";

  return (
    <div className={`scroll-wrapper ${pauseOnHover ? "pause-on-hover" : ""}`}>
      <div
        className="scroll-track"
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
          animationPlayState: "running", // Important to allow pause via CSS
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default InfiniteScroll;
