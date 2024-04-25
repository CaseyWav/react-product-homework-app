import React from "react";
import { Button, Typography } from "@mui/material";
import { useDialog } from "../../../hooks/useDialog";

const DeleteProductConfirm = ({ name, onDeleteClick }) => {
  const { hideDialog } = useDialog();

  return (
    <div>
      <Typography sx={{ mb: 2 }}>
        {`Are you sure you want to delete ${name}?`}
      </Typography>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={hideDialog}>CANCEL</Button>
        <Button variant="contained" color="error" onClick={onDeleteClick}>
          DELETE
        </Button>
      </div>
    </div>
  );
};

export default DeleteProductConfirm;
