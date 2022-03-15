import { Carousel } from 'react-bootstrap';
import img1 from '../../../assets/LandingPageImages/honda.jpg';
import img2 from '../../../assets/LandingPageImages/isuzu.jpg';
import img3 from '../../../assets/LandingPageImages/kia.jpg';
import Footer from './Footer';

const HomePage = () => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img1}
            alt="Honda"
          />
          <Carousel.Caption>
            <h3>Honda Vtec Cylinder Head</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Isuzu"
          />
          <Carousel.Caption>
            <h3>Isuzu 6he1 Cylinder Heads</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3}
            alt="Kia"
          />

          <Carousel.Caption>
            <h3>Kia J2 Cylinder Head</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Footer />
    </>
  );
};

export default HomePage;
