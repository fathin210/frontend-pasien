import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BOOKING_DETAIL, BOOKING_MODAL_HIDDEN } from "../../redux/actionTypes";
import { BookingController } from "../../redux/controllers/BookingController";

function ModalBooking() {
  let date = new Date();
  const bookingController = new BookingController();
  const data = useSelector((state) => state.booking.detail);
  const modal = useSelector((state) => state.booking.modal);

  const dispatch = useDispatch();
  return (
    <div
      className={`fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center ${
        modal.show ? "block" : "hidden"
      }`}
    >
      <div
        className={`fixed bg-white flex flex-col gap-5 p-5 w-72 h-fit rounded-md z-30 mb-10 ${
          modal.show ? "block" : "hidden"
        }`}
      >
        <h4 className="text-xl font-bold">
          {modal.isInsert ? "Formulir Booking Antrian" : "Ubah Jadwal Booking"}
        </h4>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            modal.isInsert
              ? dispatch(bookingController.insertBooking(data, e))
              : dispatch(bookingController.updateBooking(data, e));
          }}
        >
          {!modal.isInsert && (
            <div>
              <p className="text-left">Kode Booking</p>
              <input
                type="text"
                value={data?.nomor_booking}
                disabled
                placeholder="Nomor Booking"
                className="peer border p-2 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-left">Jam Kedatangan</p>
            <select
              required
              value={data.jam == null ? "" : data.jam}
              onChange={(e) =>
                dispatch({
                  type: BOOKING_DETAIL,
                  payload: {
                    ...data,
                    jam: e.target.value,
                  },
                })
              }
              className="border p-2 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              <option value="">Pilih Jam</option>
              <option value="14:00 - 15:00">14:00 - 15:00</option>
              <option value="15:01 - 16:00">15:01 - 16:00</option>
            </select>
          </div>
          <div className="flex flex-col">
            <p className="text-left">Tanggal Booking</p>
            <input
              type="date"
              required
              min={date.toLocaleDateString("en-CA")}
              value={data.tanggal}
              onChange={(e) => {
                dispatch({
                  type: BOOKING_DETAIL,
                  payload: {
                    ...data,
                    tanggal: e.target.value,
                  },
                });
              }}
              placeholder="Tanggal"
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
            type: BOOKING_MODAL_HIDDEN,
          })
        }
        className={`fixed top-0 right-0 left-0 bottom-0 bg-gray-700 bg-opacity-80 z-20 ${
          modal.show ? "block" : "hidden"
        }`}
      ></div>
    </div>
  );
}

export default ModalBooking;
