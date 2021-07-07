import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import { findValuesFromContext, WrespicContext } from './Context';
import { useContext } from 'react';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 1000,
      height: 1000,
    },

    gridTileStyle: {
      position: 'relative',
      float: 'left',
      overflow: 'hidden',
      minHeight: '200px',
      minWidth: '500px',
    },
  })
);

type Props = {};

export const AlbumGroup: React.VFC<Props> = () => {
  const contextValue = findValuesFromContext(useContext(WrespicContext));

  const classes = useStyles();

  console.log(contextValue.selectedWrestlers);
  let items: unknown[] = [];
  if (contextValue.selectedWrestlers.names().length > 0 && contextValue.isLoadingComplete) {
    items = contextValue.pictures.map((picture) => {
      return (
        <GridListTile key={picture.urlStr} cols={2}>
          <img src={picture.urlStr} alt={picture.wrestlerNames[0]!.full} />
        </GridListTile>
      );
    });
  } else {
    items = [];
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} className={classes.gridList} cols={1}>
        {items}
      </GridList>
    </div>
  );
};
