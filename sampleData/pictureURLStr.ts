import * as _ from 'loadsh';

export class PictureURLStr {
  static str(): string {
    const urlStrs = [
      'https://pbs.twimg.com/profile_images/1379722405220782080/GPA5Q9M-_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1306992114270527489/j2rjqGMg_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1370429023579348992/xijhpU9c_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1065855408378601472/5QteaT_0_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1356870860192186370/DqxmMKKZ_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1368942294036967430/xg-Rbmv2_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1163873490052632576/gNdvtfeP_400x400.jpg',
    ];

    return _.shuffle(urlStrs)[0]!;
  }

  static maria(): string[] {
    return [
      'http://pbs.twimg.com/media/E5Bjs2jVEAMPhlv.jpg',
      'http://pbs.twimg.com/media/E4-llWjVkAIDOJ7.jpg',
    ];
  }

  static mei(): string[] {
    return [
      'http://pbs.twimg.com/media/E5IdcHAVIAoLHWW.jpg',
      'http://pbs.twimg.com/media/E5Ahv-PVIAk1yyu.jpg',
      'http://pbs.twimg.com/media/E4-tCZ_VIAI3gUw.jpg',
      'http://pbs.twimg.com/media/E4-r4TZUYAUWnNy.jpg',
      'http://pbs.twimg.com/media/E4-rnC7UYAMk1_s.jpg',
      'http://pbs.twimg.com/media/E4-qrccVoAk6XS2.jpg',
      'http://pbs.twimg.com/media/E4-qc5QVoAEFlnC.jpg',
      'http://pbs.twimg.com/media/E4-qSWGVkAEL9Wd.jpg',
      'http://pbs.twimg.com/media/E4-qNLWVcAcQ8Bt.jpg',
    ];
  }
}
