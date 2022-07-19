import { toast } from "react-toastify";
import { store } from "../store";
import api from "../../api/api";
import {
  BOOKING_BATAL_HIDDEN,
  BOOKING_GET_DATA,
  BOOKING_MODAL_HIDDEN,
  UPDATE_PAGE,
} from "../actionTypes";

export class BookingController {
  fetchBooking() {
    return (dispatch) => {
      const pasien = store.getState().auth.detail;
      api
        .get(`/booking/pasien/${pasien.id_pasien}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          dispatch({
            type: BOOKING_GET_DATA,
            payload: res.data.data,
          });
        })
        .catch((e) => {
          toast.error(e.response.data.message);
        });
    };
  }

  insertBooking(data, event) {
    event.preventDefault();
    return (dispatch) => {
      api
        .post("/booking", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then(() => {
          dispatch({
            type: UPDATE_PAGE,
          });
        })
        .then(() => {
          dispatch({
            type: BOOKING_MODAL_HIDDEN,
          });
          toast.success("Berhasil Menambahkan Booking");
        })
        .catch((e) => {
          toast.error(e.response.data.meta.message);
        });
    };
  }

  updateBooking(data, event) {
    event.preventDefault();
    return (dispatch) => {
      api
        .put(`/booking/${data.id_booking}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then(() => {
          dispatch({
            type: UPDATE_PAGE,
          });
        })
        .then(() => {
          dispatch({
            type: BOOKING_MODAL_HIDDEN,
          });
          toast.success("Berhasil Mengubah Data Booking");
        })
        .catch((e) => {
          toast.error(e.response.data.message);
        });
    };
  }

  batalBooking = (data) => {
    return (dispatch) => {
      api
        .post("/booking/batal", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then(() => {
          dispatch({ type: BOOKING_BATAL_HIDDEN });
          dispatch({ type: UPDATE_PAGE });
          toast.success("Berhasil Melakukan Batal Booking");
        });
    };
  };
}
