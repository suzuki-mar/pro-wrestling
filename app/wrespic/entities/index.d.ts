import { IPhoto } from 'app/wrespic/components/interface';

export interface IPictureRepository {
  regist(photo: IPhoto): Promise<IPhoto>;
}
