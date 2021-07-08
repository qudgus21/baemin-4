const setEncodingGzip = (req, res, next) => {
  res.setHeader("Content-Encoding", "gzip");
  next();
};

module.exports = {
  setEncodingGzip,
};
