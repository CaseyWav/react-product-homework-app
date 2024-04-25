import { useContext } from "react";
import { SnackbarContext } from "../providers/SnackbarProvider";

export const useSnackbar = () => {
  const snackbar = useContext(SnackbarContext);
  return snackbar;
};
