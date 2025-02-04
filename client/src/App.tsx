import { useNavigate, useLocation } from "react-router";
import useStores from "./data/useStores";
import { useMemo, useState } from "react";
import useStore from "./data/useStore";
import HeadingListMain from "./components/heading-list-main";
import FilterProduct from "./components/filter-product";
import SortProduct from "./components/sort-product";
import FilterOptionList from "./components/filter-option-list";
import ListProduct from "./components/list-products";
import { FaXmark } from "react-icons/fa6";

const PAGE = 1,
  LIMIT = 20;

function App() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [isOpenNav, setOpenNav] = useState(false);
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

  searchParams.delete("page");
  searchParams.delete("limit");
  searchParams.delete("filter");

  searchParams.append("page", PAGE.toString());
  searchParams.append("limit", LIMIT.toString());

  const navs = useStores();

  if (pathname === "/") {
    navigate(`/store/${navs?.data[0].id}/products?${searchParams.toString()}`);
    return;
  }

  return (
    <div className="relative w-full flex items-center">
      <aside
        className={`z-10 fixed lg:relative transition-all duration-300 ease-in-out ${
          isOpenNav ? "w-[300px]" : "w-0 invisible"
        } lg:w-0 lg:basis-[20%] h-screen bg-blue-900 text-white`}
      >
        <div className="relative w-full text-center text-2xl py-5">
          Milk Tea Store
          <div
            className={`lg:hidden absolute top-2 right-2 text-white hover:cursor-pointer ${
              isOpenNav && "block"
            }`}
            onClick={() => {
              console.log("click");
              setOpenNav(false);
            }}
          >
            <FaXmark />
          </div>
        </div>
        <ul className="w-full list-none py-5">
          {navs?.data?.map((nav) => (
            <li
              key={nav.id}
              className={`w-full text-center py-4 hover:bg-white/30 hover:cursor-pointer transition-colors duration-150 ease-in-out ${
                Number(pathname.split("/")[2]) === nav.id && "bg-white/30"
              } `}
              onClick={() => {
                navigate(
                  `/store/${nav.id}/products?${searchParams.toString()}`
                );
              }}
            >
              {nav.name}
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-3 bg-gray-100 h-screen overflow-y-auto">
        {/* <MainContent /> */}
        <div className="w-full h-full flex flex-col gap-10">
          <HeadingListMain
            title={currentStore?.name ?? ""}
            isOpenNav={isOpenNav}
            setOpenNav={setOpenNav}
          />
          <div className="w-full flex flex-col gap-5 lg:flex-row lg:justify-between lg:gap-0">
            <FilterProduct toggleExpandFilter={toggleExpandFilter} />
            <SortProduct />
          </div>
          <FilterOptionList isEpand={isExpandFilter} />
          <ListProduct />
        </div>
      </main>
    </div>
  );
}

export default App;
