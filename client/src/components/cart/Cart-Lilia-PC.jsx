import { useContext } from "react";
import { BagContext } from "../../context/bagContext";
import { Link } from "react-router-dom";

export default function Cart({ hideCartHendler }) {
  const { bag } = useContext(BagContext);
  const total = bag.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="wrap-header-cart js-panel-cart show-header-cart">
      <div className="s-full js-hide-cart"></div>

      <div className="header-cart flex-col-l p-l-65 p-r-25">
        <div className="header-cart-title flex-w flex-sb-m p-b-8">
          <span className="mtext-103 cl2">Your Cart</span>

          <div
            className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04"
            onClick={hideCartHendler}
          >
            <i className="zmdi zmdi-close"></i>
          </div>
        </div>

        {bag.length === 0 && (
          <div className="header-cart-content flex-w js-pscroll">
            <div className="header-cart-total w-full p-tb-40">
              Your cart is empty!
            </div>
          </div>
        )}

        {bag.length > 0 && (
          <div className="header-cart-content flex-w js-pscroll">
            <ul className="header-cart-wrapitem w-full">
              {bag.map((item) => (
                <li
                  key={item.id}
                  className="header-cart-item flex-w flex-t m-b-12"
                >
                  <div className="header-cart-item-img">
                    <img src={item.image} alt="IMG" />
                  </div>

                  <div className="header-cart-item-txt">
                    <Link
                      to={`/details/${item._id}`}
                      className="header-cart-item-name hov-cl1 trans-04"
                      onClick={hideCartHendler}
                    >
                      {item.name}
                    </Link>
                    <span className="header-cart-item-info">
                      Color: {item.color}
                    </span>
                    <span className="header-cart-item-info">
                      Size: {item.size}
                    </span>

                    <span className="header-cart-item-info">
                      {item.quantity} x ${Number(item.price).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="w-full">
              <div className="header-cart-total w-full p-tb-40">
                Total: ${Number(total).toFixed(2)}
              </div>

              <div className="header-cart-buttons flex-w w-full">
                <Link
                  to="/checkout"
                  className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10"
                  onClick={hideCartHendler}
                >
                  Check Out
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
