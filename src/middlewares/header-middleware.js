const headerMiddleware = {
  setEncodingGzip: (req, res, next) => {
    try {
      res.setHeader("Content-Encoding", "gzip");
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};

export default headerMiddleware;
