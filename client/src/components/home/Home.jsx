import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Carousel fade>
      <Carousel.Item className="block2-pic hov-img0">
        <img src="/images/slide-01.jpg" alt="IMG-PRODUCT" />

        <Carousel.Caption>
          <div className="container h-full">
            <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
              <span className="ltext-101 cl2 respon2">
                Women Collection 2018
              </span>
              <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                NEW SEASON
              </h2>
              <Link
                to="/products/women"
                className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="block2-pic hov-img0">
        <img src="/images/slide-02.jpg" alt="IMG-PRODUCT" />
        <Carousel.Caption>
          <div className="container h-full">
            <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
              <span className="ltext-101 cl2 respon2"> Men New-Season </span>
              <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                Jackets & Coats
              </h2>
              <Link
                to="/products/man"
                className="flex-c-m stext-101 cl0 size-101 bg1
                bor1 hov-btn1 p-lr-15 trans-04"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="block2-pic hov-img0">
        <img src="/images/slide-03.jpg" alt="IMG-PRODUCT" />
        <Carousel.Caption>
          <div className="container h-full">
            <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
              <span className="ltext-101 cl2 respon2">Men Collection 2018</span>
              <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                New arrivals
              </h2>
              <Link
                to="/products/man"
                className="flex-c-m stext-101 cl0 size-101 bg1
                bor1 hov-btn1 p-lr-15 trans-04"
              >
                {" "}
                Shop Now
              </Link>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;
