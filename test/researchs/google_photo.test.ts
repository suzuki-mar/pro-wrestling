import axios from 'axios';
import { log } from 'infrastructure';

const fs = require('fs');
const FormData = require('form-data');

describe('学習テストのため必要になるまではSkip GooglePhotoのテスト', () => {
  describe.skip('学習テストのため必要になるまではSkip', () => {
    it('ファイルの情報を取得すること', async () => {
      const response = await axios.get('https://photoslibrary.googleapis.com/v1/mediaItems', {
        headers: {
          Authorization: `Bearer ` + process.env.GOOLGE_PHTO_ACCESS_TOKEN,
        },
      });

      Promise.resolve(response).then((response) => {
        //no-unused-expressionsの警告がでるが見た目上問題ないため無効にしている
        // eslint-disable-next-line

        expect(response['data']['mediaItems'].length).toBeGreaterThanOrEqual(1);
      });
    });

    it('アップロードできていること', async () => {
      const form = new FormData();
      log(form);

      const file = fs.createReadStream(__dirname + '/test.png');
      form.append('file', file, file.name);

      log(form);

      let data = new FormData();
      data.append('file', file, file.name);

      // const response = await axios.post(
      //   'https://photoslibrary.googleapis.com/v1/uploads',
      //   data._boundary,
      //   {
      //     headers: {
      //       Authorization: `Bearer ` + process.env.GOOLGE_PHTO_ACCESS_TOKEN,
      //       'Content-type': 'application/octet-stream',
      //       'X-Goog-Upload-File-Name': 'hoge.jpg',
      //       'X-Goog-Upload-Content-Type': 'image/png',
      //       'X-Goog-Upload-Protocol': 'raw',
      //     },
      //   }
      // );
    });

    it('アップロードした画像の情報を取得できること', async () => {});
  });
});
