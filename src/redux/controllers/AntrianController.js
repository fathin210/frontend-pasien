import axios from "axios";
import { ANTRIAN_GET_DATA } from "../actionTypes";

export class AntrianController {
  fetchAntrianMenunggu = () => {
    return (dispatch) => {
      axios
        .get(
          "https://api-setiakawan.gazebo-skripsi.my.id/api/info-antrian/day",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((res) => {
          dispatch({
            type: ANTRIAN_GET_DATA,
            payload: res.data.data,
          });
        })
        .catch((error) => console.log(error));
    };
  };
}
