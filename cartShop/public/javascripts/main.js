const buttonEl = document.querySelectorAll(".btn-post-data-cart");
const btnPayEl = document.querySelector(".btn-to-pay");
// let cartEl = document.querySelector(".cart-product");
let cartEl1 = document.querySelector(".cart-product1");
let cartEl2 = document.querySelector(".cart-product2");
let cartEl3 = document.querySelector(".cart-product3");
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

const setToCart = (cart, id) => {
  const itemCartString = JSON.stringify(cart);
  localStorage.setItem(id, itemCartString);
};

const getCartItem = (id) => {
  const cartItem = localStorage.getItem(id) || "[]";
  const itemCartObject = JSON.parse(cartItem);
  return itemCartObject;
};

const removeItemCart = (id) => {
  localStorage.removeItem(id);
};

const addToCart = (id) => {
  const cart = getCartItem(id);

  const searchItem = cart.findIndex((val) => val.id === id);

  if (searchItem === -1) {
    // if localStorage is clear
    const searchProducts = products.find((val) => val.id === id);
    cart.push(searchProducts);
  } else {
    sumCountProduct += cart[searchItem].count++;
  }

  setToCart(cart, id);
};

const renderCart = (id) => {
  const cart = getCartItem(id);
  let cartToFront = "";
  for (let item of cart) {
    cartToFront = `<h2 class='id-product-${item.id}'>${item.name}, ${item.count}</h2> <button class='btn-increment' data-id=${item.id}> + </button> <button class='btn-decrement' data-id=${item.id}> - </button> </button> <button class='btn-delete' data-id=${item.id}> Delete </button>`;
  }
  if (id === "1") {
    cartEl1.innerHTML = cartToFront;
  } else if (id === "2") {
    cartEl2.innerHTML = cartToFront;
  } else if (id === "3") {
    cartEl3.innerHTML = cartToFront;
  }

  // cartEl.innerHTML = cartToFront;

  const btnIncrementEl = document.querySelectorAll(".btn-increment");
  const btnDecrementEl = document.querySelectorAll(".btn-decrement");
  const btnDeleteItemEl = document.querySelectorAll(".btn-delete");

  btnIncrementEl.forEach((el) => {
    el.addEventListener("click", (ev) => {
      const { id } = ev.target.dataset;

      const findIndexCart = cart.findIndex((val) => val.id === id);
      cart[findIndexCart].count++;
      setToCart(cart, id);
      renderCart(id);
    });
  });
  btnDecrementEl.forEach((el) => {
    el.addEventListener("click", (ev) => {
      const { id } = ev.target.dataset;

      const findIndexCart = cart.findIndex((val) => val.id === id);
      cart[findIndexCart].count--;
      setToCart(cart, id);
      renderCart(id);
    });
  });
  btnDeleteItemEl.forEach((el) => {
    el.addEventListener("click", (ev) => {
      const { id } = ev.target.dataset;
      removeItemCart(id);
      renderCart(id);
    });
  });
};

// const counterProducts = () => {};

buttonEl.forEach((el) => {
  el.addEventListener("click", (ev) => {
    cart.style.display = "block";
    const { id } = ev.target.dataset;
    addToCart(id);
    renderCart(id);
    // counterProducts();
  });
});

btnPayEl.addEventListener("click", async (ev) => {
  const cart = getCartItem();
  const data = await axios.post("/pay/storage", cart);
});
