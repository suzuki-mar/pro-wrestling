import { Card, CardContent, CardHeader, FormGroup, CardActions } from '@material-ui/core';

import useFavoriteWrestlers from 'app/wrespic/hooks/useFavoriteWrestlers';
import * as _ from 'loadsh';
import { IWrestler } from 'app/core/wreslter';
import WreslterSelectItem from 'app/wrespic/components/wrestlerSelectItem';
import UploadButton from 'app/wrespic/components/uploadButton';

export default function WreslterSelection() {
  const wrestlers = useFavoriteWrestlers();

  const list = _.map(wrestlers, (wrestler: IWrestler) => {
    return <WreslterSelectItem key={wrestler.name.full} wrestler={wrestler} />;
  });

  return (
    <Card>
      <CardHeader title="レスラーの選択" />
      <CardContent>
        <FormGroup row>{list}</FormGroup>
      </CardContent>
      <CardActions>
        <UploadButton />
      </CardActions>
    </Card>
  );
}
