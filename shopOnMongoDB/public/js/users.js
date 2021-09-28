const searchEl = document.forms.search;
const filterEl = document.forms.filter;
const bikeContainerEl = document.querySelector(".product-outer");
const filterCategoryEl = document.querySelector("select[name=filterCategory]");
const filterPriceEl = document.querySelector("select[name=filterPrice]");

const sortByPriceMinToMax = (data) => { 
  return _.sortBy(data, ['price']) 
};
const sortByPriceMaxToMin = (data) => { 
  return _.sortBy(data, ['price']).reverse(); 
};

const filterForPrice = (data) => {
  filterPriceEl.addEventListener("change", async (ev) => {
    const optionDataPrice = ev.target.options[ev.target.selectedIndex].value;

       if ( optionDataPrice === "priceUp") {
      const sortData = sortByPriceMinToMax(data);
      render(sortData);
  }
      else {
        const sortData = sortByPriceMaxToMin(data);
        render(sortData);
      }
});
}
const filterCategory = async () => {
  filterCategoryEl.addEventListener("change", async (ev) => {
    const optionDataCategory = ev.target.options[ev.target.selectedIndex].innerText;    
        const data = await getBike();   
        let filterCategoryArray = [];
      for (let item in data) { 
        let name = "";
        for (let key in data[item].categories) {
            name = data[item].categories[key].name; 
            if ( name.includes(optionDataCategory)) {
              filterCategoryArray.push(data[item]);
              break;
            }
          }     
        } 
        render(filterCategoryArray); 
        filterForPrice(filterCategoryArray);
      });
 }
const getAndInsertBike = async () => {
    const { data } = await axios.get("/bike");
    render(data);    
    filterForPrice(data);
}
const getBike = async () => {
    const { data } = await axios.get("/bike");
    return data;
}
const render = (data) => { 
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
filterCategory();
render();