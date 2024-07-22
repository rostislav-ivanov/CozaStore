import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Animate from "react-smooth";

import Spinner from "../spinner/Spinner";

import * as productService from "../../services/productService";
import ProductItem from "../productItem/ProductItem";

const pageSize = 4;

export default function ProductLists() {
  const category = useParams().category || "";

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextProducts, setNextProducts] = useState([]);
  const [previewProducts, setPreviewProducts] = useState([]);

  useEffect(() => {
    console.log(category);
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await productService.getAllProducts(
          category,
          1,
          pageSize
        );
        setProducts(products);
        setLoading(false);
      } catch (error) {
        alert(`Error: ${error.message}`);
        setLoading(false);
      }
    };

    const fetchProductsCount = async () => {
      try {
        const count = await productService.getProductsCount(category);
        const totalPages = Math.ceil(count / pageSize);
        setPage(1);
        setTotalPages(totalPages);
        if (totalPages > 1) {
          prefetchPage(2);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();
    fetchProductsCount();
  }, [category]);

  const prefetchPage = (p) => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getAllProducts(
          category,
          p,
          pageSize
        );
        if (p > page) {
          setNextProducts(products);
        } else {
          setPreviewProducts(products);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    fetchProducts();
  };

  const previewHandler = () => {
    if (page > 1) {
      setNextProducts(products);
      setProducts(previewProducts);
      if (page - 1 > 1) {
        prefetchPage(page - 2);
      }
      setPage(page - 1);
    }
  };

  const nextHandler = () => {
    if (page < totalPages) {
      setPreviewProducts(products);
      setProducts(nextProducts);
      if (page + 1 < totalPages) {
        prefetchPage(page + 2);
      }
      setPage(page + 1);
    }
  };

  return (
    <section className="bg0 p-t-23 p-b-140">
      {loading && <Spinner />}
      <Animate
        key={page + category}
        to="1"
        from="0"
        duration={2500}
        attributeName="opacity"
      >
        <div className={`container ${loading && "loadingOverlay"}`}>
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
            {products.map((product) => (
              <ProductItem key={product._id} {...product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex-c-m flex-w w-full p-t-45">
              <button
                className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
                onClick={previewHandler}
                disabled={page === 1}
              >
                Preview
              </button>
              <button
                className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04 ms-4"
                onClick={nextHandler}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </Animate>
    </section>
  );
}
