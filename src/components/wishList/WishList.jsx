import { useState, useEffect, useContext } from "react";

import * as productService from "../../services/productService";
import ProductItem from "../productItem/ProductItem";
import { WishContext } from "../../context/wishContext";
import { Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function WishList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { wishList } = useContext(WishContext);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishListProducts = async () => {
      try {
        setLoading(true);
        const products = await productService.getWishListProducts(wishList);
        setProducts(products);
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

    fetchWishListProducts();
  }, [wishList]);

  return (
    <section className="bg0 p-t-10 p-b-140">
      {wishList.length < 1 && (
        <div className="text-center mt-5 ">
          <h4 className="opacity-75">Your wishes list is empty</h4>
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
                <ProductItem key={product.id} {...product} />
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
}
