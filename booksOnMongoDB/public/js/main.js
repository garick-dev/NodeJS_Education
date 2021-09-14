const formGenreEl = document.forms.formGenre;
const formAuthorEl = document.forms.formAuthor;
const formBookEl = document.forms.formBook;


const genreBtnEl = document.querySelector(".genre_btn");
const authorBtnEl = document.querySelector(".author_btn");
const bookBtnEl = document.querySelector(".book_btn");

const authorListEl = document.querySelector("select[name=author]");
const genreListEl = document.querySelector("select[name=genre]");




genreBtnEl.addEventListener("click", (ev) => {
    ev.preventDefault();
       if (formGenreEl.classList.contains("hidden")) {
    formGenreEl.classList.remove("hidden");
    }
    else formGenreEl.classList.add("hidden");
});

formGenreEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post("/genres", formData);
    if (data.status != "Invalid data") {
        getDataToOptionGenre();
        return;
    }
    else {
        console.log("Invalid data");
        return;
    }
});

authorBtnEl.addEventListener("click", (ev) => {
    ev.preventDefault();
    if(formAuthorEl.classList.contains("hidden")) {
    formAuthorEl.classList.remove("hidden");
    }
    else formAuthorEl.classList.add("hidden");
});

formAuthorEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post("/authors", formData);
    if (data.status != "Invalid data") {
        getDataToOptionAuthor();
    
        return;
    }
    else {
        console.log("Invalid data");
        return;
    }
    
});

// Create option

const getDataToOptionGenre = async () => {
    let dataGenre = "";
    let resultGenre = "";
     dataGenre = await axios.get("genre");
   
       for (let i = 0; i < dataGenre.data.length; i++) { 
       
        resultGenre +=`<option value="${dataGenre.data[i]._id}">${dataGenre.data[i].name}</option>`;        
    }
    genreListEl.innerHTML = resultGenre;
}

const getDataToOptionAuthor = async () => {
    let dataAuthor = "";    
    let resultAuthor = "";
    dataAuthor = await axios.get("author");
       for (let i = 0; i < dataAuthor.data.length; i++) {
        resultAuthor += `<option value="${dataAuthor.data[i]._id}">${dataAuthor.data[i].name}</option>`;
    }
    authorListEl.innerHTML = resultAuthor;
  }

bookBtnEl.addEventListener("click", async (ev) => {
    ev.preventDefault(); 
    if (formBookEl.classList.contains("hidden")) {
        formBookEl.classList.remove("hidden");
    }
    else formBookEl.classList.add("hidden");
   
});

formBookEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);   
    const { data } = await axios.post("/books", formData);
    console.log(data);
});

getDataToOptionGenre();
getDataToOptionAuthor();

