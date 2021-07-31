const buttonEl = document.querySelectorAll(".btn-post-data-cart");
const btnPayEl = document.querySelector(".btn-to-pay");
let cartEl = document.querySelector(".cart-product");
let cart = document.querySelector(".cart");

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

let sumCountProduct = 1;

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
  } else {
    sumCountProduct += cart[searchItem].count++;
  }

  setToCart(cart);
};

const renderCart = () => {
  const cart = getCartItem();
  let cartToFront = "";
  for (let item of cart) {
    cartToFront += `<h2 class='id-product-${item.id}'>${item.name}, ${item.count}</h2> <button class='btn-increment' data-id=${item.id}> + </button> <button class='btn-decrement' data-id=${item.id}> - </button>`;
  }
  cartEl.innerHTML = cartToFront;
  const btnIncrementEl = document.querySelectorAll(".btn-increment");
  const btnDecrementEl = document.querySelectorAll(".btn-decrement");

  btnIncrementEl.forEach((el) => {
    el.addEventListener("click", (ev) => {
      const { id } = ev.target.dataset;

      const findIndexCart = cart.findIndex((val) => val.id === id);
      cart[findIndexCart].count++;
      setToCart(cart);
      renderCart();
    });
  });
  btnDecrementEl.forEach((el) => {
    el.addEventListener("click", (ev) => {
      const { id } = ev.target.dataset;

      const findIndexCart = cart.findIndex((val) => val.id === id);
      cart[findIndexCart].count--;
      setToCart(cart);
      renderCart();
    });
  });
};

buttonEl.forEach((el) => {
  el.addEventListener("click", (ev) => {
    cart.style.display = "block";
    const { id } = ev.target.dataset;
    addToCart(id);
    renderCart(id);
  });
});

btnPayEl.addEventListener("click", async (ev) => {
  const cart = getCartItem();
  const data = await axios.post("/pay/storage", cart);
});
