const handler = require('../../src/functions/get-photo-products/handler');
const PhotoProductsService = require('../../src/services/photo-products-service');

describe('get-photo-products-handler', () => {
  let getPhotoProductsSpy;

  beforeEach(() => {
    getPhotoProductsSpy = jest.spyOn(PhotoProductsService, 'getPhotoProducts');
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  test('should return successful response', async () => {
    getPhotoProductsSpy.mockResolvedValueOnce([{
      id: 'image1',
      orderCount: 100,
      category: "poster"
    }]);

    const result = await handler.getPhotoProducts({
      queryStringParameters: {
        border: 'true',
        texture: 'not applied',
        sortBy: 'category',
        sortOrder: 'asc',
      },
    });

    expect(result).toEqual({
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: "[{\"id\":\"image1\",\"orderCount\":100,\"category\":\"poster\"}]"
    });
    expect(getPhotoProductsSpy).nthCalledWith(1, {
      border: 'true',
      texture: 'not applied',
      sortBy: 'category',
      sortOrder: 'asc',
    });
  });

  test('should return error response if validation fails', async() => {
    const result = await handler.getPhotoProducts({
      queryStringParameters: {
        invalid: 'value'
      },
    });

    expect(result).toEqual({
      statusCode: 400,
      headers: {
        "Content-Type": "application/json"
      },
      body: "{\"message\":\"\\\"invalid\\\" is not allowed\"}"
    });

    expect(getPhotoProductsSpy).not.toBeCalled();
  })
});
