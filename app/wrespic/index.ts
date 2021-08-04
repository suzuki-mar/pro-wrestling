import { TWrestlerName } from 'app/core/wreslter';
import { PromoterType } from './models/albums/types/promoterType';
import { WrestlerType } from './models/albums/types/wrestlerType';

export interface ISelectedWrestlers {
  names(): TWrestlerName[];
  isSelected(name: TWrestlerName): boolean;
  select(name: TWrestlerName): TWrestlerName[];
  deselect(name: TWrestlerName): TWrestlerName[];
  rebuild(names: TWrestlerName[]): void;
}

export interface IAlbumCollection {
  load(names: TWrestlerName[]): Promise<void>;
  allAlbums(): IAlbum[];
  filterAlbumsByWrestlerNames(names: TWrestlerName[]): void;
  currentSelectedAlbums(): IAlbum[];
  albumsFromKind(kind: AlbumKind): IAlbum[];
}

export const AlbumKinds = {
  Wrestler: 'wrestler',
  Promoter: 'promoter',
} as const;

export type AlbumKind = typeof AlbumKinds[keyof typeof AlbumKinds];

export interface IAlbum {
  pictures(): TPicture[];
  count(): number;
  isDisplayable(): boolean;
  title(): string;
  type(): WrestlerType | PromoterType | undefined;
}

export type TPictureNumber = {
  readonly number: Number;
  readonly str: string;
  equal(compare: TPictureNumber): boolean;
};

export type TPictureValueObject = {
  readonly number: TPictureNumber;
};

export type TPictureURL = TPictureValueObject & {
  readonly originalURL: string;
  readonly thumbnailURL: string;
  readonly defaultSizeURL: string;
};

export type TPictureContributor = {
  number: number;
  identificationName: string;
  displayName: string;
};

export type TPictureDisplayInfo = TPictureValueObject & {
  readonly contributor: TPictureContributor;
  readonly date: Date;
  readonly wrestlerNames: TWrestlerName[];
  formattedDisplayString(): string;
};

export type TPictureFileName = TPictureValueObject & {
  readonly name: string;
  readonly number: TPictureNumber;
  equal(compare: TPictureFileName): boolean;
};

export type TPicture = {
  readonly pictureURL: TPictureURL;
  readonly displayInfo: TPictureDisplayInfo;
  readonly fileName: TPictureFileName;
  postDay(): string;
  isRelated(name: TWrestlerName): boolean;
  equal(compare: TPicture): boolean;
};

export type UIAction =
  | {
      type: 'selecteWrestler';
      payload: { name: TWrestlerName };
    }
  | {
      type: 'displayChoice';
    };
