import { IShortIntervalBatcheJob, TShortIntervalBatcheJobStatus } from '.';
import { ShortIntervalBatche } from './shortIntervalBatche';

class DummyJob implements IShortIntervalBatcheJob {
  executeCount = 0;

  async execute(): Promise<TShortIntervalBatcheJobStatus> {
    this.executeCount = this.executeCount + 1;

    return { sucess: true };
  }
}

describe('run', () => {
  it('バッチを実行できていること', async () => {
    const job = new DummyJob();

    const batch = new ShortIntervalBatche([job]);
    await batch.run();

    expect(job.executeCount).toEqual(1);
  });

  it('バッチの実行結果を取得できていること', async () => {
    const job = new DummyJob();

    const batch = new ShortIntervalBatche([job]);
    const actual = await batch.run();

    // 仕様的に3秒以上間隔をあける
    expect(actual.nextRunMilSecond).toBeGreaterThan(3000);
    expect(actual.jobStatus[0]!.sucess).toEqual(true);
  });
});

export {};
