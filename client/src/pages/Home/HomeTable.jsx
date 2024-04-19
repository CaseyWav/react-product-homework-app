import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const HomeTable = ({ products }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const headers = ["Id", "Name", "Price($)", ""];

  const handleRowClick = (row) => {
    navigate(`/products/${row.productId}`);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleAddClick = () => {
    navigate(`/AddProduct`)
  }

  const handleRemoveClick = (product) => {
      try{
        axios.delete(import.meta.env.VITE_API_URL + "/products/" + product.productId)
        .then( ()=> queryClient.invalidateQueries({queryKey:["products"]}));
      }
      catch(e){
        console.error(e);
      }
  }

  const filteredProducts = useMemo(() => {
    if (searchText) {
      return products.filter((product) =>
        product.productName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return products;
  }, [searchText, products]);

  return (
    <div style={{ margin: "auto", width: "500px", height: "100%" }}>
      <table 
        style={{
            width: "100%",
            border:"none"
        }}
      >
        <tbody>
          <tr>
            <td style={{border:"none"}}>
              <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                style={{ marginBottom: "15px" }}
              />
            </td>
            <td style={{border:"none", textAlign:"right"}}>
              <input
                type="button"
                value="Add New Item +"
                onClick={handleAddClick}
                style={{ marginBottom: "15px" }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table
        style={{
          width: "100%",
          border: "1px solid black",
        }}
      >
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index}>
              <td onClick={() => handleRowClick(product)}>{product.productId}</td>
              <td onClick={() => handleRowClick(product)}>{product.productName}</td>
              <td onClick={() => handleRowClick(product)}>{`$${product.productPrice}.00`}</td>
              <td>
                <input
                  type="button"
                  value="Remove"
                  onClick={() => handleRemoveClick(product)}
                  style={{ marginBottom: "15px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeTable;
