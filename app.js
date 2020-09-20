var inp = document.getElementById('search');
var btn = document.getElementById('btn');
var result = document.getElementById('result');

var xhr = new XMLHttpRequest();
function loadData(callback,callback1){
    var val = inp.value;
    xhr.open('GET',`https://geo.ipify.org/api/v1?apiKey=at_21c1HISxg59YfU2sdf9yVmDo8qN2x&ipAddress=${val}`,true);
    xhr.onload = function(){
        if(this.status == 200){
            var data = JSON.parse(this.responseText);
            callback(data);
            callback1(data.isp,data.location.lat,data.location.lng);
        }
    }
    xhr.send();
}

function resData(data){
    var ip = document.getElementById('ip-address');
    var ipdata = data.ip;
    ip.lastElementChild.innerHTML = ipdata;

    var location = document.getElementById('location');
    var locationdata = data.location.country;
    location.lastElementChild.innerHTML = locationdata;

    var timezone = document.getElementById('timezone');
    var timezonedata = data.location.timezone;
    timezone.lastElementChild.innerHTML = timezonedata;

    var isp = document.getElementById('ISP');
    var ispdata = data.isp;
    isp.lastElementChild.innerHTML = ispdata;

}

function getMap(isp,lat,long){
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VybmVldDcxIiwiYSI6ImNrZmFpZjA5dzB3OGMyc2xjcWlqczZ4OGIifQ.1ofod-lGpXlx0x_q7xBCiQ';
    var map = new mapboxgl.Map({
      container: 'map',
      center:[long,lat],
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom:12,
      interactive:false
      
    });

    var markerHeight = 50, markerRadius = 10, linearOffset = 25;
    var popupOffsets = {
    'top': [0, 0],
    'top-left': [0,0],
    'top-right': [0,0],
    'bottom': [0, -markerHeight],
    'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'left': [markerRadius, (markerHeight - markerRadius) * -1],
    'right': [-markerRadius, (markerHeight - markerRadius) * -1]
    };
    var popup = new mapboxgl.Popup({offset: popupOffsets, className: 'my-class'})
    .setLngLat([long,lat])
    .setHTML(`<p>${isp}</p>`)
    .setMaxWidth("300px")
    .addTo(map);
}

btn.addEventListener('click',function(e){
    e.preventDefault();
    loadData(resData,getMap);
});



 

