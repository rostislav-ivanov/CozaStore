import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import formatDate from "../../utils/convertISOtoDate";
import * as orderService from "../../services/orderService";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const statusColors = {
    Unfulfilled: "text-secondary",
    Canceled: "text-danger",
    Fulfilled: "text-primary",
    Received: "text-success",
    Returned: "text-danger",
  };

  useEffect(() => {
    orderService
      .getOrders()
      .then((orders) => {
        setOrders(orders);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <Container className="my-5">
      {orders.length < 1 && (
        <div className="text-center mt-5">
          <h5>You have no orders</h5>
          <Nav.Link as={Link} to="/products">
            <div className="stext-106 cl6 hov1 my-4">Shop now</div>
          </Nav.Link>
        </div>
      )}

      {orders.length > 0 && (
        <>
          <Row className="mx-2 my-3">
            <Col lg="3">
              <strong>Date</strong>
            </Col>
            <Col lg="3">
              <strong>Order</strong>
            </Col>
            <Col lg="3">
              <strong>Status</strong>
            </Col>
            <Col lg="2">
              <strong>Total</strong>
            </Col>
          </Row>
          <Accordion
            style={{ "--bs-accordion-btn-padding-x": "0" }}
            className="opacity-75"
          >
            {orders.map((order, index) => (
              <Accordion.Item
                key={order._id}
                eventKey={index}
                className="border-3 border-secondary"
              >
                <Accordion.Header>
                  <Col lg="3">
                    <strong>{formatDate(order._createdOn)}</strong>
                  </Col>
                  <Col lg="3">
                    <strong>#{order._createdOn}</strong>
                  </Col>
                  <Col lg="3">
                    <strong className={statusColors[order.status]}>
                      {order.status}
                    </strong>
                  </Col>
                  <Col lg="2">
                    <strong>$ {order.total.toFixed(2)}</strong>
                  </Col>
                </Accordion.Header>

                <Accordion.Body>
                  {order.products.map((product) => (
                    <div key={product._id}>
                      {/* <!-- Product Start --> */}
                      <Row className="mb-5">
                        <Col md="5" lg="3" xl="3">
                          <Nav.Link as={Link} to={`/details/${product._id}`}>
                            <div className="product-img">
                              <img
                                src={product.image}
                                className="img-fluid w-50"
                                alt=""
                              />
                            </div>
                          </Nav.Link>
                        </Col>
                        <Col
                          md="7"
                          lg="9"
                          xl="9"
                          className="d-flex flex-column"
                        >
                          <p>{product.name}</p>
                          <span>Size: {product.size}</span>
                          <span>Color: {product.color}</span>
                          <span>Price: $ {product.price.toFixed(2)}</span>
                          <div className="flex-grow-1"></div>
                          <div className="d-flex justify-content-between">
                            <span>Quantity: {product.quantity}</span>
                            <span>
                              $ {(product.price * product.quantity).toFixed(2)}
                            </span>
                          </div>
                        </Col>
                      </Row>
                      {/* <!-- Product End --> */}
                    </div>
                  ))}

                  <hr />
                  <div className="d-flex justify-content-between mb-3">
                    <span>Subtotal:</span>
                    <span className="mb-0">
                      $ {(order.total - order.shippingPrice).toFixed(2)}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Shipping:</span>
                    <span className="mb-0">$ {order.shippingPrice}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between my-3 fs-4">
                    <span>Total:</span>$ {order.total.toFixed(2)}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </>
      )}
    </Container>
  );
}

/* Unfulfilled
Canceled
Fulfilled
Received
Returned */
