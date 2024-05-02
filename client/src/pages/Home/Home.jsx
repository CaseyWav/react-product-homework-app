import { useState, useMemo } from "react";
import { productsApi } from "../../../api/products";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, TextField } from "@mui/material";
import HomeTable from "./HomeTable";
import { useQuery } from "@tanstack/react-query";
import { useDialog } from "../../../hooks/useDialog";
import ProductForm from "./ProductForm";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const { showDialog } = useDialog();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productsApi.getProducts,
  });

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleAddClick = () => {
    showDialog({
      title: "Add New Product",
      content: <ProductForm />,
    });
  };

  const filteredProducts = useMemo(() => {
    if (searchText) {
      return products.filter((product) =>
        product.productName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return products;
  }, [searchText, products]);

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
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <TextField
              size="small"
              label={"Filter by Name"}
              value={searchText}
              onChange={handleSearchChange}
            />
            <Button variant="contained" onClick={handleAddClick}>
              ADD NEW ITEM +
            </Button>
          </div>
          <div>
            <HomeTable products={filteredProducts} />
          </div>
        </div>
      ) : (
        <div style={{ margin: "5rem auto", height: "100%" }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Home;
