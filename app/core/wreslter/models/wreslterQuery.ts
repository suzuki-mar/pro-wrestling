import { SampleData } from 'sampleData';
import { TWrestlerName } from '..';

export class WreslerQuery {
  findNames(): TWrestlerName[] {
    return SampleData.wrestlerNames();
  }
}
