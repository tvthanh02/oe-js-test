import { useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router";

const SortProduct = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const selectEleRef = useRef<HTMLSelectElement>(null);

  const updateQueryParams = useCallback(
    (sortBy: string, sortOrder: string) => {
      const queryParams = new URLSearchParams(search);
      queryParams.set("sort", sortBy);
      queryParams.set("order", sortOrder);

      navigate({
        pathname: window.location.pathname,
        search: queryParams.toString(),
      });
    },
    [navigate, search]
  );

  useEffect(() => {
    const defaultSelectedValue = selectEleRef.current?.value ?? "price,asc";
    const [sortBy, sortOrder] = defaultSelectedValue.split(",");
    updateQueryParams(sortBy, sortOrder);
  }, [updateQueryParams]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, sortOrder] = e.target.value.split(",");
    updateQueryParams(sortBy, sortOrder);
  };

  return (
    <div className="flex items-center gap-5">
      <p className="text-lg text-blue-900 font-bold">Sort By</p>
      <select
        ref={selectEleRef}
        onChange={handleSortChange}
        defaultValue="price,asc"
        className="text-blue-950 font-semibold hover:cursor-pointer w-fit px-10 py-2 border border-blue-900 outline-none bg-gray-200 rounded-md"
      >
        {[
          { value: "name,desc", label: "Name ( Z - A )" },
          { value: "name,asc", label: "Name ( A - Z )" },
          { value: "price,asc", label: "Price ( Low - High )" },
          { value: "price,desc", label: "Price ( High - Low )" },
        ].map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortProduct;
