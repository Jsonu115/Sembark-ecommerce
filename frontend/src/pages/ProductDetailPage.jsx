import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProduct } from "../api";
import { Loading } from "../components/Loading";
import { ErrorState } from "../components/ErrorState";
import { useCart } from "../state/CartContext";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        setLoading(true);
        const p = await fetchProduct(id);
        setProduct(p);
      } catch (err) {
        console.error(err);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <Loading />;
  if (error || !product) return <ErrorState message={error ?? "Product not found"} />;

  const totalPrice = product.price * quantity;

  const dec = () =>
    setQuantity((q) => {
      const next = q - 1;
      return next < 1 ? 1 : next;
    });

  const inc = () => setQuantity((q) => q + 1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  return (
    <div>
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Products
      </button>

      <section className="detail-layout">
        <div className="detail-image-wrap">
          <img src={product.image} alt={product.title} className="detail-image" />
        </div>

        <div className="detail-info">
          <div className="detail-category-pill">{product.category}</div>
          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-rating-row">
            <span className="detail-rating-score">
              {product.rating?.rate?.toFixed(1) ?? "0.0"}
            </span>
            <span className="detail-rating-count">
              ({product.rating?.count ?? 0} reviews)
            </span>
          </div>

          <div className="detail-price">₹{product.price.toFixed(2)}</div>

          <h3 className="detail-subheading">Description</h3>
          <p className="detail-description">{product.description}</p>

          <div className="detail-qty-row">
            <span>Quantity</span>
            <div className="qty-control">
              <button onClick={dec}>−</button>
              <span>{quantity}</span>
              <button onClick={inc}>+</button>
            </div>
          </div>

          <button className="btn-primary detail-add-btn" onClick={handleAddToCart}>
            🛒 Add to Cart
          </button>

          <div className="detail-total">
            <span>Total Price:</span>
            <span className="detail-total-value">₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </section>
    </div>
  );
};
