const searchEl = document.forms.search;
const filterEl = document.forms.filter;
// const filterCategoryEl = document.forms.filterCategory;
const bikeContainerEl = document.querySelector(".product-outer");
const filterCategoryEl = document.querySelector("select[name=filterCategory]");

filterCategoryEl.addEventListener("change", async (ev) => {
  const formData = ev.target.options[ev.target.selectedIndex].innerText;
    const { data } = await axios.post("/filter-category", formData);
    let imgLink, name,price,brend,model,year,type,color,wheel, about, specifications,resultHtml = "";
    console.log(data);
    // console.log(data[0].brends.name)
    for (let item in data) {
        imgLink = data[item].image;
        for (let key in data[item].categories) {
            name = data[item].categories[key].name; 
     }     
        price = data[item].price;
        brend = data[item].brends.name;
        model = data[item].model;
        year = data[item].year;
        type = data[item].types.name;
        color = data[item].colors.name;
        wheel = data[item].wheels.name;
        about = data[item].about;
        specifications = "";
        for (let key in data[item].specifications)
        {
            specifications += key + "-" + data[item].specifications[key] + ", ";
        }
         resultHtml +=  ` <div class="product">
       <img src="${imgLink}" alt="">
       <div class="product__title">${name} ${brend} ${model} ${type} ${color} ${wheel} (${year})</div>
       <div class="product__price">Цена: ${price} p.</div>
       <div class="product__about">${about}</div>
       <div class="product__specification">Характеристики: ${specifications}</div>
     </div>
     `
    }
    bikeContainerEl.innerHTML = resultHtml;
    specificationEl = document.querySelectorAll(".product__specification");

    specificationEl.forEach(element => {
       if (element.innerText === "Характеристики:" || element.innerText === "Характеристики: undefined") {
        element.classList.add("hidden");
       }
    });
})

const getAndInsertBike = async () => {
    const { data } = await axios.get("/bike")
    let imgLink, name,price,brend,model,year,type,color,wheel, about, specifications,resultHtml = "";
    for (let item in data) {
        imgLink = data[item].image;
        for (let key in data[item].categories) {
            name = data[item].categories[key].name; 
     }     
        price = data[item].price;
        brend = data[item].brends.name;
        model = data[item].model;
        year = data[item].year;
        type = data[item].types.name;
        color = data[item].colors.name;
        wheel = data[item].wheels.name;
        about = data[item].about;
        specifications = "";
        for (let key in data[item].specifications)
        {
            specifications += key + "-" + data[item].specifications[key] + ", ";
        }
         resultHtml +=  ` <div class="product">
       <img src="${imgLink}" alt="">
       <div class="product__title">${name} ${brend} ${model} ${type} ${color} ${wheel} (${year})</div>
       <div class="product__price">Цена: ${price} p.</div>
       <div class="product__about">${about}</div>
       <div class="product__specification">Характеристики: ${specifications}</div>
     </div>
     `
    }
    bikeContainerEl.innerHTML = resultHtml;
    specificationEl = document.querySelectorAll(".product__specification");

    specificationEl.forEach(element => {
       if (element.innerText === "Характеристики:" || element.innerText === "Характеристики: undefined") {
        element.classList.add("hidden");
       }
    });
    
}
getAndInsertBike();