import { useEffect, useState } from 'react';
import './dark_toggle.css';
interface Props {
  def: boolean;
}
const DarkToggle = ({def}:Props) => {
  // State to set the light/dark mode
  const [darkMode, setDarkMode] = useState(def);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.getElementById('togg-container')?.classList.toggle('togg-container-active');
  };

  useEffect(() => {
    if (darkMode) {
      document.getElementsByTagName('body')[0].classList.remove('light');
      document.getElementsByTagName('body')[0].classList.add('dark');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('dark');
      document.getElementsByTagName('body')[0].classList.add('light');
    }
  }, [darkMode]);

  return (
    <div id="togg-container" onClick={handleToggleDarkMode}>
      <div className="togg-fill togg-fill1">
        <div className="togg-circle togg-circle1"></div>
      </div>
      <div className="togg-drop">
        <div className="togg-fill togg-fill2">
          <div className="togg-circle togg-circle2"></div>
        </div>
      </div>
    </div>
  );
};

export default DarkToggle;
