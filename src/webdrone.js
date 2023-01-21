const gyro = document.getElementById("gyro_permission");
const drone = document.getElementById("tone_start");
const motion = document.getElementById("motion");
const orient = document.getElementById("orientation");

let freq0 = 120;
let freq1 = freq0 * 1.125;
let freq2 = freq1 * 1.25;

// Main out
let vol = new Tone.Volume(1).toDestination();

//     .chain(pan0);
// let vol1 = new Tone.Volume(1)
//     .chain(pan1);
// let vol2 = new Tone.Volume(1)
//     .chain(pan2);

// Reverb -> Main out
let verb = new Tone.Reverb(2).chain(vol);

// Gain:
let g0 = new Tone.Gain(0).chain(verb);
let g1 = new Tone.Gain(0).chain(verb);
let g2 = new Tone.Gain(0).chain(verb);

// Synth 1, 2, 3 -> Reverb
let fm0 = new Tone.FMSynth().chain(g0);
let fm1 = new Tone.FMSynth().chain(g1);
let fm2 = new Tone.FMSynth().chain(g2);

let accx, accy, accz = 0.0;
let orix, oriy, oriz = 0.0;

// Affect verb and modulation with orientation
const handleOrientation = (e) => {
    let inc = 1 / 360;
    orix = Math.abs(e.alpha) * inc;
    oriy = Math.abs(e.beta) * inc;
    oriz = Math.abs(e.gamma) * inc;

    // Posts orientation values floored to integers
    orient.innerHTML = `
        x: ${Math.floor(e.alpha)}<br>
        y: ${Math.floor(e.beta)}<br>
        z: ${Math.floor(e.gamma)}
    `;

    // Sets some synth parameters
    fm0.harmonicity.value -= orix;
    fm1.harmonicity.value += orix;
    fm2.harmonicity.value += oriy;

    g0.gain = oriy * inc;
    g1.gain = oriy * inc;
    g2.gain = oriy * inc;
    verb.wet = orix * inc;


};

// Change chords on acceleration
const handleMotion = (e) => {
    let acc = e.acceleration;
    let accGrav = e.accelerationIncludingGravity;

    accx = acc.x;
    accy = acc.y;
    accz = acc.z;

    // Posts acceleration values floored to integers
    motion.innerHTML = `
        x: ${Math.floor(accx)}<br>
        y: ${Math.floor(accy)}<br>
        z: ${Math.floor(accz)}<br>
    `;

    // Sets some other synth parameters
    fm0.frequency.value = freq0 + accx;
    fm1.frequency.value = freq1 + accy;
    fm2.frequency.value = freq2 - accz;

};

const getNextEvent = () => {

}

const toneStart = async () => {
    // Tone must be requested from user for it to be allowed to play
    await Tone.start();
    fm0.triggerAttack(freq0, "0.5", 4);
    fm1.triggerAttack(freq1, "0.5", 4);
    fm2.triggerAttack(freq2, "0.5", 4);

    Tone.Transport.start();

    drone.style.display = "none"


    // A failed attempt at running a Tone.js loop as a sequencer
    // VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

    // let now = Tone.now();
    //
    // let loop = new Tone.Loop((time) => {
    //     time = time + now;
    //     fm0.triggerAttackRelease(FUND, 2, time);
    //     fm1.triggerAttackRelease(FUND * 1.25, 2, time + 0.7);
    //     fm2.triggerAttackRelease(FUND * 1.125, 2, time + 0.9);
    //     
    //     fm0.triggerAttackRelease(FUND * 0.66, 2, time + 2);
    //     fm1.triggerAttackRelease(FUND * 7/4, 2, time+2.1);
    //     fm2.triggerAttackRelease(FUND * 1.125, 2, time + 2.25);
    //     
    //     fm0.triggerAttackRelease(FUND, 2, time + 3);
    //     fm1.triggerAttackRelease(FUND * 3/2, 2, time + 3.8);
    //     fm2.triggerAttackRelease(FUND * 5/3, 2, time + 4);
    //     
    //     fm0.triggerAttackRelease(FUND * 0.5, 2, time + 6.2);
    //     fm1.triggerAttackRelease(FUND * 1.125, 2, time + 6.3);
    //     fm2.triggerAttackRelease(FUND * 11/9, 2, time + 6.8);
    //     
    //     fm0.triggerAttackRelease(FUND, 2, time + 8.1);
    //     fm1.triggerAttackRelease(FUND * 1.25, 2, time + 8.4);
    //     fm2.triggerAttackRelease(FUND * 1.125, 2, time + 8,9);
    // }, 10).start(0);
    //
    // Tone.Transport.start(now);
};

// Request callbacks
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
