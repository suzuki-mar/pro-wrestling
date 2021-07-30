import { TWrestlerName } from 'app/core/wreslter';

export interface ISelectedWrestlers {
  names(): TWrestlerName[];
  isSelected(name: TWrestlerName): boolean;
  select(name: TWrestlerName): TWrestlerName[];
  deselect(name: TWrestlerName): TWrestlerName[];
  rebuild(names: TWrestlerName[]): void;
}

export interface IAlbumCollection {
  load(names: TWrestlerName[]): Promise<void>;
  albums(): IAlbum[];
  filterAlbumsByWrestlerNames(names: TWrestlerName[]): void;
  currentSelectedAlbums(): IAlbum[];
}

export interface IAlbum {
  readonly wrestlerName: TWrestlerName;
  pictures(): TPicture[];
  count(): number;
  isDisplayable(): boolean;
}

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
  isRelated(name: TWrestlerName): boolean;
};

export type UIAction =
  | {
      type: 'selecteWrestler';
      payload: { name: TWrestlerName };
    }
  | {
      type: 'displayChoice';
    };
