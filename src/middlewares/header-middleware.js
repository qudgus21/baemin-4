const setEncodingGzip = (req, res, next) => {
  try {
    res.setHeader("Content-Encoding", "gzip");
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  setEncodingGzip,
};
