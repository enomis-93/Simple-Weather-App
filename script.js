const cityInput = document.querySelector('.city-name-input');
const temperature = document.querySelector('.temp');
const cityName = document.querySelector('.city');
const icoContainer = document.querySelector('#icon');
const searchBtn = document.querySelector('.search');

let weatherIco = document.createElement('div');
let weatherInfo = document.createElement('p');
const apiKey = '863b6e91ca2facf75f44510958c05ff5';

searchBtn.addEventListener('click', () => {
    let cityInputVal = cityInput.value;
    const apiUri = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputVal}&appid=${apiKey}&units=metric`;

    fetch(apiUri)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setData(data);
            clearInputField();
        })
        .catch(() => {
            cityName.innerText = 'City Not Found';
        });
});

function setData(data) {
    let iconCode = data.weather[0].icon;
    let temp = Math.floor(data.main.temp);
    let name = data.name;
    // Setto il nome della città
    cityName.innerText = name;
    // Setto descrizione e indicazione meteo
    weatherIco.innerHTML = `<i class="owf owf-${data.weather[0].id} owf-3x"></i>`;

    weatherInfo.innerHTML = `<p><b>${data.weather[0].description}</b></p>`;

    icoContainer.appendChild(weatherInfo);
    icoContainer.appendChild(weatherIco);

    // Setto la temperatura in gradi Celsius
    temperature.innerText = `Temp: ${temp} °C`;
}

function clearInputField() {
    cityInput.value = ' ';
}
