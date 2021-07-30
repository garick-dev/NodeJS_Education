const formEl = document.forms.formToPay;

formEl.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const { data } = await axios.post("/pay", formData);
  console.log(data);
});
