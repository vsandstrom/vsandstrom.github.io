let gps: HTMLElement | null = document.getElementById("getLocation");
// Use this variable! does not exist yet
let start: HTMLElement | null = document.getElementById("startLocation");
let contGps: HTMLElement | null = document.getElementById("getContinuousLocation");
let container: HTMLElement | null = document.getElementById("container");

const url: string = "http://127.0.0.1:5000";


// navigator.permissions.query({name: 'geolocation'}).then((res) => {
//     if (res.state === 'denied') {
//         console.log('Fick inte använda accelerometern');
//         return;
//     }
//
// })

if (window.DeviceMotionEvent) {
    window.addEventListener("deviceorientation", (e) => handleOrientation(e));

}



interface Position {
    time: number,
    latitude: number,
    longitude: number
}

if ("Gyroscope" in window) {
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
    gps.addEventListener("click", showLocation);


} else {
    container.innerHTML = "no navigator available at this time to aid u on ur quest";
}
