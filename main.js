/* ====================================
Final Project Yijun Liu CPLN 692-401
======================================= */
//get Map
var map = L.map('map').setView([30.302809, -97.748179], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 0,
        maxZoom: 20,
        opacity: 0.65,
        grayscale: 1
    }).addTo(map);


//get data
var animalURL="https://raw.githubusercontent.com/naobann/Final-Data/master/map.geojson"
var sheltersURL="https://raw.githubusercontent.com/naobann/Final-Data/master/shelters.geojson"

//create icons
var catIcon = L.icon({
    iconUrl: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBB%0D%0AZG9iZSBJbGx1c3RyYXRvciAyMi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9u%0D%0AOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIg0KCSBpZD0ic3ZnMiIgaW5r%0D%0Ac2NhcGU6dmVyc2lvbj0iMC45MSByMTM3MjUiIHhtbG5zOmNjPSJodHRwOi8vd2ViLnJlc291cmNl%0D%0ALm9yZy9jYy8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1s%0D%0AbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUi%0D%0AIHhtbG5zOm5zMT0iaHR0cDovL3NvemkuYmFpZXJvdWdlLmZyIiB4bWxuczpyZGY9Imh0dHA6Ly93%0D%0Ad3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zOnNvZGlwb2RpPSJodHRw%0D%0AOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIgeG1sbnM6c3Zn%0D%0APSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3Jn%0D%0ALzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0i%0D%0AMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAyNzUuNCAyMDQuMSINCgkgc3R5bGU9ImVuYWJsZS1i%0D%0AYWNrZ3JvdW5kOm5ldyAwIDAgMjc1LjQgMjA0LjE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxz%0D%0AdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiM2Q0NDREU7fQ0KPC9zdHlsZT4NCjxn%0D%0AIGlkPSJnMjM4Ij4NCgk8cGF0aCBpZD0icGF0aDEzMzciIGNsYXNzPSJzdDAiIGQ9Ik04NS4xLDE5%0D%0AMS41Yy05LjYtMTIuOC0xMS43LTE2LjItMTAuNS0zMi40YzEuNS0yMS4zLDEtMjEuMy0yNy44LDBj%0D%0ALTEzLjMsOS44LTE1LjksMTQuNi0xNC4yLDI2DQoJCWMxLjYsMTEsMC4yLDE0LTYuOCwxNGMtMTUu%0D%0AMSwwLTExLjktMzMsNS4yLTUzLjhjNy44LTkuNCw5LjQtMjIuMiwxMy4zLTMzLjFjNS4zLTE0Ljcs%0D%0AOC4yLTI2LjgsNy0zMC4yYy02LjEtMTktNi43LTI3LjUtMjAuMi00Ny4zDQoJCUM5LjgsMy42LTMu%0D%0AMiw1LjUsMC43LDAuOHMyNS42LDExLjMsMzUuNywyNi41QzQ2LjUsNDIuNiw1NCw1OC45LDYzLjks%0D%0ANjQuMmM5LjksNS4zLDk2LjksMjMsMTMwLjEsMTEuMWMxNC4xLTUsMzItMTIuMyw0Ny44LTEwLjYN%0D%0ACgkJYzguNiwxLDE0LjctMTUuNywxOC4xLTEyLjdjMi43LDIuNC00LjksOSwxMC4zLDIwLjhjNC4y%0D%0ALDMuMyw1LjQsOS41LDUuMiwxNC42Yy0wLjYsMTcuMy0xMC41LDExLjUtMjMuNywxMS41DQoJCWMt%0D%0AOS45LDAtMzIuNCwxMy43LTMxLjksMjcuOGMwLjIsNi4xLDMuOSwyNC4xLDExLjMsMzcuNWM0Ljks%0D%0AOC45LDguNCwxNy40LDExLjMsMjIuN2M0LjYsOC4zLDguMiw5LjgtMS4zLDEyLjENCgkJYy0yLjIs%0D%0AMC41LTYuOC01LjItMTAuMy0xMS42Yy0zLjQtNi40LTE0LjYtMjkuMS0yMi4zLTM0LjhjLTEyLjgt%0D%0AOS41LTExLTkuNy0xMy45LTIuMmMtMS43LDQuNS0yLjEsMjcuMiwwLjcsMzQuOA0KCQljNC4yLDEx%0D%0ALjIsNi4xLDEzLjktMS42LDEzLjljLTMuOCwwLTYuOS00LjMtNi45LTkuNmMwLTUuMy0zLjktMTgu%0D%0AMy03LjgtMjkuMWMtNC4zLTEyLDEuOC0xNC42LTcuOC0xOS41cy05LDAuMy0zMi4xLDIuMQ0KCQlj%0D%0ALTIzLjEsMS44LTMwLjEtMS0zOS40LDEyLjFjLTEzLjIsMTguNi0xMi43LDI0LjYsMy4zLDM3Ljdj%0D%0AOC42LDcsOC4zLDExLjQsMy42LDExLjRDOTUuMSwyMDQuMSw5MS40LDIwMCw4NS4xLDE5MS41TDg1%0D%0ALjEsMTkxLjV6Ig0KCQkvPg0KPC9nPg0KPC9zdmc+DQo=',
    iconSize:     L.Point(40,40), // size of the icon
    iconAnchor:   [40, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [-40, -40] // point from which the popup should open relative to the iconAnchor
});

var dogIcon = L.icon({
  iconUrl:
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBB%0D%0AZG9iZSBJbGx1c3RyYXRvciAyMi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9u%0D%0AOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1s%0D%0AbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53%0D%0AMy5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxMDAgMTI1%0D%0AIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTI1OyIgeG1sOnNwYWNlPSJw%0D%0AcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDojRkZDRTJGO30N%0D%0ACjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDEuMiw3OC42Yy0xLjMsMC44LTIuMyww%0D%0ALjItMy43LTAuMWMtMS4yLTAuMy0yLDAuMi0zLjEsMC40Yy0zLjgsMC43LTQtMy44LTYuOS00Ljlj%0D%0ALTAuNywxLjctMC4zLDMuNS0wLjUsNS4zDQoJYy0wLjIsMi42LTAuNCw1LjItMC43LDcuOGMtMC42%0D%0ALDQuMSwwLjUsOC40LTAuNSwxMi40Yy0wLjQsMS42LTAuOSw0LjItMi4zLDUuM2MtMC43LDAuNi00%0D%0ALjEsMC45LTQuNiwwLjJjLTAuNi0wLjgtNC4yLTAuMS01LjItMC42DQoJYy0yLjYtMS4yLTAuNi0y%0D%0ALjcsMC44LTRjMS4zLTEuMywzLTIsMy42LTMuOGMwLjYtMiwwLjctNS4zLDAuMS03LjNjLTAuNS0x%0D%0ALjgsMC4zLTMuOCwwLTUuN2MtMC41LTIuOS0xLjEtNS40LTAuOC04LjUNCgljMC4zLTIuOCwxLjEt%0D%0ANS4xLDAuMS03LjljLTAuNy0yLjMtMS4yLTQuMi0wLjUtNi42YzEtMy43LDEuMS04LjQsMi44LTEx%0D%0ALjljMC4zLTAuNywxLjUtMS41LDEuMi0yLjJjLTAuNi0xLjEtMS4xLTIuNS0yLTMuNA0KCWMtMS4z%0D%0ALTIuMi0yLjEtNC44LTIuMS03LjRjLTEuOSw0LjYtNy4zLTIuNy03LjctNS4xYy0wLjYtMS43LTIu%0D%0ANS00LjYtMS02LjNjMS4xLTEuMiwzLjMtMS44LDQuNi0yLjZjMS40LTAuNywzLjMtMS40LDQuNC0y%0D%0ALjQNCgljMC42LTAuNiwxLjQtMSwyLjItMS4xYzEuNC0wLjIsMi45LDEuNSwzLjgsMS4yYzIuNC0x%0D%0ALjEsNS4xLTEsNy43LTEuM2MyLjEtMC4yLDUtMC4xLDYuNiwxLjRjMS0xLjUsMi40LTEuOSw0LTEN%0D%0ACgljMS45LDEuMSwyLjUsMS44LDQuOCwyLjNjMy42LDAuNyw1LjYsMi42LDUuMyw2LjJjLTAuMywz%0D%0ALjUtMC4zLDcuMS0xLjIsMTAuNWMtMC4zLDEuMS0xLjEsMy4xLTIuMiwxLjRjLTEuMi0xLjgtMi43%0D%0ALTQuNC0yLjgtNi41DQoJYy0wLjQsMS42LTAuNiwzLjItMC44LDQuOGMtMC4xLDAuOS0xLjgsNS4y%0D%0ALTEuNyw1LjRjMC41LDAuOCwwLjMsMS41LDEuMiwxLjVjMS4zLDAsMi41LDAuMSwzLjgsMC4yYzIu%0D%0AMywwLjMsNC41LDEuMyw2LjgsMS40DQoJYzMuOCwwLjIsNy44LTMuNCwxMS01LjFjNS4yLTIuNywx%0D%0AMC44LTQuOCwxNi43LTVjMi4zLTAuMSw0LjcsMC4xLDYuOCwxYzAuNiwwLjMsNCwwLjksMy4zLDEu%0D%0AM2MtMi43LDEuOC01LjksMi05LjEsMi4yDQoJYy0zLjksMC4zLTcuOSwxLjYtMTEuMywzLjZjLTIu%0D%0AOCwxLjYtNS4zLDMuNy03LjIsNi4zYzAsMC4zLDAuOCwxLjIsMC45LDEuNGMwLjgsMS40LDEuNiwy%0D%0ALjgsMi4yLDQuM2MxLjYsMy43LDEuOSw3LjgsMy41LDExLjUNCgljMS43LDQuMiwxLjUsOC45LDMu%0D%0ANCwxMi45YzEuMiwyLjUsMC40LDYuNywwLjUsOS40YzAsMiwwLDQsMC4zLDZjMC4yLDEuMywwLjgs%0D%0AMi41LDAuOCwzLjljMC4yLDMuNC02LjEsMS41LTcuOSwxLjQNCgljLTIuNi0wLjEsMC43LTYuNSww%0D%0ALjktNy44YzAuMy0yLjEsMC4xLTQuNC0wLjMtNi40Yy0wLjMtMS45LTEuMy0zLjItMS4xLTUuMmMw%0D%0ALjItMS45LTAuOS0yLjgtMi40LTMuN2MtMS45LTEuMi0zLjgtMi45LTQuNC01LjINCgljLTMuMiwx%0D%0ALjQtNy42LDEuOC03LjcsNi4yYy0wLjEsMy44LTAuMSw3LjctMC41LDExLjVjLTAuMywzLjItMS40%0D%0ALDcuNy0wLjIsMTAuN2MwLjYsMS40LDEuOCw0LjQsMC4xLDUuNWMtMC44LDAuNi0xLjYsMC0yLjUs%0D%0AMC4yDQoJYy0xLjMsMC40LTIuOCwwLjUtNC4xLTAuMWMtMC42LDAtMS4zLDAuMi0xLjksMC4yYy0w%0D%0ALjgsMC0yLjEtMS0yLjUtMC43Yy0xLjcsMS4yLTAuMS00LjYsMC00LjljMC41LTEuMSwxLTIuNCwx%0D%0ALTMuNw0KCWMtMC4zLTAuNC0yLDAtMi4xLTAuN2MtMC43LTAuMS0xLjYsMC4xLTIuMywwLjFjLTAu%0D%0AOSwwLTEuNC0wLjQtMi4xLTAuNkMzNC40LDk1LjgsMzYsOTQsMzYuOSw5M2MwLjgtMC45LDEuNy0w%0D%0ALjgsMi42LTEuNA0KCWMwLjctMC40LDEuMy0xLjcsMS44LTIuNGMxLjEtMS44LDEuNi0zLjgsMS45%0D%0ALTUuOEM0My42LDgxLjUsNDIuMyw4MC4xLDQxLjIsNzguNnoiLz4NCjwvc3ZnPg0K',
  iconSize: [40,40],
  iconAnchor: [40,40],
  popupAnchor: [-40,-40]
});

var shelterIcon = L.icon({
  iconUrl:'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBB%0D%0AZG9iZSBJbGx1c3RyYXRvciAyMi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9u%0D%0AOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1s%0D%0AbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53%0D%0AMy5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxMDAgMTAw%0D%0AIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwOyIgeG1sOnNwYWNlPSJw%0D%0AcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDojODA4MDgwO30N%0D%0ACjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjQuNSw2NWMtMi40LDAtNC4zLDEuOC00%0D%0ALjMsNC4zdjEzLjJjMCwxLjQtMC4yLDEuNy0xLjYsMS43SDU4Yy0wLjItNS42LTEuMy0xMS43LTQu%0D%0AMi0xNC41DQoJYzIuMS0xLjMsMy41LTMuNiwzLjUtNi4yYzAtMi42LTEuNC00LjktMy41LTYuMmwt%0D%0AMS4yLTQuNWwtMSwzLjZjLTAuNS0wLjEtMS0wLjItMS42LTAuMnMtMS4xLDAuMS0xLjYsMC4ybC0x%0D%0ALTMuNmwtMS4yLDQuNQ0KCWMtMi4xLDEuMy0zLjUsMy42LTMuNSw2LjJjMCwyLjYsMS40LDQuOSwz%0D%0ALjUsNi4yYy0zLjQsMy4zLTQuMywxMC45LTQuMywxNy4xaDEzLjNINThoMC41YzIuOCwwLDQuMi0x%0D%0ALjQsNC4yLTQuM1Y2OS4zDQoJYzAtMSwwLjctMS43LDEuNy0xLjdjMC43LDAsMS4zLTAuNiwxLjMt%0D%0AMS4zQzY1LjcsNjUuNiw2NS4yLDY1LDY0LjUsNjV6Ii8+DQo8cG9seWdvbiBjbGFzcz0ic3QwIiBw%0D%0Ab2ludHM9IjEwLDQxLjggNS42LDQ1LjIgNS42LDM2LjYgNTAsMi43IDUwLDExLjMgMTQuMiwzOC42%0D%0AIDE0LjIsODkgNTAsODkgNTAsOTcuMyAxMCw5Ny4zICIvPg0KPHBvbHlnb24gY2xhc3M9InN0MCIg%0D%0AcG9pbnRzPSI5MCw0MS44IDk0LjQsNDUuMiA5NC40LDM2LjYgNTAsMi43IDUwLDExLjMgODUuOCwz%0D%0AOC42IDg1LjgsODkgNTAsODkgNTAsOTcuMyA5MCw5Ny4zICIvPg0KPC9zdmc+DQo=',
  iconSize: [40,40],
  iconAnchor: [40,40],
  popupAnchor: [-40,-40]
});



var featureGroup1;
var featureGroup2;
var featureGroup3;
var featureGroup4 = featureGroup2 + featureGroup3;

var myFilterCat = function(feature, layer) {if(feature.properties.Type==="Cat") {return true}};
var myFilterDog = function(feature, layer) {if(feature.properties.Type==="Dog") {return true}};
var myStyleAnimals = {
    "opacity": 0.5
};
var myStyleShelters = {
  "opacity": 1.5
}


function onEachFeature1(feature, layer) {
  layer.on ('mouseover', function(e){
    if(feature.properties && feature.properties.Address){
      layer.bindPopup(feature.properties.Name + ". Address: " + feature.properties.Address).openPopup();;
    }
  })
};

function onEachFeature2(feature, layer) {
    layer.on ('mouseover', function(e){
        if(feature.properties && feature.properties.Type){
        layer.bindPopup("Animal ID:" + " " + feature.properties.AnimalID + ". " + "This is a " + " " +
        feature.properties.Age + " " + feature.properties.Sex + " " + feature.properties.Color +
        " " + feature.properties.Type + ", looks like a" + " " + feature.properties.LooksLike +
        ", it was found at" + " " + feature.properties.FoundLocation + " " +  "on the date of " +
        feature.properties.IntakeDate + ".").openPopup();;
    }
  })}

//=======================================================================

$(document).ready(function(){

//plot shelters locations
   $.ajax(sheltersURL).done(function(data){
   var parsedData = JSON.parse(data);
   featureGroup1 = L.geoJson(parsedData,{
     style: myStyleShelters,
     onEachFeature: onEachFeature1,
     pointToLayer: function (feature, latlng) {
       return L.marker(latlng, {icon: shelterIcon});
     }
   }).addTo(map)});

//plot cats locations
   $.ajax(animalURL).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup2 = L.geoJson(parsedData, {
      style: myStyleAnimals,
      filter: myFilterCat,
      onEachFeature: onEachFeature2,
      pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {icon: catIcon});
    }}).addTo(map);
 });

