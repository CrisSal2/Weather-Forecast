/*********************** API key ***********************/


const APIkey = 'efe69132a772f9de7f8b7a79c59ed1fb';


/*********************** Selectors *********************/


const cityForm = document.querySelector('#city-form');
const cityInput = document.querySelector('#city-input');


/*********************** Default City ******************/


let city = localStorage.getItem('currentCity') || 'Irvine';
let cityList  = JSON.parse(localStorage.getItem('cityList')) || [];


/****************** City Search Function ****************/


createCityList = function() {
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


