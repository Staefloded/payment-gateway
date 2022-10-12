import SearchIcon from '../assets/searchIcon.svg';
import BellIcon from '../assets/bell.svg';
import Avatar from '../assets/Avatar.svg';
export const NavBar = () => {
  return (
    <div className="w-full h-[74px] bg-white flex justify-between items-center px-[33px] border-b border-b-solid border-b-[rgba(46, 91, 255, 0.08)]">
      <div className="flex">
        <div className="">
          <img src={SearchIcon} alt="search" />
        </div>
        <div className="">
          <input
            className="outline-none border-none px-3 placeholder:text-[#9D9DAC] placeholder:text-sm "
            type="text"
            placeholder="Search everything"
          />
        </div>
      </div>
      <div className="flex">
        <div className="mx-[31.5px]">
          <img src={BellIcon} alt="notification" />
        </div>
        <div>
          <img src={Avatar} alt="image" />
        </div>
      </div>
    </div>
  );
};
