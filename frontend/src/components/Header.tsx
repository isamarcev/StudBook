import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import studchain_logo from "../assets/studchain-logo.svg";

interface HeaderProps {
  isInstructor: boolean;
}

const Header: FC<HeaderProps> = ({ isInstructor }) => {
  const location = useLocation();

  return (
    <div className="text-center text-lg font-medium flex items-center gap-4 content-center p-4">
      <Link to="/">
        <img src={studchain_logo} alt="Logo" className="w-[40px]" />
      </Link>
      <p className="text-center text-xl font-bold mr-[35px]">
        {isInstructor ? "Інструктор" : "Студент"}
      </p>

      <nav className="flex gap-6  ml-auto">
        <Link
          to="/"
          className={`hover:text-gray-300 ${
            location.pathname === "/" ? "text-blue-500" : ""
          }`}
        >
          Проекти
        </Link>

        {isInstructor ? (
          <Link
            to="/create-project"
            className={`hover:text-gray-300 ${
              location.pathname === "/create-project" ? "text-blue-500" : ""
            }`}
          >
            Створити проект
          </Link>
        ) : (
          <Link
            to="/my-submissions"
            className={`hover:text-gray-300 ${
              location.pathname === "/my-submissions" ? "text-blue-500" : ""
            }`}
          >
            Мої заявки
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
