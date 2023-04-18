import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { getCakesData, deleteCake } from "../common/functions";
import { Cake } from "../common/types";
import { useSnackbar } from "notistack";

import { EditCake } from "./EditCake";

export default function CakeTable() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleOpenEditModal = (cake: Cake) => {
    setSelectedCake(null);
    setSelectedCake(cake);
    setOpenEditModal(true);
  };

  const fetchData = async () => {
    const cakesData = await getCakesData();
    setCakes(cakesData);
  };

  const handleOpenDialog = (cake: Cake) => {
    setSelectedCake(cake);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    try {
      if (!selectedCake._id) return;

      const response = await deleteCake(selectedCake._id);
      if (response) {
        enqueueSnackbar("Cake deleted", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        fetchData();
      } else {
        enqueueSnackbar("Error deleting cake", {
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
      }
    } catch (err) {
      enqueueSnackbar("Error deleting cake", {
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
    } finally {
      fetchData();
      handleCloseDialog();
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Fetch data every 5000ms - 5 seconds to be
  useEffect(() => {
    fetchData();
    let intervalId: any;
    if (!intervalId) {
      intervalId = setInterval(() => {
        fetchData();
      }, 5000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell align="right">
                <b>Edit</b>
              </TableCell>
              <TableCell align="right">
                <b>Delete</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cakes
              .filter((cake) => cake.quantity > 0 && cake.onSale)
              .map((cake) => (
                <TableRow
                  key={cake._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {cake.name}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenEditModal(cake)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenDialog(cake)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete {selectedCake?.name}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {selectedCake?.quantity}{" "}
            {selectedCake?.name}? <br />
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      {selectedCake && (
        <EditCake
          cake={selectedCake}
          handleClose={handleCloseEditModal}
          isOpen={openEditModal}
        />
      )}
    </>
  );
}
