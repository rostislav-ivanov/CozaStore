import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

import QuickView from "../quickView/QuickView";
import { AuthContext } from "../../context/authContext";
import { WishContext } from "../../context/wishContext";

export default function ProductItem({ id, name, images, price }) {
  const { isAuthenticated } = useContext(AuthContext);
  const [showQuickView, setShowQuickView] = useState(false);
  const { isWish, addWish, removeWish } = useContext(WishContext);

  const closeQuickView = () => {
    setShowQuickView(false);
  };

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
      <div className="block2">
        <div className="block2-pic hov-img0">
          <img src={images[0]} alt={name} />
          <button
            className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
            onClick={() => setShowQuickView(true)}
          >
            Quick View
          </button>
          {showQuickView && (
            <QuickView id={id} closeQuickView={closeQuickView} />
          )}
        </div>
        <div className="block2-txt flex-w flex-t p-t-14">
          <div className="block2-txt-child1 flex-col-l ">
            <Nav.Link as={Link} to={`/details/${id}`}>
              <div className="stext-106 cl6 hov1 m-r-32 m-tb-5">{name}</div>
            </Nav.Link>
            <span className="stext-105 cl3">${price.toFixed(2)}</span>
          </div>
          {isAuthenticated && (
            <div className="block2-txt-child2 flex-r p-t-3">
              <button className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                {!isWish(id) && (
                  <img
                    className="icon-heart1 dis-block trans-04"
                    src="/images/icons/icon-heart-01.png"
                    alt="ICON"
                    onClick={() => addWish(id)}
                  />
                )}
                {isWish(id) && (
                  <img
                    className="icon-heart1 dis-block trans-04"
                    src="/images/icons/icon-heart-02.png"
                    alt="ICON"
                    onClick={() => removeWish(id)}
                  />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
