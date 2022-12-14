import config from "../config/config";

const testApi = (req, res) => {
  res.status(200).json({
    status: config.env,
  });
};

export default {
  testApi,
};
