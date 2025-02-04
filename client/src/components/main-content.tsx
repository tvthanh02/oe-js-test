import { useMemo, useState } from "react";
import { useLocation } from "react-router";
import useStore from "../data/useStore";
import HeadingListMain from "./heading-list-main";
import FilterProduct from "./filter-product";
import SortProduct from "./sort-product";
import ListProduct from "./list-products";
import FilterOptionList from "./filter-option-list";

const MainContent = () => {
  const { pathname } = useLocation();
  const [isExpandFilter, setIsExpandFilter] = useState<boolean>(false);

  const toggleExpandFilter = () => {
    setIsExpandFilter((prev) => !prev);
  };

  const storeId = useMemo(() => {
    const valueIndex2 = Number(pathname.split("/")[2]);
    if (isNaN(valueIndex2)) throw new Error("storeId must the number");
    return valueIndex2;
  }, [pathname]);

  const currentStore = useStore(storeId);

  return (
    <div className="w-full h-full flex flex-col gap-10">
      <HeadingListMain title={currentStore?.name ?? ""} />
      <div className="w-full flex justify-between">
        <FilterProduct toggleExpandFilter={toggleExpandFilter} />
        <SortProduct />
      </div>
      <FilterOptionList isEpand={isExpandFilter} />
      <ListProduct />
    </div>
  );
};

export default MainContent;
