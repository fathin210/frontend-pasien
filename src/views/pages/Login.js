import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { MODAL_SET_PASSWORD_SHOW } from "../../redux/actionTypes";
import { AuthController } from "../../redux/controllers/AuthController";
import ModalPassword from "../components/ModalPassword";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const authController = new AuthController();
  const [form, setForm] = useState({
    nomor_pasien: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="min-h-screen font-inter bg-blue-900 flex flex-col justify-center items-center md:flex-row md:justify-start">
      <ModalPassword />
      <div className="flex w-1/2 min-h-screen justify-center items-center flex-col">
        <div className="bg-white w-64 rounded-lg flex flex-col justify-around gap-3 p-6 shadow-lg md:w-72 lg:w-96">
          <form
            className="flex flex-col gap-3"
            onSubmit={(event) => authController.login(event, form, navigate)}
          >
            <p className="text-xl font-bold">Login</p>
            <input
              required
              type="text"
              placeholder="Nomor Kartu"
              onChange={(e) =>
                setForm({ ...form, nomor_pasien: e.target.value })
              }
              className="peer border p-2 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
            <input
              required
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
            <button className="bg-blue-600 p-3 rounded-xl text-white">
              LOGIN
            </button>
          </form>
          <hr />
          <p className="text-left text-xs text-slate-600">
            <span className="text-red-600">*</span> Untuk pasien yang belum
            pernah melakukan booking dapat mengatur password akun anda
          </p>
          <button
            className="bg-gray-600 p-3 rounded-xl text-white"
            onClick={() => {
              dispatch({
                type: MODAL_SET_PASSWORD_SHOW,
              });
            }}
          >
            ATUR PASSWORD
          </button>
        </div>
      </div>
      <div className="bg-white w-1/2 min-h-screen hidden md:flex md: justify-center items-center">
        <div className="container mx-6">
          <p className="text-6xl font-semibold ">
            Selamat Datang <br /> Di
            <span className="text-blue-400 font-bold"> Setia Kawan</span>
          </p>
        </div>
      </div>
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

export default Login;
