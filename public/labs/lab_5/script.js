

function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  let mymap=L.map('mapid').setView([38.9897, -76.9378], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoiam9lMTIxMiIsImEiOiJja202cGF1MW8wMWExMnJvMmp5OHdxM3d4In0.lDELUdeujTHCGEySWvQtrA' 
  }).addTo(mymap);
  
  console.log('mymap',mymap);

  return mymap;
}

async function dataHandler(mapFromLeaflet) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  const form = document.querySelector('.search-form');
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint); // Fetch request
  const zipCode = await request.json(); // Empty array, this replaces
  // the race condition promise chain from the original tutorial
  

  function findMatches(numberToMatch, zipCode) {
    return zipCode.filter((restaurants) => {
      const regex = new RegExp(numberToMatch, 'gi');
      return restaurants.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, zipCode);
    const html = matchArray
      .map((restaurants) => {
        const regex = new RegExp(event.target.value, 'gi');
        const restaurantName = restaurants.name.replace(regex,`<span class="h1">${event.target.value}</span>`); // Highlights the restaurants name
        return `
          <li>
				  <span class = "title">${restaurantName}</span>
				  <span class = "address">${restaurants.address_line_1}</span>
				  <span class = "city">${restaurants.city}</span>
				  <span class = "category">${restaurants.category}</span>
				  </li>
			  `;
      }).join('');
      recommendations.innerHTML = html; }
  
  function displayMarker() {
    matchArray.forEach((item) => {
      const longLat = item.geocoded_column_1.coordinates;
      console.log('markerLongLat', longLat[0], longLat[1]);
      const marker = L.marker([longLat[1], longLat[0]]).addTo(mapFromLeaflet);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log('hi');
    displayMarker(event);
  });
  

  const searchInput = document.querySelector('.typehead');
  const recommendations = document.querySelector('.recommendations');

  searchInput.addEventListener('input', displayMatches);
  searchInput.addEventListener('button', (evt) => {
    displayMatches(evt);
  });
  

}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;


/*
const filtered = restaurants.zip.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
        filtered.forEach(item) => {
          const longLat = item.geocoded_column_1.coordinates;
          console.log('markerLonglat', longLat[0], longLat[1]);
          const marker = L.marker([longLat[1], longLat[0]).addTo(mymap);
        });
*/