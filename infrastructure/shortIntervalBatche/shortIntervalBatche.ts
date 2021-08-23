import {
  IShortIntervalBatcheJob,
  TShortIntervalBatcheStatus,
  TShortIntervalBatcheJobStatus,
} from '.';

export class ShortIntervalBatche {
  private static BATCH_INTERVAL_SEC = 30;

  constructor(private _jobs: IShortIntervalBatcheJob[]) {}

  async run(): Promise<TShortIntervalBatcheStatus> {
    const promises = this._jobs.map((job) => job.execute());

    let jobStatus: TShortIntervalBatcheJobStatus[] = [];
    await Promise.all(promises).then((_jobStatuses) => {
      jobStatus = _jobStatuses;
    });

    return {
      jobStatus: jobStatus,
      nextRunMilSecond: ShortIntervalBatche.BATCH_INTERVAL_SEC * 1000,
    };
  }
}
