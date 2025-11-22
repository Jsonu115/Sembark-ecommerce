import React from "react";
import { useCart } from "../state/CartContext";
import { Link, useNavigate } from "react-router-dom";

export const CartPage = () => {
  const { items, subtotal, totalItems, updateQuantity, removeItem, clear } =
    useCart();
  const navigate = useNavigate();

  const handleProceed = () => {
    alert("This is a demo – checkout not implemented.");
  };

  if (items.length === 0) {
    return (
      <div>
        <div className="page-heading">Shopping Cart</div>
        <p className="state-message">Your cart is empty.</p>
        <Link to="/" className="btn-primary">
          ← Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-heading">Shopping Cart</div>
      <p className="cart-subheading">
        {totalItems} item(s) in your cart
      </p>

      <section className="cart-layout">
        <div className="cart-items">
          {items.map((item) => {
            const lineTotal = item.product.price * item.quantity;
            const dec = () =>
              updateQuantity(item.product.id, item.quantity - 1);
            const inc = () =>
              updateQuantity(item.product.id, item.quantity + 1);

            return (
              <article key={item.product.id} className="cart-item">
                <div className="cart-item-image-wrap">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="cart-item-image"
                  />
                </div>

                <div className="cart-item-main">
                  <h3 className="cart-item-title">{item.product.title}</h3>
                  <div className="cart-item-category">
                    Category: {item.product.category}
                  </div>
                  <div className="cart-item-price">
                    ${item.product.price.toFixed(2)}
                  </div>
                </div>

                <div className="cart-item-qty">
                  <div className="qty-control">
                    <button onClick={dec}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={inc}>+</button>
                  </div>
                </div>

                <div className="cart-item-total">
                  ${lineTotal.toFixed(2)}
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => removeItem(item.product.id)}
                  aria-label="Remove item"
                >
                  🗑
                </button>
              </article>
            );
          })}
        </div>

        <aside className="cart-summary">
          <h2 className="cart-summary-title">Order Summary</h2>
          <div className="cart-summary-row">
            <span>Items:</span>
            <span>{totalItems}</span>
          </div>
          <div className="cart-summary-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping:</span>
            <span className="cart-summary-free">FREE</span>
          </div>
          <hr className="cart-summary-divider" />
          <div className="cart-summary-row cart-summary-total">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button className="btn-primary cart-summary-btn" onClick={handleProceed}>
            💳 Proceed to Checkout
          </button>

          <button
            className="cart-summary-secondary"
            onClick={() => navigate("/")}
          >
            ← Continue Shopping
          </button>

          <button className="cart-summary-clear" onClick={clear}>
            Clear Cart
          </button>
        </aside>
      </section>
    </div>
  );
};
