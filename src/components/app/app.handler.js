module.exports.getAppStatus = async (request, h) => {
  try {
    const successMessage = `App is running`;
    return h
      .response({
        statusCode: 200,
        message: successMessage,
      })
      .code(200);
  } catch (err) {
    return h
      .response({
        statusCode: 500,
        error: 'Error Checking App Status',
        message: `${err}`,
      })
      .code(500);
  }
};
