// Cart logic. Products and payment links live in products.js.

const byId = Object.fromEntries(MENU.flatMap(c => c.items).map(i => [i.id, i]));
const ils = n => "₪" + n;
// Put {amount} in a payment link in products.js if bit/PayBox ever support it.
const payLink = (base, total) => base.replace("{amount}", total);

// The cart survives a page refresh; drop ids that are no longer on the menu.
const cart = {};
try {
  const saved = JSON.parse(localStorage.getItem("cart") || "{}");
  for (const k in saved) if (byId[k] && saved[k] > 0) cart[k] = saved[k];
} catch {}
const save = () => { try { localStorage.setItem("cart", JSON.stringify(cart)); } catch {} };

const totalOf = () => Object.keys(cart).reduce((s, k) => s + cart[k] * byId[k].price, 0);

function renderMenu() {
  document.getElementById("menu").innerHTML = MENU.filter(c => c.items.length).map(c => `
    <section class="cat">
      <h2 class="cat-title">${c.cat}</h2>
      <div class="items">${c.items.map(i => `
        <div class="item">
          <div><div class="name">${i.name}</div>${i.desc ? `<div class="desc">${i.desc}</div>` : ""}</div>
          <div class="price">${ils(i.price)}</div>
          <div class="qty" data-id="${i.id}"></div>
        </div>`).join("")}
      </div>
    </section>`).join("") + `
    <div class="age"><span class="no18">18+</span><span>מכירת אלכוהול מתחת לגיל 18 אסורה</span></div>`;
}

function qtyControl(id) {
  const n = cart[id] || 0;
  return (n ? `<button class="btn-round btn-minus" data-act="-" data-id="${id}" aria-label="הורדה">−</button><span class="n">${n}</span>` : "")
    + `<button class="btn-round btn-add" data-act="+" data-id="${id}" aria-label="הוספה">+</button>`;
}

function render() {
  document.querySelectorAll("#menu .qty").forEach(q => q.innerHTML = qtyControl(q.dataset.id));
  const ids = Object.keys(cart);
  const count = ids.reduce((s, k) => s + cart[k], 0);
  const total = totalOf();
  document.getElementById("count").textContent = count;
  document.getElementById("total").textContent = ils(total);
  document.getElementById("sumTotal").textContent = ils(total);
  document.getElementById("openCart").disabled = !count;
  document.getElementById("payBit").href = payLink(PAY.bit, total);
  document.getElementById("payBox").href = payLink(PAY.paybox, total);
  document.getElementById("payHint").textContent =
    `בלחיצה על הכפתור הסכום (${total}) מועתק אוטומטית. הדביקו אותו באפליקציה והראו את אישור התשלום בבר.`;
  document.getElementById("lines").innerHTML = ids.map(k => `
    <div class="line">
      <span class="nm">${byId[k].name}${byId[k].desc ? ` · ${byId[k].desc}` : ""}</span>
      <span class="qty">${qtyControl(k)}</span>
      <span class="sub">${ils(cart[k] * byId[k].price)}</span>
    </div>`).join("");
  if (!count) toggle(false);
  save();
}

function toggle(open) {
  document.getElementById("sheet").hidden = !open;
  document.getElementById("scrim").hidden = !open;
}

document.addEventListener("click", e => {
  const b = e.target.closest("[data-act]");
  if (!b) return;
  const id = b.dataset.id;
  cart[id] = (cart[id] || 0) + (b.dataset.act === "+" ? 1 : -1);
  if (cart[id] <= 0) delete cart[id];
  render();
});
document.getElementById("openCart").onclick = () => toggle(true);
document.getElementById("closeCart").onclick = () => toggle(false);
document.getElementById("scrim").onclick = () => toggle(false);
document.getElementById("clear").onclick = () => { for (const k in cart) delete cart[k]; render(); };
document.addEventListener("keydown", e => { if (e.key === "Escape") toggle(false); });
document.querySelectorAll(".pay a").forEach(a => a.addEventListener("click", () => {
  navigator.clipboard?.writeText(String(totalOf())).catch(() => {});
}));

renderMenu();
render();
