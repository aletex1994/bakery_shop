import React, { useEffect } from "react";
import { Button, Divider, Modal } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { Cake, Ingredient } from "../common/types";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { updateCake } from "../common/functions";
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

interface EditCakeProps {
  cake: Cake;
  isOpen: boolean;
  handleClose: () => void;
}

export const EditCake = ({ cake, isOpen, handleClose }: EditCakeProps) => {
  const [name, setName] = React.useState(cake.name);
  const [price, setPrice] = React.useState<number>(cake.price);
  const [quantity, setQuantity] = React.useState<number>(cake.quantity);
  const [images, setImages] = React.useState(cake.images);

  const [ingredients, setIngredients] = React.useState<Ingredient[]>(
    cake.ingredients
  );

  //TODO: add images with dropzone

  const { enqueueSnackbar } = useSnackbar();

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
    const updatedCake: Cake = {
      name,
      price,
      quantity,
      ingredients,
      images,
      onSale: true,
      date: cake.date,
      _id: cake._id,
    };

    try {
      const response = await updateCake(updatedCake._id, updatedCake);
      //console.log(response);
      if (response) {
        enqueueSnackbar("Cake updated!", {
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
    setName(cake.name);
    setPrice(cake.price);
    setQuantity(cake.quantity);
    setIngredients(cake.ingredients);
    setImages(cake.images);
  }, [cake]);

  return (
    <>
      <Modal open={isOpen} onClose={handleClose}>
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
