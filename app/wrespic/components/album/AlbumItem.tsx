import { Carousel } from 'react-responsive-carousel';
import { IAlbum } from 'app/wrespic';
import { PictureList } from './PictureList';

type Props = {
  album: IAlbum;
};

export const AlbumItem: React.VFC<Props> = ({ album }) => {
  let items: JSX.Element[] = [];
  items = album.pictures().map((picture) => {
    return (
      <div key={picture.fileName}>
        <img className={'text-left'} src={picture.urlStr} alt={picture.fileName} />
        <p className="legend">{album.pictures()[0]!.fileName}</p>
      </div>
    );
  });

  return (
    <>
      <Carousel
        className="mx-auto mb-4 border-2 w-auto"
        dynamicHeight={true}
        autoPlay={true}
        interval={3000}
        thumbWidth={50}
        infiniteLoop={true}
        showThumbs={false}
      >
        {items}
      </Carousel>

      <PictureList pictures={album.pictures()} />
    </>
  );
};
