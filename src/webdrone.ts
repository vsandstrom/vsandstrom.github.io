let gps: HTMLElement | null = document.getElementById("getLocation");
// Use this variable! does not exist yet
let start: HTMLElement | null = document.getElementById("startLocation");
let contGps: HTMLElement | null = document.getElementById("getContinuousLocation");
let container: HTMLElement | null = document.getElementById("container");
let motion: HTMLElement | null = document.getElementById("motion");
let state: HTMLElement | null = document.getElementById("status");

const url: string = "http://127.0.0.1:5000";




const handleMotion = (e: DeviceMotionEvent) => {
    motion.innerHTML = 
    `
    x: ${e.acceleration.x *2}
    y: ${e.acceleration.y *2}
    z: ${e.acceleration.z *2}
    `
}

const handleOrientation = (e: DeviceOrientationEvent) => {
    motion.innerHTML = 
    `
    x: ${e.alpha}
    y: ${e.beta}
    z: ${e.gamma}
    `
}

// const handleMozOrientation = () => {
//     motion.innerHTML = 
//     `
//     x: ${orientation.x * 50}
//     y: ${orientation.y * 50}
//     z: ${orientation.z * 50}
//     `
// }

interface Position {
    time: number,
    latitude: number,
    longitude: number
}

if ("Gyroscope" in window) {
    state.innerHTML = "Gyroscope exist";
    console.log("hello");
}

// TODO: 
// showLocation function is activated and should then asynchronously update its pos-object for the server
// to poll
const showLocation = () => {
    console.log("hello");
    // navigator.
    navigator.geolocation.getCurrentPosition( async (pos) => {

        let time: Date = new Date(pos.timestamp);
        console.log(time);
        if (container) {
            container.innerHTML = 
            `
            Location @: ${time}<br>
            latitude: ${pos.coords.latitude}<br>
            longitude: ${pos.coords.longitude}<br>
            heading: ${pos.coords.heading}<br>
            speed: ${pos.coords.speed}<br>

            `
        }
    })
};

let intervalID:any = 0;


if ('geolocation' in navigator){
    container.innerHTML = "geolocation finns";
    navigator.permissions.query({name: 'geolocation'}).then((res) => {
        if (res.state === 'denied') {
            console.log('Fick inte använda accelerometern');
            return;
        }
        gps.addEventListener("click", showLocation);
    })

} else {
    container.innerHTML = "no navigator available at this time to aid u on ur quest";
}

if (window.DeviceMotionEvent) {
    state.innerHTML = "motion";
    window.addEventListener("devicemotion", (e) => handleMotion(e));

} else if (window.DeviceOrientationEvent) {
    state.innerHTML = "orientation";
    window.addEventListener('deviceorientation', (e) => handleOrientation(e));

} else {
    // window.addEventListener('MozOrientation', () => handleMozOrientation());
    state.innerHTML = "orientation";
}
