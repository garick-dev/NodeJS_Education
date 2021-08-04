const formEl = document.forms.formToPay;

formEl.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const cartItem = localStorage.getItem("cart") || "[]";
  const formData = new FormData(ev.target);
  let formDataGetAllValues = [];
  for (let item of formData.entries()) {
    formDataGetAllValues.push(item);
  }

  const { data } = await axios.post("/pay", {
    myForm: formDataGetAllValues,
    localStorage: cartItem,
  });
});
