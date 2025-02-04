import jsonServer from "json-server";

export const router = jsonServer.router("db/db.json");

export const PAGE = 1,
  LIMIT = 20,
  SORT_DEFAULT = "name",
  ORDER_DEFAULT = "asc";
export const PRODUCT_STORE = router.db.get("product_store"),
  PRODUCT = router.db.get("products"),
  STORE = router.db.get("stores");
export const START_INDEX = (PAGE - 1) * LIMIT;
export const END_INDEX = PAGE * LIMIT;
