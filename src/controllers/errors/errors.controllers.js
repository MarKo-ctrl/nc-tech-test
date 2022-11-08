exports.handleInvalidRoutes = (req, res) => {
  res.status(404).send({ message: 'Route not found' });
};