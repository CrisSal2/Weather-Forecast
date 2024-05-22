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


let city = localStorage.getItem('currentCity') || 'Orange';
let cityList  = JSON.parse(localStorage.getItem('cityList')) || [];


/****************** City Search Function ****************/



function createCityList() {
    resetCityList();
    for (const city of cityList) {
        cityButtonContainer = document.createElement('div')
        cityButtonContainer.classList.add('my-1', 'citySelector')
        prevCityButton = document.createElement('button');
        deleteCityButton = document.createElement('button')
        prevCityButton.classList.add('prevCityButton');
        deleteCityButton.classList.add('deleteCityButton')
        prevCityButton.innerText = city;
        deleteCityButton.innerText = '✖️'
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

function resetCityList() {
    prevCitiesList.innerText = '';
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



/**************** Render five day forecast ****************/



function renderFiveDay() {
    
    const fiveDayCard = document.createElement('div');
    fiveDayCard.classList.add('card', 'forecast-card', 'rounded');
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



/************************************************ Main Function ***************************************************/



function handleCityInput(city) {
    
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`;
    fetch(queryURL)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('City not found. Please enter a valid city name.');
            }
            resetFiveDay()
            addCityToList();
            createCityList();
            localStorage.setItem('currentCity', city);
            cityInput.value = '';
            return response.json();
        })
        .then(function(cityData) {
            city = cityData;
            renderCurrentCity(city);
            const cityLat = city.coord.lat;
            const cityLon = city.coord.lon;
            const fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&cnt=50&appid=${APIkey}&units=imperial`;
            return fetch(fiveDayURL);
        })
            .then(function(response) {
                return response.json();              
            })
            .then(function(fiveDayData) {
                fiveDay = fiveDayData;
                for (i = 7; i <= 39 ; i += 8) {
                    renderFiveDay()
                }
            }) 
            .catch(function(error) {
                alert(error.message); 
                return;
            });                      
}



/******************************************************************************************************************************/



/* Grab last city looked at and render the weather data and create history list from local storage */
handleCityInput(city);
createCityList();

/* Handle new city on form input */
cityForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let city = cityInput.value;
    handleCityInput(city)
})

/* Sets current city to whatever city button is clicked */
document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('prevCityButton')) {
        city = e.target.innerText;
        handleCityInput(city);
        localStorage.setItem('currentCity', city);
    }
})

/* Handle deleting a city button from the list and removing that city from the list */
document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('deleteCityButton')) {
        buttonToDelete = e.target.parentNode;
        citytoDelete = e.target.nextSibling.innerText;
        buttonToDelete.remove();
        cityList = cityList.filter(function(city) {
            return city !== citytoDelete;
        })
        localStorage.setItem('cityList', JSON.stringify(cityList))
        return cityList;
    }
})