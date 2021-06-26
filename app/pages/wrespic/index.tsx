import { Head, BlitzPage } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import { Wrespic } from 'app/wrespic/components/Wrespic';

const WrespicsPage: BlitzPage = () => {
  return (
    <div className="backgroundColor">
      <Head>
        <title>Wrespic</title>
      </Head>

      <Wrespic />
    </div>
  );
};

WrespicsPage.authenticate = false;
WrespicsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default WrespicsPage;
