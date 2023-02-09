import { animated, useSpring } from '@react-spring/web';
import { Button } from '@/components';
import './hero.css';
// import { Me } from '@static/images';
const Hero = () => {
  const isMobile = window.innerWidth < 800;
  let firstBoot;
  let secondBoot;
  !isMobile &&
    ((firstBoot = useSpring({
      from: {
        opacity: 0,
        y: 50,
      },
      to: {
        opacity: 1,
        y: 0,
      },
      delay: 1900,
      config: {
        tension: 210,
        friction: 30,
      },
    })),
    (secondBoot = useSpring({
      from: {
        opacity: 0,
        y: 30,
      },
      to: {
        opacity: 1,
        y: 0,
      },
      delay: 2200,
      config: {
        tension: 280,
        friction: 60,
      },
    })));
  return (
    <section className="hero" id="hero">
      <div className="hero-box">
        <div className="text-box">
          <p className="hello-world">
            Hello! <span className="waving-hand">{String.fromCodePoint(0x1f44b)}</span> I'm
          </p>
          <animated.h1 style={firstBoot} className="title">
            <span className="name">Nischal Neupane</span>
          </animated.h1>
          <animated.div style={secondBoot}>
            <h2 className="sub-title">Software Engineer</h2>
            <p className="intro">
              I am a data science enthusiast and a software engineer. Does that make me a "data engineer"...? <br />
              <span className="status">I'm currently looking for new opportunities!</span>
            </p>
            <Button title="See My Projects" link="#projects" />
          </animated.div>
        </div>
        <animated.div style={firstBoot} className="image-box">
          <div className="wrapper">
            <div className="image-wrapper">
              <div className="background"></div>
              {/* <img src={Me} alt="Nischal Neupane" className="profile" /> */}
            </div>
            <div className="dark-background"></div>
          </div>
        </animated.div>
      </div>
    </section>
  );
};

export default Hero;
