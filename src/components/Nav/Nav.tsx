import { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Menu, Close, Logo } from '@static/icons';
import { navLinks } from '@/shared';
import './nav.css';
import DarkToggle from '../common/Toggle/DarkToggle';
const Nav = () => {
  // Scroll position state
  const [scrollPosition, setScrollPosition] = useState(0);
  // State for open and close menu
  const [Open, setOpen] = useState(false);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const a_nav = useSpring({
    from: {
      y: -100,
      opacity: 0,
    },
    to: {
      y: 0,
      opacity: 1,
    },
    config: {
      duration: 300,
    },
  });

  return (
    <nav>
      <animated.div style={a_nav} id="nav" className={`nav ${scrollPosition && 'blur-bg'}`}>
        <div className="nav-logo-box">
          <a
            href={`${window.location.origin}`}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="nav-logo-box"
          >
            <p className="nav-logo-text">N</p>
            <p className="nav-logo-text">N.</p>
          </a>
        </div>
        <div>
          <img src={!Open ? Menu : Close} alt="Menu" className="nav-menu" onClick={() => setOpen((prev) => !prev)} />
          <div>
            <ul className={`nav-links-box ${Open && 'expanded'} ${scrollPosition && 'fix'}`}>
              {navLinks.map((item, index) => (
                <li key={item.id}>
                  <a
                    target={`${index === navLinks.length - 1 ? '_blank' : '_self'}`}
                    href={`${index === navLinks.length - 1 ? '/resume.pdf' : `#${item.id}`}`}
                    className={` ${'nav-links'}  `}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
              <li>
                <DarkToggle def={true}></DarkToggle>
              </li>
            </ul>
          </div>
        </div>
      </animated.div>
    </nav>
  );
};

export default Nav;
