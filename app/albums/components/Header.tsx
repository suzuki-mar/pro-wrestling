import { Typography } from '@material-ui/core';
import QRCode from 'react-qr-code';

export function Header() {
  return (
    <div className="flex justify-center ...">
      <Typography className="text-3xl mr-8 ..." variant="h1" gutterBottom>
        写真検索
      </Typography>
      <QRCode size={50} value="https://pro-wrestling-production.up.railway.app/albums" />,
    </div>
  );
}
