import { useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router";

const SortProduct = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const selectEleRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const defaultSelectedValue = selectEleRef.current?.value;
    const [sortBy, sortOrder] = defaultSelectedValue?.split(",") ?? [];
    const queryParams = new URLSearchParams(search);
    // queryParams.set("sort", sortBy);
    // queryParams.set("order", sortOrder);
    queryParams.delete("sort");
    queryParams.delete("order");
    queryParams.append("sort", sortBy);
    queryParams.append("order", sortOrder);

    navigate({
      pathname: window.location.pathname,
      search: queryParams.toString(),
    });
  }, [navigate, search]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, sortOrder] = e.target.value.split(",");
    const queryParams = new URLSearchParams(search);
    // queryParams.set("sort", sortBy);
    // queryParams.set("order", sortOrder);
    queryParams.delete("sort");
    queryParams.delete("order");
    queryParams.append("sort", sortBy);
    queryParams.append("order", sortOrder);

    navigate({
      pathname: window.location.pathname,
      search: queryParams.toString(),
    });
  };

  return (
    <div className="flex items-center gap-5">
      <p className="text-lg text-blue-900 font-bold">Sort By</p>
      <select
        ref={selectEleRef}
        onChange={handleSortChange}
        defaultValue="price,asc"
        title="Price( a - Z )"
        className="text-blue-950 font-semibold hover:cursor-pointer w-fit px-10 py-2 border border-blue-900 outline-none bg-gray-200 rounded-md overflow-hidden"
      >
        <option
          className="text-blue-950 font-semibold hover:cursor-pointer"
          value="name,desc"
        >
          Name ( Z - a )
        </option>
        <option
          className="text-blue-950 font-semibold hover:cursor-pointer"
          value="name,asc"
        >
          Name ( a - Z )
        </option>
        <option
          className="text-blue-950 font-semibold hover:cursor-pointer"
          value="price,asc"
        >
          Price ( a - Z )
        </option>
        <option
          className="text-blue-950 font-semibold hover:cursor-pointer"
          value="price,desc"
        >
          Price ( z - A )
        </option>
      </select>
    </div>
  );
};

export default SortProduct;
