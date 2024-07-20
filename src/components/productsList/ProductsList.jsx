import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

import * as productService from "../../services/productService";
import ProductItem from "../productItem/ProductItem";

const pageSize = 4;

export default function ProductLists() {
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
        <div className="flex-w flex-sb-m p-b-52">
          <div className="flex-w flex-l-m filter-tope-group m-tb-10">
            <Nav.Link as={Link} to="/products">
              <div className="stext-106 cl6 hov1 m-r-32 m-tb-5">
                All Products
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/products/women">
              <div className="stext-106 cl6 hov1 m-r-32 m-tb-5">Women</div>
            </Nav.Link>
            <Nav.Link as={Link} to="/products/man">
              <div className="stext-106 cl6 hov1 m-r-32 m-tb-5">Men</div>
            </Nav.Link>
            <Nav.Link as={Link} to="/products/bag">
              <div className="stext-106 cl6 hov1 m-r-32 m-tb-5">Bag</div>
            </Nav.Link>
            <Nav.Link as={Link} to="/products/shoes">
              <div className="stext-106 cl6 hov1 m-r-32 m-tb-5">Shoes</div>
            </Nav.Link>
            <Nav.Link as={Link} to="/products/watches">
              <div className="stext-106 cl6 hov1 m-r-32 m-tb-5">Watches</div>
            </Nav.Link>
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
