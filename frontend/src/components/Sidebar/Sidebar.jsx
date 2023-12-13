import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

import {
   HiOutlineViewGrid,
   HiOutlineUsers,
   HiOutlineUserGroup,
   HiChevronRight,
   HiChevronLeft,
} from "react-icons/hi";

const sidebarLinks = [
   {
      label: "Hàng hóa",
      path: "/",
      icon: <HiOutlineViewGrid />,
   },
   {
      label: "Kho hàng",
      path: "/warehouses",
      icon: <HiOutlineUsers />,
   },
   {
      label: "Danh mục kho",
      path: "/suppliers",
      icon: <HiOutlineUserGroup />,
   },
];

const linkClass =
   "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base mt-5";

function SidebarLink({ link, isOpen }) {
   const { pathname } = useLocation();

   return (
      <Link
         to={link.path}
         className={classNames(
            pathname === link.path
               ? "bg-neutral-700 text-white font-medium"
               : "text-neutral-400 font-medium",
            linkClass
         )}
      >
         <span className="text-xl">{link.icon}</span>
         <p className={`${isOpen ? "block" : "hidden"}`}>{link.label}</p>
      </Link>
   );
}

export default function Sidebar() {
   const [isOpen, setIsOpen] = useState(true);

   return (
      <div
         className={`bg-neutral-900 p-3 flex flex-col relative ${
            isOpen ? "min-w-[250px]" : "w-16"
         }`}
      >
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-16 right-0 p-2 text-neutral-300 hover:text-white focus:outline-none"
         >
            {isOpen ? (
               <HiChevronRight size={35} />
            ) : (
               <HiChevronLeft size={35} />
            )}
         </button>
         <div className="py-8 flex flex-1 flex-col gap-0.5">
            {sidebarLinks.map((link, index) => (
               <SidebarLink key={index} link={link} isOpen={isOpen} />
            ))}
         </div>
      </div>
   );
}
