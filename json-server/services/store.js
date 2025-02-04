import {
  END_INDEX,
  LIMIT,
  PAGE,
  START_INDEX,
  STORE,
} from "../constants/index.js";

export const getStores = (page = PAGE, limit = LIMIT) => {
  const stores = STORE.value();

  const paginatedStores = stores.slice(START_INDEX, END_INDEX);

  const totalItems = stores.length;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    pag: {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalItems,
    },
    data: paginatedStores,
  };
};

export const getStoreDetail = (storeId) => {
  const store = STORE.filter({ id: Number(storeId) }).value()[0];
  return store;
};
