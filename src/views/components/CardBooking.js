import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BOOKING_BATAL,
  BOOKING_BATAL_SHOW,
  BOOKING_DETAIL,
  BOOKING_MODAL_SHOW,
} from "../../redux/actionTypes";

function CardBooking({ id_booking, id_pasien, nomor_booking, tanggal, jam }) {
  const detail = useSelector((state) => state.booking.detail);
  const dispatch = useDispatch();
  return (
    <div className="flex w-64 flex-col bg-white shadow-lg rounded-xl h-36 gap-2">
      <div className="p-2 rounded-tr-xl rounded-tl-xl bg-blue-500 text-white ">
        <div className="grid grid-cols-2 justify-around items-center">
          <div>Kode Booking</div>
          <div>Tanggal</div>
          <div></div>
        </div>
      </div>
      <div className="grid grid-cols-2 p-2">
        <div>{nomor_booking}</div>
        <div>{tanggal}</div>
      </div>
      <div className="grid grid-cols-2 p-2 gap-2">
        <button
          className="bg-green-500 text-white rounded-md hover:bg-green-700"
          onClick={() => {
            dispatch({
              type: BOOKING_DETAIL,
              payload: {
                ...detail,
                id_booking,
                nomor_booking,
                id_pasien,
                tanggal,
                jam,
              },
            });
            dispatch({
              type: BOOKING_MODAL_SHOW,
              payload: false,
            });
          }}
        >
          Ubah
        </button>
        <button
          className="bg-red-500 text-white rounded-md shadow-lg hover:bg-red-700"
          onClick={() => {
            dispatch({ type: BOOKING_BATAL_SHOW });
            dispatch({
              type: BOOKING_BATAL,
              payload: {
                id_booking,
                alasan_batal: "",
              },
            });
          }}
        >
          Batal
        </button>
      </div>
    </div>
  );
}

export default CardBooking;
