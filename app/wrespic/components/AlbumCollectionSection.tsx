import { findContextValue, WrespicContext } from './Context';
import { Carousel } from 'react-responsive-carousel';
import { useContext } from 'react';
import { IAlbumCollection } from 'app/wrespic';

type Props = {
  albumCollection: IAlbumCollection;
};

export const AlbumCollectionSection: React.VFC<Props> = ({ albumCollection }) => {
  const contextValue = findContextValue(useContext(WrespicContext));

  const album = contextValue.album.currentDisplayAlbum;

  let items: JSX.Element[] = [];
  if (contextValue.album.isLoadingComplete) {
    items = album.pictures().map((picture) => {
      return (
        <div>
          <img src={picture.urlStr} alt={picture.fileName} />
          <p className="legend">{album.pictures()[0]!.fileName}</p>
        </div>
      );
    });
  }

  return (
    <Carousel width={200} dynamicHeight={true}>
      {items}
    </Carousel>
  );
};
