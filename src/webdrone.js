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

// import * as Tone from 'tone';

const FUND = 200;

let pan0 = new Tone.Panner3D(0,0,0).toDestination();
let pan1 = new Tone.Panner3D(0,0,0).toDestination();
let pan2 = new Tone.Panner3D(0,0,0).toDestination();

let vol0 = new Tone.Volume(0.5).chain(pan0);
let vol1 = new Tone.Volume(0.5).chain(pan1);
let vol2 = new Tone.Volume(0.5).chain(pan2);

let verb0 = new Tone.Reverb(4).chain(vol0);
let verb1 = new Tone.Reverb(4).chain(vol1);
let verb2 = new Tone.Reverb(4).chain(vol2);

let fm0 = new Tone.FMSynth({type: "fmtriangle"}).chain(verb);
let fm1 = new Tone.FMSynth({type: "fmtriangle"}).chain(verb);
let fm2 = new Tone.FMSynth({type: "fmtriangle"}).chain(verb);
// fm0.triggerAttackRelease("C2", "8n");

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


    fm0.set({
        frequency: (200 + accx)
    });
    fm1.set({
        frequency: ((200 * (5/4) )- accx)
    });
    fm2.set({
        frequency: ((200 * (9/8) )- accx)
    });



};

const handleOrientation = (e) => {
    // content.innerHTML = e;
    orix = e.alpha;
    oriy = e.beta;
    oriz = e.gamma;

    orient.innerHTML = `
        x: ${Math.floor(orix)}<br>
        y: ${Math.floor(oriy)}<br>
        z: ${Math.floor(oriz)}<br>
    `;

    pan0.set({
        positionX: orix,
        positionY: oriy
    });
    pan1.set({
        positionX: 360 - orix,
        positionY: oriy
    });

};

// drone.addEventListener('click', async () => {
//     await Tone.start();
//
//     let fm2 = new Tone.FMOscillator(FUND )
//
//     let fm1 = new Tone.FMOscillator(FUND, )
//
// })

// drone.addEventListener('click', async() => {
//     await Tone.start();
//     if (Tone.Transport.state !== 'started') {
//         Tone.Transport.start();
//         drone.innerHTML = "STOP DRONE";
//     } else {
//         Tone.Transport.stop();
//         drone.innerHTML = "START DRONE";
//
//
//     }
// });

const toneStart = async () => {
    await Tone.start();
    fm0.triggerAttack(FUND, "+0.5", 0.4);
    drone.style.display ="none";
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
