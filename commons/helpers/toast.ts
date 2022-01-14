import { toast } from "react-toastify";

export const showToastSuccess = (message: string) => {
  toast.dismiss();
  toast.success(message);
};

export const showToastError = (message: string) => {
  toast.error(message, {
    autoClose: false,
  });
};
