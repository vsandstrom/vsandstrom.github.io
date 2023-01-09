const gps = document.getElementById("getLocation");
const gyro = document.getElementById("gyro_permission");
const drone = document.getElementById("tone_start");
// Use this variable! does not exist yet
const start = document.getElementById("startLocation");
const contGps = document.getElementById("getContinuousLocation");
const container = document.getElementById("container");
const motion = document.getElementById("motion");
const orient = document.getElementById("orientation");
const state = document.getElementById("status");
const FUND = 200;

let vol = new Tone.Volume(1) .toDestination();
//     .chain(pan0);
// let vol1 = new Tone.Volume(1)
//     .chain(pan1);
// let vol2 = new Tone.Volume(1)
//     .chain(pan2);

let verb = new Tone.Reverb(2).chain(vol);


let fm0 = new Tone.FMSynth().chain(verb);
let fm1 = new Tone.FMSynth().chain(verb);
let fm2 = new Tone.FMSynth().chain(verb);


let accx, accy, accz = 0.0;
let orix, oriy, oriz = 0.0;

const handleOrientation = (e) => {
    // content.innerHTML = e;

    let inc = 1 / 360;

    orix = Math.abs(e.alpha) * inc;
    oriy = Math.abs(e.beta) * inc;
    oriz = Math.abs(e.gamma) * inc;

    orient.innerHTML = `
        x: ${Math.floor(e.alpha)}<br>
        y: ${Math.floor(e.beta)}<br>
        z: ${Math.floor(e.gamma)}
    `;


    // fm0.set({harmonicity: 5 - orix});
    // fm1.set({harmonicity: 3 + orix});
    // fm2.set({harmonicity: 3 + oriy});



};

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

    fm0.set({ frequency: FUND + accx });
    fm1.set({ frequency: (FUND * 1.125) + accy });
    fm2.set({ frequency: (FUND * 1.25) - accx });

};

const toneStart = async () => {
    await Tone.start();
    fm0.triggerAttack(FUND, "+0.5", 0.4);
    fm1.triggerAttack(FUND, "+0.5", 0.4);
    fm2.triggerAttack(FUND, "+0.5", 0.4);
};

const getOrientation = () => {
    if (DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission().then((res) => {
            if (res === 'granted') {
                window.addEventListener("deviceorientation", handleOrientation);
                window.addEventListener('devicemotion', handleMotion);
                drone.style.display="block";
                gyro.style.display="none";
            }
        });
    } else {
        DeviceOrientationEvent.requestPermission().then((res) => {
            if (res === 'granted') {
                window.addEventListener("deviceorientation", handleOrientation);
                window.addEventListener('devicemotion', handleMotion);
                drone.style.display="block";
                gyro.style.display="none";
            }
        });

    }
}
