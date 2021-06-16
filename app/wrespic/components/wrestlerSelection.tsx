import { Card, CardContent, CardHeader, FormGroup, CardActions } from '@material-ui/core';

import useFavoriteWrestlers from 'app/wrespic/hooks/useFavoriteWrestlers';
import * as _ from 'loadsh';
import { Wrestler } from 'app/core/wreslter/wrestler';
import WreslterSelectItem from 'app/wrespic/components/wrestlerSelectItem';
import UploadButton from 'app/wrespic/components/uploadButton';

export function WreslterSelection() {
  const wrestlers = useFavoriteWrestlers();

  const list = _.map(wrestlers, (wrestler: Wrestler) => {
    return <WreslterSelectItem key={wrestler.name} wrestler={wrestler} />;
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
