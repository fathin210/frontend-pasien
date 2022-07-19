import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { nav } from "../../nav";

function BottomNav() {
  const modal = useSelector((state) => state.booking.modal);
  return (
    <section
      className={`fixed bottom-0 w-full bg-white lg:hidden z-10 ${
        modal.show ? "hidden" : "block"
      }`}
    >
      <div className="h-24 grid grid-cols-3  border shadow-inner shadow-blue-100">
        {nav.map((item) => {
          return (
            <Link
              to={item.to}
              className="flex flex-col justify-center items-center"
            >
              {item?.icon}
              <p>{item.path}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BottomNav;
