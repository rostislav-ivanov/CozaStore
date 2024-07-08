import Carousel from "react-bootstrap/Carousel";

function CustomSlider() {
  return (
    <Carousel fade>
      <Carousel.Item
        style={{
          backgroundImage: "url(images/slide-01.jpg)",
          height: "50vh",
        }}
      >
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item
        style={{
          backgroundImage: "url(images/slide-02.jpg)",
          height: "50vh",
        }}
      >
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item
        style={{
          backgroundImage: "url(images/slide-03.jpg)",
          height: "50vh",
        }}
      >
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CustomSlider;
