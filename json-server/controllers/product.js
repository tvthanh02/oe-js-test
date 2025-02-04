import { getProductsOfStore } from "../services/product.js";

const productController = {
  getProducts: (req, res) => {
    let { storeId } = req.params;
    let { page, limit, sort, order, filter } = req.query;
    if (!storeId || !Number(storeId))
      return res.status(400).json({
        error: 1,
        msg: "bad request",
      });

    storeId = Number(storeId);
    filter = filter?.map((item) => item.toLowerCase()) ?? [];
    const result = getProductsOfStore(
      storeId,
      sort,
      order,
      page,
      limit,
      filter
    );

    res.status(200).json(result);
  },
};

export default productController;
