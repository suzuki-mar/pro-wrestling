import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { WrestlerNameItem } from './WrestlerNameItem';
import { AppState, Action } from '../../hooks/useAppStatusReducer';
import { Dispatch } from 'react';

type Props = {
  appState: AppState;
  dispatch: Dispatch<Action>;
};

export const WrestlersList: React.VFC<Props> = ({ appState, dispatch }) => {
  if (appState.wrestlerCollection.wrestlers() === undefined) {
    return <div data-testid="custom-element"></div>;
  }

  const names = appState.wrestlerCollection.wrestlers().map((wrestler) => {
    return wrestler.name;
  });

  const itemHeight = 30;

  const listHeight = (appState.wrestlerCollection.wrestlers().length + 1) * itemHeight + 10;

  return (
    <div data-testid="custom-element">
      <FixedSizeList
        height={listHeight}
        width={200}
        itemData={{
          names: names,
          appState: appState,
          dispatch: dispatch,
        }}
        itemCount={names.length}
        itemSize={30}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
};

function renderRow(props: ListChildComponentProps) {
  const { style, data, index } = props;

  return (
    <WrestlerNameItem
      name={data['names'][index]}
      style={style}
      appState={data['appState'] as AppState}
      dispatch={data['dispatch'] as Dispatch<Action>}
    />
  );
}
