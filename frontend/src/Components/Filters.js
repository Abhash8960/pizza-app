import React, { useState } from "react";
import {useDispatch } from "react-redux";
import {
  Button,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { filterPizza } from "../Actions/pizzaAction";

const Filters = () => {
  const dispatch = useDispatch();
  const [searchkey, setSearchkey] = useState("");
  const [category, setCategory] = useState("all");
  return (
    <Container>
      <Grid container mt="20px">
        <Grid item md={6} px="20px">
          <TextField
            placeholder="search Pizza"
            fullWidth
            value={searchkey}
            onChange={(e) => setSearchkey(e.target.value)}
          />
        </Grid>

        <Grid item md={4} px="20px">
          <select
            style={{ padding: "17px" }}
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>all</option>
            <option>veg</option>
            <option>nonveg</option>
          </select>
        </Grid>
        <Grid item md={2}>
          <Button
            className="btn"
            onClick={() => {
              dispatch(filterPizza(searchkey, category));
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Filters;
