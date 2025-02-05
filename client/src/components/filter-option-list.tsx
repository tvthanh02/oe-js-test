import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import FilterCheckboxItem from "./filter-checkbox-item";

const TOPPINGS = [
  { id: 1, title: "Milk Foam" },
  { id: 2, title: "White Pearl" },
  { id: 3, title: "Pearl" },
  { id: 4, title: "Aloe" },
];

const FilterOptionList = ({ isEpand }: { isEpand: boolean }) => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const selectedFilters = useMemo(() => {
    const searchParams = new URLSearchParams(search);
    return searchParams.getAll("filter");
  }, [search]);

  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const searchParams = new URLSearchParams(search);

    if (checked) {
      searchParams.append("filter", value);
    } else {
      // Lọc ra những filter khác ngoài filter hiện tại
      const updatedFilters = selectedFilters.filter(
        (filter) => filter !== value
      );
      searchParams.delete("filter");
      updatedFilters.forEach((filter) => searchParams.append("filter", filter));
    }

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  if (!isEpand) return null;

  return (
    <section className="w-full p-3 bg-white flex flex-col gap-5">
      <p className="text-lg text-blue-900 font-semibold">Toppings:</p>
      <ul className="w-full list-none flex gap-7 flex-wrap">
        {TOPPINGS.map((topping) => (
          <li key={topping.id}>
            <FilterCheckboxItem
              id={topping.id}
              title={topping.title}
              handleCheck={handleCheckedChange}
              checked={selectedFilters.includes(topping.title)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FilterOptionList;
