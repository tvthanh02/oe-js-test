import { useState, useEffect, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router";

interface UseFetchProductsResult {
  data: {
    pag: Meta;
    data: Product[];
  } | null;
  isLoading: boolean;
  error: string | null;
}

const useFetchProductsOfStore = (storeId: number): UseFetchProductsResult => {
  const [data, setData] = useState<{
    pag: Meta;
    data: Product[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { search } = useLocation();
  const [searchParams] = useSearchParams(search);

  const queryString = useMemo(() => searchParams.toString(), [searchParams]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:3000/api/store/${storeId}/products?${queryString}`,
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

        const result: { pag: Meta; data: Product[] } = await response.json();
        setData(result);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [storeId, queryString]);

  return { data, isLoading: loading, error };
};

export default useFetchProductsOfStore;
