const handleErrors = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (res.headersSent) {
    return next(err);
  }

  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });

  return null;
};

export default handleErrors;
