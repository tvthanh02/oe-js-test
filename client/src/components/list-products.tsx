import useFetchProductsOfStore from "../data/useFetchProductsOfStore";
import ProductCard from "./product-card";

const ListProduct = ({ storeId }: { storeId: number }) => {
  const { data, isLoading, error } = useFetchProductsOfStore(storeId);

  if (error) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center text-lg text-red-600">
        Error loading products.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center text-lg text-gray-500">
        Loading...
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center text-lg text-blue-900 font-semibold">
        No Products Available
      </div>
    );
  }

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
