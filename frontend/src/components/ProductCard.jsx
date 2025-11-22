import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  return (
    <article className="product-card">
      <div className="product-tag">{product.category}</div>
      <Link to={`/products/${product.id}`} className="product-image-wrap">
        <img src={product.image} alt={product.title} className="product-image" />
      </Link>

      <Link to={`/products/${product.id}`} className="product-title-link">
        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>
      </Link>

      <div className="product-meta">
        <div className="product-rating">
          <span className="product-rating-score">
            {product.rating?.rate?.toFixed(1) ?? "0.0"}
          </span>
          <span className="product-rating-count">
            ({product.rating?.count ?? 0})
          </span>
        </div>
        <span className="product-price">₹{product.price.toFixed(2)}</span>
      </div>

      <Link to={`/products/${product.id}`} className="btn-primary btn-full">
        View Details
      </Link>
    </article>
  );
};
