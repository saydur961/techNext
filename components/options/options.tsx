// module
import { useReducer } from 'react';
// comp
import { MainMenu } from './mainMenu';
import { SearchMenu } from './searchMenu';
import { FilterMenu } from './filterMenu';
import { SortMenu } from './sortMenu';
// material 
import { Grid } from '@material-ui/core';

const BASE_API_URL = 'test.com';

// ================== define types of state property ==================
export enum StateProperty {
  topic = 'topic',
  categories = 'categories',
  title = 'title',
  // subTitle = 'subTitle',
  takeTime = 'takeTime',
  previewImage = 'previewImage',
  imgFile = 'imgFile',
  blog = 'blog'
}

type valueType = { hasValue: boolean };
type requiredType = { isEnabled: boolean; hasValue: boolean };

type mainOptionType = 'Recent' | 'Upcoming' | 'All';
export type launchDateType = 'Last Week' | 'Last Month' | 'Last Year'| 'Any Time';
export type launchStatusType = 'Success' | 'Failure'| 'Any';
export type launchDateSortType = 'Newest' | 'Oldest'

export type TState = {
  mainOption: valueType & { value: mainOptionType; };
  rocketName: valueType & { value: string; };
  launchDateFilter: valueType & { value: launchDateType };
  launchStatusFilter: valueType & { value: launchStatusType };
  launchDateSort: requiredType & { value: launchDateSortType; }
}

export type TAction =
  | { type: 'mainOption', payload: mainOptionType }
  | { type: 'rocketName', payload: string }
  | { type: 'launchDateFilter', payload: launchDateType }
  | { type: 'launchStatusFilter', payload: launchStatusType }
  | { type: 'launchDateSort', payload: launchDateSortType }


// ================= reducer ===============
const reducer = (state: TState, action: TAction): TState => {
  switch (action.type) {

    // =================== mainOption handle
    case 'mainOption':
      return {
        ...state,
        mainOption: { hasValue: action.payload ? true : false, value: action.payload },
        launchDateSort: {
          ...state.launchDateSort,
          isEnabled: action.payload !== 'Recent'
        }
      };

    // =================== rocketName handle
    case 'rocketName':
      return {
        ...state,
        rocketName: { hasValue: action.payload ? true : false, value: action.payload }
      };
    // =================== launchDateFilter 
    case 'launchDateFilter':
      return {
        ...state,
        launchDateFilter: { 
          hasValue: !action.payload || action.payload === 'Any Time' ? false : true, 
          value: action.payload 
        }
      }
    // =================== launchStatusFilter 
    case 'launchStatusFilter':
      return {
        ...state,
        launchStatusFilter: { 
          hasValue: !action.payload || action.payload === 'Any' ? false : true, 
          value: action.payload 
        }
      }
    // =================== launchStatusFilter 
    case 'launchDateSort':
      return {
        ...state,
        launchDateSort: {
          isEnabled: state.mainOption.value !== 'Recent',
          hasValue: action.payload ? true : false,
          value: action.payload
        }
      }

    default:
      return state;

  }
}

// ================= initial state ===============
const initialState: TState = {
  mainOption: { hasValue: true, value: 'Recent' },
  rocketName: { hasValue: false, value: '' },
  launchDateFilter: { hasValue: false, value: 'Any Time' },
  launchStatusFilter: { hasValue: false, value: 'Any' },
  launchDateSort: { hasValue: false, isEnabled: false, value: 'Newest' }
}

export const Options = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  return (
    <Grid item xs={12} container >
      <MainMenu state={state} dispatch={dispatch} />
      <Grid item xs={12} sm={6} md={8} >
        <SearchMenu state={state} dispatch={dispatch} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} container >
        <FilterMenu state={state} dispatch={dispatch} />
        <SortMenu state={state} dispatch={dispatch} />
      </Grid>
    </Grid>
  )
}

