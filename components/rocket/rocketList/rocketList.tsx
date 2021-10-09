/* eslint-disable @next/next/no-img-element */
// module
import { FC } from 'react';
// comp
import { NextImage } from '../../shared/nextImage/nextImage';
import { TypoPara } from '../../shared/comp/typography';
// materail
import { Grid } from '@material-ui/core';
// types
import { ILaunch } from '../../../types/launch';

interface IComp {
  list: ILaunch[]
}

export const RocketList: FC<IComp> = ({ list }) => {

  console.log(list)

  const renderComp = () => {
    return list.map(el => (
      <Grid key={`${el.flight_number}_${el.mission_id}`} item xs={12} container >
        <Grid item xs={4} sm={3} >
          <img src={el.links.mission_patch_small} style={{width: '98%'}} alt={el.mission_name} />
        </Grid>
        <Grid item xs={8} sm={9} container>
          <TypoPara txt={el.mission_name} variant="h3" />
        </Grid>
      </Grid>
    ))
  }

  return (
    <Grid item xs={12} container >
      {renderComp()}
    </Grid>
  )
}
