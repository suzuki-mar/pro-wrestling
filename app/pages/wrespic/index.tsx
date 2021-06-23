import { Head, BlitzPage } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import { Wrespic } from 'app/wrespic/components/wrespic';

const WrespicsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Wrespicsz</title>
      </Head>

      <Wrespic />
    </>
  );
};

WrespicsPage.authenticate = false;
WrespicsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default WrespicsPage;
