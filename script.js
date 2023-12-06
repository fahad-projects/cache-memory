const image = document.getElementById("image");
const indicator = document.getElementById("indicator");
let src = "https://api.slingacademy.com/public/sample-photos/1.jpeg";
let fakeapi = "https://jsonplaceholder.typicode.com/todos/1/posts";

const imageCacheName = "image-cache";

caches.match(src).then(async (response) => {
  if (response) {
    indicator.innerText = "Got the Response from Cache";
    displayImage(response);
  } else {
    indicator.innerText = "Got the Response from Network";
    const response = await downloadImage();
    const res2 = response.clone();
    displayImage(response);
    cacheImage(res2);
  }
});

const downloadImage = async () => {
  const response = await fetch(src);
  return response;
};

const displayImage = async (response) => {
  const blob = await response.blob();
  const _url = URL.createObjectURL(blob);
  image.src = _url;
};

const cacheImage = async (response) => {
  await caches.open(imageCacheName).then(async (cache) => {
    await cache.put(response.url, response);
  });
};
