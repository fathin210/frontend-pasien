import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BOOKING_DETAIL, BOOKING_MODAL_SHOW } from "../../redux/actionTypes";

function FloatingActionButton({ user }) {
  const detail = useSelector((state) => state.booking.detail);
  const modal = useSelector((state) => state.booking.modal);
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        if (user.no_telepon == null) {
          toast.warn(
            "Untuk Melakukan Booking Harap Tambahkan Nomor Telepon Yang Dapat Dihubungi"
          );
        } else {
          dispatch({
            type: BOOKING_DETAIL,
            payload: {
              ...detail,
              id_pasien: user.id_pasien,
            },
          });
          dispatch({
            type: BOOKING_MODAL_SHOW,
            payload: true,
          });
        }
      }}
      className={`text-2xl h-16 w-16 rounded-full bg-blue-500 text-white fixed bottom-28 lg:bottom-10 right-5 lg:right-10 shadow-xl hover:bg-blue-700 z-10 ${
        modal.show ? "hidden" : "block"
      }`}
    >
      +
    </button>
  );
}

export default FloatingActionButton;
