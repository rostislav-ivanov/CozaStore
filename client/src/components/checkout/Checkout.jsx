import { useContext, useState } from "react";
import { BagContext } from "../../context/bagContext";

export default function Checkout() {
  const { bag, removeItem, updateItem } = useContext(BagContext);
  const subTotal = bag.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <form className="bg0 p-t-75 p-b-85">
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
                  <p className="stext-111 cl6 p-t-2">
                    There are no shipping methods available. Please double check
                    your address, or contact us if you need any help.
                  </p>

                  <div className="p-t-15">
                    <span className="stext-112 cl8">Calculate Shipping</span>

                    <div className="rs1-select2 rs2-select2 bor8 bg0 m-b-12 m-t-9">
                      <select className="js-select2" name="time">
                        <option>Select a country...</option>
                        <option>USA</option>
                        <option>UK</option>
                      </select>
                      <div className="dropDownSelect2"></div>
                    </div>

                    <div className="bor8 bg0 m-b-12">
                      <input
                        className="stext-111 cl8 plh3 size-111 p-lr-15"
                        type="text"
                        name="state"
                        placeholder="State /  country"
                      />
                    </div>

                    <div className="bor8 bg0 m-b-22">
                      <input
                        className="stext-111 cl8 plh3 size-111 p-lr-15"
                        type="text"
                        name="postcode"
                        placeholder="Postcode / Zip"
                      />
                    </div>

                    <div className="flex-w">
                      <div className="flex-c-m stext-101 cl2 size-115 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer">
                        Update Totals
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-w flex-t p-t-27 p-b-33">
                <div className="size-208">
                  <span className="mtext-101 cl2">Total:</span>
                </div>

                <div className="size-209 p-t-1">
                  <span className="mtext-110 cl2">$79.65</span>
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
