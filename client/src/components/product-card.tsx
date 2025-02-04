const ProductCard = ({ name, toppings, price }: Product) => {
  return (
    <div className="w-full h-full overflow-hidden p-3 border  rounded-md shadow-lg flex flex-col justify-between">
      <p className="text-lg text-blue-900 font-semibold">{name}</p>
      <hr className="h-[4px] bg-blue-900 rounded-md" />
      <div className="flex flex-col gap-1">
        <p className="text-blue-900 font-semibold text-sm">Toppings:</p>
        <p className="w-full overflow-clip text-wrap">{toppings}</p>
      </div>
      <p className="text-lg text-blue-900 font-semibold text-right">${price}</p>
    </div>
  );
};

export default ProductCard;
