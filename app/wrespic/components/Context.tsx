import React, { useState, ReactNode, SetStateAction, Dispatch } from 'react';
import { ISelectedWrestlers, IAlbumCollection, IAlbum } from 'app/wrespic';
import { IWrestlerName } from 'app/core/wreslter/index';

export const WrespicContext = React.createContext({});

type Props = {
  children: ReactNode;
  selectedWrestlers: ISelectedWrestlers;
  albumCollection: IAlbumCollection;
};

export const ContextWrapper: React.VFC<Props> = ({
  children,
  selectedWrestlers,
  albumCollection,
}) => {
  const [selectedWrestlerNames, setSelectedWrestlerNames] = useState(selectedWrestlers.names());
  const [currentDisplayAlbum, setCurrentDisplayAlbum] = useState(
    albumCollection.currentDisplayAlbum()
  );
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const wrestler = {
    selectedWrestlerNames: selectedWrestlerNames,
    setSelectedWrestlerNames: setSelectedWrestlerNames,
  };

  const album = {
    currentDisplayAlbum: currentDisplayAlbum,
    setCurrentDisplayAlbum,
    isLoadingComplete: isLoadingComplete,
    setIsLoadingComplete: setIsLoadingComplete,
  };

  const values = {
    wrestler,
    album,
  };
  return <WrespicContext.Provider value={values}>{children}</WrespicContext.Provider>;
};

type ContextValue = {
  wrestler: {
    selectedWrestlerNames: IWrestlerName[];
    setSelectedWrestlerNames: Dispatch<SetStateAction<IWrestlerName[]>>;
  };

  album: {
    currentDisplayAlbum: IAlbum;
    setCurrentDisplayAlbum: Dispatch<React.SetStateAction<IAlbum>>;
    isLoadingComplete: boolean;
    setIsLoadingComplete: Dispatch<React.SetStateAction<Boolean>>;
  };
};

// Reactの規約としてuseContextはここでは使用できないので引数に渡している
export function findContextValue(context: {}): ContextValue {
  return {
    wrestler: {
      selectedWrestlerNames: context['wrestler']['selectedWrestlerNames'] as IWrestlerName[],
      setSelectedWrestlerNames: context['wrestler']['setSelectedWrestlerNames'] as Dispatch<
        SetStateAction<IWrestlerName[]>
      >,
    },

    album: {
      isLoadingComplete: context['album']['isLoadingComplete'] as boolean,
      setIsLoadingComplete: context['album']['setIsLoadingComplete'] as Dispatch<
        React.SetStateAction<Boolean>
      >,
      currentDisplayAlbum: context['album']['currentDisplayAlbum'] as IAlbum,
      setCurrentDisplayAlbum: context['album']['setCurrentDisplayAlbum'] as Dispatch<
        React.SetStateAction<IAlbum>
      >,
    },
  };
}
