// module
import { FC } from 'react';
// comp
import { RocketItem } from '../rocketItem/rocketItem';
import { TypoPara } from '../../shared/comp/typography';
// materail
import { Grid } from '@material-ui/core';
// types
import { ILaunch } from '../../../types/launch';

interface IComp {
  list: ILaunch[]
}

export const RocketList: FC<IComp> = ({ list }) => {

  return (
    <Grid item xs={12} container justifyContent="center" style={{paddingTop: '3rem'}} >
      {
        list.map(el => (
          <Grid item xs={12} key={`${el.flight_number}_${el.mission_id}`}>
            <RocketItem item={el} />
          </Grid>
        ))
      }
    </Grid>
  )
}
