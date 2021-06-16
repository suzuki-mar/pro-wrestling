import { WreslterSelection } from './wrestlerSelection';
import { ExecutionLog } from './executionLlog';
import UploadButton from './uploadButton';

const style = {
  height: '550px',
};

export function Wrespic() {
  const button = <UploadButton />;

  return (
    <div style={style} className="h-96">
      <div className="h-1/2">
        <WreslterSelection button={button} />
      </div>

      <hr />
      <div className="h-1/2">
        <ExecutionLog />
      </div>
    </div>
  );
}
