const validate = require('../../utils/validator');
const { getPhotoProductsOptionsSchema } = require('./schema');
const PhotoProductsService = require('../../services/photo-products-service');

exports.getPhotoProducts = async function (event) {
  /* eslint-disable no-console */
  console.log('request:', JSON.stringify(event, undefined, 2));

  const { value, error } = validate(event.queryStringParameters, getPhotoProductsOptionsSchema);
  if (error) {return error;}

  const data = await PhotoProductsService.getPhotoProducts(value);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  };
};
