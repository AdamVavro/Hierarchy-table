import React, { useEffect, useState } from "react";
import "./../styles/scrollToTop.css";

const ScrollToTopButton = (): React.ReactElement | null => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return isVisible ? (
    <button className="scroll-to-top" onClick={scrollToTop} title="Back to top">
      ↑
    </button>
  ) : null;
};

export default ScrollToTopButton;
