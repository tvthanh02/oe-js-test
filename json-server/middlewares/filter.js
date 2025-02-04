const filterMiddleware = (req, _, next) => {
  const { filter } = req.query;

  if (!filter) {
    req.query.filter = [];
  } else if (Array.isArray(filter)) {
    req.query.filter = filter;
  } else {
    req.query.filter = [filter];
  }

  next();
};

export default filterMiddleware;
