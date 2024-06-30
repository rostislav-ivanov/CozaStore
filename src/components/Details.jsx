import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductById(id)
      .then((product) => setProduct(product))
      .catch(() => navigate("/NotFound", { replace: true }));
  }, [id]);

  return (
    <div>
      <h1> {product._id} </h1>
      <h1> {product.name} </h1>
      <h1> {product.image} </h1>
      <h1> {product.description} </h1>
      <h1> {product.price} </h1>
      <h1> {product.category} </h1>
      <h1> {product.stock} </h1>
    </div>
  );
}
