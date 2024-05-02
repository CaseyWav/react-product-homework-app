import React from "react";
import { productsApi } from "../../../api/products";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { useDialog } from "../../../hooks/useDialog";
import { Button, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const CreateProductForm = ({ defaultProduct }) => {
  const { showSnackbar } = useSnackbar();
  const { hideDialog } = useDialog();
  const queryClient = useQueryClient();

  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      productName: defaultProduct?.productName ?? "",
      productPrice: defaultProduct?.productPrice ?? "",
    },
    mode: "onChange",
  });

  const executeApiRequest = (formData) => {
    if (!!defaultProduct) {
      const updatePayload = { ...defaultProduct, ...formData };
      return productsApi.updateProduct(updatePayload);
    }
    return productsApi.createProduct(formData);
  };

  const { mutate } = useMutation({
    mutationFn: executeApiRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      hideDialog();
      const snackMessage = !!defaultProduct
        ? "Product Updated Successfully!"
        : "Product Successfully Created!";
      showSnackbar({
        message: snackMessage,
        sx: { backgroundColor: "green" },
      });
    },
    onError: () => {
      const snackMessage = !!defaultProduct
        ? "Error occurred trying to update product!"
        : "Error occurred trying to add product!";
      showSnackbar({
        message: snackMessage,
        sx: { backgroundColor: "red" },
      });
    },
  });

  return (
    <form onSubmit={handleSubmit((formData) => mutate(formData))}>
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
        <div style={{ display: "block", width: "100%" }}>
          <TextField
            sx={{ width: "100%" }}
            name="productName"
            label="Product Name"
            error={!!formState.errors.productName}
            {...register("productName", {
              required: true,
              pattern: /[a-zA-Z0-9.\-\s]*$/,
            })}
          />
          {formState.errors.productName && (
            <p style={{ margin: 0, color: "#f44336" }}>
              {"Invalid Product Name"}
            </p>
          )}
        </div>
        <div style={{ display: "block", width: "100%" }}>
          <TextField
            error={!!formState.errors.productPrice}
            sx={{ width: "100%" }}
            name="productPrice"
            label="Product Price ($)"
            {...register("productPrice", {
              required: true,
              pattern: /^\d*\.?\d*$/,
            })}
          />
          {formState.errors.productPrice && (
            <p style={{ margin: 0, color: "#f44336" }}>
              {"Invalid Product Price"}
            </p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={hideDialog}>CANCEL</Button>
          <Button
            disabled={!formState.isDirty /* || !formState.isValid */}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateProductForm;
