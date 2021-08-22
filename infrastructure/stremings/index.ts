import { IProcessRunner } from 'infrastructure/processes';

export interface IStreamingListener extends IProcessRunner<IStreamingData> {
  exeute(streamingData: IStreamingData): Promise<void>;
}

export interface IStreamingData {
  load(): Promise<void>;
}

export interface IStreamingFilter {
  execute(data: IStreamingData): Promise<void>;
}
