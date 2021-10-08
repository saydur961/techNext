// comp
import { useState, FC, Dispatch } from 'react';
import { TState, TAction, launchDateSortType } from './options';
import { DialogComp } from '../shared/dialog/dialog';
// material
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio }
  from '@material-ui/core';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

const labelStyle = {
  fontSize: '1.4rem', marginBottom: '1rem'
}

interface IComp {
  state: TState;
  dispatch: Dispatch<TAction>;
}

export const SortMenu: FC<IComp> = ({ state, dispatch }) => {

  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dateHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as launchDateSortType;
    dispatch({ type: 'launchDateSort', payload: value })
  };


  return (
    <div>
      <Button
        variant="outlined"
        color="default"
        className={classes.button}
        startIcon={<SortByAlphaIcon />}
        onClick={handleClickOpen}
        disabled={!state.launchDateSort.isEnabled}
      >
        Sort
      </Button>

      <DialogComp open={open} handleClose={handleClose} title="Sort" >
        <Grid item xs={12} container style={{width: '90rem'}} >

          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel style={labelStyle} 
              component="legend"> Launch Date </FormLabel>
              <RadioGroup aria-label="sort" name="sort1" 
              value={state.launchDateSort.value} onChange={dateHandleChange}>
                <FormControlLabel value="Newest" control={<Radio />} label="Newest" />
                <FormControlLabel value="Oldest" control={<Radio />} label="Oldest" />
              </RadioGroup>
            </FormControl>
          </Grid>

        </Grid>
      </DialogComp>

    </div>
  )
}
