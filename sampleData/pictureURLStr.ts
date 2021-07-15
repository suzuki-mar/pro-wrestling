import { TWrestlerName } from 'app/core/wreslter';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import * as _ from 'loadsh';

export class PictureURLStr {
  static profile(): string {
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

  static findByWreslterName(name: TWrestlerName): string[] | undefined {
    const list = [
      { name: new WrestlerName('Maria'), urls: this.maria() },
      { name: new WrestlerName('星月芽依'), urls: this.mei() },
      { name: new WrestlerName('桃野美桜'), urls: this.mio() },
      { name: new WrestlerName('門倉凛'), urls: this.rin() },
      { name: new WrestlerName('宝山愛'), urls: this.ai() },
      { name: new WrestlerName('彩羽匠'), urls: this.takumi() },
      { name: new WrestlerName('神童ミコト'), urls: this.mikoto() },
    ];

    const searched = list.find((params) => {
      return params.name.equal(name);
    });

    if (searched === undefined) {
      return undefined;
    }

    return searched.urls;
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

  static mio(): string[] {
    return [
      'http://pbs.twimg.com/media/E5yGe8tUUAoPiIM.jpg',
      'http://pbs.twimg.com/media/E5xxytuUYAYUt2-.jpg',
      'http://pbs.twimg.com/media/E5xeBWiUcAEVHFI.jpg',
      'http://pbs.twimg.com/media/E5slUTYVIAIruLE.jpg',
      'http://pbs.twimg.com/media/E5oXq9EVoAE9B66.jpg',
      'http://pbs.twimg.com/media/E5oW6qtUYAIMBWv.jpg',
      'http://pbs.twimg.com/media/E5nX0sDVgAEYA7N.jpg',
      'http://pbs.twimg.com/media/E5nVwUAVkAM212e.jpg',
      'http://pbs.twimg.com/media/E5mfjRVVkBIgyor.jpg',
      'http://pbs.twimg.com/media/E5mee_nVkBYAzPF.jpg',
      'http://pbs.twimg.com/media/E5mI5E_VIAEpsYZ.jpg',
      'http://pbs.twimg.com/media/E5lr64nVoAs2nFv.jpg',
      'http://pbs.twimg.com/media/E5kwEJ9VkAA3Q2Z.jpg',
      'http://pbs.twimg.com/media/E5i3CvkVoAUOEe6.jpg',
      'http://pbs.twimg.com/media/E5izBpZVcAgO0lC.jpg',
      'http://pbs.twimg.com/media/E5dly19UYAMrvis.jpg',
    ];
  }

  static rin(): string[] {
    return [
      'http://pbs.twimg.com/media/E5xxytuUYAYUt2-.jpg',
      'http://pbs.twimg.com/media/E5wGSSzUYAAA9ci.jpg',
      'http://pbs.twimg.com/media/E5slUTYVIAIruLE.jpg',
      'http://pbs.twimg.com/media/E5recl4VEAAwRE8.jpg',
      'http://pbs.twimg.com/media/E5oXq9EVoAE9B66.jpg',
      'http://pbs.twimg.com/media/E5nYjiXUUAcCoQ3.jpg',
      'http://pbs.twimg.com/media/E5nVwUAVkAM212e.jpg',
      'http://pbs.twimg.com/media/E5nHGsAVkAUn6sR.jpg',
      'http://pbs.twimg.com/media/E5mfjRVVkBIgyor.jpg',
      'http://pbs.twimg.com/media/E5mee_nVkBYAzPF.jpg',
      'http://pbs.twimg.com/media/E5izBpZVcAgO0lC.jpg',
      'http://pbs.twimg.com/media/E5iFWYCVIAAq4RZ.jpg',
      'http://pbs.twimg.com/media/E5hB6SWVcAQxEF6.jpg',
      'http://pbs.twimg.com/media/E5dt0pKVoAQSPuL.jpg',
      'http://pbs.twimg.com/media/E5dmLBHVkAQF3kv.jpg',
      'http://pbs.twimg.com/media/E5dl81sVkAgMv8S.jpg',
      'http://pbs.twimg.com/media/E5datL2VgAYrYmS.jpg',
    ];
  }

  static ai(): string[] {
    return [
      'http://pbs.twimg.com/media/E5skN8rVUAckx85.jpg',
      'http://pbs.twimg.com/media/E5mkGLCUYAMLEDA.jpg',
      'http://pbs.twimg.com/media/E5iFWYCVIAAq4RZ.jpg',
      'http://pbs.twimg.com/media/E5cU-19UcAQGxgF.jpg',
      'http://pbs.twimg.com/media/E5cQCOOVEAEE9lQ.jpg',
    ];
  }

  static mikoto(): string[] {
    return [
      'http://pbs.twimg.com/media/E5slUTYVIAIruLE.jpg',
      'http://pbs.twimg.com/media/E5pVgxUUYAIMbnG.jpg',
      'http://pbs.twimg.com/media/E5mmLfuVgAEnq-u.jpg',
      'http://pbs.twimg.com/media/E5laCFvVcCwK39-.jpg',
      'http://pbs.twimg.com/media/E5jIj0_VgAAWwde.jpg',
      'http://pbs.twimg.com/media/E5iFWYCVIAAq4RZ.jpg',
      'http://pbs.twimg.com/media/E5fKZceUcAAch5x.jpg',
      'http://pbs.twimg.com/media/E5fB0ZNUYAIi73v.jpg',
      'http://pbs.twimg.com/media/E5fB0FDUUAA-L9s.jpg',
      'http://pbs.twimg.com/media/E5du2xmUYAAVtMz.jpg',
      'http://pbs.twimg.com/media/E5dccFAVUAE4omx.jpg',
      'http://pbs.twimg.com/media/E5cno_WVoAAyXnK.jpg',
    ];
  }

  static takumi(): string[] {
    return [
      'http://pbs.twimg.com/media/E50FWRGVoAAtoEb.jpg',
      'http://pbs.twimg.com/media/E5yCmFdVUAIEs49.jpg',
      'http://pbs.twimg.com/media/E5w5JVNUUAQqf9_.jpg',
      'http://pbs.twimg.com/media/E5vDPqbVIAke2EZ.jpg',
      'http://pbs.twimg.com/media/E5sf3NfVoA0sQRZ.jpg',
      'http://pbs.twimg.com/media/E5m_5ErVcAcmIP6.jpg',
      'http://pbs.twimg.com/media/E5lTsB_VEAEqY_Z.jpg',
      'http://pbs.twimg.com/media/E5lJqhgVUAExpK7.jpg',
      'http://pbs.twimg.com/media/E5kspYHVUAA17Nd.jpg',
      'http://pbs.twimg.com/media/E5kixmYUcAM7j_d.jpg',
      'http://pbs.twimg.com/media/E5kVuEiUYAA2kIO.jpg',
      'http://pbs.twimg.com/media/E5ilS_2VoAIDzw7.jpg',
      'http://pbs.twimg.com/media/E5iFWYCVIAAq4RZ.jpg',
      'http://pbs.twimg.com/media/E5hB6SWVcAQxEF6.jpg',
      'http://pbs.twimg.com/media/E5fePqGVUAAGWkq.jpg',
      'http://pbs.twimg.com/media/E5di5XnVEAA_UWa.jpg',
      'http://pbs.twimg.com/media/E5cnEoBUcAAT1eW.jpg',
    ];
  }
}
