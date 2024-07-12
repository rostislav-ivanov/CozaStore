import { useEffect, useState } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const windowH = window.innerHeight / 2;
    const handleScroll = () => {
      if (window.scrollY > windowH) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backToTopHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="btn-back-to-top"
      id="myBtn"
      onClick={() => backToTopHandler()}
      style={{ display: isVisible ? "flex" : "none" }}
    >
      <span className="symbol-btn-back-to-top">
        <i className="zmdi zmdi-chevron-up"></i>
      </span>
    </div>
  );
}
