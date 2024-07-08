import { useEffect, useRef, useState } from "react";
import Cart from "./Cart";
import { Link } from "react-router-dom";

export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const headerRef = useRef(null);
  const wrapMenuRef = useRef(null);
  const topBarRef = useRef(null);

  useEffect(() => {
    const handelScroll = () => {
      const topBarHeight = topBarRef.current
        ? topBarRef.current.offsetHeight
        : 0;
      if (window.scrollY > topBarHeight) {
        setIsFixed(true);
        if (wrapMenuRef.current) {
          wrapMenuRef.current.style.top = 0;
        }
      } else {
        setIsFixed(false);
        if (wrapMenuRef.current) {
          wrapMenuRef.current.style.top = `${topBarHeight - window.scrollY}px`;
        }
      }
    };

    window.addEventListener("scroll", handelScroll);
    return () => {
      window.removeEventListener("scroll", handelScroll);
    };
  }, []);

  const showCartHendler = () => {
    setShowCart(true);
  };

  const hideCartHendler = () => {
    setShowCart(false);
  };

  return (
    /* Header Component */
    <>
      <header className="header-v4">
        <div
          className={`container-menu-desktop ${isFixed} ? "fix-menu-desktop" : ""`}
          ref={headerRef}
        >
          <div className="top-bar" ref={topBarRef}>
            <div className="content-topbar flex-sb-m h-full container">
              <div className="left-top-bar">
                Free shipping for standard order over $100
              </div>

              <div className="right-top-bar flex-w h-full">
                <a href="#" className="flex-c-m trans-04 p-lr-25">
                  Help & FAQs
                </a>

                <a href="#" className="flex-c-m trans-04 p-lr-25">
                  My Account
                </a>

                <a href="#" className="flex-c-m trans-04 p-lr-25">
                  EN
                </a>

                <a href="#" className="flex-c-m trans-04 p-lr-25">
                  USD
                </a>
              </div>
            </div>
          </div>

          <div className="wrap-menu-desktop how-shadow1" ref={wrapMenuRef}>
            <nav className="limiter-menu-desktop container">
              <Link to="/" className="logo">
                <img src="/images/icons/logo-01.png" alt="IMG-LOGO" />
              </Link>
              <div className="flex-w flex-l-m filter-tope-group m-tb-10">
                <Link to="/">
                  <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5">
                    Home
                  </button>
                </Link>

                <Link to="/products">
                  <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5">
                    Shop
                  </button>
                </Link>
                <Link to="/about">
                  <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5">
                    About
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5">
                    Contact
                  </button>
                </Link>
              </div>

              <div className="wrap-icon-header flex-w flex-r-m">
                <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                  <i className="zmdi zmdi-search"></i>
                </div>

                <div
                  className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                  data-notify="2"
                  onClick={showCartHendler}
                >
                  <i className="zmdi zmdi-shopping-cart"></i>
                </div>

                <a
                  href="#"
                  className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                  data-notify="0"
                >
                  <i className="zmdi zmdi-favorite-outline"></i>
                </a>
              </div>
            </nav>
          </div>
        </div>

        <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
          <div className="container-search-header">
            <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
              <img src="images/icons/icon-close2.png" alt="CLOSE" />
            </button>

            <form className="wrap-search-header flex-w p-l-15">
              <button className="flex-c-m trans-04">
                <i className="zmdi zmdi-search"></i>
              </button>
              <input
                className="plh3"
                type="text"
                name="search"
                placeholder="Search..."
              />
            </form>
          </div>
        </div>
      </header>
      <Cart showCart={showCart} hideCartHendler={hideCartHendler} />
    </>
  );
}
