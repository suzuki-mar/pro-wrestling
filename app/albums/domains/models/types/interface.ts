import { AlbumKind, IPicture } from 'app/albums';

export interface IAlbumType {
  title(): string;
  filterToPictures(pictures: IPicture[]): IPicture[];
  kind(): AlbumKind;
}
