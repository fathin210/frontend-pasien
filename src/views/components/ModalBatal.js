import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BOOKING_BATAL, BOOKING_BATAL_HIDDEN } from "../../redux/actionTypes";
import { BookingController } from "../../redux/controllers/BookingController";

function ModalBatal() {
  const modal = useSelector((state) => state.booking.batal);
  const data = useSelector((state) => state.booking.batal.data);
  const bookingController = new BookingController();

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
        <h4 className="text-xl font-bold">Batal Booking</h4>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(bookingController.batalBooking(data));
          }}
        >
          <div className="flex flex-col">
            <p className="text-left">Alasan Pembatalan Booking</p>
            <div className="flex items-center gap-5">
              <input
                type="radio"
                id="Tidak Ingin Memberitahu"
                value="Tidak Ingin Memberitahu"
                name="alasan_batal"
                onChange={(e) => {
                  dispatch({
                    type: BOOKING_BATAL,
                    payload: {
                      ...data,
                      alasan_batal: e.target.value,
                    },
                  });
                }}
              />
              <label htmlFor="Tidak Ingin Memberitahu">
                Tidak Ingin Memberitahu
              </label>
            </div>
            <div className="flex items-center gap-5">
              <input
                type="radio"
                id="Keperluan Mendesak"
                value="Keperluan Mendesak"
                name="alasan_batal"
                onChange={(e) => {
                  dispatch({
                    type: BOOKING_BATAL,
                    payload: {
                      ...data,
                      alasan_batal: e.target.value,
                    },
                  });
                }}
              />
              <label htmlFor="Keperluan Mendesak">Keperluan Mendesak</label>
            </div>
            <div className="flex items-center gap-5">
              <input
                type="radio"
                id="Lain-lain"
                value="Lain-lain"
                name="alasan_batal"
                onChange={(e) => {
                  dispatch({
                    type: BOOKING_BATAL,
                    payload: {
                      ...data,
                      alasan_batal: e.target.value,
                    },
                  });
                }}
              />
              <label htmlFor="Lain-lain">Lain-lain</label>
            </div>
          </div>
          <button className="bg-red-600 p-3 rounded-xl text-white">
            SIMPAN
          </button>
        </form>
      </div>
      <div
        onClick={() =>
          dispatch({
            type: BOOKING_BATAL_HIDDEN,
          })
        }
        className={`fixed top-0 right-0 left-0 bottom-0 bg-gray-700 bg-opacity-80 z-20 ${
          modal.show ? "block" : "hidden"
        }`}
      ></div>
    </div>
  );
}

export default ModalBatal;
