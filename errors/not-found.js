const notFound = (req, res) =>
  res.status(StatusCode).send("Route does not exist");

module.exports = notFound;
