const wrapper = document.querySelector(".wrapper");
inputPart = document.querySelector(".input-part");
infotxt = document.querySelector(".info-txt");
inputfield = document.querySelector("input");
locationBtn = document.querySelector("button");
const apiKey = 'd0ac7ecc2e76256ab3c2a9920827a622';
wIcon = document.querySelector(".weather-part img");
arrowBack = wrapper.querySelector("header i");
let api;

inputfield.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputfield.value != ""){
        requestApi(inputfield.value);
    }
});

locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();
}

function onError(error){
    infotxt.innerText = error.message;
    infotxt.classList.add("error");
}

function requestApi(city){
     api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`; 
    fetchData();
}

function fetchData(){
    infotxt.innerText = "Getting Weather Details...";
    infotxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    infotxt.classList.replace("pending","error");
    if(info.cod == "404"){
        infotxt.innerText = `${inputfield.value} isn't a valid city`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        if(id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/strom.svg";
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/cloud.svg";
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            wIcon.src = "icons/rain.svg";
        }

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;


        infotxt.classList.remove("pending","error");
        wrapper.classList.add("active");
        console.log(info);
    }
    
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});

