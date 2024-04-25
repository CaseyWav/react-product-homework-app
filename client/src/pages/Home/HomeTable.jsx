import React from "react";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { useQueryClient } from "@tanstack/react-query";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDialog } from "../../../hooks/useDialog";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { productsApi } from "../../../api/products";
import DeleteProductConfirm from "./DeleteProductConfirm";

const USDollar = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
});

const HomeTable = ({ products }) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const { showDialog, hideDialog } = useDialog();

  const columns = [
    {
      field: "productId",
      headerName: "Id",
      flex: 1,
    },
    {
      field: "productName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "productPrice",
      headerName: "Price($)",
      flex: 1,
      valueFormatter: (value) => (value ? USDollar.format(value) : ""),
    },
    {
      field: "action",
      headerName: "",
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => handleEditClick(params.row)}>
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleRemoveClick(params.row)}
            >
              <GridDeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const handleEditClick = (product) => {
    showDialog({
      title: "Edit Product",
      content: <div>{product.productPrice}</div>,
    });
  };

  const handleRemoveClick = (product) => {
    showDialog({
      title: "Delete Product?",
      content: (
        <DeleteProductConfirm
          name={product.productName}
          onDeleteClick={() => handleDeleteProduct(product)}
        />
      ),
    });
  };

  const handleDeleteProduct = (product) => {
    try {
      productsApi
        .deleteProduct(product.productId)
        .then(() => queryClient.invalidateQueries({ queryKey: ["products"] }))
        .finally(() => {
          hideDialog();
          showSnackbar({
            message: `Product ${product.productId} deleted successfully!`,
            sx: { backgroundColor: "green" },
          });
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ margin: "auto", width: "500px", height: "100%" }}>
      <div>
        <DataGrid
          rows={products ?? []}
          columns={columns}
          getRowId={(row) => row.productId}
          hideFooter
          autoHeight
        />
      </div>
    </div>
  );
};

export default HomeTable;
