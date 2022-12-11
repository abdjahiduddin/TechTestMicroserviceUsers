const testApi = (req, res) => {
  res.status(200).json({
    status: "success",
  });
};

export default {
  testApi,
};
