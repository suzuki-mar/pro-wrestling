import { AlbumKind, TPicture } from 'app/albums';

export interface IAlbumType {
  title(): string;
  filterToPictures(pictures: TPicture[]): TPicture[];
  kind(): AlbumKind;
}
