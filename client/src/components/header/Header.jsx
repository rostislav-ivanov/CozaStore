import { useContext, useEffect, useRef, useState } from "react";
import { NavDropdown, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../cart/Cart";
import { AuthContext } from "../../context/authContext";
import { BagContext } from "../../context/bagContext";
import * as authService from "../../services/authService";
import { WishContext } from "../../context/wishContext";

export default function Header() {
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { count } = useContext(BagContext);
  const { wishList, setWish } = useContext(WishContext);
  const [showCart, setShowCart] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const headerRef = useRef(null);
  const wrapMenuRef = useRef(null);
  const topBarRef = useRef(null);

  const logoutHandler = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("user");
      setAuth({});
      localStorage.removeItem("auth");
      setWish({});
      navigate("/");
    }
  };

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
          className={`container-menu-desktop ${
            isFixed ? "fix-menu-desktop" : ""
          }`}
          ref={headerRef}
        >
          <div className="top-bar" ref={topBarRef}>
            <div className="content-topbar flex-sb-m h-full container">
              <div className="left-top-bar">
                Free shipping for standard order over $100
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
                  <button className="stext-106 cl6 hov1 m-r-32 m-tb-5">
                    Home
                  </button>
                </Link>

                <Link to="/products">
                  <button className="stext-106 cl6 hov1 m-r-32 m-tb-5">
                    Shop
                  </button>
                </Link>
                <Link to="/about">
                  <button className="stext-106 cl6 hov1 m-r-32 m-tb-5">
                    About
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="stext-106 cl6 hov1 m-r-32 m-tb-5">
                    Contact
                  </button>
                </Link>
              </div>
              <div className="wrap-icon-header flex-w flex-r-m">
                {/* Guest users */}
                {!isAuthenticated && (
                  <>
                    <Link to="/login">
                      <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5">
                        Login
                      </button>
                    </Link>
                    <Link to="/register">
                      <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5">
                        Register
                      </button>
                    </Link>
                  </>
                )}

                {/* Authenticated users */}
                {isAuthenticated && (
                  <>
                    <NavDropdown
                      title="My Account"
                      id="basic-nav-dropdown"
                      className="stext-106 cl6 hov1 m-r-32 m-tb-5"
                    >
                      <NavDropdown.Item as={Link} to="/profile">
                        <div className="stext-106 cl6 hov1 m-r-32 m-tb-5">
                          Profile
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/orders">
                        <div className="stext-106 cl6 hov1 m-r-32 m-tb-5">
                          Orders
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/wish-list">
                        <div className="stext-106 cl6 hov1 m-r-32 m-tb-5">
                          Wish List
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={logoutHandler}>
                        <div className="stext-106 cl6 hov1 m-r-32 m-tb-5">
                          Logout
                        </div>
                      </NavDropdown.Item>
                    </NavDropdown>
                    <div
                      className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                      data-notify={count}
                      onClick={showCartHendler}
                    >
                      <i className="zmdi zmdi-shopping-cart"></i>
                    </div>
                    <div
                      className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                      data-notify={wishList.length}
                    >
                      <Nav.Link as={Link} to="/wish-list">
                        <i className="zmdi zmdi-favorite-outline"></i>
                      </Nav.Link>
                    </div>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>
      {showCart && <Cart hideCartHendler={hideCartHendler} />}
    </>
  );
}
