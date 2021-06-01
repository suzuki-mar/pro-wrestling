import { WreslterSelection } from "./wrestlerSelection"
import { ExecutionLog } from "./executionLlog"

const style = {
  height: "550px",
}

export function Wrespic() {
  return (
    <div style={style} className="h-96">
      <div className="h-1/2">
        <WreslterSelection />
      </div>

      <hr />
      <div className="h-1/2">
        <ExecutionLog />
      </div>
    </div>
  )
}
