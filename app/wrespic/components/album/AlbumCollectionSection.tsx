import { IAlbum } from 'app/wrespic';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AppState } from '../../hooks/useAppReducer';
import { AlbumItem } from './AlbumItem';

type Props = {
  appState: AppState;
};

export const AlbumCollectionSection: React.VFC<Props> = ({ appState }) => {
  if (!appState.isLoadingComplete) {
    return <div></div>;
  }

  return (
    <Tabs>
      {renderTabList(appState.albumCollection.currentSelectedAlbums())}
      {renderTabPanels(appState.albumCollection.currentSelectedAlbums())}
    </Tabs>
  );
};

function renderTabList(albums: IAlbum[]) {
  const tabNames = albums.map((album) => {
    const str = album.wrestlerName.full;
    return <Tab key={album.wrestlerName}>{str}</Tab>;
  });

  return <TabList>{tabNames}</TabList>;
}

function renderTabPanels(albums: IAlbum[]) {
  const tabPanels = albums.map((album) => {
    return (
      <TabPanel key={album.wrestlerName}>
        <AlbumItem album={album}></AlbumItem>
      </TabPanel>
    );
  });

  return tabPanels;
}
