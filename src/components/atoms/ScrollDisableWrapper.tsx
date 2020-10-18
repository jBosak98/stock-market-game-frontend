import React from "react";

const ScrollDisableWrapper = ({ children }: { children: React.ReactNode }) => {
  const changeScroll = () => {
    const style = document.body.style.overflow;
    document.body.style.overflow = style === "hidden" ? "auto" : "hidden";
  };
  return (
    <div onMouseEnter={changeScroll} onMouseLeave={changeScroll}>
      {children}
    </div>
  );
};

export default ScrollDisableWrapper;
