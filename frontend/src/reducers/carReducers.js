import {
  CAR_LIST_REQUEST,
  CAR_LIST_SUCCESS,
  CAR_LIST_FAIL,
  CAR_CREATE_REQUEST,
  CAR_CREATE_SUCCESS,
  CAR_CREATE_FAIL,
  CAR_CREATE_RESET,
} from "../constants/carConstants";

export const carListReducer = (state = { cars: [] }, action) => {
  switch (action.type) {
    case CAR_LIST_REQUEST:
      return { loading: true, cars: [] };
    case CAR_LIST_SUCCESS:
      return {
        loading: false,
        cars: action.payload.cars,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case CAR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const carCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CAR_CREATE_REQUEST:
      return { loading: true };
    case CAR_CREATE_SUCCESS:
      return { loading: false, success: true, car: action.payload };
    case CAR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CAR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
