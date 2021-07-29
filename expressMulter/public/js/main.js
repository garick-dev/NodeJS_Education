const formEl = document.forms.formData;

formEl.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const formData = new FormData(ev.target);
  const { data } = await axios.post("/form", formData);

  console.log(formData);
  console.log("Response:", data);
});
