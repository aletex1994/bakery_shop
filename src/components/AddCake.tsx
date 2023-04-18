import React, { useEffect } from "react";
import { Button, Divider, Modal } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { CakeForm, Ingredient } from "../common/types";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { addCake, getCurrentDate } from "../common/functions";
import { useSnackbar } from "notistack";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
};
export const AddCake = () => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState<number>(0);
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [quantity, setQuantity] = React.useState<number>(0);
  const [images, setImages] = React.useState([]);

  //TODO: add images with dropzone

  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => setOpen(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleIngredientChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedIngredients = [...ingredients];
    // @ts-ignore
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    const newIngredient = {
      name: "",
      udm: "",
      quantity: 0,
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const removeIngredient = (index: number) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];
      updatedIngredients.splice(index, 1);
      return updatedIngredients;
    });
  };

  const saveCake = async () => {
    const cake: CakeForm = {
      name,
      price,
      quantity,
      ingredients,
      images,
      onSale: true,
      date: getCurrentDate(),
    };

    try {
      const response = await addCake(cake);
      //console.log(response);
      if (response) {
        enqueueSnackbar("Added!", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
      } else {
        enqueueSnackbar("Ops, an error occurred", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      handleClose();
    }
  };

  useEffect(() => {
    setName("");
    setPrice(0);
    setIngredients([]);
    setQuantity(0);
    setImages([]);
  }, [open]);

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Chip label="+ Add new cake" variant="outlined" onClick={handleClick} />
      </Stack>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2>Add new cake</h2>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={handleNameChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={handlePriceChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />

          <Box sx={{ marginBottom: 2, marginTop: 2 }}>
            <h3>Ingredients</h3>
            <IconButton onClick={addIngredient}>
              <AddIcon />
            </IconButton>
            <Divider sx={{ marginBottom: 2, marginTop: 1 }} />
            {ingredients.map((ingredient, index) => (
              <>
                <Box key={index} sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    label="Name"
                    type="text"
                    value={ingredient.name}
                    onChange={(e) =>
                      handleIngredientChange(index, "name", e.target.value)
                    }
                  />

                  <TextField
                    label="Quantity"
                    type="number"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      handleIngredientChange(index, "quantity", e.target.value)
                    }
                  />
                  <TextField
                    label="UDM"
                    type="text"
                    value={ingredient.udm}
                    onChange={(e) =>
                      handleIngredientChange(index, "udm", e.target.value)
                    }
                  />
                  <IconButton onClick={() => removeIngredient(index)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ marginBottom: 1, marginTop: 1 }} />
              </>
            ))}
          </Box>
          <Button variant="contained" onClick={saveCake}>
            Save {quantity === 1 ? "cake" : "cakes"}
          </Button>
        </Box>
      </Modal>
    </>
  );
};
