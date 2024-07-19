import { useState, useEffect, useContext } from "react";

import * as productService from "../../services/productService";
import ProductItem from "../productItem/ProductItem";
import { WishContext } from "../../context/wishContext";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function WishList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { wishList } = useContext(WishContext);

  useEffect(() => {
    setLoading(true);
    productService.getWishListProducts(wishList).then((products) => {
      setProducts(products);
      setLoading(false);
    });
  }, [wishList]);

  return (
    <section className="bg0 p-t-10 p-b-140">
      {wishList.length < 1 && (
        <div className="text-center mt-5 ">
          <h4 className="opacity-75">Your wish list is empty</h4>
          <Nav.Link as={Link} to="/products">
            <div className="stext-106 cl6 hov1 my-4">Shop now</div>
          </Nav.Link>
        </div>
      )}

      {wishList.length > 0 && (
        <div className="container">
          <h4 className="text-center py-3 opacity-75">Your Wish List</h4>
          <div className="row isotope-grid">
            {loading ? (
              <p>Loading...</p>
            ) : (
              products.map((product) => (
                <ProductItem key={product._id} {...product} />
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
}
