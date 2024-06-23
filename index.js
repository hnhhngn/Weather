// Defaul setting
const API_KEY = 'c38a883568877cbda9ddd5a3f46cba48';
const UNITS = 'metric';
const LANG = 'vi';
const imgUrl = 'http://openweathermap.org/img/wn/';

// Element
/** @type {HTMLElement | null} */
const container = document.querySelector('.container');
/** @type {HTMLElement | null} */
const searchButton = document.querySelector('.search-box button');
/** @type {HTMLElement | null} */
const searchInput = document.querySelector('.search-box input');
/** @type {HTMLElement | null} */
const weatherBox = document.querySelector('.weather-box');
/** @type {HTMLElement | null} */
const weatherDetail = document.querySelector('.weather-detail');
/** @type {HTMLElement | null} */
const errorPage = document.querySelector('.not-found');

/** @type {HTMLElement | null} */
const image = document.querySelector('.weather-box img');
/** @type {HTMLElement | null} */
const temperature = document.querySelector('.weather-box .temperature');
/** @type {HTMLElement | null} */
const description = document.querySelector('.weather-box .description');
/** @type {HTMLElement | null} */
const humidity = document.querySelector('.weather-detail .humidity span');
/** @type {HTMLElement | null} */
const wind = document.querySelector('.weather-detail .wind span');

searchButton.addEventListener('click', () => {
    const city = searchInput.value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${UNITS}&lang=${LANG}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '480px';
                weatherBox.style.display = 'none';
                weatherDetail.style.display = 'none';
                errorPage.style.display = 'block';
                errorPage.classList.add('fade-in');
                return;
            }

            errorPage.style.display = 'none';
            errorPage.classList.remove('fade-in');

            // Set weather image
            let icon = json.weather[0].icon;
            image.src = imgUrl + icon + '@2x.png';

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // display
            weatherBox.style.display = '';
            weatherBox.classList.add('fade-in');
            weatherDetail.style.display = '';
            weatherDetail.classList.add('fade-in');
            container.style.height = '590px'

        })
})