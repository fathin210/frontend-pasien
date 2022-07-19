import {
  MODAL_SET_PASSWORD_HIDDEN,
  MODAL_SET_PASSWORD_SHOW,
  PROFILE,
} from "../actionTypes";

const initialState = {
  detail: {
    id_pasien: "",
    alamat: "",
    nama: "",
    jenis_kelamin: "",
    no_telepon: "",
    nomor_pasien: "",
    pendaftaran: [],
  },
  modal: {
    show: false,
    data: {},
  },
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE:
      return {
        ...state,
        detail: action.payload,
      };
    case MODAL_SET_PASSWORD_SHOW:
      return {
        ...state,
        modal: {
          ...state.modal,
          show: true,
        },
      };
    case MODAL_SET_PASSWORD_HIDDEN:
      return {
        ...state,
        modal: {
          ...state.modal,
          show: false,
        },
      };
    default:
      return state;
  }
};
