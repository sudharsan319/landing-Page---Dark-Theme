import MenuIcon from "../assets/icons/menu.svg"
import Image from "next/image";
import logoImage from "../assets/images/co_logo.png";

export const Navbar = () => {
  return (
    <div className="bg-black">
    <div className="px-4">
      <div className=" flex items-center justify-between">
        <div className="relative mt-[-15px]">
          {/* <div className="absolute left-9 top-9 h-12 w-12 bg-gradient-to-r from-purple-500 via-teal-400 to-yellow-200 blur rotate-45 "></div> */}
          <Image
            src={logoImage} 
            alt="Saas logo"

            className="relative mt-[-15px]"
            style={{
              height: "200px",
              width: "200px",
            }}
          />
        </div>

        {/* Menu icon */}
        <div className="border border-white border-opacity-30 h-13 w-13 inline-flex items-center justify-center rounded-lg sm:hidden">
          <MenuIcon className="text-white " />
        </div>
        <nav className="gap-6 mt-[-25px] items-center hidden sm:flex">
          <a href ='#' className="text-opacity-60 text-white hover:text-opacity-100 transition">About</a>
          <a href ='#' className="text-opacity-60 text-white hover:text-opacity-100 transition">Features</a>
          <a href ='#' className="text-opacity-60 text-white hover:text-opacity-100 transition">Updates</a>
          <a href ='#' className="text-opacity-60 text-white hover:text-opacity-100 transition">Help</a>
          <a href ='#' className="text-opacity-60 text-white hover:text-opacity-100 transition">Customers</a>
          <button className="bg-gradient-to-r from-purple-500 to-teal-400 text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
            Get for Free
          </button>
        </nav>
      </div>
    </div>
    </div>
  );
};
