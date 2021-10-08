import { FC } from 'react';
import Image from 'next/image';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mediaWrapper: {
      display: "flex",
      justifyContent: "center",
    },
    media: {
      // height: 0,
      // paddingTop: '56.25%', // 16:9
      // maxWidth: '20%',
      display: 'block !important',
      margin: 'auto',

      color: 'red !important'

    },
  }),
);

interface IComp {
  src: string;
  wd?: number;
  ht?: number;
  alt: string;
  wrapperStyle?: any;
  mediaStyle?: any;
}


export const NextImage: FC<IComp> = ({src, wd, ht, wrapperStyle, mediaStyle, alt}) => {

  const classes = useStyles();

  const width = wd || 40;
  const height = ht || 40;

  return (
    <div className={[classes.mediaWrapper, wrapperStyle].join(' ')}>
      <Image className={[classes.media, mediaStyle].join(' ')}
        src={src}
        width={width}
        height={height}
        alt={alt}
      />
    </div>
  )
}