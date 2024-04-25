import { useContext } from "react";
import { DialogContext } from "../providers/DialogProvider";

export const useDialog = () => {
  const dialog = useContext(DialogContext);
  return dialog;
};
