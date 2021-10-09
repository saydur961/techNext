// module
import { useState } from 'react';
// comp
import { Options } from '../components/options/options';
// material
import { Grid } from '@material-ui/core';
import { GridWrapper } from '../components/layout/gridWrapper';

export default function Home() {

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <GridWrapper>
      <Grid item xs={12} >
        <Options />
      </Grid>
    </GridWrapper>
  )
}
