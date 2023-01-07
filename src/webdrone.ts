// import * as Tone from 'tone';

let gps: HTMLElement | null = document.getElementById("getLocation");
let drone: HTMLElement | null = document.getElementById("tone_start");
// Use this variable! does not exist yet
let start: HTMLElement | null = document.getElementById("startLocation");
let contGps: HTMLElement | null = document.getElementById("getContinuousLocation");
let container: HTMLElement | null = document.getElementById("container");
let motion: HTMLElement | null = document.getElementById("motion");
let state: HTMLElement | null = document.getElementById("status");

const handleMotion = (e: DeviceMotionEvent) => {
    let acc = e.acceleration;
    let accGrav = e.accelerationIncludingGravity;
    let rotation = e.rotationRate;

    motion.innerHTML = 
    `
    x: ${acc.x *2}
    y: ${acc.y *2}
    z: ${acc.z *2}
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

interface Position {
    time: number,
    latitude: number,
    longitude: number
}


const showLocation = () => {
    console.log("hello");
    // navigator.
    navigator.geolocation.getCurrentPosition( async (pos) => {
        gps.style.display = "none";
        drone.style.display = "block";



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

const getGyro = () => {

}

let intervalID:any = 0;


if ('geolocation' in navigator){
    container.innerHTML = "geolocation finns";
    navigator.permissions.query({name: 'geolocation'}).then((res) => {
        if (res.state === 'granted') {
            gps.addEventListener("click", showLocation);
            // window.addEventListener('devicemotion', handleMotion, true);
        } else if (res.state === 'prompt') {
            container.innerHTML = 'Ge webbläsaren tillåtelse att se din plats om du vill';
        } else {
            console.log('Fick inte använda geolocation');
            container.innerHTML = 'Fick inte använda geolocation';

        }
    })

} else {
    container.innerHTML = "no navigator available at this time to aid u on ur quest";
}

