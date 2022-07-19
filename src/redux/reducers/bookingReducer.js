import {
  BOOKING_BATAL,
  BOOKING_BATAL_HIDDEN,
  BOOKING_BATAL_SHOW,
  BOOKING_DETAIL,
  BOOKING_GET_DATA,
  BOOKING_MODAL_HIDDEN,
  BOOKING_MODAL_SHOW,
} from "../actionTypes";

const initialState = {
  data: [],
  detail: {
    id_booking: "",
    id_pasien: "",
    nomor_booking: "",
    tanggal: "",
    jam: "",
  },
  batal: {
    show: false,
    data: {
      id_booking: "",
      alasan_batal: "",
    },
  },
  modal: {
    show: false,
    isInsert: false,
  },
};

export const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case BOOKING_BATAL:
      return {
        ...state,
        batal: {
          ...state.batal,
          data: action.payload,
        },
      };
    case BOOKING_BATAL_SHOW:
      return {
        ...state,
        batal: {
          ...state.batal,
          show: true,
        },
      };
    case BOOKING_BATAL_HIDDEN:
      return {
        ...state,
        batal: {
          data: {
            id_booking: "",
            alasan_batal: "",
          },
          show: false,
        },
      };

    case BOOKING_GET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case BOOKING_MODAL_SHOW:
      return {
        ...state,
        modal: {
          show: true,
          isInsert: action.payload,
        },
      };
    case BOOKING_MODAL_HIDDEN:
      return {
        ...state,
        detail: {
          id_booking: "",
          id_pasien: "",
          nomor_booking: "",
          tanggal: "",
        },
        modal: {
          show: false,
          isInsert: false,
        },
      };
    default:
      return state;
  }
};
