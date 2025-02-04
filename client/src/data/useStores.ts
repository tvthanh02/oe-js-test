import { useState, useEffect } from "react";

const useStores = () => {
  const [stores, setStores] = useState<{
    pag: Meta;
    data: Store[];
  }>();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3000/api/stores", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result: {
          pag: Meta;
          data: Store[];
        } = await response.json();
        setStores(result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return stores;
};

export default useStores;
