import { ISource, ISourceId } from './interface';

export class Source implements ISource {
  readonly title: string;
  readonly thumbnailURL: URL;
  readonly sourceURL: URL;
  readonly publicationDate: Date;
  readonly sourceId: SourceId;

  constructor(title: string) {
    this.title = title;
  }
}

export class SourceId implements ISourceId {
  readonly id: string;
}
