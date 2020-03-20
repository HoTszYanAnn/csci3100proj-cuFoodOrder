import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RestaurantCard from './RestaurantCard.js';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export default function CenteredGrid() {
  const classes = useStyles();
  const numbers =[1,2,3,4,5,6,7,8,9];
  const cardItems = numbers.map((number) =>
      <Grid item xs={4}>
          <RestaurantCard/>
        </Grid>
  )
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {cardItems}
      </Grid>
    </div>
  );
}
