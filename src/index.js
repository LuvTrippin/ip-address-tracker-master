import {validateIp} from './helpers';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getLocationData);
ipInput.addEventListener('keydown', handleKey);

function getLocationData() {
    if (!validateIp(ipInput.value)) {
        return alert('You have to enter a valid ip address');
    }
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_sCUImcAKFXTfV5PJkVYwqszboTmEj&ipAddress=${ipInput.value}`)
        .then(response => response.json())
        .then(drawData)
        .catch();
}

function handleKey(event) {
    if (event.key === 'Enter') {
        getLocationData();
    }
}

function drawData(data) {
    ipInfo.innerText = data.ip;
    locationInfo.innerText = `${data.location.country}, ${data.location.region}, ${data.location.city}`;
    timezoneInfo.innerText = data.location.timezone;
    ispInfo.innerText = data.isp;
}
