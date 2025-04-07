import { useEffect, useState } from "react";

export function useScreenWidthPx() {
  const [screenWidth, setScreenWidth] = useState(Math.ceil(window.innerWidth));

  useEffect(() => {
    const handleResize = () => setScreenWidth(Math.ceil(window.innerWidth));

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenWidth]);

  return screenWidth;
}
