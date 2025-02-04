import { useMemo } from "react";
import useFetchProductsOfStore from "../data/useFetchProductsOfStore";
import { useLocation } from "react-router";
import ProductCard from "./product-card";

const ListProduct = () => {
  const { pathname } = useLocation();

  const storeId = useMemo(() => {
    const valueIndex2 = Number(pathname.split("/")[2]);
    if (isNaN(valueIndex2)) throw new Error("storeId must the number");
    return valueIndex2;
  }, [pathname]);

  const data = useFetchProductsOfStore(storeId);

  if (data?.data.length === 0)
    return (
      <div className="w-full h-[200px] flex items-center justify-center text-lg text-blue-900 font-semibold">
        No Products Available
      </div>
    );

  return (
    <div className="w-full flex items-center gap-5 flex-wrap">
      {data?.data.map((product) => (
        <article
          key={product.id + Math.random()}
          className="w-full md:w-[260px] h-[240px]"
        >
          <ProductCard {...product} />
        </article>
      ))}
    </div>
  );
};

export default ListProduct;