//plot dogs locations
   $.ajax(animalURL).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup3 = L.geoJson(parsedData, {
      style: myStyleAnimals,
      filter: myFilterDog,
      onEachFeature: onEachFeature2,
      pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {icon: dogIcon});
  }}).addTo(map);
});


//button selective ploting
    //shelter button
      $('#shelterButton').click(function(){
        map.removeLayer(featureGroup2);
        map.removeLayer(featureGroup3);
        featureGroup1.addTo(map);
      });

    //cat button
      $('#catButton').click(function(){
        map.removeLayer(featureGroup1);
        map.removeLayer(featureGroup3);
         featureGroup2.addTo(map);
      });

    //dog button
      $('#dogButton').click(function(){
        map.removeLayer(featureGroup1);
        map.removeLayer(featureGroup2);
        featureGroup3.addTo(map);
      });

    //resetButton
      $('#resetButton').click(function(){
        featureGroup1.addTo(map);
        featureGroup2.addTo(map);
        featureGroup3.addTo(map);
      });

});


//===============================================================================================
//Count the number of animals within user selected radius:

var circle;
var drawn_marker = L.marker();
var drawn_markers = L.featureGroup();
//the layer for drawn markers
map.addLayer(drawn_markers);

//as leaflet calculates on meters, first transform kms to meters
function kmsToMeters(kms) {
	return kms * 1000;
};

