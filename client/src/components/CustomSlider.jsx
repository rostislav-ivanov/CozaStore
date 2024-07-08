import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import anime from "animejs";

const CustomSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    anime({
      targets: '.layer-slick1[data-appear="fadeInDown"]',
      opacity: [0, 1],
      translateY: ["-100%", "0%"],
      delay: 0,
      easing: "easeInOutQuad",
    });
    anime({
      targets: '.layer-slick1[data-appear="fadeInUp"]',
      opacity: [0, 1],
      translateY: ["100%", "0%"],
      delay: 800,
      easing: "easeInOutQuad",
    });
    anime({
      targets: '.layer-slick1[data-appear="zoomIn"]',
      opacity: [0, 1],
      scale: [0.8, 1],
      delay: 1600,
      easing: "easeInOutQuad",
    });

    anime({
      targets: '.layer-slick1[data-appear="rollIn"]',
      opacity: [0, 1],
      translateX: ["-100%", "0%"],
      delay: 0,
      easing: "easeInOutQuad",
    });
    anime({
      targets: '.layer-slick1[data-appear="lightSpeedIn"]',
      opacity: [0, 1],
      translateX: ["100%", "0%"],
      delay: 800,
      easing: "easeInOutQuad",
    });
    anime({
      targets: '.layer-slick1[data-appear="slideInUp"]',
      opacity: [0, 1],
      translateY: ["100%", "0%"],
      delay: 1600,
      easing: "easeInOutQuad",
    });

    anime({
      targets: '.layer-slick1[data-appear="rotateInDownLeft"]',
      opacity: [0, 1],
      rotate: ["-45deg", "0deg"],
      delay: 0,
      easing: "easeInOutQuad",
    });
    anime({
      targets: '.layer-slick1[data-appear="rotateInUpRight"]',
      opacity: [0, 1],
      rotate: ["45deg", "0deg"],
      delay: 800,
      easing: "easeInOutQuad",
    });
    anime({
      targets: '.layer-slick1[data-appear="rotateIn"]',
      opacity: [0, 1],
      rotate: ["360deg", "0deg"],
      delay: 1600,
      easing: "easeInOutQuad",
    });
  }, []);

  return (
    <section className="section-slide">
      <div className="wrap-slick1">
        <Slider {...settings}>
          <div
            className="item-slick1"
            style={{ backgroundImage: "url(images/slide-01.jpg)" }}
          >
            <div className="container h-full">
              <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                <div
                  className="layer-slick1 animated visible-false"
                  data-appear="fadeInDown"
                >
                  <span className="ltext-101 cl2 respon2">
                    Women Collection 2018
                  </span>
                </div>
                <div
                  className="layer-slick1 animated visible-false"
                  data-appear="fadeInUp"
                >
                  <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                    NEW SEASON
                  </h2>
                </div>
                <div
                  className="layer-slick1 animated visible-false"
                  data-appear="zoomIn"
                >
                  <a
                    href="product.html"
                    className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="item-slick1"
            style={{ backgroundImage: "url(images/slide-02.jpg)" }}
          >
            <div className="container h-full">
              <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                <div
                  className="layer-slick1 animated visible-false"
                  data-appear="rollIn"
                >
                  <span className="ltext-101 cl2 respon2">Men New-Season</span>
                </div>
                <div
                  className="layer-slick1 animated visible-false"
                  data-appear="lightSpeedIn"
                >
                  <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                    Jackets & Coats
                  </h2>
                </div>
                <div
                  className="layer-slick1 animated visible-false"
                  data-appear="slideInUp"
                >
                  <a
                    href="product.html"
                    className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="item-slick1"
            style={{ backgroundImage: "url(images/slide-03.jpg)" }}
          >
            <div className="container h-full">
              <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                <div
                  className="layer-slick1 animated visible-false"
                  data-appear="rotateInDownLeft"
                >
                  <span className="ltext-101 cl2 respon2">
                    Men Collection 2018
                  </span>
                </div>
                <div
                  className="layer-slick1 animated visible-false"
                  data-appear="rotateInUpRight"
                >
                  <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                    New arrivals
                  </h2>
                </div>
                <div
                  className="layer-slick1 animated visible-false"
                  data-appear="rotateIn"
                >
                  <a
                    href="product.html"
                    className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default CustomSlider;
