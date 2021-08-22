export type ProcessError<T> = {
  handler: IProcessRunner<T>;
};

export interface IProcess<T, U> {
  start(handlers: IProcessRunner<T>[]): Promise<void>;
  stop(error: ProcessError<U>): Promise<void>;
  restart(error: ProcessError<U>): Promise<void>;
}

export interface IProcessRunner<T> {
  execute(arg: T): Promise<void>;
}
