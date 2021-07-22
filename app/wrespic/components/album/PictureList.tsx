import { ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { TPicture } from 'app/wrespic';
import { ImageElement } from './ImageElement';

type Props = {
  pictures: TPicture[];
};

export const PictureList: React.VFC<Props> = ({ pictures }) => {
  const classes = useStyles();

  console.log(pictures[0]?.source.contributor);

  return (
    <div className={classes.root}>
      <ImageList rowHeight={160} className={classes.imageList} cols={2}>
        {pictures.map((picture) => (
          <ImageListItem key={picture.fileName} cols={1}>
            <ImageElement picture={picture} />
            <ImageListItemBar
              title={picture.displayName()}
              subtitle={<span>by: {picture.source.contributor}</span>}
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
