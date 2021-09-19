const searchEl = document.forms.search;
const filterEl = document.querySelector("select[name=filter]");
const bikeContainerEl = document.querySelector(".product-outer");

const getAndInsertBike = async () => {
    const { data } = await axios.get("/bike")
    console.log(data);
    let imgLink = "";
    let name,price,brend,model,year,type,color,wheel, about = "";
    let resultHtml = "";
    for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        imgLink = data[i].image;
        name = data[i].name;
        price = data[i].price;
        brend = data[i].brends[0].name;
        model = data[i].model;
        year = data[i].year;
        type = data[i].types[0].name;
        color = data[i].colors[0].name;
        wheel = data[i].wheels[0].name;
        about = data[i].about;
        resultHtml +=  ` <div class="product">
       <img src="${imgLink}" alt="">
       <div class="product__title">${name} ${brend} ${model} ${type} ${color} ${wheel} (${year})</div>
       <div class="product__price">Цена: ${price} p.</div>
       <div class="product__about">${about}</div>
     </div>
     `
    }
    bikeContainerEl.innerHTML = resultHtml;
    
}
getAndInsertBike();