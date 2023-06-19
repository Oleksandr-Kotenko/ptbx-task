const imageHttpClient = require('../clients/images-http-client');
const { SORT_ORDER, sortByFieldMap, BORDER_FILTER, TEXTURE_FILTER } = require('../constants');

class PhotoProductsService {
  static async getPhotoProducts(options) {
    const response = await imageHttpClient.get('/');
    const photoProducts = response.data || [];

    const { border, texture } = options;
    const filteredPhotoProducts = this.applyFilters(photoProducts, { border, texture });
    return this.sortPhotoProducts(filteredPhotoProducts, options.sortBy, options.sortOrder);
  }

  static applyFilters(photoProducts, filters) {
    if (filters.border === BORDER_FILTER.TRUE && filters.texture && filters.texture !== TEXTURE_FILTER.NOT_APPLIED) {
      return photoProducts.filter(
        (photoProduct) =>
          photoProduct.extra && photoProduct.extra.border && photoProduct.extra.texture === filters.texture
      );
    }

    if (filters.border === BORDER_FILTER.FALSE && filters.texture && filters.texture !== TEXTURE_FILTER.NOT_APPLIED) {
      return photoProducts.filter(
        (photoProduct) =>
          photoProduct.extra && !photoProduct.extra.border && photoProduct.extra.texture === filters.texture
      );
    }

    if (filters.border === BORDER_FILTER.TRUE) {
      return photoProducts.filter((photoProduct) => photoProduct.extra && photoProduct.extra.border);
    }

    if (filters.border === BORDER_FILTER.FALSE) {
      return photoProducts.filter((photoProduct) => photoProduct.extra && !photoProduct.extra.border);
    }

    if (filters.texture && filters.texture !== TEXTURE_FILTER.NOT_APPLIED) {
      return photoProducts.filter(
        (photoProduct) => photoProduct.extra && photoProduct.extra.texture === filters.texture
      );
    }

    return photoProducts;
  }

  static sortPhotoProducts(photoProducts, sortBy, sortOrder) {
    if (!sortBy) {return photoProducts;}

    const order = sortOrder || SORT_ORDER.ASC;

    const result = [...photoProducts].sort((a, b) => {
      const valueA = a[sortByFieldMap[sortBy]];
      const valueB = b[sortByFieldMap[sortBy]];
      const valueAToCompare = typeof valueA === 'string' ? valueA.toUpperCase() : valueA;
      const valueBToCompare = typeof valueB === 'string' ? valueB.toUpperCase() : valueB;
      if (valueAToCompare < valueBToCompare) {
        return -1;
      }
      if (valueAToCompare > valueBToCompare) {
        return 1;
      }

      return 0;
    });

    return order === SORT_ORDER.ASC ? result : result.reverse();
  }
}

module.exports = PhotoProductsService;
