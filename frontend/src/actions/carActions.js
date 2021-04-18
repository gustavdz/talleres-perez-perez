import {
  CAR_LIST_REQUEST,
  CAR_LIST_SUCCESS,
  CAR_LIST_FAIL,
  CAR_CREATE_REQUEST,
  CAR_CREATE_SUCCESS,
  CAR_CREATE_FAIL,
} from "../constants/carConstants";
import axios from "axios";

export const listCars = (
  keyword = "",
  pageNumber = "",
  customerId = ""
) => async (dispatch, getState) => {
  try {
    dispatch({ type: CAR_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/cars/customer/${customerId}?keyword=${keyword}&pageNumber=${pageNumber}`,
      config
    );
    dispatch({
      type: CAR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCar = (car) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAR_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/cars`, car, config);

    dispatch({
      type: CAR_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAR_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
