import { useMemo } from 'react';
import { TWrestlerName } from 'app/core/wreslter';
import { ValueObjectConvert } from './valueObjectConvert';

export function useConvertWrestlerName(json: {}): TWrestlerName {
  const name = useMemo(() => {
    return ValueObjectConvert.toWreslerName(json);
  }, [json]);

  return name;
}
