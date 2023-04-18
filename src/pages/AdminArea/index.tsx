import React from "react";
import Divider from "@mui/material/Divider";
import { Container } from "@mui/system";
import { AddCake } from "../../components/AddCake";
import CakeTable from "../../components/CakeTable";
import { AuthContext } from "../../context";
export const AdminAreaPage = () => {
  const { isLoggedIn } = React.useContext(AuthContext);
  return (
    <Container>
      <h2>Manage Products</h2>
      {
        // If user is not logged in, show a message
        !isLoggedIn ? (
          <p>You must be logged in to access this page</p>
        ) : (
          <>
            <AddCake />
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <CakeTable />
          </>
        )
      }
    </Container>
  );
};
