import { Container } from "@mui/material";
import React from "react";
import { CakeList } from "../../components/CakeList";
export const ProductsPage = () => {
  return (
    <Container>
      <h2>Our Products</h2>
      <CakeList />
    </Container>
  );
};
