class LocalCache {
  constructor() {
    this.cacheName = "maincache";
  }
  async putResponse(response) {
    // This method gets a response as input and simply puts that response into cache.

    await caches.open(this.cacheName).then(async (cache) => {
      await cache.put(response.url, response);
    });
  }

  async putByURL(url) {
    // This method gets the url as parameter then download the data from network and puts
    // the data info cache. It also returns the downloaded data.

    let response = await fetch(url);
    let response2 = response.clone();
    await this.putResponse(response);
    return response2;
  }

  async get(url) {
    // This method first tries to get the information from cahce. if found it returns the
    // if not found then it download the data using fetch method then put the data into
    // cache and then returns the data... next time the data will be comming from cache
    // if downloaded.

    let response = await caches.match(url);
    if (response) {
      return response;
    } else {
      let response = await this.putByURL(url);
      return response;
    }
  }

  async deleteCache(url) {
    caches.open(this.cacheName).then((cache) => {
      cache.delete(url);
    });
  }
}

export default LocalCache;
