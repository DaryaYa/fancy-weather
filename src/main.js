const body = document.querySelector('body');
const refresh = document.getElementById('refresh');
const searchField = document.getElementById('search');
const startButton = document.getElementById('start');
const localPlace = document.querySelector('.location');
const temperature = document.querySelector('.temperature');
const feelsLike = document.querySelector('.feelsLike');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const dateTime = document.querySelector('.date-time');
const lng = document.getElementById('lng');
const lat = document.getElementById('lat');
const go = document.getElementById('go');

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFyeWF5YSIsImEiOiJjazR5OGZyZnUwOGN2M2tteDRwdHpldTRjIn0.sp2FcN23rR43-XozI1fv2w';

function timeDate() {
    dateTime.innerHTML = '';
    let date = new Date();
    let options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    dateTime.append(date.toLocaleString('en-US', options));
}
timeDate();
// key = '7f3414d36c39132ae4aae83156a242d1c6ce22dbadf927f69b5e1ddbb4c2842c';
// locationToken = '608d0ed27f66fc';
// openWeather = '985407983380c5d99fa1bb48a8e0eec0'
// darkSkyKey = '31480af256eda871a090aa1f828ca536';

function getLinkToImage() {
    const url = `https://api.unsplash.com/photos/random?query=weather,winter,${searchField.value}&client_id=7f3414d36c39132ae4aae83156a242d1c6ce22dbadf927f69b5e1ddbb4c2842c`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.urls.regular);
            // console.log(searchField.value);
            body.style.backgroundImage = `url("${data.urls.regular}")`;
        });
}
getLinkToImage();

function getLocation() {
    return fetch('https://ipinfo.io/json?token=608d0ed27f66fc').then(response => {
        return response.json();
    }).then(data => console.log(data));
}
getLocation();

function showMap() {
    if (!lat.value && !lng.value) {
        let map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/navigation-preview-day-v4?optimize=true', // stylesheet location
            center: [27.67761, 54.00079], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });
    } else {
        let map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/navigation-preview-day-v4?optimize=true', // stylesheet location
            center: [lng.value, lat.value], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });
    }
}

showMap();
go.addEventListener('click', showMap);


function getLocationPlace() {
    localPlace.innerHTML = '';
    if (!searchField.value) {
        const url = 'https://ipinfo.io/json?token=608d0ed27f66fc';

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                // console.log(`${data.city}, ${data.country}`);
                // console.log(localPlace);
                localPlace.append(`${data.city}, ${data.country}`);
            });
    } else {
        localPlace.append(searchField.value);
    }
}
getLocationPlace();

function getWeatherForecast(city) {
    // return fetch(`http://localhost:8000/weather-forecast/${localCoords}`)
    // return fetch(`https://api.darksky.net/forecast/2bf27985f5a6844febcdc43c99cc81ce/53.5359,27.3400?lang=be`)
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=en&units=metric&APPID=985407983380c5d99fa1bb48a8e0eec0`)
        .then(res => {
            return res.json()
        }).then(data => {
            console.log(data.list[0]);
            temperature.innerHTML = '';
            feelsLike.innerHTML = '';
            wind.innerHTML = '';
            humidity.innerHTML = '';
            const t = data.list[0].main.temp;
            temperature.append(Math.round(t) + '°');
            const fL = data.list[0].main.feels_like;
            feelsLike.append(Math.round(fL));
            const w = data.list[0].wind.speed;
            wind.append(Math.round(w));
            const h = data.list[0].main.humidity;
            humidity.append(Math.round(h));
        });
}

function init() {

    if (!searchField.value) {
        const url = 'https://ipinfo.io/json?token=608d0ed27f66fc';
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.city);

                getWeatherForecast(data.city).then(forecast => {
                    console.log(forecast);
                })
            })
    } else {
        getWeatherForecast(searchField.value);
    }

}
init();

startButton.addEventListener('click', getLocationPlace);
startButton.addEventListener('click', init);
refresh.addEventListener('click', getLocationPlace);
refresh.addEventListener('click', getLinkToImage);
startButton.addEventListener('click', getLinkToImage);

body.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        getLinkToImage();
        getLocationPlace();
        init();
    }
});