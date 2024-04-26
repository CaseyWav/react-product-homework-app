import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { createContext, useState } from "react";

export const DialogContext = createContext({});

const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [title, setTitle] = useState("");

  const showDialog = (dialogInfo) => {
    setOpen(true);
    setContent(dialogInfo?.content);
    setTitle(dialogInfo?.title);
  };

  const hideDialog = () => {
    setOpen(false);
  };

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      <Dialog open={open} onClose={hideDialog} maxWidth="lg">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
      </Dialog>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
