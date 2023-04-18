import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { NavBar } from "./Navbar";
import { LayoutProps } from "../common/types";

export const Layout = ({ children }: LayoutProps) => {
  return (
    <React.Fragment>
      <NavBar />
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ display: "flex" }} p={2}>
          {children}
        </Box>
      </Container>
    </React.Fragment>
  );
};
