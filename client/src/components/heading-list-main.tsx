import { FaBars } from "react-icons/fa";
const HeadingListMain = ({
  title,
  setOpenNav,
}: {
  title: string;
  isOpenNav: boolean;
  setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <h2 className="relative w-full text-center text-blue-900 font-bold py-3 text-3xl">
      {title} Menu
      <div
        className={`hover:cursor-pointer lg:hidden absolute top-[50%] translate-y-[-50%] left-0 text-blue-900`}
        onClick={() => setOpenNav(true)}
      >
        <FaBars />
      </div>
    </h2>
  );
};

export default HeadingListMain;
