import { ImageList, ImageListItem } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { TPicture } from 'app/wrespic';

type Props = {
  pictures: TPicture[];
};

export const PictureList: React.VFC<Props> = ({ pictures }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList rowHeight={160} className={classes.imageList} cols={2}>
        {pictures.map((picture) => (
          <ImageListItem key={picture.fileName} cols={1}>
            <img src={picture.urlStr} alt={picture.fileName} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    imageList: {
      width: 500,
      height: 450,
    },
  })
);
