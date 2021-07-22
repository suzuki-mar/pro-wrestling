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
      <div key={picture.fileName}>
        <ImageElement className="text-left ..." picture={picture} />
        <p className="legend">
          {picture.displayName()} <br />
          by {picture.source.contributor} <br />
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
        thumbWidth={50}
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
