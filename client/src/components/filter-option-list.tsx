import { useEffect, useState } from "react";
import FilterOptionItem from "./filter-option-item";
import { useLocation, useNavigate } from "react-router";

const FilterOptionList = ({ isEpand }: { isEpand: boolean }) => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const filters = searchParams.getAll("filter");

    if (filters.length > 0) {
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([]);
    }
  }, [search]);

  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setSelectedFilters((prevSelectedFilters) => {
      const newFilters = checked
        ? [...prevSelectedFilters, value]
        : prevSelectedFilters.filter((filter) => filter !== value);

      const searchParams = new URLSearchParams(search);
      searchParams.delete("filter");
      newFilters.forEach((filter) => {
        searchParams.append("filter", filter);
      });

      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });

      return newFilters;
    });
  };

  const toppings: { id: number; title: string }[] = [
    {
      id: 1,
      title: "Milk Foam",
    },
    {
      id: 2,
      title: "White Pearl",
    },
    {
      id: 3,
      title: "Pearl",
    },
    {
      id: 4,
      title: "Aloe",
    },
  ];

  if (!isEpand) return null;

  return (
    <section className="w-full p-3 bg-white flex flex-col gap-5">
      <p className="text-lg text-blue-900 font-semibold">Toppings:</p>
      <ul className="w-full list-none flex gap-7 flex-wrap">
        {toppings.map((topping) => (
          <li key={topping.id}>
            <FilterOptionItem
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
