"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    motion.innerHTML =
        `
    x: ${e.acceleration.x * 2}
    y: ${e.acceleration.y * 2}
    z: ${e.acceleration.z * 2}
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
    navigator.geolocation.getCurrentPosition((pos) => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
};
let intervalID = 0;
if ('geolocation' in navigator) {
    container.innerHTML = "geolocation finns";
    navigator.permissions.query({ name: 'geolocation' }).then((res) => {
        if (res.state === 'granted') {
            gps.addEventListener("click", showLocation);
        }
        console.log('Fick inte använda geolocation');
        container.innerHTML = 'Fick inte använda geolocation';
    });
}
else {
    container.innerHTML = "no navigator available at this time to aid u on ur quest";
}
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation, true);
    state.innerHTML = "orientation";
}
// else if (window.DeviceMotionEvent) {
//     state.innerHTML = "motion";
//     window.addEventListener("devicemotion", handleMotion, true);
//
// }
// else {
//     // window.addEventListener('MozOrientation', () => handleMozOrientation());
//     state.innerHTML = "nothing";
// }
