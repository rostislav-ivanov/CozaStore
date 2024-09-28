import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Container, Accordion, Nav, Row, Col } from "react-bootstrap";
import Spinner from "../spinner/Spinner";

import formatDate from "../../utils/convertISOtoDate";
import { AuthContext } from "../../context/authContext";
import * as orderService from "../../services/orderService";

export default function Orders() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const statusColors = {
    Неизпълнена: "text-secondary",
    Отменена: "text-danger",
    Изпълнена: "text-primary",
    Получена: "text-success",
    Върната: "text-danger",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const orders = await orderService.getOrders();
        setOrders(orders);
      } catch (error) {
        if (error == 401) {
          setAuth({});
          alert("User is not logged in");
          navigate("/login");
        } else {
          alert(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Container className="my-5">
      {loading && <Spinner />}
      <div className={`container ${loading && "loadingOverlay"}`}>
        {orders.length < 1 && (
          <div className="text-center mt-5">
            <h4 className="opacity-75">You have no orders</h4>
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
                  key={order.orderNumber}
                  eventKey={index}
                  className="border-3 border-secondary"
                >
                  <Accordion.Header>
                    <Col lg="3">
                      <strong>{order.createdOn}</strong>
                    </Col>
                    <Col lg="3">
                      <strong>#{order.orderNumber}</strong>
                    </Col>
                    <Col lg="3">
                      <strong className={statusColors[order.orderStatus]}>
                        {order.orderStatus}
                      </strong>
                    </Col>
                    <Col lg="2">
                      <strong>$ {order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Accordion.Header>

                  <Accordion.Body>
                    {order.products.map((product) => (
                      <div key={product.id}>
                        {/* <!-- Product Start --> */}
                        <Row className="mb-5">
                          <Col md="5" lg="3" xl="3">
                            <Nav.Link as={Link} to={`/details/${product.id}`}>
                              <div className="product-img">
                                <img
                                  src={product.imagePath}
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
                                ${" "}
                                {(product.price * product.quantity).toFixed(2)}
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
                        $ {(order.totalPrice - order.shippingPrice).toFixed(2)}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Shipping:</span>
                      <span className="mb-0">$ {order.shippingPrice}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between my-3 fs-4">
                      <span>Total:</span>$ {order.totalPrice.toFixed(2)}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </>
        )}
      </div>
    </Container>
  );
}

/* Unfulfilled
Canceled
Fulfilled
Received
Returned */
