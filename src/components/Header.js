import React, { useState, useEffect } from "react";
import "./Header.css";
import { CSSTransition } from "react-transition-group";
import { BsJustify } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import logoImage from "../assets/logo.png";
import playstore from "../assets/playstore.webp";
import appstore from "../assets/appstore.webp";

export default function Header(props) {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="Header align-items-center main-header">
      <img src={logoImage} className="Logo" alt="logo" />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav justify-content-end d-flex align-items-center">
          <a href="https://crypto.onelink.me/veNW" ><img src={playstore} className="Logo" alt="logo" style={{ width: "40px" }} /></a>
          <a href="https://crypto.onelink.me/RSfq" ><img src={appstore} className="Logo" alt="logo" style={{ width: "40px" }} /></a>
          <button onClick={props.walletConnect}>Wallet Connect</button>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        {isNavVisible ? <AiOutlineClose color="#4a4e57" /> : <BsJustify color="#4a4e57" />}
      </button>
    </header>
  );
}
