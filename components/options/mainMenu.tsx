// comp
import { FC, Dispatch } from 'react';
import { TState, TAction } from './options';
// materail
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Tabs, Tab, Grid } from '@material-ui/core';

interface IComp {
  state: TState;
  dispatch: Dispatch<TAction>;
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginBottom: '1rem'
  },
}));

export const MainMenu: FC<IComp> = ({ state, dispatch }) => {
  const classes = useStyles();

  const valueRender = () => {
    switch(state.mainOption.value) {
      case 'Recent':
        return 0;
      case 'Upcoming':
        return 1;
      case 'All':
        return 2;
      default:
        return 0;
    }
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    switch(newValue) {
      case 0:
        dispatch({ type: 'mainOption', payload: 'Recent' });
        return;
      case 1:
        dispatch({ type: 'mainOption', payload: 'Upcoming' });
        return;
      case 2:
        dispatch({ type: 'mainOption', payload: 'All' });
        return;
    }
  };

  return (
    <Grid item xs={12} className={classes.root}>
        <Tabs value={valueRender()} onChange={handleChange} 
        aria-label="simple tabs example">
          <Tab style={{padding: 0}} label="Recent" {...a11yProps(0)} />
          <Tab label="Upcoming" {...a11yProps(1)} />
          <Tab label="All" {...a11yProps(2)} />
        </Tabs>
    </Grid>
  );
}
