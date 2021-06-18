import * as _ from 'lodash';
import { HTTPClient } from 'integrations/httpClient/client';

export function log(value: string | Array<any> | Object) {
  if ('string' == typeof value) {
    console.log(value);
    return;
  }

  if (Array.isArray(value)) {
    console.table(value);
    return;
  }

  console.dir(value);
}

export async function createFileFromURL(url: URL): Promise<File> {
  const client = new HTTPClient();

  const blob = await client.findBlobParts(url).then((blobParts) => {
    return new Blob(blobParts, { type: 'image/jpg' });
  });

  const paths = url.toString().split('/');
  const name = _.last(paths) as string;

  return new File([blob], name);
}
