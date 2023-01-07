"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let gps = document.getElementById("getLocation");
let drone = document.getElementById("tone_start");
// Use this variable! does not exist yet
let start = document.getElementById("startLocation");
let contGps = document.getElementById("getContinuousLocation");
let container = document.getElementById("container");
let motion = document.getElementById("motion");
let state = document.getElementById("status");
const url = "http://127.0.0.1:5000";
const handleMotion = (e) => {
    let acc = e.acceleration;
    let accGrav = e.accelerationIncludingGravity;
    let rotation = e.rotationRate;
    motion.innerHTML =
        `
    x: ${acc.x * 2}
    y: ${acc.y * 2}
    z: ${acc.z * 2}
    `;
};
const handleOrientation = (e) => {
    motion.innerHTML =
        `
    x: ${e.alpha}
    y: ${e.beta}
    z: ${e.gamma}
    `;
};
const showLocation = () => {
    console.log("hello");
    // navigator.
    navigator.geolocation.getCurrentPosition(async (pos) => {
        gps.style.display = "none";
        drone.style.display = "block";
        let time = new Date(pos.timestamp);
        console.log(time);
        if (container) {
            container.innerHTML =
                `
            Location @: ${time}<br>
            latitude: ${pos.coords.latitude}<br>
            longitude: ${pos.coords.longitude}<br>
            heading: ${pos.coords.heading}<br>
            speed: ${pos.coords.speed}<br>

            `;
        }
    });
};
let intervalID = 0;
if ('geolocation' in navigator) {
    container.innerHTML = "geolocation finns";
    navigator.permissions.query({ name: 'geolocation' }).then((res) => {
        if (res.state === 'granted') {
            gps.addEventListener("click", showLocation);
            window.addEventListener('devicemotion', handleMotion, true);
        }
        console.log('Fick inte använda geolocation');
        container.innerHTML = 'Fick inte använda geolocation';
    });
}
else {
    container.innerHTML = "no navigator available at this time to aid u on ur quest";
}
// if (window.DeviceMotionEvent) {
//     navigator.permissions.query({name: "geolocation"}).then((res) => {
//         if (res.state === 'granted') {
//             window.addEventListener('devicemotion', handleMotion, true);
//         }
//     })
//     state.innerHTML = "motion";
//
// } else {
//     console.log("not supported");
// }
// else if (window.DeviceMotionEvent) {
//     state.innerHTML = "motion";
//     window.addEventListener("devicemotion", handleMotion, true);
//
// }
// else {
//     // window.addEventListener('MozOrientation', () => handleMozOrientation());
//     state.innerHTML = "nothing";
// }
