import * as types from "./actionType";
import axios from "axios";
export const getUsers = (data) => ({
  type: types.GET_USERS,
  payload: data,
});

export const loadList = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}`)
      .then((resp) => {
        const data = dispatch(getUsers(resp.data));
        return data.payload;
      })
      .catch((error) => console.log("error",error));
  };
};
