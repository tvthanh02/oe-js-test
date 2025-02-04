import { useState, useEffect } from "react";

const useStore = (storeId: number) => {
  const [store, setStore] = useState<Store>();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/store/${storeId}`,
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

        const result: Store = await response.json();
        setStore(result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [storeId]);

  return store;
};

export default useStore;
