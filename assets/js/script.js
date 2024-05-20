/*********************** API key ***********************/


const APIkey = 'efe69132a772f9de7f8b7a79c59ed1fb';


/*********************** Selectors *********************/


const cityForm = document.querySelector('#city-form');
const cityInput = document.querySelector('#city-input');
const prevCitiesList = document.querySelector('#cityList');
const currentCity = document.querySelector('#currentCity');
const currentCityTemp = document.querySelector('#currentCityTemp');
const currentCityWind = document.querySelector('#currentCityWind');
const currentCityHumidity = document.querySelector('#currentCityHumidity');
const selectedCityConditions = document.querySelector('#selectedCityConditions');
const fiveDayRow = document.querySelector('#fiveDayRow');


/*********************** Default City ******************/


let city = localStorage.getItem('currentCity') || 'Irvine';
let cityList  = JSON.parse(localStorage.getItem('cityList')) || [];


/****************** City Search Function ****************/



function resetCityList() {
    prevCitiesList.innerText = '';
}

function createCityList() {
    resetCityList();
    for (const city of cityList) {
        cityButtonContainer = document.createElement('div')
        cityButtonContainer.classList.add('my-1')
        prevCityButton = document.createElement('button');
        deleteCityButton = document.createElement('button')
        prevCityButton.classList.add('prevCityButton');
        deleteCityButton.classList.add('deleteCityButton')
        prevCityButton.innerText = city;
        deleteCityButton.innerText = 'X'
        cityButtonContainer.append(deleteCityButton);
        cityButtonContainer.append(prevCityButton);
        prevCitiesList.append(cityButtonContainer);
    }
}


/******************** Add City To List *****************/


function addCityToList() {

    if (cityInput.value !== '') {
        let searchedCityEntered = cityInput.value;
        let searchedCityLower = searchedCityEntered.toLowerCase();
        let searchedCity = searchedCityLower.charAt(0).toUpperCase() + searchedCityLower.slice(1);
        if (!cityList.includes(searchedCity)) {
            cityList.push(searchedCity);
        }
        localStorage.setItem('cityList', JSON.stringify(cityList))
    }
    return cityList;
}



/******************** Weather conditions *****************/



function setWeatherEmoji(day) {
    let emoji;
    if (day.weather[0].main === "Clouds") {
        emoji = '🌥️';
    } else if (day.weather[0].main === "Clear") {
        emoji = '🌞';
    } else if (day.weather[0].main === "Drizzle" || day.weather[0].main === "Rain") {
        emoji = '🌧️';
    } else if (day.weather[0].main === "Thunderstorm") {
        emoji = '⛈️';
    } else if (day.weather[0].main === "Snow") {
        emoji = '❄️';
    } else {emoji = '😶‍🌫️'}
    return emoji;
}

function renderCurrentCity(city) {
    currentCity.textContent = `${city.name} ${dayjs().format('M/DD/YYYY')} ${setWeatherEmoji(city)}` 
    currentCityTemp.textContent = `Temp: ${city.main.temp}\u00B0F`
    currentCityWind.textContent = `Wind: ${city.wind.speed} MPH`
    currentCityHumidity.textContent = `Humidity: ${city.main.humidity}%`
}


/******************** Render City Weather *****************/


function renderCurrentCity(city) {
    currentCity.textContent = `${city.name} ${dayjs().format('M/DD/YYYY')} ${setWeatherEmoji(city)}` 
    currentCityTemp.textContent = `Temp: ${city.main.temp}\u00B0F`
    currentCityWind.textContent = `Wind: ${city.wind.speed} MPH`
    currentCityHumidity.textContent = `Humidity: ${city.main.humidity}%`
}

// Render five day forecast
function renderFiveDay() {
    // Create elements
    const fiveDayCard = document.createElement('div');
    fiveDayCard.classList.add('card', 'forecast-card', 'col-xs-12', 'col-md-4', 'col-xl', 'mb-2');
    const dateHeader = document.createElement('div');
    dateHeader.classList.add('card-header');
    const ul = document.createElement('ul');
    ul.classList.add('list-group');
    const temp = document.createElement('li');
    temp.classList.add('list-group-item');
    const wind = document.createElement('li');
    wind.classList.add('list-group-item');
    const humidity = document.createElement('li');
    humidity.classList.add('list-group-item');

    // Fill in data
    dateHeader.innerText = `${dayjs(fiveDay.list[i].dt_txt).format('M/DD/YYYY')} ${setWeatherEmoji(fiveDay.list[i])}` ;
    temp.innerText = ` Temp: ${fiveDay.list[i].main.temp}\u00B0F`;
    wind.innerText = `Wind: ${fiveDay.list[i].wind.speed} MPH`;
    humidity.innerText = `Humidity: ${fiveDay.list[i].main.humidity}%`;

    // Append to document
    ul.append(temp, wind, humidity);
    fiveDayCard.append(dateHeader, ul);
    fiveDayRow.append(fiveDayCard);
}

// Remove elements created in renderFiveDay()
function resetFiveDay() {
    fiveDayRow.innerText = ''
}