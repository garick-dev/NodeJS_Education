const authFormEl = document.forms.authForm;
const regFormEl = document.forms.regForm;
const exitFormEl = document.forms.exitForm;
const authBlockEl = document.querySelector(".block-auth");
const regBlockEl = document.querySelector(".block-reg");
const exitBlockEl = document.querySelector(".block-exit");

const getDataUser = async () => {  
       
        const { data } = await axios.get("/auth");
        console.log(data);
        if (data.status === "OK") {
    
            authBlockEl.classList.add("hidden");
            regBlockEl.classList.add("hidden");
            exitBlockEl.classList.remove("hidden");
        }
        
}

authFormEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post("/auth", formData);
    console.log(data);
    if (data.status === "OK") {
    
        authBlockEl.classList.add("hidden");
        regBlockEl.classList.add("hidden");
        exitBlockEl.classList.remove("hidden");
        authFormEl.reset();       
    }
});


regFormEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);    
    const { data }  = await axios.post("/reg", formData);
    console.log(data);
    if (data.status === "OK") {
    
        authBlockEl.classList.add("hidden");
        regBlockEl.classList.add("hidden");
        exitBlockEl.classList.remove("hidden");
        regFormEl.reset();       
    }
}); 

exitFormEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const { data } = await axios.get("/exit");
    if (data.status === "OK") {
        authBlockEl.classList.remove("hidden");
        regBlockEl.classList.remove("hidden");
        exitBlockEl.classList.add("hidden");
    }
   
});
getDataUser();