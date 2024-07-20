import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Row, Col } from "react-bootstrap";

import * as contactService from "../../services/contactService";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = async (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pattern for basic email validation
    e.preventDefault();
    if (!email) {
      setError("Please enter an email address.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    try {
      const responce = await contactService.subscribe({ email });
      alert("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      alert(`Failed to subscribe: ${error.message}`);
    }
  };

  return (
    <footer className="text-light bg-dark py-4">
      <Container>
        <Row>
          <Col className="col-3">
            <h4 className="mb-3">Categories</h4>

            <Nav className="flex-column">
              <Nav.Link as={Link} to="/products/women">
                Women
              </Nav.Link>
              <Nav.Link as={Link} to="/products/man">
                Men
              </Nav.Link>
              <Nav.Link as={Link} to="/products/bag">
                Bag
              </Nav.Link>
              <Nav.Link as={Link} to="/products/shoes">
                Shoes
              </Nav.Link>
              <Nav.Link as={Link} to="/products/watches">
                Watches
              </Nav.Link>
            </Nav>
          </Col>

          <Col className="col-5">
            <h4 className="mb-3">Get In Touch</h4>

            <p className="stext-107 cl7 size-201">
              Any questions? Let us know in store at g.k. Zone B-5, Alexander
              Stamboliyski Blvd. 101 A, 1303 Sofia or call us on +359 888 888
              888 or send us an email to
              <Nav as={Link} to="/contact-us">
                cozastore@gmail.com
              </Nav>
            </p>
          </Col>

          <Col className="col-4">
            <h4 className="mb-3">Newsletter</h4>

            <form onSubmit={onSubmitHandler}>
              <div className="wrap-input1 w-full p-b-4">
                <input
                  className="input1 bg-none plh1 stext-107 cl7"
                  type="text"
                  name="email"
                  placeholder="your email here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="focus-input1 trans-04"></div>
              </div>
              {error && <div className="text-danger">{error}</div>}

              <div className="p-t-18">
                <button className="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                  Subscribe
                </button>
              </div>
            </form>
          </Col>
        </Row>
        <Row className="pt-2">
          <p className="stext-107 cl6 txt-center">
            Copyright &copy;
            <script>document.write(new Date().getFullYear());</script>
            All rights reserved | Made with
            <i className="fa fa-heart-o" aria-hidden="true"></i> by
            <a href="https://colorlib.com" target="_blank">
              Colorlib
            </a>{" "}
            &amp; distributed by
            <a href="https://themewagon.com" target="_blank">
              ThemeWagon
            </a>
          </p>
        </Row>
      </Container>
    </footer>
  );
}
