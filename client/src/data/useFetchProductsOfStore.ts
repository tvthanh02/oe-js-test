import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router";

const useFetchProductsOfStore = (storeId: number) => {
  const [data, setData] = useState<{
    pag: Meta;
    data: Product[];
  }>();

  const { search } = useLocation();
  const [searchParams] = useSearchParams(search);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/store/${storeId}/products?${searchParams}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result: {
          pag: Meta;
          data: Product[];
        } = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [storeId, searchParams]);

  return data;
};

export default useFetchProductsOfStore;
