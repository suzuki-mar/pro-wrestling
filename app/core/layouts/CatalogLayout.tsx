import { ReactNode } from 'react';
import { Head } from 'blitz';

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

const CatalogLayout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>カタログ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  );
};

export default CatalogLayout;
