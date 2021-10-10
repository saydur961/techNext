// comp
import { useState, useEffect, FC, Dispatch } from 'react';
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

  const [txt, setTxt] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const delaying = setTimeout(() => {
      dispatch({type: 'rocketName', payload: txt});
    }, 1000)

    return () => clearTimeout(delaying)
  }, [txt, dispatch])

  // const changeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
  //   dispatch({type: 'rocketName', payload: e.target.value});
  // }

  return (
    <div className={classes.root}>
      <TextField id="standard-basic" label="Rocket Name" fullWidth={true}
        value={txt} onChange={e=> setTxt(e.target.value)}
      />
    </div>
  )
};