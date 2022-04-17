import { useState } from "react";
import { Button, Grid, Paper, Stack, TextField } from "@mui/material";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { addPizza } from "../../Actions/pizzaAction";

const AddNewPizza = () => {
  const [name, setName] = useState("");
  const [small, setSmall] = useState();
  const [medium, setMedium] = useState();
  const [large, setLarge] = useState();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const addPizzaState = useSelector((state) => state.addPizzaReducer);
  const { loading, error } = addPizzaState;
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    const pizza = {
      name,
      image,
      description,
      category,
      prices: {
        small,
        medium,
        large,
      },
    };
    dispatch(addPizza(pizza));
  };

  return (
    <>
      {loading && <Loading />}
      {error && <h1>Something went wrong</h1>}
      <Grid className="regfullPage">
        <Paper elevation={20} className="regform">
          <form onSubmit={submitForm}>
            <Stack spacing={3}>
              <TextField
                label="Name"
                placeholder="Enter Pizza Name"
                fullWidth
                required
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Grid container>
                <Grid item md={4} px="5px">
                  <TextField
                    label="Small"
                    placeholder="Enter Small Pizza Price"
                    fullWidth
                    required
                    variant="standard"
                    value={small}
                    onChange={(e) => setSmall(e.target.value)}
                  />
                </Grid>

                <Grid item md={4} px="5px">
                  <TextField
                    label="Medium"
                    placeholder="Enter Medium Pizza Price"
                    fullWidth
                    required
                    variant="standard"
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                  />
                </Grid>

                <Grid item md={4} px="5px">
                  <TextField
                    label="Large"
                    placeholder="Enter Large Pizza Price"
                    fullWidth
                    required
                    variant="standard"
                    value={large}
                    onChange={(e) => setLarge(e.target.value)}
                  />
                </Grid>
              </Grid>

              <TextField
                label="Image"
                placeholder="Enter image Address"
                fullWidth
                required
                variant="standard"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

              <TextField
                label="Description"
                placeholder="Enter Pizza Description"
                fullWidth
                required
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <TextField
                label="Category"
                placeholder="Enter Pizza Category"
                fullWidth
                required
                variant="standard"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <Button className="btn" type="submit">
                Add New Pizza
              </Button>
            </Stack>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default AddNewPizza;
