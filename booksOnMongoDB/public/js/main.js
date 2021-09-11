const formGenreEl = document.forms.formGenre;
const formAuthorEl = document.forms.formAuthor;
const formBookEl = document.forms.formBook;


const genreBtnEl = document.querySelector(".genre_btn");
const authorBtnEl = document.querySelector(".author_btn");
const bookBtnEl = document.querySelector(".book_btn");

genreBtnEl.addEventListener("click", (ev) => {
    ev.preventDefault();
    formGenreEl.classList.remove("hidden");
});

formGenreEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post("/genres", formData);
});



authorBtnEl.addEventListener("click", (ev) => {
    ev.preventDefault();
    formAuthorEl.classList.remove("hidden");
});

formAuthorEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post("/authors", formData);
});


const authorListEl = document.querySelector("select[name=author]");
const genreListEl = document.querySelector("select[name=genre]");
let dataAuthor;
let dataGenre;
const get = async () => {

     dataAuthor = await axios.get("author");
     dataGenre = await axios.get("genre");
     for (let i = 0; i < dataAuthor.data.length; i++) {    
        authorListEl.innerHTML += `<option value="${dataAuthor.data[i]._id}">${dataAuthor.data[i].name}</option>`;
       }
       for (let j = 0; j < dataGenre.data.length; j++) {  
        genreListEl.innerHTML += `<option value="${dataGenre.data[j]._id}">${dataGenre.data[j].name}</option>`;
       }
}


bookBtnEl.addEventListener("click", async (ev) => {
    ev.preventDefault(); 
     formBookEl.classList.remove("hidden");
});

formBookEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);   
    const { data } = await axios.post("/books", formData);
});

get();