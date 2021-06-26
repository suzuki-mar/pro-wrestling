// デフォルト呼び出しをするようにコンパイルで警告がでるがデフォルト呼び出しをするとReact側のエラーになってしまう
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import { ISelectedWrestlers } from 'app/wrespic/';
import { findValuesFromContext, WrespicContext } from '../Context';
import { useState, useEffect } from 'react';
import { useContext } from 'react';

type Props = {};

export const SearchButton: React.VFC<Props> = ({}) => {
  const contextValue = findValuesFromContext(useContext(WrespicContext));

  const selectedWrestlers = contextValue.selectedWrestlers;

  const [wreslers, setWreslers] = useState(selectedWrestlers.names());

  const onPress = () => {
    console.log(selectedWrestlers.names);
  };

  return (
    <div>
      <AwesomeButton type="primary" disabled={true} onPress={onPress}>
        検索:{selectedWrestlers.names().length}
      </AwesomeButton>
    </div>
  );
};
