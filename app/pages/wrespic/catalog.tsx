import { Head, BlitzPage } from 'blitz';
import CatalogLayout from 'app/core/layouts/CatalogLayout';
import { CatalogList, ComponentType } from 'app/core/components/CatalogList';
import WreslerSelection from 'app/wrespic/components/wrestlerSelection';
import WreslterSelectItem from 'app/wrespic/components/wrestlerSelectItem';
import { SampleData } from 'sampleData/index';

const catalogListProps = [
  {
    title: 'WrestlerSelection',
    description: '好きなレスラー一覧',
    content: <WreslerSelection />,
    type: ComponentType.Templates,
  },
  {
    title: 'WrestlerSelection',
    description: '好きなレスラーの選択',
    content: <WreslterSelectItem wrestler={SampleData.wrestler()} />,
    type: ComponentType.Parts,
  },
];

const WrespicsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Wrespics</title>
      </Head>

      <CatalogList catalogListProps={catalogListProps} />
    </>
  );
};

WrespicsPage.authenticate = false;
WrespicsPage.getLayout = (page) => <CatalogLayout>{page}</CatalogLayout>;

export default WrespicsPage;
