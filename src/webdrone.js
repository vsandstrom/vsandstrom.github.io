// import * as Tone from 'tone';
const gps = document.getElementById("getLocation");
const drone = document.getElementById("tone_start");
// Use this variable! does not exist yet
const start = document.getElementById("startLocation");
const contGps = document.getElementById("getContinuousLocation");
const container = document.getElementById("container");
const motion = document.getElementById("motion");
const content = document.getElementById("content");
const state = document.getElementById("status");

const handleMotion = (e) => {
    let acc = e.acceleration;
    let accGrav = e.accelerationIncludingGravity;
    let rotation = e.rotationRate;
    motion.innerHTML =
        `
    x: ${acc.x * 2}<br>
    y: ${acc.y * 2}<br>
    z: ${acc.z * 2}<br>
    `;
};

const handleOrientation = (e) => {
    // content.innerHTML = e;
    content.innerHTML = `
    x: ${e.alpha}<br>
    y: ${e.beta}<br>
    z: ${e.gamma}<br>
    `;
};

const getOrientation = () => {
    DeviceMotionEvent.requestPermission().then((res) => {
        if (res === 'granted') {
            window.addEventListener("deviceorientation", handleOrientation);
            // window.addEventListener('devicemotion', handleMotion, true);
        }
        // else if (res === 'prompt') {
        //     container.innerHTML = 'Ge webbläsaren tillåtelse att att använda gyroskop';
        // }
        // else {
        //     console.log('Fick inte använda geolocation');
        //     container.innerHTML = 'Fick inte använda gyroskop';
        // }
    });
}
