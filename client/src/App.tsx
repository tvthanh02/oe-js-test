import { useNavigate, useLocation } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { FaXmark, FaBars } from "react-icons/fa6";
import useStores from "./data/useStores";
import useStore from "./data/useStore";
import FilterProduct from "./components/filter-button";
import SortProduct from "./components/sort-product";
import FilterOptionList from "./components/filter-option-list";
import ListProduct from "./components/list-products";

const PAGE = 1;
const LIMIT = 20;

function App() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const [isOpenNav, setOpenNav] = useState(false);
  const [isExpandFilter, setIsExpandFilter] = useState(false);

  const storeId = useMemo(() => {
    const parts = pathname.split("/");
    const id = Number(parts[2]);
    return isNaN(id) ? null : id;
  }, [pathname]);

  const currentStore = useStore(storeId);
  const navs = useStores();

  useEffect(() => {
    if (pathname === "/" && navs?.data?.length) {
      searchParams.set("page", PAGE.toString());
      searchParams.set("limit", LIMIT.toString());
      navigate(`/store/${navs.data[0].id}/products?${searchParams.toString()}`);
    }
  }, [pathname, navs, navigate, searchParams]);

  const toggleExpandFilter = () => setIsExpandFilter((prev) => !prev);

  const handleStoreClick = (id: number) => {
    searchParams.set("page", PAGE.toString());
    searchParams.set("limit", LIMIT.toString());
    navigate(`/store/${id}/products?${searchParams.toString()}`);
  };

  return (
    <div className="relative w-full flex items-center">
      <aside
        className={`z-10 fixed lg:relative transition-all duration-300 ease-in-out ${
          isOpenNav ? "w-[300px]" : "invisible w-0"
        } lg:visible lg:basis-[20%] h-screen bg-blue-900 text-white`}
      >
        <div className="relative w-full text-center text-2xl py-5">
          Milk Tea Store
          <div
            className={`lg:hidden absolute top-2 right-2 text-white hover:cursor-pointer ${
              isOpenNav && "block"
            }`}
            onClick={() => setOpenNav(false)}
          >
            <FaXmark />
          </div>
        </div>
        <ul className="w-full list-none py-5">
          {navs?.data?.map((nav) => (
            <li
              key={nav.id}
              className={`w-full text-center py-4 hover:bg-white/30 hover:cursor-pointer transition-colors duration-150 ease-in-out ${
                storeId === nav.id && "bg-white/30"
              }`}
              onClick={() => handleStoreClick(nav.id)}
            >
              {nav.name}
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-3 bg-gray-100 h-screen overflow-y-auto">
        <div className="w-full h-full flex flex-col gap-10">
          <h2 className="relative w-full text-center text-blue-900 font-bold py-3 text-3xl">
            {currentStore?.name} Menu
            <div
              className="hover:cursor-pointer lg:hidden absolute top-[50%] translate-y-[-50%] left-0 text-blue-900"
              onClick={() => setOpenNav(true)}
            >
              <FaBars />
            </div>
          </h2>
          <div className="w-full flex flex-col gap-5 lg:flex-row lg:justify-between lg:gap-0">
            <FilterProduct toggleExpandFilter={toggleExpandFilter} />
            <SortProduct />
          </div>
          <FilterOptionList isEpand={isExpandFilter} />
          {currentStore?.id ? (
            <ListProduct storeId={currentStore.id} />
          ) : (
            <div className="w-full h-[200px] flex items-center justify-center text-lg text-red-600">
              Something went wrong!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
