import {validateIp, addTileLayer} from './helpers';
import 'leaflet/dist/leaflet.css';
import L, { marker } from 'leaflet';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getLocationData);
ipInput.addEventListener('keydown', handleKey);

const myIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
});

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
});
addTileLayer(map);
L.marker([51.505, -0.09], {icon: myIcon}).addTo(map);

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
    const {lat, lng, country, region, city, timezone} = data.location;

    ipInfo.innerText = data.ip;
    locationInfo.innerText = `${country}, ${region}, ${city}`;
    timezoneInfo.innerText = timezone;
    ispInfo.innerText = data.isp;

    map.setView([lat, lng]);
    L.marker([lat, lng], {icon: myIcon}).addTo(map);
}
