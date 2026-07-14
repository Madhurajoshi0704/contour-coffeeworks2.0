/* ==========================================================================
   Contour Coffeeworks — cart page controller
   No backend: "checkout" is a demo confirmation that clears the cart.
   ========================================================================== */

function renderCart(){
  const content = document.getElementById("cart-content");
  const cart = Store.read();

  if(cart.length === 0){
    content.innerHTML = `
      <div class="empty-state">
        <h3>Your bag is empty</h3>
        <p>Nothing in here yet — the instruments are waiting in the catalog.</p>
        <a href="index.html#catalog" class="btn">Browse the catalog</a>
      </div>
    `;
    return;
  }

  const rows = cart.map((line, index) => {
    const p = PRODUCTS[line.productId];
    if(!p) return "";
    return `
      <tr>
        <td>
          <div class="cart-item-info">
            <div class="cart-item-art">${renderIcon(p.icon)}</div>
            <div>
              <div class="cart-item-name">${p.name}</div>
              <div class="cart-item-meta">${line.variant}</div>
              <button class="cart-remove" data-remove="${index}">Remove</button>
            </div>
          </div>
        </td>
        <td class="mono">${money(p.price)}</td>
        <td>
          <div class="stepper">
            <button type="button" data-qty-minus="${index}" aria-label="Decrease quantity">−</button>
            <span>${line.qty}</span>
            <button type="button" data-qty-plus="${index}" aria-label="Increase quantity">+</button>
          </div>
        </td>
        <td class="mono">${money(p.price * line.qty)}</td>
      </tr>
    `;
  }).join("");

  const subtotal = Store.subtotal();
  const shipping = subtotal > 0 ? 8 : 0;
  const total = subtotal + shipping;

  content.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <div class="cart-summary">
      <div class="summary-row"><span>Subtotal</span><span class="mono">${money(subtotal)}</span></div>
      <div class="summary-row"><span>Shipping</span><span class="mono">${money(shipping)}</span></div>
      <div class="summary-row total"><span>Total</span><span>${money(total)}</span></div>
      <button class="btn btn-ember btn-block" id="checkout-btn" style="margin-top:18px;">Checkout</button>
      <div class="checkout-confirm" id="checkout-confirm">
        This is a demo storefront — no real order was placed or paid for. Your bag has been cleared.
      </div>
    </div>
  `;

  content.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      Store.remove(Number(btn.dataset.remove));
      renderCart();
    });
  });
  content.querySelectorAll("[data-qty-minus]").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.qtyMinus);
      Store.updateQty(i, Store.read()[i].qty - 1);
      renderCart();
    });
  });
  content.querySelectorAll("[data-qty-plus]").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.qtyPlus);
      Store.updateQty(i, Store.read()[i].qty + 1);
      renderCart();
    });
  });

  const checkoutBtn = document.getElementById("checkout-btn");
  checkoutBtn.addEventListener("click", () => {
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = "Order placed";
    document.getElementById("checkout-confirm").classList.add("show");
    setTimeout(() => {
      Store.clear();
      renderCart();
    }, 1600);
  });
}

document.addEventListener("DOMContentLoaded", renderCart);
