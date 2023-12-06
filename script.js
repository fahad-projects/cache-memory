import LocalCache from "./cahce.js";
const show_data = document.getElementById("show-data");
let fakeapi = "https://api.slingacademy.com/v1/sample-data/photos";

let cache = new LocalCache();

let response = await cache.get(fakeapi);
let data = await response.json();
data = data["photos"];

for (let i = 0; i < data.length; i++) {
  let image = await cache.get(data[i]["url"]);
  let blob = await image.blob();
  let url = URL.createObjectURL(blob);

  let h3 = document.createElement("h3");
  h3.innerText = data[i]["title"];
  let img = document.createElement("img");
  img.src = url;

  show_data.appendChild(h3);
  show_data.appendChild(img);
}
