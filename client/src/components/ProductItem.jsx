import { useState } from "react";
import QuickView from "./QuickView/QuickView";

export default function ProductItem({ _id, name, images, price }) {
  const [showQuickView, setShowQuickView] = useState(false);

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
            <QuickView _id={_id} closeQuickView={closeQuickView} />
          )}
        </div>
        <div className="block2-txt flex-w flex-t p-t-14">
          <div className="block2-txt-child1 flex-col-l ">
            <a
              href="product-detail.html"
              className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
            >
              {name}
            </a>

            <span className="stext-105 cl3">${price.toFixed(2)}</span>
          </div>

          <div className="block2-txt-child2 flex-r p-t-3">
            <a
              href="#"
              className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
            >
              <img
                className="icon-heart1 dis-block trans-04"
                src="/images/icons/icon-heart-01.png"
                alt="ICON"
              />
              <img
                className="icon-heart2 dis-block trans-04 ab-t-l"
                src="/images/icons/icon-heart-02.png"
                alt="ICON"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
