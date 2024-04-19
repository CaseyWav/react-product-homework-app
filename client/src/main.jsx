import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import AddProduct from "./pages/Products/AddProduct";
import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

const routes = [
  { path: "/", element: <Home /> },
  { path: "/products/:productId", element: <Products />},
  { path: "/AddProduct", element: <AddProduct />}
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
