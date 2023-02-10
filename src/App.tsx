import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  Nav,
  AnchorLinks,
  AnchorMail,
  Hero,
  WhoAmI,
  Projects,
  Connect,
  Footer,
  Work,
} from '@/components';
const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="title" content="Nischal Neupane" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" cross-origin />
        <link
          href="https://fonts.googleapis.com/css2?family=Spline+Sans+Mono:wght@400;500;700&family=Inter:wght@400;500;700&family=Work+Sans:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div>
        <Nav />
        <main>
          <Hero />
          <Projects />
          <Work />
          <Connect />
          <WhoAmI />
          <AnchorLinks />
          <AnchorMail />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default App;
