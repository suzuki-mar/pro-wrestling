import { Head, BlitzPage } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import { Contents } from 'app/wrespic/components/Contents';

const WrespicsPage: BlitzPage = () => {
  return (
    <div className="backgroundColor">
      <Head>
        <title>Wrespic</title>
      </Head>

      <Contents />
    </div>
  );
};

WrespicsPage.authenticate = false;
WrespicsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default WrespicsPage;
