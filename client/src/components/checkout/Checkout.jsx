import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BagContext } from "../../context/bagContext";
import styles from "./Checkout.module.css";
import * as shippingService from "../../services/shippingService";
import * as orderService from "../../services/orderService";

export default function Checkout() {
  const { bag, removeItem, updateItem, clearBag } = useContext(BagContext);
  const subTotal = bag.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [offices, setOffices] = useState([]);
  const [office, setOffice] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    shippingService.getCities().then((data) => {
      setCities(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!city.id) {
      return;
    }
    setLoading(true);
    shippingService.getOffices(city.id).then((data) => {
      setOffices(data);
      setLoading(false);
    });
  }, [city]);

  const cityHandler = (e) => {
    const id = e.target.options[e.target.selectedIndex].id;
    const name = e.target.value;
    setCity({ id, name });
    setShippingPrice("");
    setErrors({ ...errors, city: "" });
  };

  const officeHandler = (e) => {
    const id = e.target.options[e.target.selectedIndex].id;
    const name = e.target.value;
    setOffice({ id, name });
    setErrors({ ...errors, office: "" });
    setShippingPrice(4.99);
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!city) {
      newErrors.city = "City is required.";
    }
    if (!office) {
      newErrors.office = "Office is required.";
    }
    if (!firstName) {
      newErrors.firstName = "First name is required.";
    }
    if (!lastName) {
      newErrors.lastName = "Last name is required.";
    }
    if (!phone) {
      newErrors.phone = "Phone is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    const order = {
      status: "Unfulfilled",
      city: city.name,
      office: office.name,
      firstName,
      lastName,
      phone,
      products: bag,
      shippingPrice,
      total: subTotal + shippingPrice,
    };
    try {
      const result = await orderService.createOrder(order);
      clearBag();
      alert(
        `Order placed successfully! Your order number is #${result._createdOn}`
      );
      navigate("/");
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  return (
    <form
      className="bg0 p-t-75 p-b-85"
      onSubmit={(e) => {
        submitHandler(e);
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
            <div className="m-l-25 m-r--38 m-lr-0-xl">
              <div className="wrap-table-shopping-cart">
                <table className="table-shopping-cart">
                  <thead>
                    <tr className="table_head">
                      <th className="column-1">Product</th>
                      <th className="column-2"></th>
                      <th className="column-3">Price</th>
                      <th className="column-4">Quantity</th>
                      <th className="column-5">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bag.map((item, index) => (
                      <tr key={index} className="table_row">
                        <td className="column-1">
                          <div className="how-itemcart1">
                            <img src={item.image} alt="IMG" />
                          </div>
                        </td>
                        <td className="column-2">
                          <div className="row">
                            <span> {item.name}</span>
                            <span>Color: {item.color}</span>
                            <span>Size: {item.size}</span>
                          </div>
                        </td>
                        <td className="column-3">$ {item.price.toFixed(2)}</td>
                        <td className="column-4">
                          <div className="wrap-num-product flex-w m-l-auto m-r-0">
                            <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                              <i
                                className="fs-16 zmdi zmdi-minus"
                                onClick={() =>
                                  updateItem(index, item.quantity - 1)
                                }
                              ></i>
                            </div>

                            <input
                              className="mtext-104 cl3 txt-center num-product"
                              type="number"
                              name="quantity"
                              value={Number(item.quantity)}
                              onChange={(e) =>
                                updateItem(index, Number(e.target.value))
                              }
                            />

                            <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                              <i
                                className="fs-16 zmdi zmdi-plus"
                                onClick={() =>
                                  updateItem(index, item.quantity + 1)
                                }
                              ></i>
                            </div>
                          </div>
                        </td>
                        <td className="column-5">
                          ${" "}
                          {(bag[index].price * bag[index].quantity).toFixed(2)}
                          <i
                            style={{ cursor: "pointer" }}
                            className="fs-16 hov-cl1 p-l-20 zmdi zmdi-delete"
                            onClick={() => removeItem(index)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
            <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
              <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>

              <div className="flex-w flex-t bor12 p-b-13">
                <div className="size-208">
                  <span className="stext-110 cl2">Subtotal:</span>
                </div>

                <div className="size-209">
                  <span className="mtext-110 cl2">$ {subTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex-w flex-t bor12 p-t-15 p-b-30">
                <div className="size-208 w-full-ssm">
                  <span className="stext-110 cl2">Shipping:</span>
                </div>

                <div className="size-209 p-r-18 p-r-0-sm w-full-ssm">
                  {shippingPrice != "" && (
                    <div className="size-209">
                      <span className="mtext-110 cl2">
                        $ {Number(shippingPrice).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {!shippingPrice && (
                    <p className="stext-111 cl6 p-t-2">
                      There are no shipping address selected. We ship only to
                      Bulgaria by ECONT courier. Please select city and office
                      of ECONT, or contact us if you need any help.
                    </p>
                  )}
                  <div className="p-t-15">
                    {loading && <p>Loading...</p>}
                    <div className="p-tb-10" hidden={loading}>
                      {errors.city && (
                        <div className={styles.error}>{errors.city}</div>
                      )}
                      <select
                        className="stext-111 cl8 plh3 size-111 p-lr-15"
                        name="city"
                        id="city"
                        onChange={cityHandler}
                      >
                        <option value="">Choose a city</option>
                        {cities.length > 0 &&
                          cities.map((city) => (
                            <option
                              key={city.id}
                              id={city.id}
                              value={city.name}
                            >
                              {city.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    {city && (
                      <div className="p-tb-10" hidden={loading}>
                        {errors.office && (
                          <div className={styles.error}>{errors.office}</div>
                        )}
                        {offices.length <= 0 && (
                          <p className="stext-111 cl6 p-t-2">
                            There are no offices available in{" "}
                            <strong>{city.name}</strong>. Please check other
                            city, or contact us if you need any help.
                          </p>
                        )}
                        {offices.length > 0 && (
                          <select
                            className="stext-111 cl8 plh3 size-111 p-lr-15"
                            name="office"
                            id="office"
                            onChange={officeHandler}
                          >
                            <option value="">Choose a office</option>
                            {offices.length > 0 &&
                              offices.map((office) => (
                                <option
                                  key={office.id}
                                  id={office.id}
                                  value={office.name}
                                >
                                  {office.name}
                                </option>
                              ))}
                          </select>
                        )}
                      </div>
                    )}
                    {errors.firstName && (
                      <div className={styles.error}>{errors.firstName}</div>
                    )}

                    <div className="bor8 bg0 m-tb-10">
                      <input
                        className="stext-111 cl8 plh3 size-111 p-lr-15"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => {
                          const firstName = e.target.value;
                          setFirstName(firstName);
                          if (firstName.length > 0) {
                            setErrors({ ...errors, firstName: "" });
                          } else {
                            setErrors({
                              ...errors,
                              firstName: "First name is required.",
                            });
                          }
                        }}
                      />
                    </div>
                    {errors.lastName && (
                      <div className={styles.error}>{errors.lastName}</div>
                    )}
                    <div className="bor8 bg0 m-tb-10">
                      <input
                        className="stext-111 cl8 plh3 size-111 p-lr-15"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => {
                          const lastName = e.target.value;
                          setLastName(lastName);
                          if (lastName.length > 0) {
                            setErrors({ ...errors, lastName: "" });
                          } else {
                            setErrors({
                              ...errors,
                              lastName: "Last name is required.",
                            });
                          }
                        }}
                      />
                    </div>
                    {errors.phone && (
                      <div className={styles.error}>{errors.phone}</div>
                    )}
                    <div className="bor8 bg0 m-tb-10">
                      <input
                        className="stext-111 cl8 plh3 size-111 p-lr-15"
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => {
                          const phone = e.target.value;
                          setPhone(phone);
                          if (phone.length > 0) {
                            setErrors({ ...errors, phone: "" });
                          } else {
                            setErrors({
                              ...errors,
                              phone: "Phone is required.",
                            });
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-w flex-t p-t-27 p-b-33">
                <div className="size-208">
                  <span className="mtext-101 cl2">Total:</span>
                </div>

                <div className="size-209 p-t-1">
                  <span className="mtext-110 cl2">
                    $ {Number(subTotal + shippingPrice).toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
