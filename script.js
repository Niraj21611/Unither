const wrapper = document.querySelector(".wrapper");
inputPart = wrapper.querySelector(".input-part");
infotxt = wrapper.querySelector(".info-txt");
inputfield = wrapper.querySelector("input");
locationBtn = wrapper.querySelector(".btn-2");
apiKey = 'd0ac7ecc2e76256ab3c2a9920827a622';
wIcon = wrapper.querySelector(".weather-part img");
arrowBack = wrapper.querySelector("header i");
searchBtn = wrapper.querySelector(".btn");
let api;

// Search button 

searchBtn.addEventListener("click", () =>{
    requestApi(inputfield.value);
});

// Current location button

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

// Function to requesting api

function requestApi(city){
     api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`; 
    fetchData();
}

// Function to fetch data from api

function fetchData(){
    infotxt.innerText = "Getting Weather Details...";
    infotxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

// Function to get weather details

function weatherDetails(info){
    if(info.message = "Nothing to geocode"){
        infotxt.innerText = "Please enter a city name";
    }
    inputfield.addEventListener("keypress", () => {
        infotxt.innerText = "" ;
        infotxt.classList.remove("error");   
    })
    infotxt.classList.replace("pending","error");
    if(info.cod == "404"){
        infotxt.innerText = `${inputfield.value} isn't a valid city`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

// conditions for displaying dynamic images

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

// Conditions for displaying output

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

// Function for back arrow button

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});

