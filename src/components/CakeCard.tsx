import React, { useState, useEffect } from "react";
import { Cake } from "../common/types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const CakeCard = (cakeCardProps: Cake) => {
  const [cake, setCake] = useState<Cake>(cakeCardProps);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (cakeCardProps) {
      setCake(cakeCardProps);
    }
  }, [cakeCardProps]);

  return (
    <>
      <Card sx={{ minWidth: 200 }}>
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            {cake.name}
          </Typography>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Typography variant="h5" component="div">
            € {cake.price}
          </Typography>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Typography variant="h6" component="div" sx={{ fontSize: 12 }}>
            Availability: {cake.quantity}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <Button variant="outlined" size="small" onClick={handleOpen}>
              See ingredients
            </Button>
          </Typography>
        </CardActions>
      </Card>
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {cake.name}
            </Typography>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h3>Ingredient</h3>
                    </TableCell>
                    <TableCell align="right">
                      <h3>Quantity</h3>
                    </TableCell>
                    <TableCell align="right">
                      <h3>Uom</h3>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cake.ingredients.map((ingredient) => (
                    <TableRow key={cake._id}>
                      <TableCell component="th" scope="row">
                        {ingredient.name}
                      </TableCell>
                      <TableCell align="right">{ingredient.quantity}</TableCell>
                      <TableCell align="right">{ingredient.udm}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Modal>
      </>
    </>
  );
};