//calculate the number of animals within the drawn circle
function pointsInCircle(circle, meters_user_set) {
  var test = [];
	if (circle !== undefined) {
    circle_lat_long = circle.getLatLng();
    var count = 0;

    //calculate found cats in selected radius
		featureGroup2.eachLayer(function(layer) {
			var layer_lat_long = layer.getLatLng();
			var distance_from_layer_circle = layer_lat_long.distanceTo(circle_lat_long);
			if (distance_from_layer_circle <= meters_user_set) {
        test.push(layer.feature);
        console.log(test.length);
				count += 1;
				var show = '<h6>' + count + ": " + layer.feature.properties.Age + " old " +
        layer.feature.properties.Color + " " + layer.feature.properties.LooksLike +
        " " + layer.feature.properties.Sex + " " + layer.feature.properties.Type + '</h6>';
// Convert back to kms
				show += 'Distance from selected location: ' + (distance_from_layer_circle * 0.001).toFixed(2) + ' miles';
        //show descriptions of each found animal
				$('#description').append(show);
			} else {count}
		});

    //calculate found dogs in selected radius
    featureGroup3.eachLayer(function(layer) {
      var layer_lat_long = layer.getLatLng();
      var distance_from_layer_circle = layer_lat_long.distanceTo(circle_lat_long);
      if (distance_from_layer_circle <= meters_user_set) {
        test.push(layer);
        console.log(test.length);
        count += 1;
        var show = '<h6>' + count + ": " + layer.feature.properties.Age + " old " +
        layer.feature.properties.Color + " " + layer.feature.properties.LooksLike + " " +
        layer.feature.properties.Sex + " " + layer.feature.properties.Type + '</h6>' ;
    // Convert back to kms
      	show += 'Distance from selected location: ' + (distance_from_layer_circle * 0.001).toFixed(2) + ' miles';
        //show descriptions of each found animal
        $('#description').append(show);
      } else {count}
    });

//show total number of animals in the radius
		$('#result').html(count);
	}
};

//user draw
var draw_control = new L.Control.Draw({
	draw: {
		polyline: false,
		polygon: false,
		circle: false,
    rectangle: false,
		marker: drawn_marker,
    circlemarker: false
	}
});
map.addControl(draw_control);
map.on(L.Draw.Event.CREATED, function(event) {
	var layer = event.layer;

	drawn_markers.addLayer(layer);
});

// Change circle radius when selected radius changed
function changeCircleRadius(e) {
	pointsInCircle(circle, kmsToMeters($('#radius-selected').val()))
	if (circle) {
		circle.setRadius(kmsToMeters($('#radius-selected').val()));
	}
}

//draw a circle around the selected location
map.on('draw:created', function (e) {
  //hide previous marker
    if(circle) {
        map.removeLayer(circle);
    };
    if(drawn_markers){
      map.removeLayer(drawn_markers)
    };
	var marker_lat_long = e.layer._latlng
	var radius = kmsToMeters($('#radius-selected').val());
	circle = L.circle(marker_lat_long, radius, {color: "#254759", opacity: "0.5"})
	circle.addTo(map);
	pointsInCircle(circle, radius);
  $('.leaflet-draw-draw-marker').hide();
});

// Radius dropdown
$('select').change(function() {
	changeCircleRadius();
});
