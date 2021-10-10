// module
import { useState, useCallback, useRef, UIEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// redux
import { RootState } from '../redux/store';
import { fetchLaunchList, clearList } from '../redux/features/launchListSlice';
// comp
import { Options } from '../components/options/options';
import { RocketList } from '../components/rocket/rocketList/rocketList';
// material
import { Grid, Typography } from '@material-ui/core';
import { GridWrapper } from '../components/layout/gridWrapper';
import { Progress } from '../components/shared/progress/progress';
import { TypoPara } from '../components/shared/comp/typography';

export const LIMIT_DOC = 10;

export default function Home() {

  const [currentPage, setCurrentPage] = useState(1);
  const observer = useRef<null | IntersectionObserver>(null);
  const url = useRef<string | null>(null);
  const launchList = useSelector((state: RootState) => state.launchList);
  const dispatch = useDispatch();

  const lastSectionRef = useCallback(node => {

    if (launchList.status !== 'success') return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && launchList.lastDocLen === LIMIT_DOC &&
        url.current
      ) {

        const offset = currentPage * LIMIT_DOC;
        const newUrl = `${url.current}&offset=${offset}`;
        dispatch(fetchLaunchList(newUrl));
        setCurrentPage(prev => prev + 1);
      }
    });

    if (node) {
      observer.current.observe(node);
    }


  }, [launchList.status, launchList.lastDocLen, dispatch, currentPage]);

  // console.log(launchList);

  const handleUrl = (newUrl: string) => {
    console.log(newUrl);
    url.current = newUrl;
    dispatch(clearList());
    dispatch(fetchLaunchList(newUrl))
  }

  return (
    <GridWrapper>
      <Grid item xs={12} style={{marginTop: '3rem'}} >
        <Options handleUrl={handleUrl} />
      </Grid>

      {
        launchList.list.length === 0 && launchList.status !== 'loading' &&
        <Typography align="center" variant="h2" style={{ margin: '10rem 0 0 0' }} >
          No items
        </Typography>
      }
      <RocketList list={launchList.list} />

      <div style={{ transform: 'translateY(-3rem)' }} ref={lastSectionRef} > </div>


      {
        launchList.status === 'loading' &&
        <Progress size="8rem" height={20} />
      }

    </GridWrapper>
  )
}
