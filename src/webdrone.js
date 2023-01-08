const gps = document.getElementById("getLocation");
const drone = document.getElementById("tone_start");
// Use this variable! does not exist yet
const start = document.getElementById("startLocation");
const contGps = document.getElementById("getContinuousLocation");
const container = document.getElementById("container");
const motion = document.getElementById("motion");
const orientation = document.getElementById("orientation");
const state = document.getElementById("status");

const FUND = 200;
import * as Tone from 'tone';

let accx, accy, accz = 0.0;
let orix, oriy, oriz = 0.0;

const handleMotion = (e) => {
    let acc = e.acceleration;
    let accGrav = e.accelerationIncludingGravity;

    accx = acc.x;
    accy = acc.y;
    accz = acc.z;

    motion.innerHTML = `
        x: ${Math.floor(accx)}<br>
        y: ${Math.floor(accy)}<br>
        z: ${Math.floor(accz)}<br>
    `;


};

const handleOrientation = (e) => {
    // content.innerHTML = e;
    orix = e.alpha;
    oriy = e.beta;
    oriz = e.gamma;

    orientation.innerHTML = `
        x: ${Math.floor(orix)}<br>
        y: ${Math.floor(oriy)}<br>
        z: ${Math.floor(oriz)}<br>
    `;
};

// drone.addEventListener('click', async () => {
//     await Tone.start();
//
//     let fm2 = new Tone.FMOscillator(FUND )
//
//     let fm1 = new Tone.FMOscillator(FUND, )
//
// })

const toneStart = () => {
    Tone.start();
    let fm0 = new Tone.FMSynth().toDestination();
    fm0.triggerAttack("C2", "+0.5", 0.4);
};

const getOrientation = () => {
    DeviceMotionEvent.requestPermission().then((res) => {
        if (res === 'granted') {
            window.addEventListener("deviceorientation", handleOrientation);
            window.addEventListener('devicemotion', handleMotion);
            drone.style.display="none";
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
