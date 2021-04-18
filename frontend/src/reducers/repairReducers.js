import {
  REPAIR_LIST_REQUEST,
  REPAIR_LIST_SUCCESS,
  REPAIR_LIST_FAIL,
  REPAIR_CREATE_REQUEST,
  REPAIR_CREATE_SUCCESS,
  REPAIR_CREATE_FAIL,
  REPAIR_CREATE_RESET,
} from "../constants/repairConstants";

export const repairListByCarReducer = (state = { repairs: [] }, action) => {
  switch (action.type) {
    case REPAIR_LIST_REQUEST:
      return { loading: true, repairs: [] };
    case REPAIR_LIST_SUCCESS:
      return {
        loading: false,
        repairs: action.payload.repairs,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case REPAIR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const repairListReducer = (state = { repairs: [] }, action) => {
  switch (action.type) {
    case REPAIR_LIST_REQUEST:
      return { loading: true, repairs: [] };
    case REPAIR_LIST_SUCCESS:
      return {
        loading: false,
        repairs: action.payload.repairs,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case REPAIR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const repairCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case REPAIR_CREATE_REQUEST:
      return { loading: true };
    case REPAIR_CREATE_SUCCESS:
      return { loading: false, success: true, repair: action.payload };
    case REPAIR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REPAIR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
