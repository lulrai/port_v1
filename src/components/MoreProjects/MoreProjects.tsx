import React, { FC, useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { SiGithub } from 'react-icons/si';
import { FiShare } from 'react-icons/fi';
import { BsFillBookmarkStarFill } from 'react-icons/bs';
import { reposDict } from '@/shared';

const MoreProjects: FC = () => {
  const box = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  const item = useSpring({
    from: {
      opacity: 0,
      y: -100,
    },
    to: {
      opacity: 1,
      y: 0,
    },
    config: {
      tension: 280,
      friction: 30,
    },
  });

  const [repos, setRepos] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      const allRepos = await reposDict;
      setRepos(allRepos);
      setLoading(false);
    };
    fetchRepos();
  }, []);

  return (
    <animated.ul style={box} className="more">
      {repos.slice(2).map((project) => (
        <animated.li style={item} key={project.repo_id}>
          <div className="card">
            <div className="decoration">
              <BsFillBookmarkStarFill />
            </div>
            <div className="relevant">
              <h6 className="name">{project.reponame}</h6>
              <div className="external-links-box">
                <a target="_blank" href={project.repolink} className="external-link">
                  <SiGithub />
                </a>
              </div>
            </div>
            <p className="info">{project.repodesc}</p>
            <ul className="stack">
              {project.repo_langs.map((item: string, index: string) => (
                <li key={index} className="item">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </animated.li>
      ))}
    </animated.ul>
  );
};

export default MoreProjects;
