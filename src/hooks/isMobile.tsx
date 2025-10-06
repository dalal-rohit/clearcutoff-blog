import React, { useEffect, useState } from "react";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // check on load

    window.addEventListener("resize", checkMobile); // update on resize

    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}
