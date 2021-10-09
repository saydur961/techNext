// module
import { useReducer, useEffect, FC, Dispatch, SetStateAction } from 'react';
// comp
import { MainMenu } from './mainMenu';
import { SearchMenu } from './searchMenu';
import { FilterMenu } from './filterMenu';
import { SortMenu } from './sortMenu';
// material 
import { Grid } from '@material-ui/core';
// utils
import { getDate } from '../../utils/getDate';
import { LIMIT_DOC } from '../../pages/index';

const BASE_API_URL = 'https://api.spacexdata.com/v3/launches';

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
  launchDateSort: { hasValue: true, isEnabled: false, value: 'Newest' }
}

interface IComp {
  // setUrl: Dispatch<SetStateAction<string>> 
  handleUrl: (newUrl: string) => void
}

export const Options: FC<IComp> = ({ handleUrl }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  // console.log(state);

  useEffect(() => {

    let url = `${BASE_API_URL}?limit=${LIMIT_DOC}`;

    // check mainOption
    if(state.mainOption.hasValue) {
      switch(state.mainOption.value) {
        case 'All':
          url = url;
          break;
        case 'Recent':
          url = `${url}&sort=launch_date_utc&order=desc`;
          break;
        case 'Upcoming':
          url = `${BASE_API_URL}/upcoming?limit=${LIMIT_DOC}`;
          break;
      }
    }

    // check rocketName
    if(state.rocketName.hasValue) {
      const rcktName = state.rocketName.value.split(' ').join('+')
      url = `${url}&rocket_name=${rcktName}`
    }

    // check launchDateFilter
    if(state.launchDateFilter.hasValue) {
      let endDate: string|null = null;
      switch(state.launchDateFilter.value) {
        case 'Last Week':
          endDate = getDate('prev_week');
          break;
        case 'Last Month':
          endDate = getDate('prev_month');
          break;
        case 'Last Year':
          endDate = getDate('prev_year');
          break;
      }
      if(endDate) {
        console.log(endDate);
        // with start it not working
        // url = `${url}&start=${getDate('current')}&end=${endDate}` 
        url = `${url}&end=${endDate}`
      }
    }

    // check launchStatusFilter
    if(state.launchStatusFilter.hasValue) {
      const isSuccess = state.launchStatusFilter.value === 'Success';
      url = `${url}&launch_success=${isSuccess}`;
    }

    // check launchDateSort
    if(state.launchDateSort.isEnabled && state.launchDateSort.hasValue) {
      const sortType = state.launchDateSort.value === 'Newest' ? 'desc': 'asc';
      url = `${url}&sort=launch_date_utc&order=${sortType}`;
    }

    handleUrl(url);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

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

