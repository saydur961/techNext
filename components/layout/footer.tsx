import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#808080',
      height: '30vh',
      maxHeight: '30rem',
      marginTop: '10rem'
    }
  }),
);

export const Footer = () => {

  const classes = useStyles();

  return (
    <Grid className={classes.root} >
      footer
    </Grid>
  )
}
