// comp
import { FC, Dispatch, ChangeEvent } from 'react';
import { TState, TAction } from './options';
// material
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

interface IComp {
  state: TState;
  dispatch: Dispatch<TAction>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '90%',
      },
      transform: 'translateY(-1rem)'
    },
  }),
);

export const SearchMenu: FC<IComp> = ({ state, dispatch }) => {

  const classes = useStyles();

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch({type: 'rocketName', payload: e.target.value})
  }

  return (
    <div className={classes.root}>
      <TextField id="standard-basic" label="Rocket Name" fullWidth={true}
        value={state.rocketName.value} onChange={changeHandler}
      />
    </div>
  )
};