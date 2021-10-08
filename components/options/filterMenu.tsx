// comp
import { useState, FC, Dispatch, ChangeEvent } from 'react';
import { TState, TAction, launchDateType, launchStatusType } from './options';
import { DialogComp } from '../shared/dialog/dialog';
// material
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio }
  from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

interface IComp {
  state: TState;
  dispatch: Dispatch<TAction>;
}

const labelStyle = {
  fontSize: '1.4rem', marginBottom: '1rem'
}

export const FilterMenu : FC<IComp> = ({ state, dispatch }) => {

  const [open, setOpen] = useState(false);

  const classes = useStyles();


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dateHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as launchDateType;
    dispatch({ type: 'launchDateFilter', payload: value })
  };

  const statusHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as launchStatusType;
    dispatch({ type: 'launchStatusFilter', payload: value })
  };



  return (
    <div>
      <Button
        variant="outlined"
        color="default"
        className={classes.button}
        startIcon={<FilterListIcon />}
        onClick={handleClickOpen}
      >
        Filters
      </Button>

      <DialogComp open={open} handleClose={handleClose} title="Filter" >
        <Grid item xs={12} container style={{width: '90rem'}} >

          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel style={labelStyle} 
              component="legend"> Launch Date </FormLabel>
              <RadioGroup aria-label="filter" name="filter1" 
              value={state.launchDateFilter.value} onChange={dateHandleChange}>
                <FormControlLabel value="Last Week" control={<Radio />} label="Last Week" />
                <FormControlLabel value="Last Month" control={<Radio />} label="Last Month" />
                <FormControlLabel value="Last Year" control={<Radio />} label="Last Year" />
                <FormControlLabel value="Any Time" control={<Radio />} label="Any Time" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel style={labelStyle} 
              component="legend"> Launch Status </FormLabel>
              <RadioGroup aria-label="gender" name="gender1" 
              value={state.launchStatusFilter.value} onChange={statusHandleChange}>
                <FormControlLabel value="Success" control={<Radio />} label="Success" />
                <FormControlLabel value="Failure" control={<Radio />} label="Failure" />
                <FormControlLabel value="Any" control={<Radio />} label="Any" />
              </RadioGroup>
            </FormControl>
          </Grid>

        </Grid>
      </DialogComp>
    </div>
  )
}
