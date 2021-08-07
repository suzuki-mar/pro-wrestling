import { useReducer, Reducer, Dispatch } from 'react';
import { IWrestlerCollection, ISelectedWrestlers, WrestlersAppState } from 'app/wreslters';
import { AlbumAppState, IAlbumCollection, UIAction } from '..';

export type AppState = AlbumAppState & WrestlersAppState;

const appReducer: Reducer<AppState, UIAction> = (state, action) => {
  switch (action.type) {
    case 'displayChoice':
      state.albumCollection.filterAlbumsByWrestlerNames(state.selectedWrestlers.names());
      return { ...state, albumCollection: state.albumCollection };
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
    selectedWrestlers: selectedWrestlers,
    albumCollection: albumCollection,
    wrestlerCollection: wrestlerCollection,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);
  return [state, dispatch];
}
