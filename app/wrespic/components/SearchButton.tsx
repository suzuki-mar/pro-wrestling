// デフォルト呼び出しをするようにコンパイルで警告がでるがデフォルト呼び出しをするとReact側のエラーになってしまう
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import { findContextValue, WrespicContext } from './Context';
import { useContext } from 'react';
import { IAlbumCollection, ISelectedWrestlers } from 'app/wrespic';

type Props = {
  selectedWrestlers: ISelectedWrestlers;
  albumCollection: IAlbumCollection;
};

export const SearchButton: React.VFC<Props> = ({ selectedWrestlers, albumCollection }) => {
  const contextValue = findContextValue(useContext(WrespicContext));

  const onPress = () => {
    contextValue.album.setIsLoadingComplete(true);
    const name = selectedWrestlers.names()[0]!;
    albumCollection.changeCurrentDisplayAlbum(name);
    contextValue.album.setCurrentDisplayAlbum(albumCollection.currentDisplayAlbum());
  };

  return (
    <div>
      <AwesomeButton
        type="primary"
        disabled={contextValue.wrestler.selectedWrestlerNames.length === 0}
        onPress={onPress}
      >
        検索
      </AwesomeButton>
    </div>
  );
};
