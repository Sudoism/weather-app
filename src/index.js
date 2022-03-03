import "./style.css";

const API_KEY_GIPHY = 'dummy'
const API_KEY_WEATHER = 'dummy'

//hits the open weather API
async function getWeather(location){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${API_KEY_WEATHER}&units=metric`);
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.log(error);
    }
}

//filters out interesting data from open weather API 
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

//gets gif based on search term
async function findGif(searchTerm) {
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY_GIPHY}&s=${searchTerm}`, {mode: 'cors'});
        const gifData = await response.json();
        return gifData.data.images.original.url
    } catch (error) {
        searchGif("error");
    }
}

//attaches to HTML elements for use in event listener
const button = document.getElementById("search");
const input = document.getElementById("location");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const descImg = document.getElementById("descImg");
const container = document.getElementById("container")
let currentBackgroundColor = "bg-slate-200"

//input a temperatere, returns a hardcoded tailwind value for background color use 
function getColorByTemp(temp) {
    // for dynamic calculation
    //const highTemp = 35
    //  const upperValueOfBg = 9
    //  let value = Math.round( (temp/ highTemp ) * upperValueOfBg) * 100
    if(temp>0) {
        return 'bg-red-200'
    } else {
        return 'bg-blue-200'
    }
    
};

button.addEventListener("click", async () => {
    console.log(input.value)
    try {
        //get weather data
        const request = await getWeather(input.value)
        const result = await processData(request);

        //get gif based on weather description
        const gifDescRequest = await findGif(result.description);

        //outpt result on screen
        temp.innerText = result.temperature;
        desc.innerText = result.description;
 
        //
        descImg.src = gifDescRequest;
        let backgroundColor = getColorByTemp(result.temperature);

        container.classList.remove(currentBackgroundColor);
        container.classList.add(backgroundColor);
        currentBackgroundColor = backgroundColor;
    } catch (error) {
        console.log(error)
    }
})
