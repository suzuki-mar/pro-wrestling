// デフォルト呼び出しをするようにコンパイルで警告がでるがデフォルト呼び出しをするとReact側のエラーになってしまう
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import { ISelectedWrestlers } from 'app/wrespic/';

type Props = {
  selectedWrestlers: ISelectedWrestlers;
};

export const SearchButton: React.VFC<Props> = ({ selectedWrestlers }) => {
  const onPress = () => {
    console.log(selectedWrestlers);
  };

  return (
    <div>
      <AwesomeButton type="primary" disabled={true} onPress={onPress}>
        検索
      </AwesomeButton>
    </div>
  );
};
