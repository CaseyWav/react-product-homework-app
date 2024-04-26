import { Snackbar } from "@mui/material";
import React, { createContext, useState } from "react";

export const SnackbarContext = createContext({});

const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [snackProps, setSnackProps] = useState({});

  const showSnackbar = (newProps) => {
    setOpen(true);
    setSnackProps(newProps);
  };

  const hideSnackbar = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ open, showSnackbar }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={hideSnackbar}
        {...snackProps}
        sx={{ "& .MuiPaper-root": { ...snackProps?.sx } }}
      />
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
