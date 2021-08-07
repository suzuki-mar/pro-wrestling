import { TWrestlerName } from 'app/wreslters';
import { WrestlerName } from 'app/wreslters/domains/models/wrestlerName';
import * as _ from 'loadsh';
import { SampleData } from 'sampleData';

export class PictureURLStr {
  static all(): string[] {
    let result: string[] = [];
    SampleData.wrestlerNames().forEach((name) => {
      const urls = this.findByWreslterName(name);

      if (urls !== undefined) {
        result = result.concat(urls);
      }
    });

    result = _.shuffle(result);

    return result;
  }

  static findByWreslterName(name: TWrestlerName): string[] | undefined {
    const list = [
      { name: SampleData.mariaName(), urls: this.maria() },
      { name: SampleData.meiName(), urls: this.mei() },
      { name: SampleData.mioName(), urls: this.mio() },
      { name: new WrestlerName('門倉凛', true), urls: this.rin() },
      { name: new WrestlerName('宝山愛', true), urls: this.ai() },
      { name: new WrestlerName('彩羽匠', true), urls: this.takumi() },
      { name: new WrestlerName('神童ミコト', true), urls: this.mikoto() },
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
