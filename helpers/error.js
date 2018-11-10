// do we need a custom error message?
exports.errorMessage = function(
  message = "Oops, Something went wrong!",
  status = 500
) {
  let err = new Error();
  err.status = status;
  err.message = message;
  return err;
};

exports.errorHandler = function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(err.status || 500).json({
    error: {
      message: err.message || "Oops, something went wrong!"
    }
  });
};
