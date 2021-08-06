import { execute } from './extractingID';

describe('extractingID', () => {
  it('IDの部分だけ取り出せていること', () => {
    expect(execute()[0]!.length).toEqual(19);
  });
});
