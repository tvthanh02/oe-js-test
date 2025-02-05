const FilterCheckboxItem = ({
  id,
  title,
  handleCheck,
  checked,
}: FilterCheckboxItemProps) => {
  return (
    <div className="flex items-center gap-3">
      <input
        className="p-1 hover:cursor-pointer"
        type="checkbox"
        id={id.toString()}
        onChange={handleCheck}
        value={title}
        checked={checked}
      />
      <label className="text-lg hover:cursor-pointer" htmlFor={id.toString()}>
        {title}
      </label>
    </div>
  );
};

export default FilterCheckboxItem;
