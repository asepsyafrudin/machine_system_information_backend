import NodeCache from "node-cache";

export const checkCache = (req, res, next) => {
  const myChace = new NodeCache();
  

  if (req.query.cache === "true") {
    next();
  } else {
    next();
  }
};
