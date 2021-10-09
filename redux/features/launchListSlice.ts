import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// types
import { ILaunch } from '../../types/launch';
// utils
import { fetchApi } from '../../utils/fetch';

export interface launchState {
  status: 'success'| 'loading'| 'fail';
  list: ILaunch[];
  // currentPage: number;
}

const initialState: launchState = {
  status: 'loading',
  list: [],
  // currentPage: 1
}

export const fetchLaunchList = createAsyncThunk(
  'launch/fetchAll',
  async (url: string, { rejectWithValue }) => {
    try {
      const response = await fetchApi(url, 'GET');
      if(!response.ok) {
        throw new Error('Failed to fetch');
      }
      return await response.json();
    } catch(err) {
      return rejectWithValue(err.message || 'error');
    }
  }
)

export const launchSlice = createSlice({
  name: 'launchList',
  initialState,
  extraReducers: builder => {
    builder
    .addCase(fetchLaunchList.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(fetchLaunchList.fulfilled, (state, action) => {
      const newData: ILaunch[] = action.payload;
      state.status = 'success';
      // console.log(action);
      // state.list = [...state.list, ...newData];
      state.list = [...newData];
    })
    .addCase(fetchLaunchList.rejected, (state, action) => {
      state.status = 'fail';
    })
  },
  reducers: {
    clearList: (state) => {
      state.list = [];
    }
  }
});

export const { clearList } = launchSlice.actions;

export const launchListReducer = launchSlice.reducer;