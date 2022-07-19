import { toast } from "react-toastify";
import api from "../../api/api";
import { PROFILE, UPDATE_PAGE } from "../actionTypes";
import { store } from "../store";

export class AuthController {
  login = (event, form, navigate) => {
    event.preventDefault();
    api
      .post("/login", form)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        navigate("/");
      })
      .catch((e) => toast.error(e.response.data.data.error));
  };

  profile = () => {
    return api.get("/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  };

  updatePassword(data) {
    return api.put("/password", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  }

  detailPasien() {
    return async (dispatch) => {
      const pasien = store.getState().auth.detail;
      api
        .get(`/detail/${pasien.id_pasien}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          dispatch({
            type: PROFILE,
            payload: {
              ...pasien,
              ...res.data.data,
            },
          });
        })
        .catch((e) => {
          console.log(e);
        });
    };
  }

  logout = async (navigate) => {
    await api.post("/logout", "", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  update = (id_pasien, data) => {
    return (dispatch) => {
      api
        .put(`/profile/${id_pasien}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then(() => {
          dispatch({
            type: UPDATE_PAGE,
          });
          toast.success("Berhasil Mengubah Data Pasien");
        })
        .catch((error) => toast.error(error.response.data.message));
    };
  };
}
