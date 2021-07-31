import { AlbumKind, TPicture } from 'app/wrespic';

export interface IAlbumType {
  title(): string;
  filterToPictures(pictures: TPicture[]): TPicture[];
  kind(): AlbumKind;
}
