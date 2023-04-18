import React, { useEffect, useState } from "react";
import { CakeCard } from "./CakeCard";
import { getCakesData } from "../common/functions";
import { Cake } from "../common/types";
import Grid from "@mui/material/Grid";

export const CakeList = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);

  const fetchData = async () => {
    const cakesData = await getCakesData();
    setCakes(cakesData);
  };

  // Fetch data every 5000ms
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
      <Grid container spacing={2}>
        {cakes
          .filter((cake) => cake.quantity > 0 && cake.onSale)
          .map((cake) => (
            <Grid item xs={12} sm={6} md={4} key={cake._id}>
              <CakeCard {...cake} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};
