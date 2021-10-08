import React from 'react';
import { Grid, Typography } from '@material-ui/core';

interface IComp {
  txt?: string;
  txtMargin?: string;
  isFirst?: boolean;
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  fullWidth?: boolean;
}

export const GridWrapper: React.FC<IComp> = ({ children, txt, txtMargin, isFirst,
  spacing, fullWidth }) => {
  const gridMargin = isFirst ? '5rem 0' : '1rem 0 5rem 0';
  const headerMargin = txtMargin || '0 0 2rem 0';
  let rootPadding = fullWidth ? '0': '0 3rem';


  const textRender = () => {
    if (txt) {
      return <Typography align="center" variant="h3" color="inherit"
        style={{ margin: headerMargin, fontSize: '2.2rem' }} >
        {txt}
      </Typography>
    };
    return null;
  }

  return (
    <Grid item xs={12} container spacing={spacing || 1} justifyContent="center"
      style={{ margin: gridMargin, padding: rootPadding}}
      direction="column">
      {textRender()}
      {children}
    </Grid>
  )
}