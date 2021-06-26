import React, { useState, ReactNode, SetStateAction, Dispatch } from 'react';
import { ISelectedWrestlers } from 'app/wrespic';
import { IWrestler, IWrestlerName } from 'app/core/wreslter/index';
import { useSelectedWrestlers } from 'app/wrespic/hooks/';

export const WrespicContext = React.createContext({});

type Props = {
  children: ReactNode;
};

export const ContextWrapper: React.VFC<Props> = ({ children }) => {
  const selectedWrestlers = useSelectedWrestlers();

  const [selectedWrestlersList, setSelectedWrestlersList] = useState(selectedWrestlers.names());
  const [_selectedWrestlers] = useState(selectedWrestlers);

  return (
    <WrespicContext.Provider
      value={{ selectedWrestlersList, setSelectedWrestlersList, _selectedWrestlers }}
    >
      {children}
    </WrespicContext.Provider>
  );
};

type ContextValue = {
  selectedWrestlersList: IWrestler[];
  setSelectedWrestlersList: Dispatch<SetStateAction<IWrestlerName[]>>;
  selectedWrestlers: ISelectedWrestlers;
};

// Reactの規約としてuseContextはここでは使用できないので引数に渡している
export function findValuesFromContext(context: {}): ContextValue {
  return {
    selectedWrestlersList: context['selectedWrestlersList'] as IWrestler[],
    setSelectedWrestlersList: context['setSelectedWrestlersList'] as Dispatch<
      SetStateAction<IWrestlerName[]>
    >,
    selectedWrestlers: context['_selectedWrestlers'] as ISelectedWrestlers,
  };
}
