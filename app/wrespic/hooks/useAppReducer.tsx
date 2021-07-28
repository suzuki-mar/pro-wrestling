import { useReducer, Reducer, Dispatch } from 'react';
import { IWrestlerCollection } from 'app/core/wreslter';
import { ISelectedWrestlers, IAlbumCollection, UIAction } from '..';

export type AppState = {
  isLoadingComplete: boolean;
  selectedWrestlers: ISelectedWrestlers;
  albumCollection: IAlbumCollection;
  wrestlerCollection: IWrestlerCollection;
};

const appReducer: Reducer<AppState, UIAction> = (state, action) => {
  switch (action.type) {
    case 'displayChoice':
      state.albumCollection.filterAlbumsByWrestlerNames(state.selectedWrestlers.names());
      return { ...state, isLoadingComplete: true, albumCollection: state.albumCollection };
    case 'selecteWrestler':
      const name = action.payload.name;

      if (state.selectedWrestlers.isSelected(name)) {
        state.selectedWrestlers.deselect(action.payload.name);
      } else {
        state.selectedWrestlers.select(action.payload.name);
      }

      return { ...state, selectedWrestlers: state.selectedWrestlers };
    default:
      throw new Error('未知のTYPE');
  }
};

export function useAppReducer(
  selectedWrestlers: ISelectedWrestlers,
  albumCollection: IAlbumCollection,
  wrestlerCollection: IWrestlerCollection
): [AppState, Dispatch<UIAction>] {
  const initialState: AppState = {
    isLoadingComplete: false,
    selectedWrestlers: selectedWrestlers,
    albumCollection: albumCollection,
    wrestlerCollection: wrestlerCollection,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);
  return [state, dispatch];
}
