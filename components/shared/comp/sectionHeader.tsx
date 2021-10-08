import { FC } from 'react';
import { Grid } from '@material-ui/core';
import { TypoPara } from './typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hrLine: {
      border: 'none',
      // borderBottom: `0.2rem dashed ${theme.palette.nav.main}`,
      marginBottom: '2rem'
    }
  }),
);

interface IComp {
  mainHeader: string;
  secondHeader: string;
}

export const SectionHeader: FC<IComp> = ({ mainHeader, secondHeader }) => {

  const classes = useStyles();

  return (
    <Grid item xs={12} style={{margin: '4rem 0'}} >
      <div className={classes.hrLine}></div>
      <TypoPara variant="h2" txt={mainHeader} align="center" weight={500} color="#fff"
        margin="3rem 0 0 0"
      />
      <TypoPara variant="h4" txt={secondHeader} align="center" weight={500}
        margin="2rem 0 0 0" style={{letterSpacing: '0.1rem'}}
      />
    </Grid>
  )
}

