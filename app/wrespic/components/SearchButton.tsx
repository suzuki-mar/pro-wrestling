// デフォルト呼び出しをするようにコンパイルで警告がでるがデフォルト呼び出しをするとReact側のエラーになってしまう
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import { UIAction } from '..';
import { AppState } from '../hooks/useAppReducer';
import { Dispatch } from 'react';

type Props = {
  appState: AppState;
  dispatch: Dispatch<UIAction>;
};

export const SearchButton: React.VFC<Props> = ({ appState, dispatch }) => {
  const onPress = () => {
    dispatch({ type: 'displayChoice' });
  };

  return (
    <div>
      <AwesomeButton
        type="primary"
        disabled={appState.selectedWrestlers.names().length === 0}
        onPress={onPress}
      >
        表示選択
      </AwesomeButton>
    </div>
  );
};
