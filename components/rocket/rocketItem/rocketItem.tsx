/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
// module
import { FC } from 'react';
import Link from 'next/link';
// material
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Grid, Card, CardActionArea, CardActions, CardContent, Chip,
  Button, IconButton
} from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import RedditIcon from '@material-ui/icons/Reddit';
import DescriptionIcon from '@material-ui/icons/Description';
// type
import { ILaunch } from '../../../types/launch';
import { TypoPara } from '../../shared/comp/typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 800,
      margin: '0 auto',
      marginBottom: '2.5rem',
      // padding: '1rem 0'
    },
    mediaContainer: {
      display: 'block',
      padding: '1rem 0'
    },
    media: {
      // width: 140,
      // maxHeight: 120,
      display: 'block',
      width: '65%',
      margin: '0 auto',
      [theme.breakpoints.down('md')]: {
        width: '70%'
      },
      [theme.breakpoints.down('sm')]: {
        width: '75%'
      }
    },
    chipRoot: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      marginBottom: '1.5rem',
      '& > *': {
        height: '2.5rem',
        marginRight: '0.5rem'
      },
    },
    cardAction: {
      marginRight: '2rem',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      '& > *': {
        transform: 'scale(1.2)'
      },
    }
  }),
);

interface IComp {
  item: ILaunch
}

export const RocketItem: FC<IComp> = ({ item }) => {
  const classes = useStyles();

  const dateFormat = (dt: Date): string => {
    const monthArr=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = dt.getDate();
    var m = monthArr[dt.getMonth()];
    var y = dt.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + ' ' + m + ', ' + y;
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Grid item xs={12} container >

          <Grid item xs={4} sm={3} className={classes.mediaContainer} >
            <img src={item.links.mission_patch_small || '/images/mission.jpg'}
              className={classes.media} alt={item.mission_name} />
          </Grid>

          <Grid item xs={8} sm={9} >
            <CardContent style={{padding: '1.5rem'}}>
              <TypoPara txt={dateFormat(new Date(item.launch_date_utc))} 
              size="1rem" isInherit={true} />
              <TypoPara txt={item.mission_name} variant="h2" size="1.8rem" />
              <div className={classes.chipRoot}>
                { item.upcoming && <Chip label="Upcoming" /> }
                <Chip label={item.rocket.rocket_name} />
                { item.rocket.first_stage.cores[0].landing_type && 
                  <Chip label={item.rocket.first_stage.cores[0].landing_type} /> 
                }
                { item.rocket.second_stage.payloads[0].orbit && 
                  <Chip label={item.rocket.second_stage.payloads[0].orbit} /> 
                }
                { item.rocket.second_stage.payloads[0].payload_type && 
                  <Chip label={item.rocket.second_stage.payloads[0].payload_type} /> 
                }
                
              </div>

              {
                item.launch_site.site_name &&
                <TypoPara txt={`Launch site: ${item.launch_site.site_name}`} 
                  size="1.1rem" isInherit={true}
                />
              }

              {
                item.details &&
                <TypoPara txt={item.details} dotted={true}
                  size="1.1rem" isInherit={true}
                />
              }

            </CardContent>
          </Grid>

        </Grid>
      </CardActionArea>
      <CardActions className={classes.cardAction} >
        {
          item.links.video_link &&
          <Link passHref={false} href={item.links.video_link} >
            <IconButton size="medium">
            <YouTubeIcon />
          </IconButton>
          </Link>
        }
        {
          item.links.reddit_campaign &&
          <Link passHref={false} href={item.links.reddit_campaign} >
            <IconButton size="medium">
            <RedditIcon />
          </IconButton>
          </Link>
        }
        {
          item.links.article_link &&
          <Link passHref={false} href={item.links.article_link} >
            <IconButton size="medium">
            <DescriptionIcon />
          </IconButton>
          </Link>
        }

      </CardActions>
    </Card>
  );
}
