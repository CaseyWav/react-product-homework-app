import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productsApi } from "../../../api/products";
import CircularProgress from "@mui/material/CircularProgress";

const Products = () => {
  const [productInfo, setProductInfo] = useState();
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const results = await productsApi.getProductById(productId);
      setProductInfo(results);
    };
    if (!productInfo) {
      fetchProduct();
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        textAlign: "left",
        paddingTop: "5rem",
      }}
    >
      {productInfo ? (
        <div>
          <h2>{productInfo.productName}</h2>
          <h4>{`$${productInfo.productPrice}.00`}</h4>
        </div>
      ) : (
        <div style={{ margin: "5rem auto", height: "100%" }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Products;
