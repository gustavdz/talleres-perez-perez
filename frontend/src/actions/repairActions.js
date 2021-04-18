import {
  REPAIR_LIST_REQUEST,
  REPAIR_LIST_SUCCESS,
  REPAIR_LIST_FAIL,
  REPAIR_CREATE_REQUEST,
  REPAIR_CREATE_SUCCESS,
  REPAIR_CREATE_FAIL,
} from "../constants/repairConstants";
import axios from "axios";

export const listRepairsByCar = (pageNumber = "", carId = "") => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: REPAIR_LIST_REQUEST });
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
      `/api/repairs/car/${carId}?pageNumber=${pageNumber}`,
      config
    );
    dispatch({
      type: REPAIR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPAIR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listRepairs = (pageNumber = "") => async (dispatch, getState) => {
  try {
    dispatch({ type: REPAIR_LIST_REQUEST });
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
      `/api/repairs?pageNumber=${pageNumber}`,
      config
    );
    dispatch({
      type: REPAIR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPAIR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createRepair = (car) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REPAIR_CREATE_REQUEST,
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
    const { data } = await axios.post(`/api/repairs`, car, config);

    dispatch({
      type: REPAIR_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPAIR_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
