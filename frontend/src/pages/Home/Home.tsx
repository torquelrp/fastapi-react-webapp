// import { ReactComponent as Logo } from '../../assets/tmp1wb9u_k_1.svg';
import Logo from '../../assets/logo.png';
import HBG from '../../assets/home_bg.svg';

import { Typography, Row, Col } from 'antd';
import { Grid } from 'antd';

const { useBreakpoint } = Grid;

const Home = () => {
  const { sm } = useBreakpoint();
  return (
    <Row
      className='home-wrapper'
      justify="center"
      align="middle"
      style={{
        padding: sm? '100px 10px' : '40px 10px',
        height: '100%',
      }}
    >
      <Col xs={12} md={6}>
        <HomeBackgroundWrapper />
      </Col>
      <Col xs={12} md={6}>
        <Typography.Text
          italic
          strong
        >
          Explore our products and services
        </Typography.Text>
        <Typography.Title
          italic
          style={{
            fontSize: sm ? '' : '1rem',
            textAlign: 'end',
          }}
        >
          Welcome to <Col /> Zkdltid's  Website!
        </Typography.Title>
      </Col>
    </Row>
  )
}


const HomeBackgroundWrapper = () => {
  return (
    <div
      className='home-logo-wrapper'
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <div
        className='home-logo-background'
        style={{
          position: 'absolute',
          left: 80,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${HBG})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
          zIndex: -1,
        }}
      />
      <div
        className='home-logo-image'
        style={{
          position: 'absolute',
          left: 80,
          width: '100%',
          height: '100%',
          backgroundColor: '#e6f7ff',
          // backgroundImage: `url(${HBG})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
          zIndex: -2,
        }}
      />
      <img
        src={Logo}
        alt="logo"
        style={{
          width: '80%',
        }} />
    </div>
  )
}

export default Home

