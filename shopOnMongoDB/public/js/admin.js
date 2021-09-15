const formBrendEl = document.forms.formBrend;
const formTypeEl = document.forms.formType;
const formColorEl = document.forms.formColor;
const formWheelsEl = document.forms.formWheels;
const formBikeEl = document.forms.formBike;


const brendListEl = document.querySelector("select[name=brend]");
const typeListEl = document.querySelector("select[name=type]");
const colorListEl = document.querySelector("select[name=color]");
const wheelsListEl = document.querySelector("select[name=wheels]");


formBrendEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post("/brend", formData);
    if (data.status != "Invalid data") {
        getDataToOptionBrend();
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
    const { data } = await axios.post("/type", formData);
    if (data.status != "Invalid data") {
        getDataToOptionType();
    
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
    const { data } = await axios.post("/color", formData);
    if (data.status != "Invalid data") {
        getDataToOptionColor();
    
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
    const { data } = await axios.post("/wheels", formData);
    if (data.status != "Invalid data") {
        getDataToOptionWheels();
    
        return;
    }
    else {
        console.log("Invalid data");
        return;
    }
    
});

formBikeEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);   
    const { data } = await axios.post("/bike", formData);
    console.log(data);
});


const getDataToOptionBrend = async () => {
    let getData = "";
    let resultInner = "";
    getData = await axios.get("/brend");
   
       for (let i = 0; i < getData.data.length; i++) { 
       
        resultInner +=`<option value="${getData.data[i]._id}">${getData.data[i].name}</option>`;        
    }
    brendListEl.innerHTML = resultInner;
}
const getDataToOptionType = async () => {
    let getData = "";
    let resultInner = "";
    getData = await axios.get("/type");
   
       for (let i = 0; i < getData.data.length; i++) { 
       
        resultInner +=`<option value="${getData.data[i]._id}">${getData.data[i].name}</option>`;        
    }
    typeListEl.innerHTML = resultInner;
}
const getDataToOptionColor = async () => {
    let getData = "";
    let resultInner = "";
    getData = await axios.get("/color");
   
       for (let i = 0; i < getData.data.length; i++) { 
       
        resultInner +=`<option value="${getData.data[i]._id}">${getData.data[i].name}</option>`;        
    }
    colorListEl.innerHTML = resultInner;
}
const getDataToOptionWheels = async () => {
    let getData = "";
    let resultInner = "";
    getData = await axios.get("/wheels");
   
       for (let i = 0; i < getData.data.length; i++) { 
       
        resultInner +=`<option value="${getData.data[i]._id}">${getData.data[i].name}</option>`;        
    }
    wheelsListEl.innerHTML = resultInner;
}

getDataToOptionBrend();
getDataToOptionType();
getDataToOptionColor();
getDataToOptionWheels();