const mymap = L.map('mapid', {
    zoomSnap: 0.25,
    minZoom: 2.25,
    zoomControl: false,
    scrollWheelZoom: false
}).setView([40, 0], 2.25);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    accessToken: 'pk.eyJ1IjoicmFuZG9tLWNvc21vcyIsImEiOiJjazR6dnIwZDUwNzRxM21uejBpNjZib2d5In0.CvLeZxh4g4f8grgQpdjCIA',
}).addTo(mymap);


$(".reset").on("click", () => {
    // mymap.setZoom(2.25);
    mymap.setView([40, 0], 2.25);
});

const earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv"

d3.csv(earthquakeData)
    .then(Response => data = Response)
    .then(setInterval(() => {
        for (let position of data) {
            let latitude = position.latitude;
            let longitude = position.longitude;
            let magnitude = Number(position.mag);


            L.circle([latitude, longitude], {
                color: '#708090',
                fillColor: '#708090',
                fillOpacity: 1,
                radius: magnitude * 10000 * 2
            }).addTo(mymap);
        }
    }), 1000 * 60);

var loc = window.location.href + '';
if (loc.indexOf('http://') == 0) {
    window.location.href = loc.replace('http://', 'https://');
}