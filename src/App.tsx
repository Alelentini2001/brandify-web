import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import SobreNosotros from './pages/SobreNosotros';
import Contacto from './pages/Contacto';
import Proyectos from './pages/Proyectos';
import Blog from './pages/Blog';
import Portfolio from './pages/Portfolio';
import Testimonios from './pages/Testimonios';

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/testimonios" element={<Testimonios />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
