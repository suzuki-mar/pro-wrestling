import { ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { TPicture } from 'app/albums';
import { ImageElement } from './ImageElement';

type Props = {
  pictures: TPicture[];
};

export const PictureList: React.VFC<Props> = ({ pictures }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList rowHeight={160} className={classes.imageList} cols={2}>
        {pictures.map((picture) => (
          <ImageListItem key={picture.fileName.name} cols={1}>
            {/* サムネのサイズを使うと説明部分の幅と合わなくなってしまう */}
            <ImageElement picture={picture} isThumbnailURL={false} />
            <ImageListItemBar
              title={picture.displayInfo.formattedDisplayString()}
              subtitle={<span>by: {picture.displayInfo.contributor.displayName}</span>}
              position="bottom"
            />
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
