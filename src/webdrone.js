var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let gps = document.getElementById("getLocation");
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
// if ("Gyroscope" in window) {
//     state.innerHTML = "Gyroscope exist";
//     console.log("hello");
// }
// TODO: 
// showLocation function is activated and should then asynchronously update its pos-object for the server
// to poll
const showLocation = () => {
    console.log("hello");
    // navigator.
    navigator.geolocation.getCurrentPosition((pos) => __awaiter(this, void 0, void 0, function* () {
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
        if (res.state === 'denied') {
            console.log('Fick inte använda accelerometern');
            return;
        }
        gps.addEventListener("click", showLocation);
    });
}
else {
    container.innerHTML = "no navigator available at this time to aid u on ur quest";
}
if (window.DeviceOrientationEvent) {
    state.innerHTML = "orientation";
    window.addEventListener('deviceorientation', handleOrientation, true);
}
else if (window.DeviceMotionEvent) {
    state.innerHTML = "motion";
    window.addEventListener("devicemotion", handleMotion, true);
}
else {
    // window.addEventListener('MozOrientation', () => handleMozOrientation());
    state.innerHTML = "nothing";
}
