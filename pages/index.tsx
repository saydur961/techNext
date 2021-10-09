// module
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// redux
import { RootState } from '../redux/store';
import { fetchLaunchList, clearList } from '../redux/features/launchListSlice';
// comp
import { Options } from '../components/options/options';
import { RocketList } from '../components/rocket/rocketList/rocketList';
// material
import { Grid } from '@material-ui/core';
import { GridWrapper } from '../components/layout/gridWrapper';

export const LIMIT_DOC = 10;

export default function Home() {

  const [currentPage, setCurrentPage] = useState(1);
  // const [url, setUrl] = useState<string|null>(null);
  const url = useRef<string|null>(null);
  const launchList = useSelector((state: RootState) => state.launchList);
  const dispatch = useDispatch();

  console.log(launchList);

  const handleUrl = (newUrl: string) => {
    console.log(newUrl);
    url.current = newUrl;
    dispatch(clearList());
    dispatch(fetchLaunchList(newUrl))
  }

  return (
    <GridWrapper>
      <Grid item xs={12} >
        <Options handleUrl={handleUrl} />
      </Grid>

      <RocketList list={launchList.list} />

    </GridWrapper>
  )
}
