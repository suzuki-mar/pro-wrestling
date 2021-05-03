import { Source as SourceIF, SourceId as SourceIdIF } from './interface';

export class Source implements SourceIF {
  readonly title: string;
  readonly thumbnailURL: URL;
  readonly sourceURL: URL;
  readonly publicationDate: Date;
  readonly sourceId: SourceId;

  constructor(title: string) {
    this.title = title;
  }
}

export class SourceId implements SourceIdIF {
  readonly id: string;
}
