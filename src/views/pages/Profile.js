import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CurrencyFormat from "react-currency-format";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PROFILE } from "../../redux/actionTypes";
import { AuthController } from "../../redux/controllers/AuthController";
import UserIcon from "../components/UserIcon";

function Profile() {
  const authController = new AuthController();
  const pasien = useSelector((state) => state.auth.detail);
  const update = useSelector((state) => state.update.update);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    authController
      .profile()
      .then((res) => {
        dispatch({
          type: PROFILE,
          payload: res.data.data,
        });
      })
      .then(() => {
        dispatch(authController.detailPasien());
      })
      .catch(() => {
        localStorage.clear();
        navigate("/login", { replace: true });
      });
  }, [update]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-left text-2xl md:text-3xl font-bold">
        Profile Pasien
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-col bg-white rounded-lg justify-center items-center gap-5 shadow-xl p-5 lg:p-10">
          <UserIcon />
          <div>
            <form
              className="flex flex-col gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                dispatch(authController.update(pasien.id_pasien, pasien));
                setIsEdit(false);
              }}
            >
              <div>
                <p className="text-left">Nama Pasien</p>
                <input
                  type="text"
                  value={pasien.nama}
                  disabled={!isEdit && "disabled"}
                  onChange={(event) => {
                    dispatch({
                      type: PROFILE,
                      payload: {
                        ...pasien,
                        nama: event.target.value,
                      },
                    });
                  }}
                  placeholder="Nomor Booking"
                  className="peer w-full border p-2 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div>
                <p className="text-left">Alamat</p>
                <input
                  type="text"
                  value={pasien.alamat}
                  disabled={!isEdit && "disabled"}
                  onChange={(event) => {
                    dispatch({
                      type: PROFILE,
                      payload: {
                        ...pasien,
                        alamat: event.target.value,
                      },
                    });
                  }}
                  placeholder="Nomor Booking"
                  className="peer w-full border p-2 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div>
                <p className="text-left">Nomor Telepon</p>
                {isEdit && (
                  <p className="text-left text-sm text-slate-500">
                    <span className="text-red-500">*</span>
                    Tidak Perlu Memasukkan Angka 0 yang pertama
                  </p>
                )}
                <input
                  type="number"
                  value={pasien?.no_telepon}
                  disabled={!isEdit && "disabled"}
                  onChange={(event) => {
                    dispatch({
                      type: PROFILE,
                      payload: {
                        ...pasien,
                        no_telepon: event.target.value,
                      },
                    });
                  }}
                  placeholder="Nomor Telepon"
                  className="peer w-full border p-2 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <button
                className={`bg-green-600 text-white p-2 rounded-lg ${
                  !isEdit && "hidden"
                }`}
                type="submit"
              >
                Simpan
              </button>
            </form>
            <button
              className={`bg-blue-600 w-full mt-3 text-white p-2 rounded-lg ${
                isEdit && "hidden"
              }`}
              onClick={(event) => {
                event.preventDefault();
                setIsEdit(!isEdit);
              }}
            >
              Ubah Data
            </button>
            <button
              className={`bg-red-600 w-full mt-3 text-white p-2 rounded-lg ${
                isEdit && "hidden"
              }`}
              onClick={() => {
                authController.logout(navigate);
              }}
            >
              Keluar Akun
            </button>
          </div>
        </div>
      </div>

      <h1 className="text-left text-2xl md:text-3xl font-bold">
        Riwayat Kunjungan
      </h1>
      <div className="flex bg-white shadow-xl rounded-lg p-5 overflow-x-auto">
        <table className="table-auto flex-grow">
          <thead className="border-b">
            <tr>
              <th>No.</th>
              <th>Nomor Antrian</th>
              <th>Teknisi</th>
              <th>Tanggal</th>
              <th>Total Biaya</th>
            </tr>
          </thead>
          <tbody>
            {pasien.pendaftaran?.length !== 0 ? (
              pasien.pendaftaran?.map((item, index) => {
                return (
                  <tr>
                    <td>{++index}</td>
                    <td>{item.nomor_pendaftaran}</td>
                    <td>{item.teknisi.nama}</td>
                    <td>{item.tanggal_pelaksanaan}</td>
                    <td>
                      <CurrencyFormat
                        value={item.total_biaya}
                        thousandSeparator
                        displayType="text"
                        prefix="Rp. "
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={12}>
                  <h4 className="text-2xl font-bold">Data Tidak Ada</h4>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile;
