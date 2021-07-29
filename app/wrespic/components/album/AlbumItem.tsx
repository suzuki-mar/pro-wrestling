import { Carousel } from 'react-responsive-carousel';
import { IAlbum } from 'app/wrespic';
import { PictureList } from './PictureList';
import { ImageElement } from './ImageElement';

type Props = {
  album: IAlbum;
};

export const AlbumItem: React.VFC<Props> = ({ album }) => {
  let items: JSX.Element[] = [];
  items = album.pictures().map((picture) => {
    return (
      <div key={picture.fileName.name}>
        <ImageElement className="text-left ..." isThumbnailURL={false} picture={picture} />
        <p className="legend">
          {picture.displayInfo.formattedDisplayString()} <br />
          by {picture.displayInfo.contributor.displayName}(
          {picture.displayInfo.contributor.identificationName}) <br />
        </p>
      </div>
    );
  });

  return (
    <>
      <Carousel
        className="mx-auto mb-4 border-2 w-auto"
        dynamicHeight={true}
        autoPlay={true}
        interval={5000}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
      >
        {items}
      </Carousel>

      <PictureList pictures={album.pictures()} />
    </>
  );
};
