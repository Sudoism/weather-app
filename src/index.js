import "./style.css";

//hits the open weather API async/await style

async function getWeather(location){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=3b0d26b0e95aeb4068414120059b5332&units=metric`);
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.log(error);
    }
    
}

async function processData(responseData) {
    try {
        const data = await responseData;
        const temp = data.main.temp
        const desc = data.weather[0].description
        return {temperature: temp, description: desc}
    } catch (error) {
        console.log(error)
        
    }
}

//process data from open weather, cleaning it up to be used in app

//console.log(getWeather("Stockholm"));
console.log()

let weather = getWeather("stockholm");
console.log(weather);
let result = processData(weather)
console.log(result);

const button = document.getElementById("search");
const input = document.getElementById("location");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");

button.addEventListener("click", async () => {
    console.log(input.value)
    try {
        const request = await getWeather(input.value)
        const result = await processData(request);
        temp.innerText = result.temperature;
        desc.innerText = result.description;

        
    } catch (error) {
        
    }
})
