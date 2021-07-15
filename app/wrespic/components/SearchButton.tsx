// デフォルト呼び出しをするようにコンパイルで警告がでるがデフォルト呼び出しをするとReact側のエラーになってしまう
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import { AppState, Action } from '../hooks/useAppStatusReducer';
import { Dispatch } from 'react';

type Props = {
  appState: AppState;
  dispatch: Dispatch<Action>;
};

export const SearchButton: React.VFC<Props> = ({ appState, dispatch }) => {
  const onPress = () => {
    dispatch({ type: 'searchPicture' });
  };

  return (
    <div>
      <AwesomeButton
        type="primary"
        disabled={appState.selectedWrestlers.names().length === 0}
        onPress={onPress}
      >
        検索
      </AwesomeButton>
    </div>
  );
};
