import { WreslterSelection } from 'app/wrespic/components/wrestlerSelection';
import { ExecutionLog } from 'app/wrespic/components/executionLlog';
import UploadButton from 'app/wrespic/components/uploadButton';

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
