import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";
import * as productService from "../../services/productService";
import { BagContext } from "../../context/bagContext";
import styles from "./Details.module.css";
import Cart from "../cart/Cart";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    images: [],
    price: 0,
    description: "",
    material: "",
    sizes: [],
    size: "",
    colors: [],
    color: "",
    quantity: 1,
  });
  const [loading, setLoading] = useState(true);
  const { addItem } = useContext(BagContext);
  const [errors, setErrors] = useState({});
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setLoading(true);
    productService
      .getDetailsById(id)
      .then((data) => {
        setProduct((prev) => ({ ...prev, ...data }));
        setLoading(false);
      })
      .catch(() => navigate("/NotFound", { replace: true }));
  }, [id]);

  const validateInputs = () => {
    const newErrors = {};
    if (!product.size) newErrors.size = "Size is required.";
    if (!product.color) newErrors.color = "Color is required.";
    if (product.quantity <= 0)
      newErrors.quantity = "Quantity must be greater than 0.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addItemHandler = (product) => {
    if (!validateInputs()) return;
    const item = {
      _id: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: product.size,
      color: product.color,
      quantity: product.quantity,
    };
    addItem(item);
    setShowCart(true);
  };

  const minusQuantityHandler = () => {
    if (product.quantity > 1) {
      setProduct({ ...product, quantity: product.quantity - 1 });
    }
  };

  const plusQuantityHandler = () => {
    setProduct({ ...product, quantity: product.quantity + 1 });
  };

  const hideCartHendler = () => {
    setShowCart(false);
    navigate("/products");
  };

  return (
    <>
      <section className="sec-product-detail bg0 p-t-65 p-b-60">
        {loading && <div>Loading...</div>}
        {!loading && !product && <div>Product not found</div>}
        {!loading && product && (
          <>
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-lg-7 p-b-30">
                  <div className="p-l-25 p-r-30 p-lr-0-lg">
                    <Carousel fade>
                      {product.images &&
                        product.images.map((image, index) => (
                          <Carousel.Item
                            className="block2-pic hov-img0"
                            key={index}
                          >
                            <img src={image} alt="IMG-PRODUCT" />
                          </Carousel.Item>
                        ))}
                    </Carousel>
                  </div>
                </div>

                <div className="col-md-6 col-lg-5 p-b-30">
                  <div className="p-r-50 p-t-5 p-lr-0-lg">
                    <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                      {product.name}
                    </h4>

                    <span className="mtext-106 cl2"> ${product.price} </span>

                    <div className="p-t-33">
                      <div className="flex-w">
                        <div className="size-203  respon6">Size</div>

                        <select
                          name="size"
                          id="size"
                          onChange={(e) =>
                            setProduct({ ...product, size: e.target.value })
                          }
                        >
                          <option value="">Choose a size</option>
                          {product.sizes &&
                            product.sizes.map((size) => (
                              <option key={size}>{size}</option>
                            ))}
                        </select>
                      </div>
                      {errors.size && (
                        <div className={styles.error}>{errors.size}</div>
                      )}

                      <div className="flex-w p-t-20">
                        <div className="size-203  respon6">Color</div>
                        <select
                          name="color"
                          id="color"
                          onChange={(e) =>
                            setProduct({ ...product, color: e.target.value })
                          }
                        >
                          <option value="">Choose a color</option>
                          {product.colors &&
                            product.colors.map((color) => (
                              <option key={color}>{color}</option>
                            ))}
                        </select>
                      </div>
                      {errors.color && (
                        <div className={styles.error}>{errors.color}</div>
                      )}

                      <div className="flex-w flex-r-m p-t-20">
                        <div className="size-204 flex-w flex-m respon6-next">
                          <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                            <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                              <i
                                className="fs-16 zmdi zmdi-minus"
                                onClick={minusQuantityHandler}
                              ></i>
                            </div>

                            <input
                              className="mtext-104 cl3 txt-center num-product"
                              type="number"
                              id="quantity"
                              name="quantity"
                              value={product.quantity}
                              onChange={(e) =>
                                setProduct({
                                  ...product,
                                  quantity: Number(e.target.value),
                                })
                              }
                            />

                            <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                              <i
                                className="fs-16 zmdi zmdi-plus"
                                onClick={plusQuantityHandler}
                              ></i>
                            </div>
                          </div>
                          {errors.quantity && (
                            <div className={styles.error}>
                              {errors.quantity}
                            </div>
                          )}
                          <button
                            className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail m-t-20"
                            onClick={() => {
                              addItemHandler(product);
                            }}
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                      <div className="flex-m bor9 p-r-10 m-r-11">
                        <a
                          href="#"
                          className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                          data-tooltip="Add to Wishlist"
                        >
                          <i className="zmdi zmdi-favorite"></i>
                        </a>
                      </div>

                      <a
                        href="#"
                        className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                        data-tooltip="Facebook"
                      >
                        <i className="fa fa-facebook"></i>
                      </a>

                      <a
                        href="#"
                        className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                        data-tooltip="Twitter"
                      >
                        <i className="fa fa-twitter"></i>
                      </a>

                      <a
                        href="#"
                        className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                        data-tooltip="Google Plus"
                      >
                        <i className="fa fa-google-plus"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bor10 m-t-50 p-t-43 p-b-40">
                {/* <!-- Tab01 --> */}
                <div className="tab01">
                  {/* <!-- Nav tabs --> */}
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item p-b-10">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#description"
                        role="tab"
                      >
                        Description
                      </a>
                    </li>

                    <li className="nav-item p-b-10">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#information"
                        role="tab"
                      >
                        Material
                      </a>
                    </li>
                  </ul>

                  {/* <!-- Tab panes --> */}
                  <div className="tab-content p-t-43">
                    {/* <!-- - --> */}
                    <div
                      className="tab-pane fade show active"
                      id="description"
                      role="tabpanel"
                    >
                      <div className="how-pos2 p-lr-15-md">
                        <p className="stext-102 cl6">{product.description}</p>
                      </div>
                    </div>

                    {/* <!-- - --> */}
                    <div
                      className="tab-pane fade"
                      id="information"
                      role="tabpanel"
                    >
                      <div className="row">
                        <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                          {product.material}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
      {showCart && <Cart hideCartHendler={hideCartHendler} />}
    </>
  );
}
