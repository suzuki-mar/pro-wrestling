import { IAlbum } from 'app/albums';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AppState } from '../hooks/useAppReducer';
import { AlbumItem } from './AlbumItem';

type Props = {
  appState: AppState;
};

export const AlbumCollectionSection: React.VFC<Props> = ({ appState }) => {
  return (
    <Tabs>
      {renderTabList(appState.albumCollection.currentSelectedAlbums())}
      {renderTabPanels(appState.albumCollection.currentSelectedAlbums())}
    </Tabs>
  );
};

function renderTabList(albums: IAlbum[]) {
  const tabNames = albums.map((album) => {
    return <Tab key={album.title()}>{album.title()}</Tab>;
  });

  return <TabList>{tabNames}</TabList>;
}

function renderTabPanels(albums: IAlbum[]) {
  const tabPanels = albums.map((album) => {
    return (
      <TabPanel key={album.title()}>
        <AlbumItem album={album}></AlbumItem>
      </TabPanel>
    );
  });

  return tabPanels;
}
