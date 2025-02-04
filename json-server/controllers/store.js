import { getStoreDetail, getStores } from "../services/store.js";

const storeController = {
  getStores: (req, res) => {
    let { page, limit } = req.query;
    const result = getStores(page, limit);

    return res.status(200).json(result);
  },
  getStore: (req, res) => {
    const { storeId } = req.params;
    if (!storeId)
      res.status(400).json({
        error: 1,
        msg: "bad request",
      });
    const store = getStoreDetail(storeId);
    if (!store) return res.status(404).json("Not Found").end();

    return res.status(200).json(store).end();
  },
};

export default storeController;
