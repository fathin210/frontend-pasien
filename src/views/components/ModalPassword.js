import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MODAL_SET_PASSWORD_HIDDEN } from "../../redux/actionTypes";
import { AuthController } from "../../redux/controllers/AuthController";

function ModalPassword() {
  const [form, setForm] = useState({
    nomor_pasien: "",
    nama: "",
    password: "",
    konfirmasi_password: "",
  });
  const authController = new AuthController();
  const modal = useSelector((state) => state.auth.modal);
  const dispatch = useDispatch();
  return (
    <div
      className={`fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center ${
        modal.show ? "block" : "hidden"
      }`}
    >
      <div
        className={`fixed bg-white flex flex-col gap-5 p-5 w-80 h-fit rounded-md z-30 mb-10 ${
          modal.show ? "block" : "hidden"
        }`}
      >
        <h4 className="text-xl font-bold">Pengaturan Password Akun</h4>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            authController
              .updatePassword(form)
              .then(() => {
                dispatch({ type: MODAL_SET_PASSWORD_HIDDEN });
                toast.success("Berhasil Mengatur Password");
              })
              .catch((e) => toast.error(e.response.data.meta.message));
          }}
        >
          <div className="flex flex-col">
            <p className="text-left">Nomor Kartu Pasien</p>
            <input
              type="text"
              required
              value={form.nomor_pasien}
              onChange={(e) =>
                setForm({ ...form, nomor_pasien: e.target.value })
              }
              placeholder="Nomor Kartu Pasien"
              className="peer border p-2 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-left">Nama Sesuai Pada Kartu</p>
            <input
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              placeholder="Nama Sesuai Pada Kartu"
              className="border p-2 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-left">Password</p>
            <input
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="password"
              className="border p-2 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-left">Konfirmasi Password</p>
            <input
              placeholder="Konfirmasi Password"
              value={form.konfirmasi_password}
              onChange={(e) =>
                setForm({ ...form, konfirmasi_password: e.target.value })
              }
              type="password"
              className="border p-2 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <button className="bg-blue-600 p-3 rounded-xl text-white">
            SIMPAN
          </button>
        </form>
      </div>
      <div
        onClick={() =>
          dispatch({
            type: MODAL_SET_PASSWORD_HIDDEN,
          })
        }
        className={`fixed top-0 right-0 left-0 bottom-0 bg-gray-700 bg-opacity-80 z-20 ${
          modal.show ? "block" : "hidden"
        }`}
      ></div>
    </div>
  );
}

export default ModalPassword;
