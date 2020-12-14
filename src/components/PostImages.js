import React, { useCallback, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ImagesZoom from './ImagesZoom';

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
        <div>
          <img
            role="presentation"
            src={images[0].src}
            alt={images[0].src}
            onClick={onZoom}
            style={{ width: '100%', display: 'inline-block' }}
          />
        </div>
        {showZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div>
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
        </div>
        {showZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
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
      </div>
      {showZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
}

PostImages.propTypes = {
  images: PropTypes.array.isRequired,
};

export default PostImages;
