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
    loadingMasterData: true,
  },
};

function reducer(state: AppState = initialState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TOGGLE_LOADING: {
      const loadingStatus = _get(state, `loading.${action.payload}`);
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload]: loadingStatus ? false : true,
        },
      };
    }
    case SET_ALLOW_SEND_OTP: {
      return {
        ...state,
        allowSendOTP: action.payload,
      };
    }
    case SET_LIST_ACCOUNT: {
      return {
        ...state,
        listAccount: action.payload,
      };
    }
    case SET_LIST_TERMINAL: {
      return {
        ...state,
        listTerminal: action.payload,
      };
    }
    case SET_LIST_MERCHANT: {
      return {
        ...state,
        listMerchant: action.payload,
      };
    }
    case SET_FORM_DATA: {
      return {
        ...state,
        dataForm: action.payload,
      };
    }
    case SET_TYPE_CUSTOMER: {
      return {
        ...state,
        typeCustomer: action.payload,
      };
    }
    default:
      return state;
  }
}

export default reducer;
