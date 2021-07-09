// デフォルト呼び出しをするようにコンパイルで警告がでるがデフォルト呼び出しをするとReact側のエラーになってしまう
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import { findValuesFromContext, WrespicContext } from '../Context';
// import { useState } from 'react';
import { useContext } from 'react';
// import { useLoadPictures } from 'app/wrespic/states/hooks';

export const SearchButton: React.VFC = () => {
  const contextValue = findValuesFromContext(useContext(WrespicContext));

  const selectedWrestlers = contextValue.selectedWrestlers;

  const onPress = () => {
    contextValue.setIsLoadingComplete(true);
  };

  return (
    <div>
      <AwesomeButton
        type="primary"
        disabled={contextValue.selectedWrestlersList.length === 0}
        onPress={onPress}
      >
        検索:{selectedWrestlers.names().length}
      </AwesomeButton>
    </div>
  );
};
