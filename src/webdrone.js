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

let pan0 = new Tone.Panner3D({positionX: 0}).toDestination();
let pan1 = new Tone.Panner3D({positionX: 120}).toDestination();
let pan2 = new Tone.Panner3D({positionX: 240}).toDestination();

let vol0 = new Tone.Volume(1)
    // .toDestination();
    .chain(pan0);
let vol1 = new Tone.Volume(1)
    .chain(pan1);
let vol2 = new Tone.Volume(1)
    .chain(pan2);

let verb0 = new Tone.Reverb(2).chain(vol0);
let verb1 = new Tone.Reverb(2).chain(vol1);
let verb2 = new Tone.Reverb(2).chain(vol2);


let fm0 = new Tone.FMSynth().chain(verb0);
let fm1 = new Tone.FMSynth().chain(verb1);
let fm2 = new Tone.FMSynth().chain(verb2);


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


    fm0.set({harmonicity: 5 - orix});
    fm1.set({harmonicity: 3 + orix});
    fm2.set({harmonicity: 3 + oriy});



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

    pan0pos = pan0.get().positionX;
    pan0.set({positionX: pan0pos + accx});

    pan1pos = pan1.get().positionX;
    pan1.set({positionX: pan1pos + accx});

    pan2pos = pan2.get().positionX;
    pan2.set({positionX: pan2pos + accx});
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
