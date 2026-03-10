const errorHandler = (err, req, res, next) => {

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: err.status || 'error',
    mensaje: err.message || 'Error interno del servidor'
  });

};

export default errorHandler;