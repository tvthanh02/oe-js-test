const FilterProduct = ({
  toggleExpandFilter,
}: {
  toggleExpandFilter: () => void;
}) => {
  return (
    <div
      className="w-fit px-10 py-2 bg-blue-900 text-white text-lg rounded-md hover:cursor-pointer font-bold"
      onClick={toggleExpandFilter}
    >
      Filter
    </div>
  );
};

export default FilterProduct;
