import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { PROFILE } from "../../redux/actionTypes";
import { AntrianController } from "../../redux/controllers/AntrianController";
import { AuthController } from "../../redux/controllers/AuthController";
import { BookingController } from "../../redux/controllers/BookingController";
import Card from "../components/Card";

function Home() {
  const antrian = useSelector((state) => state.antrian.data);
  const booking = useSelector((state) => state.booking.data);
  const user = useSelector((state) => state.auth.detail);
  const antrianController = new AntrianController();
  const bookingController = new BookingController();
  const dispatch = useDispatch();
  const authController = new AuthController();
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
        dispatch(antrianController.fetchAntrianMenunggu());
        dispatch(bookingController.fetchBooking());
      })
      .catch(() => {
        localStorage.clear();
        navigate("/login", { replace: true });
      });
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl md:text-3xl font-bold text-left">
        Selamat Datang <span className="text-blue-500">{user.nama}</span> !
      </h1>
      <div className="grid sm:grid-cols-2 max-w-xl gap-5">
        <Card
          color={"bg-blue-500"}
          title="Booking Yang Aktif"
          isLarge={true}
          content={booking.length > 0 ? booking.length : 0}
        />
        <Card
          color="bg-green-500"
          title="Antrian Yang Menunggu"
          isLarge={true}
          content={
            antrian.menunggu?.length > 0 ? antrian.menunggu[0].jumlah_pasien : 0
          }
        />
      </div>
      <div className="container">{/* <h1>Jadwal</h1> */}</div>
    </div>
  );
}

export default Home;
