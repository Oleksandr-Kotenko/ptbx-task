const axios = require('axios');
const { IMAGES_URL } = require('../constants');

class ImagesHttpClient {
  constructor(baseUrl) {
    this.imageClientInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  get(url, config = {}) {
    return this.imageClientInstance.get(url, config);
  }
}

module.exports = new ImagesHttpClient(IMAGES_URL);
