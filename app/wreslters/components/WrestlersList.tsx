import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { WrestlerNameItem } from './WrestlerNameItem';
import { WrestlersAppState } from 'app/wreslters';
import { Dispatch } from 'react';
import { UIAction } from 'app/albums';

type Props = {
  appState: WrestlersAppState;
  dispatch: Dispatch<UIAction>;
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
      appState={data['appState'] as WrestlersAppState}
      dispatch={data['dispatch'] as Dispatch<UIAction>}
    />
  );
}
