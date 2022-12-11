// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
  console.log("Custom Error Handler");
  const code = err.statusCode || 500;
  const message = err.message;
  const data = err.data || "";
  res.status(code).json({
    message: message,
    data: data,
  });
};

const cors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
};

const debug = (req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.hostname);
  next();
};

export default {
  handleError,
  cors,
  debug,
};
