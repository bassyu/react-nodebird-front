import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Carousel } from '../../node_modules/antd/lib/index';

const ImagesZoomBlock = styled.div`
  z-index: 5000;
  position: fixed;
  top: 3rem;
  bottom: 0;
  right: 0;
  left: 0;

  .header {
    position: fixed;
    width: 100%;
    height: 3rem;
    background: white;
    padding: 0;
    text-align: center;

    h1 {
      margin: 0;
      line-height: 3rem;
      font-size: 1rem;
      color: #333;
    }
    button {
      cursor: pointer;
      position: absolute;
      top: 0.5rem;
      right: 0;
      line-height: 1rem;
    }
  }
  .slider-wrapper {
    height: calc(100% - 3rem);
    margin-top: 3rem;
    background: gray;

    .slide-img {
      padding: 2rem;
      text-align: center;

      img {
        margin: 0 auto;
        max-height: 40rem;
      }
    }
  }
`;

function ImagesZoom({ images, onClose }) {
  return (
    <ImagesZoomBlock>
      <div className="header">
        <h1>Images Zoom</h1>
        <Button onClick={onClose}>X</Button>
      </div>
      <div className="slider-wrapper">
        <Carousel autoplay>
          {images.map((image) => (
            <div className="slide-img">
              <img src={image.src} alt="slide-img" />
            </div>
          ))}
        </Carousel>
      </div>
    </ImagesZoomBlock>
  );
}

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
