import { animated, useInView } from '@react-spring/web';
import { ShowMore } from '@/components';
import './projects.css';
import Sample from './Sample';
import { useEffect, useState } from 'react';
import { reposDict } from '@/shared/featured';

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const isMobile = window.innerWidth < 475;

  useEffect(() => {
    const fetchRepos = async () => {
      const allRepos = await reposDict;
      setRepos(allRepos);
    };
    fetchRepos();
  }, []);

  let ref;
  let springs;
  !isMobile &&
    ([ref, springs] = useInView(
      () => ({
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
        config: {
          duration: 500,
        },
      }),
      {
        once: true,
      },
    ));
  return (
    <section ref={ref} id="projects">
      <div className="projects">
        <h3 className="title">Featured projects</h3>
        <h4 className="sub-title">Some of the things I've built</h4>
        <div className="projects-box">
          {repos.slice(0, 2).map((repo) => (
            <Sample
              key={repo.repo_id}
              name={repo.reponame}
              info={repo.repodesc}
              stack={repo.repo_langs}
              code={repo.repolink}
              image={repo.repo_img}
            />
          ))}
        </div>
        <ShowMore />
      </div>
    </section>
  );
};

export default Projects;
