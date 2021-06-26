import { Typography, Card, CardHeader, CardContent, Divider, Container } from '@material-ui/core';
import * as _ from 'lodash';

type CatalogProps = {
  title: string;
  description: string;
  content: JSX.Element;
  type: ComponentType;
};

export type CatalogGroupsProps = {
  catalogPropsList: CatalogProps[];
  type: ComponentType;
};

export enum ComponentType {
  Atom = 'Atom',
  Molecules = 'Molecules',
  Organisms = 'Organisms',
  Templates = 'Templates',
}

export function CatalogList({ catalogListProps }) {
  const groupedProps = _.groupBy(catalogListProps, 'type');

  let groupedCatalogs = {};

  _.each(groupedProps, (propsList, type) => {
    groupedCatalogs[type] = <CatalogGroup key={type} catalogPropsList={propsList} type={type} />;
  });

  const sorteCatalogs = _.flatten([
    groupedCatalogs[ComponentType.Templates],
    groupedCatalogs[ComponentType.Organisms],
    groupedCatalogs[ComponentType.Molecules],
    groupedCatalogs[ComponentType.Atom],
  ]);

  return <>{sorteCatalogs}</>;
}

function CatalogGroup({ catalogPropsList, type }) {
  const dividerStyle = {
    height: '5px',
  };

  const containerStyle = {
    marginBottom: '50px',
  };

  let catalogs = catalogPropsList.map((props) => {
    if (props === undefined) {
      return undefined;
    }

    return <Catalog key={props.title} catalogProps={props} />;
  });

  return (
    <Container style={containerStyle}>
      <Typography variant="h3"> {type} </Typography>

      {catalogs}
      <Divider style={dividerStyle} />
    </Container>
  );
}

function Catalog({ catalogProps }) {
  return (
    <Card key={catalogProps.title}>
      <CardHeader title={catalogProps.title} />

      <CardContent>
        <Typography variant="body1"> description: {catalogProps.description} </Typography>
        {catalogProps.content}
      </CardContent>
    </Card>
  );
}
