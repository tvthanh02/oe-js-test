import {
  END_INDEX,
  LIMIT,
  ORDER_DEFAULT,
  PAGE,
  PRODUCT,
  PRODUCT_STORE,
  SORT_DEFAULT,
  START_INDEX,
} from "../constants/index.js";
import {
  orderNumberASC,
  orderNumberDESC,
  orderTextASC,
  orderTextDESC,
} from "../utils/sort.js";

const sortfn = (sortName, order = "asc", data) => {
  switch (sortName) {
    case "name":
      return order === "asc"
        ? orderTextASC(data, "name")
        : orderTextDESC(data, "name");

    case "price":
      return order === "asc"
        ? orderNumberASC(data, "price")
        : orderNumberDESC(data, "price");

    default:
      break;
  }
};

export const getProductsOfStore = (
  storeId,
  sort = SORT_DEFAULT,
  order = ORDER_DEFAULT,
  page = PAGE,
  limit = LIMIT,
  filter = []
) => {
  let productsOfStore = PRODUCT_STORE.filter({ shop: storeId })
    .value()
    .map((storeProduct) => {
      const productDetails = PRODUCT.find({
        id: storeProduct.product,
      }).value();

      return {
        shop: storeProduct.shop,
        ...productDetails,
      };
    });

  let productsOfStoreSort = sortfn(sort, order, productsOfStore);

  const productsWithFilter = productsOfStoreSort.filter((item) =>
    item?.toppings.split(",").some((topping) => {
      filter = filter?.map((item) => item.toLowerCase()) ?? [];
      return filter.length > 0 ? filter.includes(topping.toLowerCase()) : true;
    })
  );

  const totalItems = productsWithFilter.length;
  const totalPages = Math.ceil(totalItems / limit);

  const paginatedProducts =
    Number(page) <= totalPages
      ? productsWithFilter.slice(START_INDEX, END_INDEX)
      : [];

  return {
    pag: {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalItems,
    },
    data: paginatedProducts,
  };
};
