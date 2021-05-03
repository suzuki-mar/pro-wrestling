import { ContentsRepository, SourceId, Content } from './interface';

export class Repository implements ContentsRepository {
  excludeSavedSourceIds(targetSourceIds: SourceId[]): SourceId[] {
    return [];
  }

  saveContents(contents: Content[]): Boolean {
    return true;
  }
}
