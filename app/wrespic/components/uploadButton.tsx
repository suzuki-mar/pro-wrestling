import { Button } from '@material-ui/core';
import { useMutation } from 'blitz';

export default function UploadButton() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('hoge');
  };

  return (
    <Button className="bg-gray-300" size="small" color="primary" onClick={handleSubmit}>
      写真のアップロード開始
    </Button>
  );
}
