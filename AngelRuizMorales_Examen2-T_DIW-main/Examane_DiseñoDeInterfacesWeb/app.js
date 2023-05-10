var map = L.map('map').setView([36.720876,-4.416964],16);
const lista = document.querySelector("#lista");
const template = document.querySelector("template")

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

recorrer()
function recorrer(){
  fetch('https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json?classId=a44f2eea-e51b-4a7a-a11a-eefc73428d1a&assignmentId=b6d46e1e-b651-43e1-b861-1d6ba465dd82&submissionId=99e6b794-4401-fb1a-4ebc-cbcef9b44f04')
  .then(response => response.json())
  .then(data => {
   Ubicaciones(data)
    console.log(rutas)
  } )
  .catch(error => console.error(error));
}
function Ubicaciones(rutas){
    Object.keys(rutas).forEach(function(index) {
      var element = rutas[index];
      marker = L.marker([element.properties.x, element.properties.y]).addTo(map);
      var popup = L.popup()
      marker.bindPopup(element.properties.direccion+"<br>"+"<h5>"+element.properties.nombre+"</h5>").openPopup();
      let prueba = template.content.cloneNode(true)
      prueba.querySelector("h3").innerText=element.properties.nombre
      prueba.querySelector("h4").innerText=element.properties.horario
      prueba.querySelector("p").innerText=element.properties.direccion
      prueba.querySelector("h5").innerText=element.properties.telefono
      lista.appendChild(prueba)
    });
  } 

  var myIcon = L.icon({
    iconUrl: 'img/fountain.png',
    iconSize: [40, 40],
    iconAnchor: [40, 40]
});
  //forma rapida para pop up e icono

  var fuente=L.geoJson(fuentes,{pointToLayer:function(geoJsonPoint, latlng) {
    var popup = L.popup()
    .setLatLng(latlng)
    .setContent('<p>Hello world!<br />This is a nice popup.</p>');
    return L.marker(latlng,{icon:myIcon}).bindPopup(popup);
  //buena forma con each poner 
}
}).addTo(map);
  var overlay ={
    "fuentes": fuente,
  }
  var layerControl = L.control.layers(baseLayers,overlay).addTo(map);

