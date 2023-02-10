import { useState, useEffect } from 'react';
import { history } from '@/shared/history';
import './work.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { animated, useInView } from '@react-spring/web';

const Jobs = () => {
  const [hist, setHist] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const allHistories = await history;
      setHist(allHistories);
    };
    fetchHistory();
  }, []);

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
          y: 0,
          opacity: 1,
        },
        config: {
          duration: 500,
        },
      }),
      {
        once: true,
        rootMargin: '0px 0px -40% 0px',
      },
    ));

  return (
    <section ref={ref} id="work" className="work">
      <animated.div style={springs} className="work-box">
        <h3 className="title">Past Experiences</h3>
        <Tabs>
          <TabList>
            {hist.map((item, index) => (
              <Tab key={index}>{item.company}</Tab>
            ))}
          </TabList>
          {hist.map((item, index) => (
            <TabPanel key={index}>
              <div className="job">
                <h4 className="job-title">
                  {item.title}
                  <p className="job-date">
                    {item.startDate} - {item.endDate}
                  </p>
                </h4>
                <ul className="job-desc">
                  {item.description.map((desc: string, index: string) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </animated.div>
      <animated.div style={springs} className="quotes-box">
        <h4 className="sub-title">Experience is the key to success.</h4>
      </animated.div>
    </section>
  );
};

export default Jobs;
