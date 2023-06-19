const Joi = require('joi');

const getPhotoProductsOptionsSchema = Joi.object({
  border: Joi.string().valid('true', 'false'),
  texture: Joi.string().valid('canvas', 'glossy', 'not applied'),
  sortBy: Joi.string().valid('category', 'orders'),
  sortOrder: Joi.string().valid('asc', 'desc'),
});

module.exports = {
  getPhotoProductsOptionsSchema,
};
