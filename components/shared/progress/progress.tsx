import { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }),
);

interface IComp {
  size?: string;
  thick?: number;
  height?: number;
}

export const Progress: FC<IComp> = ({size, thick, height}) => {
  const classes = useStyles();

  const sz = size || '12rem';
  const thk = thick || 2.5;
  let ht = '80vh';
  if(height) {
    ht = `${height}vh`
  }

  return (
    <div style={{height: ht}} className={classes.root}>
      <CircularProgress size={sz} thickness={thk} color="primary" />
    </div>
  );
}
