import { MockProxy, mock } from 'jest-mock-extended';

interface PartyProvider {
  getPartyType: () => string;
  getSongs: (type: string) => string[];
  start: (type: string) => void;
}

describe('Party Tests', () => {
  let myMock: MockProxy<PartyProvider>;

  beforeEach(() => {
    myMock = mock<PartyProvider>();
  });

  test('hoge', () => {
    myMock.start('disco party');

    expect(myMock.start).toHaveBeenCalledWith('disco party');
  });

  test('mock out a return type', () => {
    myMock.getPartyType.mockReturnValue('west coast party');

    expect(myMock.getPartyType()).toBe('west coast party');
  });
});
