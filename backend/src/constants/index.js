const BORDER_FILTER = {
  TRUE: 'true',
  FALSE: 'false',
};

const TEXTURE_FILTER = {
  CANVAS: 'canvas',
  GLOSSY: 'glossy',
  NOT_APPLIED: 'not applied',
};

const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

const sortByFieldMap = {
  orders: 'orderCount',
  category: 'category',
};

module.exports = {
  IMAGES_URL: process.env.IMAGES_URL || '',
  SORT_ORDER,
  sortByFieldMap,
  TEXTURE_FILTER,
  BORDER_FILTER,
};
