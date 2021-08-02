const buttonEl = document.querySelectorAll(".btn-post-data-cart");
const btnPayEl = document.querySelector(".btn-to-pay");
let cartEl = document.querySelector(".cart-product");
let cart = document.querySelector(".cart");

const btnIncrementEl = document.querySelectorAll("#btn-increment");
const btnDecrementEl = document.querySelectorAll("#btn-decrement");
const btnDeleteItemEl = document.querySelectorAll("#btn-delete");

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
  const itemCartString = JSON.stringify(cart);
  localStorage.setItem("cart", itemCartString);
};

const getCartItem = () => {
  const cartItem = localStorage.getItem("cart") || "[]";
  const itemCartObject = JSON.parse(cartItem);
  return itemCartObject;
};

const removeItemCart = (id) => {
  const cart = getCartItem();
  const searchItemIdx = cart.findIndex((val) => val.id === id);
  cart.splice(searchItemIdx, 1);
  setToCart(cart);
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

const deleteToCart = (id) => {
  const cart = getCartItem();

  const searchItem = cart.findIndex((val) => val.id === id);
  if (searchItem === -1 || cart[searchItem].count <= 1) {
    // if localStorage is clear
    return;
  } else {
    sumCountProduct += cart[searchItem].count--;
  }
  setToCart(cart);
};

const renderCart = () => {
  const cart = getCartItem();
  let cartToFront = "";
  for (let item of cart) {
    cartToFront += `<h2 class='id-product-${item.id}'>${item.name}, ${item.count}</h2> <button class='btn-increment' data-id=${item.id}> + </button> <button class='btn-decrement' data-id=${item.id}> - </button> </button> <button class='btn-delete' data-id=${item.id}> Delete </button>`;
  }
  cartEl.innerHTML = cartToFront;
};

const counterProducts = () => {
  document.addEventListener("click", (ev) => {
    if (ev.target && ev.target.classList.contains("btn-increment")) {
      const { id } = ev.target.dataset;
      addToCart(id);
      renderCart();
    }
  });

  document.addEventListener("click", (ev) => {
    if (ev.target && ev.target.classList.contains("btn-decrement")) {
      const { id } = ev.target.dataset;
      deleteToCart(id);
      renderCart();
    }
  });
  document.addEventListener("click", (ev) => {
    if (ev.target && ev.target.classList.contains("btn-delete")) {
      const { id } = ev.target.dataset;

      removeItemCart(id);
      renderCart();
    }
  });
};

buttonEl.forEach((el) => {
  el.addEventListener("click", (ev) => {
    cart.style.display = "block";
    const { id } = ev.target.dataset;
    addToCart(id);
    renderCart();
  });
});

counterProducts();

btnPayEl.addEventListener("click", async (ev) => {
  const cart = getCartItem();
  const { data } = await axios.post("/pay/storage", cart);
});
