const searchEl = document.forms.search;
const filterEl = document.querySelector("select[name=filter]");
const bikeContainerEl = document.querySelector(".product-outer");

const latinToRus = (str) => {

	const ru = new Map([
		[ 'a', 'а'], ['b','б'], [ 'v', 'в'], [ 'g', 'г'], ['d','д'], [ 'e','е'],
		[ 'e', 'є'], [ 'e', 'ё'], [ 'j', 'ж'], [ 'z', 'з'], [ 'i' , 'и'], [ 'yi', 'ї'], [ 'i', 'й'],
		[ 'k', 'к'], [ 'l' , 'л'], ['m', 'м'], [ 'n', 'н'], [ 'o', 'о'], [ 'p', 'п'], [ 'r', 'р'],
		[ 's' , 'с'], [ 't' , 'т'], [ 'u', 'у'], [ 'f', 'ф'], [ 'h' , 'х'], [ 'c' , 'ц'], ['ch' , 'ч'],
		[ 'sh' , 'ш'], ['shch' , 'щ'], [ 'y' , 'ы'], [ 'e' , 'э'], ['u', 'ю'], ['ya' , 'я'],
	]);

	str = str.replace(/[ъь]+/g, '');

	return Array.from(str)
		.reduce((s, l) =>
			s + (
                 ru.get(l)
				  || ru.get(l.toLowerCase()) === undefined && l
				  || ru.get(l.toLowerCase()).toUpperCase()
			  )
			, '');
}


const getAndInsertBike = async () => {
    const { data } = await axios.get("/bike")
    console.log(data);
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
        for (let key in data[item].specifications)
        {
            specifications += latinToRus(key) + "-" + data[item].specifications[key];
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