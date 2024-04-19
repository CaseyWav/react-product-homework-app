import React, { useReducer } from "react";
import axios from "axios";
import AddProductInput from "./AddProductInput";
import { useNavigate } from "react-router-dom";

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

const ProductForm = () => {
  const [formState, dispatch] = useReducer(reducer, initialFormState);
  const navigate = useNavigate();
  
  const clearForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

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
        const response = await axios.post(import.meta.env.VITE_API_URL + "/createProduct", payload);
        clearForm();
        if(response.data){
          navigate("/")
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
        <AddProductInput
          id="productName"
          value={formState.productName}
          onChange={handleChange}
        />
        <AddProductInput
          id="productPrice"
          value={formState.productPrice}
          onChange={handleChange}
        />
        <div style={{ display: "flex" }}>
          <button type="submit" style={{ marginLeft: "auto" }}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
