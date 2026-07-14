/* ==========================================================================
   Contour Coffeeworks — shared product data + cart store
   Cart persists in localStorage. No backend: checkout is a front-end demo.
   ========================================================================== */

const PRODUCTS = {
  "contour-dripper": {
    id: "contour-dripper",
    catalogNo: "002",
    name: "The Contour Dripper",
    price: 58,
    desc: "A single-cup pour-over dripper shaped around one idea: even extraction without babysitting the pour. The spiral rib slows water just enough that a middling pour still lands close to a careful one.",
    icon: "dripper",
    hasDial: true,
    variants: [
      { label: "Material", options: ["Ceramic", "Glass"] },
      { label: "Size", options: ["1-Cup", "2-Cup"] }
    ],
    specs: [
      ["Material", "Stoneware ceramic or borosilicate glass"],
      ["Capacity", "1-Cup: 350ml · 2-Cup: 500ml"],
      ["Filter", "Fits Filter Papers No. 2"],
      ["Dimensions", "12 × 12 × 9 cm"],
      ["Care", "Dishwasher safe, top rack"]
    ]
  },
  "steady-kettle": {
    id: "steady-kettle",
    catalogNo: "014",
    name: "The Steady Kettle",
    price: 89,
    desc: "Gooseneck spout, weighted base. Built so a slow, thin pour is the easy pour, on the stovetop or over induction.",
    icon: "kettle",
    hasDial: false,
    variants: [
      { label: "Finish", options: ["Matte Black", "Brushed Steel"] },
      { label: "Capacity", options: ["0.6L", "1L"] }
    ],
    specs: [
      ["Material", "18/8 stainless steel"],
      ["Heat source", "Gas, induction, electric coil"],
      ["Capacity", "0.6L or 1L"],
      ["Spout", "Gooseneck, fixed"],
      ["Care", "Hand wash recommended"]
    ]
  },
  "even-grinder": {
    id: "even-grinder",
    catalogNo: "031",
    name: "The Even Grinder",
    price: 210,
    desc: "A conical burr hand grinder with 40 click-stops, so yesterday's setting is today's setting. Steel burrs, no static, no fines pile-up.",
    icon: "grinder",
    hasDial: false,
    variants: [
      { label: "Wood", options: ["Walnut", "Ash"] }
    ],
    specs: [
      ["Burr", "Conical steel, 38mm"],
      ["Settings", "40 click-stops"],
      ["Capacity", "30g per load"],
      ["Body", "Walnut or ash, brass fittings"],
      ["Care", "Wipe burrs dry, do not submerge"]
    ]
  },
  "tasting-cups": {
    id: "tasting-cups",
    catalogNo: "047",
    name: "Tasting Flight Cups",
    price: 42,
    desc: "Set of four unglazed stoneware cups, made to hold heat and get out of a coffee's way. Sized for comparing pours side by side.",
    icon: "cups",
    hasDial: false,
    variants: [],
    specs: [
      ["Set size", "4 cups"],
      ["Material", "Unglazed stoneware"],
      ["Capacity", "90ml each"],
      ["Care", "Hand wash, unglazed interior"]
    ]
  },
  "filter-papers": {
    id: "filter-papers",
    catalogNo: "052",
    name: "Filter Papers, No. 2",
    price: 14,
    desc: "Unbleached papers cut for the Contour Dripper. No papery taste, no rinse required before brewing.",
    icon: "filters",
    hasDial: false,
    variants: [
      { label: "Count", options: ["100ct", "200ct"] }
    ],
    specs: [
      ["Fit", "Contour Dripper, 1-Cup and 2-Cup"],
      ["Material", "Unbleached natural pulp"],
      ["Count", "100 or 200 sheets"],
      ["Rinse", "Not required before brewing"]
    ]
  }
};

const CART_KEY = "contour_cart_v1";

const Store = {
  read(){
    try{
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    }catch(e){
      return [];
    }
  },
  write(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    Store.updateBadge();
  },
  // line = { productId, variant (string label), qty }
  add(productId, variant, qty){
    const cart = Store.read();
    const existing = cart.find(l => l.productId === productId && l.variant === variant);
    if(existing){
      existing.qty += qty;
    }else{
      cart.push({ productId, variant, qty });
    }
    Store.write(cart);
  },
  updateQty(index, qty){
    const cart = Store.read();
    if(!cart[index]) return;
    if(qty <= 0){
      cart.splice(index, 1);
    }else{
      cart[index].qty = qty;
    }
    Store.write(cart);
  },
  remove(index){
    const cart = Store.read();
    cart.splice(index, 1);
    Store.write(cart);
  },
  clear(){
    Store.write([]);
  },
  count(){
    return Store.read().reduce((sum, l) => sum + l.qty, 0);
  },
  subtotal(){
    return Store.read().reduce((sum, l) => {
      const p = PRODUCTS[l.productId];
      return sum + (p ? p.price * l.qty : 0);
    }, 0);
  },
  updateBadge(){
    document.querySelectorAll("[data-cart-count]").forEach(el => {
      el.textContent = Store.count();
    });
  }
};

document.addEventListener("DOMContentLoaded", Store.updateBadge);

function money(n){
  return "$" + n.toFixed(2);
}

function showToast(message){
  let toast = document.querySelector(".toast");
  if(!toast){
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}
