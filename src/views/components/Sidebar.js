import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { nav } from "../../nav";
import { AiOutlineLogout } from "react-icons/ai";
import { AuthController } from "../../redux/controllers/AuthController";

function Sidebar() {
  const authController = new AuthController();
  const navigate = useNavigate();
  return (
    <section className="hidden w-64 bg-blue-800 text-white text-base shadow-2xl shadow-slate-500 lg:flex fixed h-full top-0 flex-col py-10">
      <div>
        <h4 className="text-xl font-bold">Setia Kawan</h4>
      </div>
      <div className="grid mt-10 grid-cols-1 divide-white divide-y shadow-xl">
        {nav.map((item) => {
          return (
            <Link
              to={item.to}
              className="flex p-6 transition-colors cursor-pointer ease-in-out hover:bg-blue-900"
            >
              <div className="w-12">{item?.icon}</div>
              <p>{item.path}</p>
            </Link>
          );
        })}
      </div>
      <div className="flex flex-grow justify-center items-end shadow-lg">
        <button
          className="bg-blue-800 hover:bg-blue-900 p-4 flex items-center gap-10 flex-grow"
          onClick={() => {
            authController.logout(navigate);
          }}
        >
          <AiOutlineLogout className="text-2xl" />
          Logout
        </button>
      </div>
    </section>
  );
}

export default Sidebar;
