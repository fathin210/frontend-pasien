import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PROFILE } from "../../redux/actionTypes";
import { AuthController } from "../../redux/controllers/AuthController";
import { BookingController } from "../../redux/controllers/BookingController";
import CardBooking from "../components/CardBooking";
import FloatingActionButton from "../components/FloatingActionButton";
import ModalBatal from "../components/ModalBatal";
import ModalBooking from "../components/ModalBooking";

const Booking = () => {
  const bookingController = new BookingController();
  const booking = useSelector((state) => state.booking.data);
  const user = useSelector((state) => state.auth.detail);
  const update = useSelector((state) => state.update);
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
        dispatch(bookingController.fetchBooking());
      })
      .catch(() => {
        localStorage.clear();
        navigate("/login", { replace: true });
      });
  }, [update]);

  return (
    <div className="flex flex-col gap-3">
      <ModalBooking />
      <ModalBatal />
      <div>
        <h1 className="text-left text-2xl md:text-3xl font-bold">Booking</h1>
      </div>
      <section>
        <div className="flex flex-col gap-5">
          <h1 className="text-left text-xl md:text-2xl font-normal">
            Data Booking Yang Aktif
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 justify-items-center lg:justify-items-start">
            {booking.length !== 0 ? (
              booking?.map((item) => {
                return (
                  <CardBooking
                    id_booking={item.id_booking}
                    id_pasien={item.id_pasien}
                    nomor_booking={item.nomor_booking}
                    tanggal={item.tanggal}
                    jam={item.jam}
                  />
                );
              })
            ) : (
              <h4 className="text-2xl font-semibold">Tidak Ada Data</h4>
            )}
          </div>
        </div>
      </section>
      <FloatingActionButton user={user} />
    </div>
  );
};

export default Booking;
