const menu = [
  { id: 1, name: "Idly", price: 30, img: "images-_2_.jpg" },
  { id: 2, name: "Dosai", price: 40, img: "images (1).jpg" },
  { id: 3, name: "Poori", price: 50, img: "poori-puri-recipe.jpg" },
  { id: 4, name: "Tea", price: 15, img: "images (2).jpg" },
  { id: 5, name: "Coffee", price: 20, img: "WhatsApp-Image-2024-11-27-at-16.08.06.jpg" },
  { id: 6, name: "Vada", price: 10, img: "MeduVadai3-500x500.jpg" },
  { id: 7, name: "Pazhampori", price: 20, img: "360_F_358285233_zXZRYNhq5xq9Qeero41NeON4IHRccapS.jpg" },
  { id: 8, name: "Samosa", price: 15, img: "istockphoto-967110094-612x612.jpg" },
  { id: 9, name: "Pongal", price: 40, img: "pongal-ven-pongal-500x500.jpg" },
  { id: 10, name: "Puttu", price: 40, img: "images (3).jpg" },
  { id: 11, name: "Paruppu Poli", price: 10, img: "images (4).jpg" }
];

let cart = [];
let sales = Number(localStorage.getItem("sales")) || 0;
let todaySales = Number(localStorage.getItem("todaySales")) || 0;
let orders = Number(localStorage.getItem("orders")) || 0;

function renderMenu() {
  const menuList = document.getElementById("menuList");
  menuList.innerHTML = "";
  menu.forEach(item => {
    menuList.innerHTML += `
      <div class="menu-card" onclick="addToCart(${item.id})">
        <img src="${item.img}">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
      </div>
    `;
  });
}

function addToCart(id) {
  cart.push(menu.find(i => i.id === id));
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach(i => {
    total += i.price;
    cartList.innerHTML += `<li>${i.name} - ₹${i.price}</li>`;
  });
  document.getElementById("total").innerText = total;
}

function payNow() {
  document.getElementById("qrModal").style.display = "block";
  const total = cart.reduce((s, i) => s + i.price, 0);

  sales += total;
  todaySales += total;
  orders++;

  localStorage.setItem("sales", sales);
  localStorage.setItem("todaySales", todaySales);
  localStorage.setItem("orders", orders);

  document.getElementById("sales").innerText = sales;
  document.getElementById("todaySales").innerText = todaySales;
  document.getElementById("orders").innerText = orders;

  cart = [];
  renderCart();
}

function payCash() {
  const total = cart.reduce((s, i) => s + i.price, 0);
  if (total === 0) return alert("Cart is empty!");

  sales += total;
  todaySales += total;
  orders++;

  localStorage.setItem("sales", sales);
  localStorage.setItem("todaySales", todaySales);
  localStorage.setItem("orders", orders);

  document.getElementById("sales").innerText = sales;
  document.getElementById("todaySales").innerText = todaySales;
  document.getElementById("orders").innerText = orders;

  cart = [];
  renderCart();
}

function addMenuItem() {
  const name = itemName.value;
  const price = Number(itemPrice.value);
  const img = itemImg.value;

  if (!name || !price || !img) {
    alert("Fill all fields");
    return;
  }

  menu.push({ id: menu.length + 1, name, price, img });
  renderMenu();

  itemName.value = itemPrice.value = itemImg.value = "";
}

function closeQR() {
  document.getElementById("qrModal").style.display = "none";
}

function printBill() { window.print(); }

function clearCart() {
  cart = [];
  renderCart();
}

document.getElementById("sales").innerText = sales;
document.getElementById("todaySales").innerText = todaySales;
document.getElementById("orders").innerText = orders;

renderMenu();

