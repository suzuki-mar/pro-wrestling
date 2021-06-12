import { IPhoto } from '../components/interface';

export interface IPictureRepository {
  regist(photo: IPhoto): Promise<IPhoto>;
}
