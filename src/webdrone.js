// import * as Tone from 'tone';
const gps = document.getElementById("getLocation");
const drone = document.getElementById("tone_start");
// Use this variable! does not exist yet
const start = document.getElementById("startLocation");
const contGps = document.getElementById("getContinuousLocation");
const container = document.getElementById("container");
const motion = document.getElementById("motion");
const state = document.getElementById("status");

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

const getOrientation = () => {
    DeviceOrientationEvent.requestPermission().then((res) => {
        if (res.state === 'granted') {
            window.addEventListener("deviceorientation", handleOrientation);
            // window.addEventListener('devicemotion', handleMotion, true);
        }
        else if (res.state === 'prompt') {
            container.innerHTML = 'Ge webbläsaren tillåtelse att att använda gyroskop';
        }
        else {
            console.log('Fick inte använda geolocation');
            container.innerHTML = 'Fick inte använda gyroskop';
        }
    });
}
