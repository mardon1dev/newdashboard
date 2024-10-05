import {
  HomeOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import NavbarLink from "../NavbarLink/NavbarLink";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navlinks = [
    {
      name: "Home",
      link: "/",
      icon: <HomeOutlined className="text-[24px]" />,
    },
    {
      name: "Students",
      link: "/students",
      icon: <UserOutlined className="text-[24px]" />,
    },
    {
      name: "Teachers",
      link: "/teachers",
      icon: <TeamOutlined className="text-[24px]" />,
    },
  ];
  return (
    <nav className="navbar bg-black h-full px-[52px] py-[42px] rounded-3xl flex flex-col justify-between">
      <div>
        <Link to={"/"}>
          <span className="text-[40px] font-bold text-white">M</span>
        </Link>
        <ul className="nav-links flex flex-col mt-[70px] space-y-16">
          {navlinks.map((link, index) => (
            <NavbarLink key={index} link={link} />
          ))}
        </ul>
      </div>
      <button className="text-white hover:bg-white hover:text-black py-2 rounded-lg">
        <LogoutOutlined className="text-[24px]" />
      </button>
    </nav>
  );
};

export default Navbar;
