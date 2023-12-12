import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo.JPG";

const navLinks = [
   {
      path: "/",
      display: "Trang chủ",
   },
   {
      path: "/about",
      display: "Giới thiệu",
   },
];

const Header = () => {
   return (
      <header className="header flex items-center">
         <div className="container">
            <div className="flex items-center justify-between">
               <div className="w-[60px] h-[60px]">
                  <img src={logo} alt="" />
               </div>

               <div className="navigation">
                  <ul className="menu flex items-center gap-[2.7rem]">
                     {navLinks.map((link, index) => (
                        <li key={index}>
                           <NavLink
                              to={link.path}
                              className={(navClass) =>
                                 navClass.isActive
                                    ? "text-slate-100 text-[19px] leading-7 font-medium px-[10px] py-1 bg-primaryColor rounded-2xl"
                                    : "text-textColor text-[19px] leading-7 font-medium hover:text-primaryColor"
                              }
                           >
                              {link.display}
                           </NavLink>
                        </li>
                     ))}
                  </ul>
               </div>

               <div className="flex items-center gap-4">
                  <Link to="/login">
                     <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                        Đăng nhập
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
