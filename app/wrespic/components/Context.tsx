import React, { useState, ReactNode, SetStateAction, Dispatch } from 'react';
import { ISelectedWrestlers, IAlbumCollection, TPicture } from 'app/wrespic';
import { IWrestler, IWrestlerName } from 'app/core/wreslter/index';
import { useAlbmu, useSelectedWrestlers } from 'app/wrespic/states/hooks';

export const WrespicContext = React.createContext({});

type Props = {
  children: ReactNode;
};

export const ContextWrapper: React.VFC<Props> = ({ children }) => {
  const selectedWrestlers = useSelectedWrestlers();

  const [selectedWrestlersList, setSelectedWrestlersList] = useState(selectedWrestlers.names());
  const [_selectedWrestlers] = useState(selectedWrestlers);

  const album = useAlbmu();
  const [pictures, setPictures] = useState(album.albums());

  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const [_album] = useState(album);

  const values = {
    selectedWrestlersList,
    setSelectedWrestlersList,
    _selectedWrestlers,
    pictures,
    setPictures,
    _album,
    isLoadingComplete,
    setIsLoadingComplete,
  };
  return <WrespicContext.Provider value={values}>{children}</WrespicContext.Provider>;
};

type ContextValue = {
  selectedWrestlersList: IWrestler[];
  setSelectedWrestlersList: Dispatch<SetStateAction<IWrestlerName[]>>;
  selectedWrestlers: ISelectedWrestlers;
  pictures: TPicture[];
  setPictures: Dispatch<React.SetStateAction<TPicture[]>>;
  album: IAlbumCollection;
  isLoadingComplete: boolean;
  setIsLoadingComplete: Dispatch<React.SetStateAction<Boolean>>;
};

// Reactの規約としてuseContextはここでは使用できないので引数に渡している
export function findValuesFromContext(context: {}): ContextValue {
  return {
    selectedWrestlersList: context['selectedWrestlersList'] as IWrestler[],
    setSelectedWrestlersList: context['setSelectedWrestlersList'] as Dispatch<
      SetStateAction<IWrestlerName[]>
    >,
    selectedWrestlers: context['_selectedWrestlers'] as ISelectedWrestlers,
    pictures: context['pictures'] as TPicture[],
    setPictures: context['setPictures'] as Dispatch<React.SetStateAction<TPicture[]>>,
    album: context['album'] as IAlbumCollection,
    isLoadingComplete: context['isLoadingComplete'] as boolean,
    setIsLoadingComplete: context['setIsLoadingComplete'] as Dispatch<
      React.SetStateAction<Boolean>
    >,
  };
}
