const buttonEl = document.querySelectorAll(".btn-post-data-cart");
let cartEl = document.querySelector(".cart-inner");

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
    const searchProducts = products.find((val) => val.id === id);
    cart.push(searchProducts);
    const cartSearchIndex = cart.findIndex((val) => val.id === id);

    cartToFront = `<h2>${cart[cartSearchIndex].name}, ${cart[cartSearchIndex].count}</h2>`;
    cartEl.innerHTML = cartToFront;
  } else {
    let sumCountProduct = cart[searchItem].count++;
    cartToFront = `<h2>${cart[searchItem].name}, ${sumCountProduct}</h2>`;
    cartEl.innerHTML = cartToFront;
  }
  setToCart(cart);
};

buttonEl.forEach((el) => {
  el.addEventListener("click", (ev) => {
    const { id } = ev.target.dataset;
    addToCart(id);
  });
});
