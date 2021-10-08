import { FC } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface ITypoPara {
  txt: string | number;
  size?: string;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  margin?: string;
  color?: string;
  dotted?: boolean,
  cls?: any
  isInherit?: boolean;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p',
  weight?: number;
  style?: {[key: string]: string}
}

export const TypoPara: FC<ITypoPara> = ({ txt, size, align, margin, color, variant,
  dotted, cls, isInherit, weight, style }) => {


  let sz = '1.5rem';
  const al = align || 'left';
  const mg = '0 0 1rem 0';
  let isWrap = false;
  if (dotted === true) {
    isWrap = true;
  }

  // define sizes
  if (size) {
    sz = size
  } else {
    switch (variant) {
      case 'h1':
        sz = '3rem';
        break;
      case 'h2':
        sz = '2.5rem'
        break;
      case 'h3':
        sz = '2rem'
        break;
      case 'h4':
        sz = '1.5rem'
        break;
      case 'h5':
          sz = '1.2rem'
          break;
      default:
        sz = '1.5rem'
    }

  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        ...(color && { color }),
        fontSize: sz,
        margin: margin ? margin : mg
      }
    }),
  );

  const classes = useStyles();

  const additionalStyle = {
    ...style,
    ...(weight && { fontWeight: weight })
  }

  if (!variant || variant === 'p') {

    return (
      <Typography variant="body2" component="p" align={al}
        noWrap={isWrap} style={additionalStyle}
        className={classes.root}
      >
        {txt}
      </Typography>
    )

  }

  return (
    <Typography variant={variant} align={al} 
      noWrap={isWrap} style={additionalStyle}  
      className={classes.root}>
      {txt}
    </Typography>
  )

}

interface IEmptyDataTypo {
  txt: string | number;
}

export const EmptyDataTypo: FC<IEmptyDataTypo> = ({ txt }) => {
  return (
    <Grid item xs={12} container alignItems="center" justifyContent="center"
      style={{ height: '50vh' }} >
      <Typography variant="h2" align="center" >
        {txt}
      </Typography>
    </Grid>
  )
}