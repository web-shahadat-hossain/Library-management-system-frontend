import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBookOpen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

export function Navbar() {
  return (
    <div className="bg-indigo-700 py-6">
      <nav className="max-w-[1000px] mx-auto flex justify-between items-center px-5 flex-col gap-y-4 md:gap-y-0 md:flex-row">
        <Link to="/">
          <h2 className=" text-white text-lg font-bold">
            {" "}
            <FontAwesomeIcon className="mr-1" icon={faBookOpen} /> Library
            Management System
          </h2>
        </Link>
        <ul className="flex items-center gap-4">
          <li>
            {" "}
            <Link
              to="/"
              className="flex items-center gap-2 rounded-md bg-white/20 px-4 py-2 text-white hover:bg-white/30 transition"
            >
              {" "}
              <FontAwesomeIcon icon={faBars} />
              Borrow Summary
            </Link>
          </li>
          <li>
            <Link
              to="/create-book"
              className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-[#5854F5] hover:bg-gray-100 transition"
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Book
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
