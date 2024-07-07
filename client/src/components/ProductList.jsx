import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import * as productService from "../services/productService";
import { Link, useParams } from "react-router-dom";

const pageSize = 4;

export default function ProductList() {
  const category = useParams().category || "";

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    productService.getProductsCount(category).then((count) => {
      setPage(1);
      setTotalPages(Math.ceil(count / pageSize));
    });
  }, [category]);

  useEffect(() => {
    setLoading(true);
    productService.getAllProducts(category, page, pageSize).then((products) => {
      setProducts(products);
      setLoading(false);
    });
  }, [category, page]);

  const previewHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextHandler = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <section className="bg0 p-t-23 p-b-140">
      <div className="container">
        <div className="p-b-10">
          <h3 className="ltext-103 cl5">Product Overview</h3>
        </div>
        <div className="flex-w flex-sb-m p-b-52">
          <div className="flex-w flex-l-m filter-tope-group m-tb-10">
            <Link to="/products">
              <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5">
                All Products
              </button>
            </Link>

            <Link to="/products/women">
              <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5">
                Women
              </button>
            </Link>
            <Link to="/products/man">
              <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5">
                Men
              </button>
            </Link>
            <Link to="/products/bag">
              <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5">
                Bag
              </button>
            </Link>
            <Link to="/products/shoes">
              <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5">
                Shoes
              </button>
            </Link>
            <Link to="/products/watches">
              <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5">
                Watches
              </button>
            </Link>
          </div>
        </div>
        <div className="row isotope-grid">
          {loading ? (
            <p>Loading...</p>
          ) : (
            products.map((product) => (
              <ProductItem key={product._id} {...product} />
            ))
          )}
        </div>
        <div className="flex-c-m flex-w w-full p-t-45">
          <button
            className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
            onClick={previewHandler}
            disabled={page === 1}
          >
            Preview
          </button>
          <button
            className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
            onClick={nextHandler}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
