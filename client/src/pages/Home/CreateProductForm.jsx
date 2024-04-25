import React, { useReducer } from "react";
import { productsApi } from "../../../api/products";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { useDialog } from "../../../hooks/useDialog";
import { Button, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

const initialFormState = {
  productName: "",
  productPrice: "",
};

const reducer = (state, action) => {
  const { type, field, payload } = action;
  switch (type) {
    case "RESET_FORM":
      return initialFormState;
    default:
      return { ...state, [field]: payload };
  }
};

const CreateProductForm = () => {
  const [formState, dispatch] = useReducer(reducer, initialFormState);
  const { showSnackbar } = useSnackbar();
  const { hideDialog } = useDialog();
  const queryClient = useQueryClient();

  //check that each field is filled
  const validateForm = () => {
    return Boolean(formState.productName && formState.productPrice);
  };

  const handleChange = (e) => {
    dispatch({ field: e.target.name, payload: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = formState;
    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await productsApi.createProduct(payload);
        if (response.data) {
          queryClient.invalidateQueries({ queryKey: ["products"] });
          hideDialog();
          showSnackbar({
            message: "Product Successfully Created!",
            sx: { backgroundColor: "green" },
          });
        } else {
          showSnackbar({
            message: "Error occurred trying to add product!",
            sx: { backgroundColor: "red" },
          });
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("Please complete the form");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          gap: "20px",
          width: "30vw",
          padding: "5px",
        }}
      >
        <TextField
          name="productName"
          label="Product Name"
          value={formState.productName}
          onChange={handleChange}
        />
        <TextField
          name="productPrice"
          label="Product Price"
          value={formState.productPrice}
          onChange={handleChange}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={hideDialog}>CANCEL</Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateProductForm;
