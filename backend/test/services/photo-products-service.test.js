const PhotoProductsService = require('../../src/services/photo-products-service');
const imageHttpClient = require('../../src/clients/images-http-client');

describe('PhotoProductsService', () => {

  describe('getPhotoProducts', () => {
    let imageHttpClientGetSpy;

    beforeEach(() => {
      imageHttpClientGetSpy = jest.spyOn(imageHttpClient, 'get')
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should return photoProducts which matches options', async() => {
      imageHttpClientGetSpy.mockResolvedValueOnce({
        data: [{
          id: 'image1',
          orderCount: 100,
          category: 'poster',
          extra: {
            texture: 'glossy',
            border: 5,
            rotate: 90
          }
        }]
      });

      const result = await PhotoProductsService.getPhotoProducts({
        texture: 'glossy',
      });

      expect(result).toEqual([{
        id: 'image1',
        orderCount: 100,
        category: 'poster',
        extra: {
          texture: 'glossy',
          border: 5,
          rotate: 90
        }
      }]);

      expect(imageHttpClientGetSpy).nthCalledWith(1, '/');
    });
  });

  describe('applyFilters', () => {
    const photoProducts = [
      {
        id: 'image1',
        orderCount: 100,
        category: 'poster',
        extra: {
          texture: 'glossy',
          border: 5,
          rotate: 90
        }
      },
      {
        id: 'image2',
        orderCount: 200,
        category: 'poster',
        extra: {
          texture: 'glossy',
          rotate: 90
        }
      },
      {
        id: 'image3',
        orderCount: 300,
        category: 'poster',
        extra: {
          texture: 'canvas',
          border: 5,
          rotate: 90
        }
      },
      {
        id: 'image4',
        orderCount: 400,
        category: 'poster',
        extra: {
          texture: 'canvas',
          rotate: 90
        }
      },
    ];

    test('should filer photoProducts by border if criteria passed', () => {
      const result = PhotoProductsService.applyFilters(photoProducts, {
        border: 'true'
      });

      expect(result).toEqual([
        {
          id: 'image1',
          orderCount: 100,
          category: 'poster',
          extra: {
            texture: 'glossy',
            border: 5,
            rotate: 90
          }
        },
        {
          id: 'image3',
          orderCount: 300,
          category: 'poster',
          extra: {
            texture: 'canvas',
            border: 5,
            rotate: 90
          }
        },
      ])
    });

    test('should filer photoProducts without border if criteria passed', () => {
      const result = PhotoProductsService.applyFilters(photoProducts, {
        border: 'false'
      });

      expect(result).toEqual([
        {
          id: 'image2',
          orderCount: 200,
          category: 'poster',
          extra: {
            texture: 'glossy',
            rotate: 90
          }
        },
        {
          id: 'image4',
          orderCount: 400,
          category: 'poster',
          extra: {
            texture: 'canvas',
            rotate: 90
          }
        },
      ])
    });

    test('should filer photoProducts by texture if criteria passed', () => {
      const result = PhotoProductsService.applyFilters(photoProducts, {
        texture: 'canvas'
      });

      expect(result).toEqual([
        {
          id: 'image3',
          orderCount: 300,
          category: 'poster',
          extra: {
            texture: 'canvas',
            border: 5,
            rotate: 90
          }
        },
        {
          id: 'image4',
          orderCount: 400,
          category: 'poster',
          extra: {
            texture: 'canvas',
            rotate: 90
          }
        },
      ]);
    });

    test('should filer photoProducts by texture and border if criteria passed', () => {
      const result = PhotoProductsService.applyFilters(photoProducts, {
        texture: 'canvas',
        border: 'true'
      });

      expect(result).toEqual([
        {
          id: 'image3',
          orderCount: 300,
          category: 'poster',
          extra: {
            texture: 'canvas',
            border: 5,
            rotate: 90
          }
        },
      ]);
    });

    test('should filer photoProducts by texture and without border if criteria passed', () => {
      const result = PhotoProductsService.applyFilters(photoProducts, {
        texture: 'canvas',
        border: 'false'
      });

      expect(result).toEqual([
        {
          id: 'image4',
          orderCount: 400,
          category: 'poster',
          extra: {
            texture: 'canvas',
            rotate: 90
          }
        },
      ]);
    });

    test('should return all photoProducts if criterias not met', () => {
      const result = PhotoProductsService.applyFilters(photoProducts, {});
      expect(result).toEqual(photoProducts);
    });
  });

  describe('sortPhotoProducts', () => {
    const photoProducts = [
      {
        id: 'image1',
        orderCount: 100,
        category: 'poster',
      },
      {
        id: 'image3',
        orderCount: 300,
        category: 'poster'
      },
      {
        id: 'image2',
        orderCount: 200,
        category: 'card'
      },
    ];

    test('should sort by orderCount in DESC order', () => {
      const result = PhotoProductsService.sortPhotoProducts(photoProducts, 'orders', 'desc');
      expect(result).toEqual([
        {
          id: 'image3',
          orderCount: 300,
          category: 'poster'
        },
        {
          id: 'image2',
          orderCount: 200,
          category: 'card'
        },
        {
          id: 'image1',
          orderCount: 100,
          category: 'poster',
        },
      ]);
    });

    test('should sort by category in ASC order', () => {
      const result = PhotoProductsService.sortPhotoProducts(photoProducts, 'category', 'asc');
      expect(result).toEqual([
        {
          id: 'image2',
          orderCount: 200,
          category: 'card'
        },
        {
          id: 'image1',
          orderCount: 100,
          category: 'poster',
        },
        {
          id: 'image3',
          orderCount: 300,
          category: 'poster'
        },
      ]);
    });

  });
});
