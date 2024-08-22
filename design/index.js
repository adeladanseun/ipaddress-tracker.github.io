//output format
/* {
    "ip": "8.8.8.8",
    "location": {
        "country": "US",
        "region": "California",
        "timezone": "-07:00",
    },
    "domains": [
        "0d2.net",
        "003725.com",
        "0f6.b0094c.cn",
        "007515.com",
        "0guhi.jocose.cn"
    ],
    "as": {
        "asn": 15169,
        "name": "Google LLC",
        "route": "8.8.8.0/24",
        "domain": "https://about.google/intl/en/",
        "type": "Content"
    },
    "isp": "Google LLC"
} */
//api
/* at_vZRA0S2vOrriMBhG3EsyY73WbYEUU */
const input = document.getElementById("ipinput");
const inputbtn = document.getElementById("inputbtn");
const ipPos = document.querySelector(".headerSection .mainWrapper .ipaddress");
const locPos = document.querySelector(".headerSection .mainWrapper .location");
const timePos = document.querySelector(".headerSection .mainWrapper .timezone");
const ispPos = document.querySelector(".headerSection .mainWrapper .isp");
async function getData(
  ip = "",
  domain = "",
  apiKey = "at_vZRA0S2vOrriMBhG3EsyY73WbYEUU",
  type = "coord"
) {
  let request;
  if (type !== "coord") {
    request = `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ip}&domain=${domain}`;
  } else {
    request = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}&domain=${domain}`;
  }
  const data = await fetch(request);
  const response = await data.json();
  processJson(response);
}
function processJson(
  data = {
    ip: "123.345.678.99",
    isp: "MTN Nigeria Communication",
    location: {
      city: "Lagos",
      country: "Country",
      postalCode: "10002",
      timezone: "+0.00UTC",
      lat: 57.23,
      lng: 12.234,
    },
  }
) {
  let ip = data["ip"];
  let location = `${data["location"]["city"]}, ${data["location"]["country"]}, ${data["location"]["postalCode"]}`;
  let zone = data["location"]["timezone"];
  let isp = data["isp"];
  let latitude = data["location"]["lat"];
  let longitude = data["location"]["lng"];
  ipPos.innerText = ip;
  locPos.innerText = location;
  timePos.innerText = zone;
  ispPos.innerText = `UTC ${isp}`;
  const body = document.querySelector("body");
  body.removeChild(document.getElementById("map"));
  const new_map = document.createElement("div");
  new_map.id = "map";
  new_map.classList.add('map')
  body.appendChild(new_map);
  //document.getElementById('map').innerHTML = ''
  let map = L.map("map").setView([latitude, longitude], 18);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  let marker = L.marker([latitude, longitude]).addTo(map);
  marker
    .bindPopup(
      "<b>Current Location</b><br><div style='text-align: center;'>ip here</div>"
    )
    .openPopup();
}
function containsOnly(values = [], string = "") {
  for (let i = 0; i < string.length; i++) {
    if (!values.includes(string[i])) return false;
  }
  return true;
}
inputbtn.addEventListener("click", () => {
  input.value = input.value.trim();
  if (!input.value) {
    getData()
  } else if (
    containsOnly(
      [".", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      input.value
    )
  ) {
    getData((ip = input.value));
  } else {
    getData("", input.value);
  }
});
getData()
//getData("102.88.63.119");
//live response
/* 
{
    "ip": "102.88.63.119",
    "location": {
        "country": "NG",
        "region": "Lagos State",
        "timezone": "+01:00"
    },
    "as": {
        "asn": 29465,
        "name": "VCG-AS",
        "route": "102.88.63.0/24",
        "domain": "http://www.mtnonline.com/",
        "type": "NSP"
    },
    "isp": "MTN NIGERIA Communication"
} */
//getData("google.com")
/* 
as
: 
{asn: 15169, name: 'GOOGLE', route: '142.250.68.0/24', domain: 'https://about.google/intl/en/', type: 'Content'}
domains
: 
(5) ['dberrenzhuan.xyz', 'loans-monkey.co.uk', 'youtube.com.jo', 'youtube.nl', '5070ae35.cdn5.cc']
ip
: 
"142.250.68.14"
isp
: 
"Google LLC"
location
: 
{country: 'US', region: 'California', timezone: '-07:00'}

*/
//getData()
/* 
{
    "ip": "102.89.34.21",
    "location": {
        "country": "NG",
        "region": "Ogun State",
        "timezone": "+01:00"
    },
    "as": {
        "asn": 29465,
        "name": "VCG-AS",
        "route": "102.89.34.0/24",
        "domain": "http://www.mtnonline.com/",
        "type": "NSP"
    },
    "isp": "MTN NIGERIA Communication"
}
 */
/* let map = L.map("map").setView([5.0, 4.0], 5.05);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map); */
/* let marker = L.marker([51.5, -0.09]).addTo(map);
marker.bindPopup("<b>Current Location</b><br><div style='text-align: center;'>ip here</div>").openPopup(); */
