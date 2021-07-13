import { ValueObjectConvert } from 'app/wrespic/hooks/valueObjectConvert';
import { SampleData } from 'sampleData';

describe('toWreslerName', () => {
  it('JSONからインスタンスを作成すること', () => {
    const name = SampleData.wrestlerName();
    const params = convertParams(name);

    const restoredName = ValueObjectConvert.toWreslerName(params);
    expect(name.equal(restoredName)).toBeTruthy();
  });
});

describe('toSource', () => {
  it('JSONからインスタンスを作成すること', () => {
    const [source] = SampleData.sources();

    const params = convertParams(source);

    const converted = ValueObjectConvert.toSource(params);
    expect(converted.urlStr).toEqual(source!.urlStr);
    expect(converted.date).not.toEqual(0);
  });
});

const convertParams = (instance: any) => {
  const json = JSON.stringify(instance);
  return JSON.parse(json);
};

export {};
