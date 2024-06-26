/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobile, setMobile] = useState(false);
  const [showAccount, setAccount] = useState(false);
  const [showBackground, setShowBackground] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY >= TOP_OFFSET) {
            setShowBackground(true);
        }else{
            setShowBackground(false);
        }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    }
  },[])   
  const toggleMenu = useCallback(() => {
    setMobile((current) => !current);
  }, []);
  const toggleAcc = useCallback(() => {
    setAccount((current) => !current);
  }, []);

  return (
    <div className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500
         ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}
      >
        <img className="h-5 lg:h-10" src="/images/logo.png" alt="logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by Languages" />
        </div>
        <div
          onClick={toggleMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown className={`text-white transition ${showMobile ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={showMobile} />
        </div>
        <div className="flex flex-row ml-auto gap-7  items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div onClick={toggleAcc} className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                <img src="/images/profile-yellow.png" alt="profiles" />
            </div>
            <BsChevronDown className={`text-white transition ${showAccount ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu visible={showAccount}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
