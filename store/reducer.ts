import { INITIAL_VALUE } from "components/HDBSPage/consts";
import { FormDataFinal, TypeCustomer } from "components/HDBSPage/interfaces";
import { MerchantNameItem, TerminalNameItem } from "interfaces/IGetMerchant";
import { AccountItem } from "interfaces/IListAccount";
import {
  AppActions,
  SET_TYPE_CUSTOMER,
  SET_FORM_DATA,
  SET_LIST_TERMINAL,
  SET_LIST_MERCHANT,
  SET_LIST_ACCOUNT,
  SET_ALLOW_SEND_OTP,
  SET_TOGGLE_LOADING,
} from "./actions";
import _get from "lodash/get";
import { KEY_DATA } from "commons/constants";

export interface LoadingState {
  loadingBtnSubmit: boolean;
  loadingBtnConfirmOTP: boolean;
  loadingMasterData: boolean;
}

export interface AppState {
  listMerchant: MerchantNameItem[];
  listTerminal: TerminalNameItem[];
  listAccount: AccountItem[];
  typeCustomer: TypeCustomer;

  allowSendOTP: boolean;
  openVerifyOTP: boolean;

  dataForm: FormDataFinal;
  loading: LoadingState;
  statusModalNotify: {
    open: boolean;
    desc: string;
    onClose: () => void;
  };
}

export const initialState: AppState = {
  listMerchant: [],
  listTerminal: [],
  listAccount: [],
  typeCustomer: TypeCustomer.KHM,
  dataForm: INITIAL_VALUE,

  allowSendOTP: true,
  openVerifyOTP: false,
  statusModalNotify: {
    open: false,
    desc: "",
    onClose: () => null,
  },
  loading: {
    loadingBtnSubmit: false,
    loadingBtnConfirmOTP: false,
    loadingMasterData: false,
  },
};

const storeDataToLocalStorage = (appState: AppState) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(KEY_DATA, JSON.stringify(appState));
};

const getDataFromLocalStorage = (): AppState => {
  // if (typeof window === "undefined") {
  //   return initialState;
  // }

  // const appState = localStorage.getItem(KEY_DATA);
  // if (appState) {
  //   return JSON.parse(appState);
  // }
  return initialState;
};

function reducer(
  state: AppState = getDataFromLocalStorage(),
  action: AppActions
): AppState {
  switch (action.type) {
    case SET_TOGGLE_LOADING: {
      const loadingStatus = _get(state, `loading.${action.payload}`);
      const newData = {
        ...state,
        loading: {
          ...state.loading,
          [action.payload]: loadingStatus ? false : true,
        },
      };
      // storeDataToLocalStorage(newData);
      return newData;
    }
    case SET_ALLOW_SEND_OTP: {
      const newData = {
        ...state,
        allowSendOTP: action.payload,
      };
      // storeDataToLocalStorage(newData);
      return newData;
    }
    case SET_LIST_ACCOUNT: {
      const newData = {
        ...state,
        listAccount: action.payload,
      };
      // storeDataToLocalStorage(newData);
      return newData;
    }
    case SET_LIST_TERMINAL: {
      const newData = {
        ...state,
        listTerminal: action.payload,
      };
      // storeDataToLocalStorage(newData);
      return newData;
    }
    case SET_LIST_MERCHANT: {
      const newData = {
        ...state,
        listMerchant: action.payload,
      };
      // storeDataToLocalStorage(newData);
      return newData;
    }
    case SET_FORM_DATA: {
      const newData = {
        ...state,
        dataForm: action.payload,
      };
      // storeDataToLocalStorage(newData);
      return newData;
    }
    case SET_TYPE_CUSTOMER: {
      const newData = {
        ...state,
        typeCustomer: action.payload,
      };
      // storeDataToLocalStorage(newData);
      return newData;
    }
    default:
      return state;
  }
}

export default reducer;
