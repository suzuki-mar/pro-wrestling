import { useReducer, Reducer, Dispatch } from 'react';
import { TWrestlerName, IWrestlerCollection } from 'app/core/wreslter';
import { ISelectedWrestlers, IAlbumCollection, TSource, ISourceCollection } from '..';

export type AppState = {
  isLoadingComplete: boolean;
  selectedWrestlers: ISelectedWrestlers;
  albumCollection: IAlbumCollection;
  wrestlerCollection: IWrestlerCollection;
  sourceCollection: ISourceCollection;
};

export type Action =
  | {
      type: 'selecteWrestler';
      payload: { name: TWrestlerName };
    }
  | {
      type: 'searchPicture';
    };

export const appStatusReducer: Reducer<AppState, Action> = (state, action) => {
  switch (action.type) {
    case 'searchPicture':
      const sources: TSource[] = state.sourceCollection.filterFromSelected(
        state.selectedWrestlers.names()
      );
      state.albumCollection.buildFromSources(sources);
      state.albumCollection.changeCurrentDisplayAlbum(state.selectedWrestlers.names()[0]!);
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

export function useAppStatusReducer(
  selectedWrestlers: ISelectedWrestlers,
  albumCollection: IAlbumCollection,
  wrestlerCollection: IWrestlerCollection,
  sourceCollection: ISourceCollection
): [AppState, Dispatch<Action>] {
  const initialState: AppState = {
    isLoadingComplete: false,
    selectedWrestlers: selectedWrestlers,
    albumCollection: albumCollection,
    wrestlerCollection: wrestlerCollection,
    sourceCollection: sourceCollection,
  };

  const [state, dispatch] = useReducer(appStatusReducer, initialState);
  return [state, dispatch];
}
