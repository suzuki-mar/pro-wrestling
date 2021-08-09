import { IPicture } from 'app/albums';

type Props = {
  className?: string;
  picture: IPicture;
  isThumbnailURL: boolean;
};

export const ImageElement: React.VFC<Props> = ({ className, picture, isThumbnailURL }) => {
  const src = isThumbnailURL
    ? picture.pictureURL().thumbnailURL
    : picture.pictureURL().defaultSizeURL;

  if (className === undefined) {
    className = '';
  }

  return <img className={className} src={src} alt={picture.title()} />;
};
