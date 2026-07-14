/* ==========================================================================
   Contour Coffeeworks — product page controller
   ========================================================================== */

(function(){
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id") || "contour-dripper";
  const product = PRODUCTS[productId] || PRODUCTS["contour-dripper"];

  // ---- basic fields -------------------------------------------------------
  document.title = `${product.name} — Contour Coffeeworks`;
  document.getElementById("product-catno").textContent = `No. ${product.catalogNo}`;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = money(product.price);
  document.getElementById("product-desc").textContent = product.desc;
  document.getElementById("product-icon").innerHTML = renderIcon(product.icon);

  // ---- spec sheet -----------------------------------------------------------
  const specRows = document.getElementById("spec-rows");
  product.specs.forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "spec-row";
    row.innerHTML = `<span>${label}</span><span>${value}</span>`;
    specRows.appendChild(row);
  });

  // ---- variant chips ----------------------------------------------------
  const selected = {};
  const groupsWrap = document.getElementById("variant-groups");
  product.variants.forEach(group => {
    selected[group.label] = group.options[0];
    const wrap = document.createElement("div");
    wrap.className = "option-group";
    const chips = group.options.map((opt, i) => `
      <button type="button" class="chip" data-group="${group.label}" data-value="${opt}" aria-pressed="${i === 0}">${opt}</button>
    `).join("");
    wrap.innerHTML = `<span class="option-label">${group.label}</span><div class="chip-row">${chips}</div>`;
    groupsWrap.appendChild(wrap);
  });
  groupsWrap.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if(!chip) return;
    const group = chip.dataset.group;
    selected[group] = chip.dataset.value;
    groupsWrap.querySelectorAll(`.chip[data-group="${group}"]`).forEach(c => {
      c.setAttribute("aria-pressed", c === chip ? "true" : "false");
    });
  });

  // ---- grind dial (signature element, dripper only) ----------------------
  if(product.hasDial){
    document.getElementById("dial-block").style.display = "block";

    const GRINDS = [
      { name: "Fine",          desc: "Faster extraction — pairs better with espresso gear than this dripper." },
      { name: "Medium-Fine",   desc: "The sweet spot for a 3–4 minute pour-over with the Contour Dripper." },
      { name: "Medium",        desc: "Still within range — expect a slightly faster, lighter-bodied cup." },
      { name: "Medium-Coarse", desc: "Extraction runs fast; good for a lighter roast that turns bitter easily." },
      { name: "Coarse",        desc: "Outside the recommended range for this dripper — try it on a French press instead." }
    ];

    const dialFace = document.getElementById("dial-face");
    const needle = document.getElementById("dial-needle");
    const arc = document.getElementById("dial-arc");
    const nameEl = document.getElementById("grind-name");
    const descEl = document.getElementById("grind-desc");

    const R = 52;
    const CIRC = 2 * Math.PI * R;
    arc.setAttribute("transform", "rotate(-90 66 66)");
    arc.setAttribute("stroke-dasharray", `0 ${CIRC}`);

    let currentAngle = -67.5; // starts at Medium-Fine, the recommended default

    function applyAngle(angle){
      currentAngle = Math.max(-135, Math.min(135, angle));
      needle.setAttribute("transform", `rotate(${currentAngle} 66 66)`);
      const frac = (currentAngle + 135) / 270;
      arc.setAttribute("stroke-dasharray", `${frac * CIRC} ${CIRC}`);
      const idx = Math.round(frac * (GRINDS.length - 1));
      nameEl.textContent = GRINDS[idx].name;
      descEl.textContent = GRINDS[idx].desc;
    }

    function angleFromEvent(clientX, clientY){
      const rect = dialFace.getBoundingClientRect();
      const scale = rect.width / 132; // viewBox units per px
      const cx = rect.left + 66 * scale;
      const cy = rect.top + 66 * scale;
      const dx = clientX - cx;
      const dy = clientY - cy;
      let raw = Math.atan2(dy, dx) * 180 / Math.PI; // 0 = right (east)
      let adjusted = raw + 90; // 0 = up
      if(adjusted > 180) adjusted -= 360;
      if(adjusted < -180) adjusted += 360;
      return adjusted;
    }

    let dragging = false;
    function start(e){
      dragging = true;
      dialFace.classList.add("dragging");
      move(e);
    }
    function move(e){
      if(!dragging) return;
      const point = e.touches ? e.touches[0] : e;
      applyAngle(angleFromEvent(point.clientX, point.clientY));
      e.preventDefault();
    }
    function end(){
      dragging = false;
      dialFace.classList.remove("dragging");
    }

    dialFace.addEventListener("mousedown", start);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    dialFace.addEventListener("touchstart", start, { passive: false });
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);

    dialFace.setAttribute("role", "slider");
    dialFace.setAttribute("tabindex", "0");
    dialFace.setAttribute("aria-label", "Grind size guide, from fine to coarse");
    dialFace.addEventListener("keydown", (e) => {
      if(e.key === "ArrowRight" || e.key === "ArrowUp"){ applyAngle(currentAngle + 13.5); e.preventDefault(); }
      if(e.key === "ArrowLeft"  || e.key === "ArrowDown"){ applyAngle(currentAngle - 13.5); e.preventDefault(); }
    });

    applyAngle(currentAngle);
  }

  // ---- quantity stepper ---------------------------------------------------
  let qty = 1;
  const qtyValue = document.getElementById("qty-value");
  document.getElementById("qty-minus").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    qtyValue.textContent = qty;
  });
  document.getElementById("qty-plus").addEventListener("click", () => {
    qty = Math.min(20, qty + 1);
    qtyValue.textContent = qty;
  });

  // ---- add to cart ---------------------------------------------------------
  document.getElementById("add-to-cart").addEventListener("click", () => {
    const variantLabel = Object.values(selected).join(" / ") || "Standard";
    Store.add(product.id, variantLabel, qty);
    const note = document.getElementById("add-note");
    note.textContent = `Added ${qty} × ${product.name} (${variantLabel}) to your bag.`;
    showToast("Added to bag");
  });
})();
