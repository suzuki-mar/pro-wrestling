import { TPicture } from 'app/wrespic';

type Props = {
  className?: string;
  picture: TPicture;
};

export const ImageElement: React.VFC<Props> = ({ className, picture }) => {
  if (className === undefined) {
    className = '';
  }

  return (
    <img
      className={className}
      src={picture.pictureURL.originalURL}
      alt={picture.displayInfo.formattedDisplayString()}
    />
  );
};
