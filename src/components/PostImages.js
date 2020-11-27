import { useCallback, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

function PostImages({ images }) {
  const [showZoom, setShowZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
          style={{ width: '50%', display: 'inline-block' }}
        />
        <img
          role="presentation"
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
          style={{ width: '50%', display: 'inline-block' }}
        />
      </>
    );
  }
  return (
    <>
      <img
        role="presentation"
        src={images[0].src}
        alt={images[0].src}
        onClick={onZoom}
        style={{ width: '50%', display: 'inline-block' }}
      />
      <a
        role="presentation"
        style={{
          display: 'inline-block',
          width: '50%',
          textAlign: 'center',
          verticalAlign: 'middle',
        }}
        onClick={onZoom}
      >
        <PlusOutlined />
        <br />
        {images.length - 1} More Images
      </a>
    </>
  );
}
export default PostImages;
