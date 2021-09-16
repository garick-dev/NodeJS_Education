const searchEl = document.forms.search;
const filterEl = document.querySelector("select[name=filter]");
const bikeContainerEl = document.querySelector(".product-outer");

const getAndInsertBike = async () => {
    const { data } = await axios.get("/bike")
    let imgLink = "";
    let name,price,brend,model,year = "";
    let resultHtml = "";
    for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        imgLink = data[i].image;
        name = data[i].name;
        price = data[i].price;
        brend = data[i].brand.brend;
        model = data[i].brand.model;
        year = data[i].year;
        resultHtml +=  ` <div class="product">
       <img src="${imgLink}" alt="">
       <div class="product__title">${name} ${brend} ${model} (${year})</div>
       <div class="product__price">Цена: ${price}</div>
     </div>
     `
    }
    bikeContainerEl.innerHTML = resultHtml;
    
}
getAndInsertBike();