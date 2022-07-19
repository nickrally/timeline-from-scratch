import React, { useEffect, useState } from "react";

export const useContainerWidth = (containerRef) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(containerRef.current.offsetWidth);
    };

    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  return width;
};
