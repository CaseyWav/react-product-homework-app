import React, { useState, useEffect, useCallback } from "react";
import { productsApi } from "../../../api/products";
import CircularProgress from "@mui/material/CircularProgress";
import HomeTable from "./HomeTable";
import { useQuery } from "@tanstack/react-query";
const fetchProducts = async () => {
  return await productsApi.getProducts();
};

const Home = () => {

  const {data: products,isLoading} = useQuery({ queryKey: ["products"], queryFn: fetchProducts })

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
      {products && !isLoading ? (
        <HomeTable products={products} />
      ) : (
        <div style={{ margin: "5rem auto", height: "100%" }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Home;
