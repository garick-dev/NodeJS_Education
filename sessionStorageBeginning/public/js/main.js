const formEl = document.forms.myForm;
const loginEl = document.querySelector("input[name=login]");
const passwordEl = document.querySelector("input[name=password]");

const getDataUser = async () => {  
       
    try {
        const { data } = await axios.get("/message");
        loginEl.value = data.login;
        passwordEl.value = data.password;
        return;
    }
    catch (err) {
        console.log( "Invalid data");
        return;
    }
}



formEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    
    const { data }  = await axios.post("/message", formData);
    console.log(data);
}); 

getDataUser();