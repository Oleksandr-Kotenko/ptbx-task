const validate = (data, schema) => {
  const dataForValidation = data || {};
  const { value, error } = schema.validate(dataForValidation);
  if (error) {
    return {
      error: {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
        }),
      },
    };
  }

  return {
    value,
  };
};

module.exports = validate;
