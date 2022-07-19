import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row font-inter">
      {/* Side Nav*/}
      <Sidebar />
      {/* Content */}
      <section className="flex-grow mb-24 p-10 lg:p-14 lg:ml-64 md:mb-0 bg-slate-50">
        <Outlet />
      </section>
      {/* Bottom Nav */}
      <BottomNav />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Layout;
