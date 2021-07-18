import { TWrestlerName } from 'app/core/wreslter';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { TImageURL, TSource } from '..';

// DomainModelないでは、そのままのJSONを使用させないためにこのクラスを定義している
export class ValueObjectConvert {
  static toWreslerName(params: {}): TWrestlerName {
    return new WrestlerName(params['full']);
  }

  static toSource(params: {}): TSource {
    const imageURL: TImageURL = { original: params['imageURL']['original'] };

    return {
      imageURL: imageURL,
      name: this.toWreslerName(params['name']),
      date: new Date(params['dateStr']),
    };
  }
}
