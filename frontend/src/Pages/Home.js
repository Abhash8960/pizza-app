import { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import Pizza from "../Components/Pizza";

import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../Actions/pizzaAction";
import Loading from "../Components/Loading";
import Filters from "../Components/Filters";

const Home = () => {
  const dispatch = useDispatch();
  const pizzastate = useSelector((state) => state.getAllPizzaReducer);
  const { loading, pizzas, error } = pizzastate;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : error ? (
        <h1>Error while fetch</h1>
      ) : (
        <Grid container>
          <Filters mt="10px" />
          {pizzas.map((pizza) => {
            return (
              <Grid item md={4} sm={6} xs={12} key={pizza._id}>
                <Pizza pizza={pizza} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
