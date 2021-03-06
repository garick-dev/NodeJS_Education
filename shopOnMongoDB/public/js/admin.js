const formCategoryEl = document.forms.formCategory;
const formBrendEl = document.forms.formBrend;
const formTypeEl = document.forms.formType;
const formColorEl = document.forms.formColor;
const formWheelsEl = document.forms.formWheels;
const formBikeEl = document.forms.formBike;
const formSpecificationEl = document.forms.formSpecification;


const categoryListEl = document.querySelector("select[name=categories]");
const brendListEl = document.querySelector("select[name=brends]");
const typeListEl = document.querySelector("select[name=types]");
const colorListEl = document.querySelector("select[name=colors]");
const wheelsListEl = document.querySelector("select[name=wheels]");


formCategoryEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post("admin/category", formData);
    if (data.status != "Invalid data") {
        getDataToOptionCategory();
        formCategoryEl.reset();
        return;
    }
    else {
        console.log("Invalid data");
        return;
    }
});
formBrendEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post("admin/brend", formData);
    if (data.status != "Invalid data") {
        getDataToOptionBrend();
        formBrendEl.reset();
        return;
    }
    else {
        console.log("Invalid data");
        return;
    }
});
formTypeEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post("admin/type", formData);
    if (data.status != "Invalid data") {
        getDataToOptionType();
        formTypeEl.reset();
        return;
    }
    else {
        console.log("Invalid data");
        return;
    }
    
});
formColorEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post("admin/color", formData);
    if (data.status != "Invalid data") {
        getDataToOptionColor();
        formColorEl.reset();
        return;
    }
    else {
        console.log("Invalid data");
        return;
    }
    
});
formWheelsEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post("admin/wheels", formData);
    if (data.status != "Invalid data") {
        getDataToOptionWheels();
        formWheelsEl.reset();
        return;
    }
    else {
        console.log("Invalid data");
        return;
    }
    
});

// const rusToLatin = (str) => {

// 	const ru = new Map([
// 		['??', 'a'], ['??', 'b'], ['??', 'v'], ['??', 'g'], ['??', 'd'], ['??', 'e'],
// 		['??', 'e'], ['??', 'e'], ['??', 'j'], ['??', 'z'], ['??', 'i'], ['??', 'yi'], ['??', 'i'],
// 		['??', 'k'], ['??', 'l'], ['??', 'm'], ['??', 'n'], ['??', 'o'], ['??', 'p'], ['??', 'r'],
// 		['??', 's'], ['??', 't'], ['??', 'u'], ['??', 'f'], ['??', 'h'], ['??', 'c'], ['??', 'ch'],
// 		['??', 'sh'], ['??', 'shch'], ['??', 'y'], ['??', 'e'], ['??', 'u'], ['??', 'ya'],
// 	]);

// 	str = str.replace(/[????]+/g, '');

// 	return Array.from(str)
// 		.reduce((s, l) =>
// 			s + (
//                  ru.get(l)
// 				  || ru.get(l.toLowerCase()) === undefined && l
// 				  || ru.get(l.toLowerCase())
// 			  )
// 			, '');
// }


formSpecificationEl.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const name = formData.get("name");
    // const name = rusToLatin(inputName);
    const resultHtml = `<input type="text" name="spec-${name}" placeholder="?????????????? ${name}">`;
    formBikeEl.insertAdjacentHTML("beforeend", resultHtml);
});

formBikeEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);   
    const { data } = await axios.post("admin/bike", formData);
    console.log(data);
});


const getDataToOptionCategory = async () => {
    let getData = "";
    let resultInner = "";
    getData = await axios.get("admin/category"); 

       for (let i = 0; i < getData.data.length; i++) { 
       
        resultInner +=`<option value="${getData.data[i]._id}">${getData.data[i].name}</option>`;        
    }
    categoryListEl.innerHTML = resultInner;
}
const getDataToOptionBrend = async () => {
    let getData = "";
    let resultInner = "";
    getData = await axios.get("admin/brend");
   
       for (let i = 0; i < getData.data.length; i++) { 
       
        resultInner +=`<option value="${getData.data[i]._id}">${getData.data[i].name}</option>`;        
    }
    brendListEl.innerHTML = resultInner;
}
const getDataToOptionType = async () => {
    let getData = "";
    let resultInner = "";
    getData = await axios.get("admin/type");
   
       for (let i = 0; i < getData.data.length; i++) { 
       
        resultInner +=`<option value="${getData.data[i]._id}">${getData.data[i].name}</option>`;        
    }
    typeListEl.innerHTML = resultInner;
}
const getDataToOptionColor = async () => {
    let getData = "";
    let resultInner = "";
    getData = await axios.get("admin/color");
   
       for (let i = 0; i < getData.data.length; i++) { 
       
        resultInner +=`<option value="${getData.data[i]._id}">${getData.data[i].name}</option>`;        
    }
    colorListEl.innerHTML = resultInner;
}
const getDataToOptionWheels = async () => {
    let getData = "";
    let resultInner = "";
    getData = await axios.get("admin/wheels");
   
       for (let i = 0; i < getData.data.length; i++) { 
       
        resultInner +=`<option value="${getData.data[i]._id}">${getData.data[i].name}</option>`;        
    }
    wheelsListEl.innerHTML = resultInner;
}

getDataToOptionCategory();
getDataToOptionBrend();
getDataToOptionType();
getDataToOptionColor();
getDataToOptionWheels();