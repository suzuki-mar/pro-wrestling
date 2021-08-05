import { WreslerQuery } from './wreslterQuery';
import { WrestlerName } from './wrestlerName';

describe('findNames', () => {
  it('nameを返すこと', () => {
    const query = new WreslerQuery();
    const names = query.findNames();

    expect(names[0]!).toBeInstanceOf(WrestlerName);
  });
});
