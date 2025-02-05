import { CiFilter } from "react-icons/ci";

interface FilterButtonProps {
  toggleExpandFilter: () => void;
}

const FilterButton = ({ toggleExpandFilter }: FilterButtonProps) => {
  return (
    <div
      className="w-fit px-10 py-2 bg-blue-900 text-white text-lg rounded-md hover:cursor-pointer font-bold flex items-center gap-2"
      onClick={toggleExpandFilter}
    >
      <CiFilter />
      Filter
    </div>
  );
};

export default FilterButton;
