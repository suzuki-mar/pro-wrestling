import { useReducer, Reducer, Dispatch } from 'react';
import { TWrestlerName } from 'app/core/wreslter';
import { ISelectedWrestlers, IAlbumCollection, IFavoriteWrestlers, TSource } from '..';

export type AppState = {
  isLoadingComplete: boolean;
  selectedWrestlers: ISelectedWrestlers;
  albumCollection: IAlbumCollection;
  favoriteWrestlers: IFavoriteWrestlers;
};

export type Action =
  | {
      type: 'selecteWrestler';
      payload: { name: TWrestlerName };
    }
  | {
      type: 'deslecteWrestler';
      payload: { name: TWrestlerName };
    }
  | {
      type: 'searchPicture';
    };

export const appStatusReducer: Reducer<AppState, Action> = (state, action) => {
  switch (action.type) {
    case 'searchPicture':
      const sources: TSource[] = state.selectedWrestlers.filterFromSelected();
      state.albumCollection.buildFromSources(sources);
      state.albumCollection.changeCurrentDisplayAlbum(state.selectedWrestlers.names()[0]!);
      return { ...state, isLoadingComplete: true, albumCollection: state.albumCollection };
    case 'selecteWrestler':
      state.selectedWrestlers.selectWreslerName(action.payload.name);
      return { ...state, selectedWrestlers: state.selectedWrestlers };
    case 'deslecteWrestler':
      state.selectedWrestlers.deselectWreslerName(action.payload.name);
      return { ...state, selectedWrestlers: state.selectedWrestlers };
    default:
      throw new Error('未知のTYPE');
  }
};

export function useAppStatusReducer(
  selectedWrestlers: ISelectedWrestlers,
  albumCollection: IAlbumCollection,
  favoriteWrestlers: IFavoriteWrestlers
): [AppState, Dispatch<Action>] {
  const initialState: AppState = {
    isLoadingComplete: false,
    selectedWrestlers: selectedWrestlers,
    albumCollection: albumCollection,
    favoriteWrestlers: favoriteWrestlers,
  };

  const [state, dispatch] = useReducer(appStatusReducer, initialState);
  return [state, dispatch];
}
