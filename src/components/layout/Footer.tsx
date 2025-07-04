import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <footer className="bg-indigo-700 mt-10 ">
      <div className="max-w-[1000px]  pb-2 mx-auto">
        <div className="mx-auto px-3 py-5 flex justify-between flex-col lg:flex-row gap-5 lg:gap-0 border-b border-b-[#8787f5]">
          <div className="lg:w-[30%]">
            <h2 className=" text-white text-[16px] mb-3 font-bold ">
              {" "}
              <FontAwesomeIcon className="mr-1" icon={faBookOpen} /> Library
              Management System
            </h2>
            <p className="text-[#d6d6ff] text-[12px]">
              A simple and efficient way to manage your library's collection and
              borrowing system.
            </p>
          </div>
          <div>
            <h2 className=" text-white text-[16px] mb-3 font-bold ">
              Quick Links
            </h2>
            <ul className="text-[#d6d6ff] text-[12px] flex flex-col gap-2 font-medium">
              <li>About</li>
              <li>Help</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h2 className=" text-white text-[16px] mb-3 font-bold ">
              Contact Us
            </h2>
            <ul className="text-[#d6d6ff] text-[12px] flex flex-col gap-2 font-medium">
              <li>123 Library Street, Booktown</li>
              <li>+8801956025473</li>
              <li>web.shahadat.hossain@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="text-center py-2 text-[#d6d6ff] ">
          <p>© 2025 Library Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
