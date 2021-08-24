export interface IShortIntervalBatcheJob {
  execute(): Promise<TShortIntervalBatcheJobStatus>;
}

export type TShortIntervalBatcheJobStatus = {
  sucess: boolean;
  errorMessage?: string;
};

export type TShortIntervalBatcheStatus = {
  jobStatus: TShortIntervalBatcheJobStatus[];
  nextRunMilSecond: number;
};
