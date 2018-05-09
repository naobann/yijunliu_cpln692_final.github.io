// Global Variables
/*
var circle;
var drawn_marker = L.marker();
var drawn_markers = L.featureGroup();
map.addLayer(drawn_markers);
var counter_points_in_circle = 0;
// Initialize Leaflet Draw
var draw_control = new L.Control.Draw({
draw: {
 polyline: false,
 polygon: false,
 circle: true,
 marker: drawn_marker,
 rectangle: false,
},
edit: {
  featureGroup: drawn_markers,
  remove: true
}
});
map.on(L.Draw.Event.CREATED, function(event) {
	var layer = event.layer;

	drawn_markers.addLayer(layer);
});

map.addControl(draw_control);

function pointsInCircle(circle, meters_user_set) {
  if(circle !== undefined){
    circle_lat_long = circle.getLatLng();
       layer_lat_long = layer.getLatLng();
       distance_from_layer_circle = layer_lat_long.distanceTo(circle_lat_long);
       if(distance_from_layer_circle <= meters_user_set) {
         counter_points_in_circle +=1;
         var ofi_paf_html = '<h4>' + counter_points_in_circle + '. ' + '</h4>';
         $('#count').append(ofi_paf_html);
       }
     }}







map.on('draw:created', function (e) {
 $('#count').empty();


 if (myRectangle!== " "){map.removeLayer(myRectangle)};
 map.addLayer(layer1);
 myRectangle = layer1;
 $('#count').append("Current ID: " + counter_points_in_circle.length);
});
*/
