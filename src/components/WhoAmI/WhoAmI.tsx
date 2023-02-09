import { useInView, animated } from '@react-spring/web';
import { Knowledge } from '@/components';
import './whoami.css';
const WhoAmI = () => {
  const isMobile = window.innerWidth < 475;
  let ref;
  let springs;
  !isMobile &&
    ([ref, springs] = useInView(
      () => ({
        from: {
          y: 50,
          opacity: 0,
        },
        to: {
          y: -20,
          opacity: 1,
        },
        config: {
          duration: 500,
        },
      }),
      {
        once: true,
        rootMargin: '0px 0px -30% 0px',
      },
    ));
  return (
    <section id="about" className="whoami">
      <animated.div ref={ref} style={springs} className="whoami-box">
        <div className="text-box">
          <h3 className="title">About</h3>
          <p className="text">
            Hello! I'm Nischal. I'm a software engineer based in Netherlands. I'm{' '}
            <span className="bold">very passionate</span> about working with software and hardware side of computers.{' '}
          </p>

          <p className="text">
            My enthusiasm for software development began when I was only 10 years old when I got my first laptop. I
            started tinkering with <span className="bold">Java</span>, and starting working on small projects that made
            my inner-child happy and ever since then, I've kept on <span className="bold">learning</span> and{' '}
            <span className="bold">exploring</span> new things.{' '}
          </p>

          <p className="text">
            Nowadays, I focus on making fun and useful applications with <span className="bold">Python</span>, and{' '}
            <span className="bold">MongoDB</span> while also learning more on{' '}
            <span className="bold">machine learning</span> and <span className="bold">data analysis</span> which pushes
            me to do my best everyday!
          </p>
        </div>
        <Knowledge />
      </animated.div>
    </section>
  );
};

export default WhoAmI;
