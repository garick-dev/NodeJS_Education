const formEl = document.forms.myForm;
const articleEl = document.querySelector(".articles");

const findArticle = async () => {
     const { data } = await axios.get("/article");
    articleEl.innerHTML =  data;
}
formEl.addEventListener ("submit", async (ev) => {  
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post("/", formData);
    articleEl.innerHTML = data;
});
findArticle();
