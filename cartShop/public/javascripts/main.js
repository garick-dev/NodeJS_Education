const buttonEl = document.querySelectorAll(".btn-post-data-cart");
let cartEl1 = document.querySelector(".cart-product-1");
let cartEl2 = document.querySelector(".cart-product-2");
let cartEl3 = document.querySelector(".cart-product-3");

const products = [
  {
    id: "1",
    count: 1,
    name: "Сумка гучи",
    price: "19092",
  },
  { id: "2", count: 1, name: "Сумка прадо", price: "19292" },
  {
    id: "3",
    count: 1,
    name: "Сумка луивитон",
    price: "19392",
  },
];
cartToFront = "";

const setToCart = (cart) => {
  const resetCart = JSON.stringify(cart);
  localStorage.setItem("cart", resetCart);
};

const getCartItem = () => {
  const cartItem = localStorage.getItem("cart") || "[]";
  const getCartItem = JSON.parse(cartItem);
  return getCartItem;
};

const addToCart = (id) => {
  const cart = getCartItem();

  const searchItem = cart.findIndex((val) => val.id === id);

  if (searchItem === -1) {
    // if localStorage is clear
    const searchProducts = products.find((val) => val.id === id);
    cart.push(searchProducts);
    const indexProductLocalStorage = cart.findIndex((val) => val.id === id);
    cartToFront = `<h2>${cart[indexProductLocalStorage].name}, ${cart[indexProductLocalStorage].count}</h2>`;
  } else {
    let sumCountProduct = 1;
    sumCountProduct += cart[searchItem].count++;
    cartToFront = `<h2>${cart[searchItem].name}, ${sumCountProduct}</h2>`;
  }

  setToCart(cart);
};

const renderCart = (id) => {
  if (id === "1") {
    cartEl1.innerHTML = cartToFront;
  } else if (id === "2") {
    cartEl2.innerHTML = cartToFront;
  } else if (id === "3") {
    cartEl3.innerHTML = cartToFront;
  }
};

buttonEl.forEach((el) => {
  el.addEventListener("click", (ev) => {
    const { id } = ev.target.dataset;
    addToCart(id);
    renderCart(id);
  });
});
