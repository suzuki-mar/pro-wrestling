import { BlitzApiRequest, BlitzApiResponse } from '@blitzjs/core';
import { IPicture } from 'app/albums';
import { AlbumCollection } from 'app/albums/domains/models/albumCollection';
import { setUpRequest } from 'app/core/apiLib';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import { PicturePrams, PriorityType } from 'db/seeds/pictureParamsList';

export async function execute(): Promise<PicturePrams[]> {
  const pictures = await fetchPictures();
  const result = pictures.map((picture) => {
    const nameStrs = picture.wrestlerNames().map((name) => name.full);
    const priortyType: PriorityType = 'default';
    return { url: picture.pictureURL().originalURL, names: nameStrs, priority: priortyType };
  });

  return result;
}

async function fetchPictures(): Promise<IPicture[]> {
  const albumCollection = new AlbumCollection();
  const wrestlerNames = await RepositoryFactory.factoryWrestlerQuery().findNames();
  await albumCollection.load(wrestlerNames);

  let pictures: IPicture[] = [];
  albumCollection.allAlbums().forEach((album) => {
    pictures = album.pictures().concat(pictures);
  });

  let uniquedPictures: IPicture[] = [];
  pictures.forEach((picture) => {
    const alreadyExsits = uniquedPictures.some((p) => {
      return picture.pictureURL().equal(p.pictureURL());
    });

    if (!alreadyExsits) {
      uniquedPictures = [...uniquedPictures, picture];
    }
  });

  return uniquedPictures;
}

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const data = await execute();
  return setUpRequest(res, data);
};
export default handler;
