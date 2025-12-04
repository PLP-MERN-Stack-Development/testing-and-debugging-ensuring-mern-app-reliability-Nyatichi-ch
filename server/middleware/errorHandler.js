function errorHandler(err, req, res, next) {
  console.error('Error handler caught:', err.stack);
  const status = err.statusCode || 500;
  const msg = err.message || 'Internal Server Error';

  res.status(status).json({
    error: {
      message: msg,
      // Optionally include stack in development:
      ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {})
    }
  });
}

module.exports = errorHandler;
