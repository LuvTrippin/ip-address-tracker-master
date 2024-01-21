import {validateIp} from './helpers';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

btn.addEventListener('click', getLocationData);
ipInput.addEventListener('keydown', handleKey);

function getLocationData() {
    if (!validateIp(ipInput.value)) {
        return alert('You have to enter a valid ip address');
    }
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_sCUImcAKFXTfV5PJkVYwqszboTmEj&ipAddress=${ipInput.value}`)
        .then(response => response.json())
        .then(console.log)
        .catch();
}

function handleKey(event) {
    if (event.key === 'Enter') {
        getLocationData();
    }
}
