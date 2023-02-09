import { TagCloud } from '@frank-mayer/react-tag-cloud';
import './knowledge.css';
const Knowledge = () => {
  interface TagCloudOptions {}
  return (
    <div className="knowledge-sphere-box">
      <TagCloud
        className="knowledge-sphere"
        options={(w: Window & typeof globalThis): TagCloudOptions => ({
          radius: Math.min(600, w.innerWidth, w.innerHeight) / 2,
          maxSpeed: 'normal',
          containerClass: 'sphere',
          itemClass: 'sphere--item',
        })}
        onClickOptions={{ passive: true, capture: true }}
      >
        {[
          'Python',
          'Java',
          'JavaScript',
          'HTML',
          'CSS',
          'TypeScript',
          'ReactJS',
          'NodeJS',
          'Git',
          'GitHub',
          'Bash',
          'Linux',
          'AWS',
          'GCS',
          'API',
          'REST',
          'JSON',
          'C',
          'C++',
          'C#',
          'SQL',
          'MongoDB',
          'Docker',
          'Jenkins'
        ]}
      </TagCloud>
    </div>
  );
};

export default Knowledge;
