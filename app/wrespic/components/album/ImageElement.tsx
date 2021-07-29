import { TPicture } from 'app/wrespic';

type Props = {
  className?: string;
  picture: TPicture;
  isThumbnailURL: boolean;
};

export const ImageElement: React.VFC<Props> = ({ className, picture, isThumbnailURL }) => {
  const src = isThumbnailURL ? picture.pictureURL.thumbnailURL : picture.pictureURL.defaultSizeURL;

  if (className === undefined) {
    className = '';
  }

  return <img className={className} src={src} alt={picture.displayInfo.formattedDisplayString()} />;
};
