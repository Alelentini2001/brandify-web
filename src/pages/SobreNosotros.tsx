import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  useTheme,
  alpha,
  Button,
  Divider,
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { mockImages } from '../components/MockImages';
import VideoBackground from '../components/VideoBackground';
import { serviceVideos } from '../components/PremiumMedia';
import AnimatedButton from '../components/AnimatedButton';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Team members data
const teamMembers = [
  {
    name: 'Lautaro Nicolas Petringa',
    role: 'CEO',
    bio: 'Visionario estratégico con experiencia en dirección de proyectos digitales y marketing. Lidera la visión de Brandify combinando innovación con enfoque en resultados.',
    image: require('../assets/image.png'),
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Nayla Lihuén Petringa',
    role: 'CMO',
    bio: 'Especialista en estrategias de marketing y branding con un ojo creativo excepcional. Responsable de transformar conceptos en identidades visuales impactantes.',
    image: require('../assets/Nayla_Lihuén_Petringa_CMO.jpeg.jpg'),
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Alessandro Lentini',
    role: 'CTO',
    bio: 'Arquitecto tecnológico y desarrollador full-stack. Implementa soluciones innovadoras optimizando rendimiento y experiencia de usuario en cada proyecto.',
    image: require('../assets/1646657139411-7.jpeg'),
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Jesús',
    role: 'Video Editor',
    bio: 'Especialista en producción y edición de video con un talento único para contar historias visuales. Transforma ideas en contenido audiovisual impactante y memorable.',
    image: require('../assets/Jesus Jesús Alejandro Guerrero Flores.jpeg'),
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Smith',
    role: 'Brand Designer',
    bio: 'Diseñador creativo especializado en sistemas de identidad visual y experiencia de marca. Crea diseños elegantes que conectan con el público objetivo y refuerzan los valores de marca.',
    image: require('../assets/Christian Smith Camperos Pérez diseñador.png'),
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Erick',
    role: 'Content Writer',
    bio: 'Redactor con amplia experiencia en marketing de contenidos y narrativa de marca. Crea textos persuasivos que destacan los valores y diferenciales de cada proyecto.',
    image: require('../assets/Erick Antonio López Córdova.jpeg'),
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
];

// Values data - Updated to match new branding
const values = [
  {
    title: 'Creatividad',
    description:
      'Desarrollamos soluciones únicas y auténticas que reflejan la esencia de cada marca.',
    icon: '🎨',
    gradient: 'linear-gradient(45deg, #7C3AED, #EC4899)',
  },
  {
    title: 'Compromiso',
    description:
      'Nos involucramos profundamente en cada proyecto, garantizando resultados alineados con los objetivos del cliente.',
    icon: '🤝',
    gradient: 'linear-gradient(45deg, #EC4899, #7C3AED)',
  },
  {
    title: 'Colaboración',
    description:
      'Trabajamos codo a codo con nuestros clientes para crear estrategias que reflejen su visión y conecten con su audiencia.',
    icon: '👥',
    gradient: 'linear-gradient(45deg, #7C3AED, #EC4899)',
  },
  {
    title: 'Resultados',
    description:
      'Nos enfocamos en generar un impacto tangible y medible, maximizando el retorno de cada acción.',
    icon: '📈',
    gradient: 'linear-gradient(45deg, #EC4899, #7C3AED)',
  },
];

const SobreNosotros: React.FC = () => {
  const theme = useTheme();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    initialInView: true,
  });

  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    initialInView: true,
  });

  const [valuesRef, valuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    initialInView: true,
  });

  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    initialInView: true,
  });

  const [clientsRef, clientsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    initialInView: true,
  });

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <Box>
      {/* Hero Section - Clean, minimalist design */}
      <Box
        sx={{
          position: 'relative',
          height: '85vh',
          minHeight: 500,
          maxHeight: 700,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          bgcolor: 'black',
          width: '100%',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'radial-gradient(circle at center, rgba(124, 58, 237, 0.1) 0%, rgba(0, 0, 0, 0.97) 70%)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Box
              sx={{
                maxWidth: '700px',
                mx: 'auto',
                textAlign: 'center',
                px: { xs: 2, md: 0 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.215, 0.61, 0.355, 1],
                  delay: 0.2,
                }}
              >
                <Typography
                  variant="h1"
                  align="center"
                  sx={{
                    color: 'white',
                    fontWeight: 800,
                    mb: 3,
                    fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }}
                >
                  Sobre Nosotros
                </Typography>
              </motion.div>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '60px', opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Divider
                  sx={{
                    width: '60px',
                    height: '3px',
                    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                    borderRadius: '2px',
                    mb: 4,
                    mt: 1,
                    mx: 'auto',
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                <Typography
                  variant="h5"
                  align="center"
                  sx={{
                    color: 'rgba(255,255,255,0.85)',
                    maxWidth: '650px',
                    mx: 'auto',
                    mb: 6,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    lineHeight: 1.5,
                    fontWeight: 300,
                    letterSpacing: '0.01em',
                  }}
                >
                  Soluciones creativas y personalizadas para destacar en el
                  entorno digital.
                </Typography>
              </motion.div>
            </Box>
          </motion.div>
        </Container>

        {/* Scroll Indicator - Minimalist style */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 38,
              border: '1.5px solid rgba(255,255,255,0.2)',
              borderRadius: 12,
              display: 'flex',
              justifyContent: 'center',
              padding: '8px 0',
              transition: 'all 0.3s ease',
            }}
          >
            <Box
              component={motion.div}
              initial={{ y: 0 }}
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: 1.3,
              }}
              sx={{
                width: 3,
                height: 3,
                backgroundColor: 'rgba(255,255,255,0.5)',
                borderRadius: '50%',
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Our Story - Professional UI design */}
      <Container
        maxWidth="xl"
        sx={{
          background: 'linear-gradient(180deg, #1a1a1a 0%, #000000 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.05) 0%, transparent 30%)',
            opacity: 0.7,
            zIndex: 0,
          },
        }}
      >
        <Box ref={storyRef} sx={{ py: { xs: 6, md: 10 } }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <Grid container spacing={0} alignItems="center" sx={{ mb: 5 }}>
              <Grid item xs={12}>
                <Box sx={{ mb: 1, textAlign: 'center' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        fontWeight: 500,
                        fontSize: '0.85rem',
                        letterSpacing: '0.15em',
                        color: '#FF6B6B',
                        mb: 1,
                        display: 'block',
                      }}
                    >
                      NUESTRA HISTORIA
                    </Typography>

                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        mb: 1,
                        fontSize: { xs: '1.8rem', md: '2.3rem' },
                        color: 'white',
                        maxWidth: '700px',
                        mx: 'auto',
                        lineHeight: 1.2,
                      }}
                    >
                      Una agencia creada por la pasión de hacer las cosas bien
                    </Typography>

                    <Divider
                      component={motion.div}
                      initial={{ width: 0 }}
                      animate={{ width: '60px' }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      sx={{
                        width: '60px',
                        height: '3px',
                        background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                        borderRadius: '2px',
                        mb: 3,
                        mx: 'auto',
                        mt: 2,
                      }}
                    />
                  </motion.div>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ px: { xs: 1, md: 4 } }}>
              <Grid container spacing={{ xs: 2, md: 3 }} alignItems="stretch">
                <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }}>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.005 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        p: { xs: 3, md: 4 },
                        borderRadius: 2,
                        background: 'rgba(255,255,255,0.02)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.04)',
                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
                        overflow: 'hidden',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box
                        sx={{ mb: 3, display: 'flex', alignItems: 'center' }}
                      >
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            background:
                              'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)',
                          }}
                        >
                          <Typography sx={{ fontSize: '1.2rem' }}>
                            💼
                          </Typography>
                        </Box>
                        <Typography
                          variant="h6"
                          color="white"
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                          }}
                        >
                          Nuestros Servicios
                        </Typography>
                      </Box>

                      <Box sx={{ pl: 1, flex: 1 }}>
                        {[
                          'Creación de contenido que conecta con tu audiencia',
                          'Marketing estratégico para posicionar tu negocio',
                          'Desarrollo web que combina diseño y funcionalidad',
                          'Aplicaciones que mejoran la interacción con tus clientes',
                        ].map((item, index) => (
                          <Typography
                            key={index}
                            component={motion.p}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.8 + index * 0.1,
                            }}
                            variant="body2"
                            color="rgba(255,255,255,0.75)"
                            sx={{
                              fontSize: '0.9rem',
                              lineHeight: 1.5,
                              mb: 1.5,
                              display: 'flex',
                              alignItems: 'flex-start',
                              fontWeight: 300,
                              letterSpacing: '0.2px',
                            }}
                          >
                            <Box
                              component="span"
                              sx={{
                                minWidth: 22,
                                height: 22,
                                borderRadius: '50%',
                                background: 'rgba(255,107,107,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 1.5,
                                color: '#FF6B6B',
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                              }}
                            >
                              ✓
                            </Box>
                            {item}
                          </Typography>
                        ))}
                      </Box>

                      <Box sx={{ mt: 'auto', pt: 3 }}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 1.5,
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.05)',
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="rgba(255,255,255,0.9)"
                            sx={{
                              fontSize: '0.9rem',
                              lineHeight: 1.6,
                              fontWeight: 500,
                              fontStyle: 'italic',
                              textAlign: 'center',
                            }}
                          >
                            "Brandify no sigue tendencias: las crea."
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>

                <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.005 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        p: { xs: 3, md: 4 },
                        borderRadius: 2,
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.04)',
                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
                        overflow: 'hidden',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        background:
                          'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                      }}
                    >
                      <Box
                        component="img"
                        src={mockImages.aboutUs}
                        alt="Nuestra historia"
                        sx={{
                          width: '100%',
                          height: 160,
                          objectFit: 'cover',
                          borderRadius: 1.5,
                          mb: 3,
                          filter: 'brightness(0.95)',
                        }}
                      />

                      <Typography
                        variant="h5"
                        component={motion.h5}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        paragraph
                        sx={{
                          fontSize: { xs: '1.1rem', md: '1.2rem' },
                          lineHeight: 1.4,
                          mb: 2.5,
                          fontWeight: 600,
                          letterSpacing: '-0.01em',
                          color: 'white',
                        }}
                      >
                        Así nació Brandify en 2024
                      </Typography>

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body2"
                          color="rgba(255,255,255,0.85)"
                          paragraph
                          sx={{
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                            mb: 2,
                            fontWeight: 300,
                            letterSpacing: '0.2px',
                          }}
                        >
                          Una agencia joven y fresca, pero con amplia
                          experiencia en el sector gracias a trabajos previos
                          con otras agencias y proyectos privados. Hemos
                          trabajado con clientes de todo tipo, desde marcas
                          personales y startups hasta empresas consolidadas.
                        </Typography>

                        <Typography
                          variant="body2"
                          color="rgba(255,255,255,0.85)"
                          paragraph
                          sx={{
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                            mb: 0,
                            fontWeight: 300,
                            letterSpacing: '0.2px',
                          }}
                        >
                          Con parte del equipo en Italia, España y Argentina,
                          pero con una visión global. No somos una agencia
                          convencional: creamos estrategias que generan
                          resultados reales.
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>

                <Grid item xs={12} md={4} order={{ xs: 3, md: 3 }}>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.005 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        p: { xs: 3, md: 4 },
                        borderRadius: 2,
                        background: 'rgba(255,255,255,0.02)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.04)',
                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
                        overflow: 'hidden',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box
                        sx={{ mb: 3, display: 'flex', alignItems: 'center' }}
                      >
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            background:
                              'linear-gradient(45deg, #4ECDC4, #7C3AED)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            boxShadow: '0 2px 8px rgba(78, 205, 196, 0.3)',
                          }}
                        >
                          <Typography sx={{ fontSize: '1.2rem' }}>
                            🌍
                          </Typography>
                        </Box>
                        <Typography
                          variant="h6"
                          color="white"
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                          }}
                        >
                          Equipo Especializado
                        </Typography>
                      </Box>

                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        {[
                          { icon: '👨‍💻', text: 'Expertos en informática' },
                          { icon: '📊', text: 'Licenciados en marketing' },
                          { icon: '🎨', text: 'Creadores de contenido' },
                          { icon: '⚙️', text: 'Desarrollo y optimización' },
                        ].map((item, index) => (
                          <Grid item xs={6} key={index}>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: 0.9 + index * 0.1,
                              }}
                            >
                              <Box
                                sx={{
                                  p: 1.5,
                                  borderRadius: 1.5,
                                  background: 'rgba(255,255,255,0.03)',
                                  border: '1px solid rgba(255,255,255,0.05)',
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: 0.5,
                                }}
                              >
                                <Typography sx={{ fontSize: '1.2rem' }}>
                                  {item.icon}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="rgba(255,255,255,0.75)"
                                  align="center"
                                  sx={{
                                    fontSize: '0.8rem',
                                    fontWeight: 300,
                                    letterSpacing: '0.3px',
                                  }}
                                >
                                  {item.text}
                                </Typography>
                              </Box>
                            </motion.div>
                          </Grid>
                        ))}
                      </Grid>

                      <Box sx={{ mt: 'auto' }}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Box
                            sx={{
                              p: 2,
                              background:
                                'linear-gradient(145deg, rgba(255,107,107,0.1) 0%, rgba(78,205,196,0.1) 100%)',
                              borderRadius: 1.5,
                              border: '1px solid rgba(255,255,255,0.05)',
                              textAlign: 'center',
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="white"
                              sx={{
                                fontSize: '0.95rem',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                              }}
                            >
                              <span>
                                ¿Listo para llevar tu marca al siguiente nivel?
                              </span>
                              <Box component="span" sx={{ fontSize: '1.2rem' }}>
                                👊
                              </Box>
                            </Typography>
                          </Box>
                        </motion.div>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
            </Box>
          </motion.div>
        </Box>

        {/* Mission & Vision Section - Professional design */}
        <Box
          sx={{
            py: { xs: 10, md: 12 },
            position: 'relative',
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(124,58,237,0.03) 100%)',
          }}
        >
          <Container maxWidth="xl">
            {/* Background elements */}
            <Box
              sx={{
                position: 'absolute',
                top: '10%',
                right: '5%',
                width: '280px',
                height: '280px',
                background:
                  'radial-gradient(circle, rgba(255,107,107,0.03) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                zIndex: 0,
                opacity: 0.8,
              }}
            />

            <Box
              sx={{
                position: 'absolute',
                bottom: '15%',
                left: '8%',
                width: '220px',
                height: '220px',
                background:
                  'radial-gradient(circle, rgba(78,205,196,0.03) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(50px)',
                zIndex: 0,
                opacity: 0.8,
              }}
            />

            {/* Section header */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                mb: 8,
                textAlign: 'center',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    letterSpacing: '0.2em',
                    color: '#7C3AED',
                    mb: 1.5,
                    display: 'block',
                  }}
                >
                  NUESTRA ESENCIA
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    color: 'white',
                    maxWidth: '700px',
                    mx: 'auto',
                    lineHeight: 1.2,
                  }}
                >
                  Impulsamos marcas con propósito y estrategia
                </Typography>

                <Divider
                  sx={{
                    width: '40px',
                    height: '3px',
                    background: 'linear-gradient(45deg, #7C3AED, #EC4899)',
                    borderRadius: '2px',
                    mb: 3,
                    mx: 'auto',
                  }}
                />
              </motion.div>
            </Box>

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Grid container spacing={4}>
                {/* Mission Column */}
                <Grid item xs={12} md={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Box
                      sx={{
                        p: { xs: 3.5, md: 5 },
                        borderRadius: 3,
                        background: 'rgba(255,255,255,0.02)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.03)',
                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 15px 50px -12px rgba(124,58,237,0.15)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '4px',
                          background:
                            'linear-gradient(to right, #7C3AED, transparent)',
                        }}
                      />

                      <Box
                        sx={{
                          mb: 4,
                          display: 'flex',
                          alignItems: 'center',
                          background: 'rgba(124,58,237,0.05)',
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '14px',
                            background:
                              'linear-gradient(135deg, #7C3AED, #5B21B6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2.5,
                            boxShadow: '0 4px 10px rgba(124,58,237,0.25)',
                          }}
                        >
                          <Typography sx={{ fontSize: '1.4rem' }}>
                            🎯
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="overline"
                            sx={{
                              fontSize: '0.7rem',
                              fontWeight: 500,
                              color: '#7C3AED',
                              letterSpacing: '0.1em',
                              display: 'block',
                              mb: 0.2,
                            }}
                          >
                            NUESTRA MISIÓN
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{
                              fontSize: { xs: '1.3rem', md: '1.5rem' },
                              fontWeight: 700,
                              color: 'white',
                              letterSpacing: '-0.01em',
                            }}
                          >
                            Impulsar marcas que destacan
                          </Typography>
                        </Box>
                      </Box>

                      <Typography
                        variant="body1"
                        color="rgba(255,255,255,0.9)"
                        sx={{
                          fontSize: '1rem',
                          lineHeight: 1.7,
                          fontWeight: 300,
                          letterSpacing: '0.2px',
                          position: 'relative',
                          zIndex: 1,
                        }}
                      >
                        Nuestra misión es ayudar a empresas y marcas personales
                        a sobresalir en un entorno digital saturado mediante
                        soluciones creativas y personalizadas que generen
                        resultados medibles y sostenibles.
                      </Typography>

                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: '-30px',
                          right: '-30px',
                          width: '140px',
                          height: '140px',
                          background:
                            'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
                          borderRadius: '50%',
                          zIndex: 0,
                        }}
                      />
                    </Box>
                  </motion.div>
                </Grid>

                {/* Vision Column */}
                <Grid item xs={12} md={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Box
                      sx={{
                        p: { xs: 3.5, md: 5 },
                        borderRadius: 3,
                        background: 'rgba(255,255,255,0.02)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.03)',
                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 15px 50px -12px rgba(236,72,153,0.15)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '4px',
                          background:
                            'linear-gradient(to right, #EC4899, transparent)',
                        }}
                      />

                      <Box
                        sx={{
                          mb: 4,
                          display: 'flex',
                          alignItems: 'center',
                          background: 'rgba(236,72,153,0.05)',
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '14px',
                            background:
                              'linear-gradient(135deg, #EC4899, #BE185D)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2.5,
                            boxShadow: '0 4px 10px rgba(236,72,153,0.25)',
                          }}
                        >
                          <Typography sx={{ fontSize: '1.4rem' }}>
                            🔭
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="overline"
                            sx={{
                              fontSize: '0.7rem',
                              fontWeight: 500,
                              color: '#EC4899',
                              letterSpacing: '0.1em',
                              display: 'block',
                              mb: 0.2,
                            }}
                          >
                            NUESTRA VISIÓN
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{
                              fontSize: { xs: '1.3rem', md: '1.5rem' },
                              fontWeight: 700,
                              color: 'white',
                              letterSpacing: '-0.01em',
                            }}
                          >
                            Ser referentes en el mercado
                          </Typography>
                        </Box>
                      </Box>

                      <Typography
                        variant="body1"
                        color="rgba(255,255,255,0.9)"
                        sx={{
                          fontSize: '1rem',
                          lineHeight: 1.7,
                          fontWeight: 300,
                          letterSpacing: '0.2px',
                          position: 'relative',
                          zIndex: 1,
                        }}
                      >
                        Ser la agencia de referencia para empresas y marcas
                        personales que buscan destacar, aumentar su alcance y
                        consolidarse en el mercado digital mediante estrategias
                        efectivas y diferenciadas.
                      </Typography>

                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: '-30px',
                          right: '-30px',
                          width: '140px',
                          height: '140px',
                          background:
                            'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
                          borderRadius: '50%',
                          zIndex: 0,
                        }}
                      />
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>

        {/* Our Values - Premium professional design */}
        <Box
          ref={valuesRef}
          sx={{
            py: { xs: 10, md: 14 },
            position: 'relative',
            overflow: 'hidden',
            mb: 12,
            zIndex: 1,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              opacity: 0.6,
              zIndex: -1,
            },
          }}
        >
          {/* Background elements */}
          <Box
            sx={{
              position: 'absolute',
              top: '15%',
              right: '10%',
              width: '300px',
              height: '300px',
              background:
                'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              zIndex: 0,
              opacity: 0.6,
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              bottom: '10%',
              left: '5%',
              width: '250px',
              height: '250px',
              background:
                'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(50px)',
              zIndex: 0,
              opacity: 0.6,
            }}
          />

          <Container sx={{ position: 'relative', zIndex: 2, maxWidth: 'lg' }}>
            <motion.div
              initial="hidden"
              animate={valuesInView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                  },
                },
              }}
            >
              <Box sx={{ mb: 8, textAlign: 'center' }}>
                <Typography
                  variant="overline"
                  sx={{
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    letterSpacing: '0.2em',
                    color: '#FF6B6B',
                    mb: 1.5,
                    display: 'block',
                  }}
                >
                  LO QUE NOS DEFINE
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    color: 'white',
                    maxWidth: '700px',
                    mx: 'auto',
                    lineHeight: 1.2,
                  }}
                >
                  Nuestros Valores
                </Typography>

                <Divider
                  sx={{
                    width: '40px',
                    height: '3px',
                    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                    borderRadius: '2px',
                    mb: 3,
                    mx: 'auto',
                  }}
                />

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.05rem',
                    lineHeight: 1.6,
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.8)',
                    maxWidth: '700px',
                    mx: 'auto',
                  }}
                >
                  Los principios que guían nuestro trabajo y definen cada
                  proyecto que emprendemos
                </Typography>
              </Box>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.3,
                  },
                },
              }}
              initial="hidden"
              animate={valuesInView ? 'visible' : 'hidden'}
            >
              <Grid container spacing={{ xs: 3, md: 4 }}>
                {values.map((value, index) => (
                  <Grid item key={value.title} xs={12} sm={6} md={3}>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            type: 'spring',
                            stiffness: 100,
                            damping: 15,
                          },
                        },
                      }}
                      whileHover={{
                        y: -10,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Box
                        sx={{
                          height: '100%',
                          textAlign: 'center',
                          py: 5,
                          px: 3,
                          borderRadius: 4,
                          position: 'relative',
                          background: 'rgba(255,255,255,0.02)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.04)',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                            background: 'rgba(255,255,255,0.03)',
                          },
                        }}
                      >
                        {/* Top gradient line */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '3px',
                            background: value.gradient,
                          }}
                        />

                        {/* Icon wrapper */}
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '24px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              background: `${value.gradient}20`,
                              opacity: 0.5,
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '2.2rem',
                              position: 'relative',
                              zIndex: 1,
                            }}
                          >
                            {value.icon}
                          </Typography>
                        </Box>

                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            fontWeight: 700,
                            mb: 2,
                            fontSize: { xs: '1.2rem', md: '1.3rem' },
                            color: 'white',
                            position: 'relative',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              bottom: -8,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: '30px',
                              height: '2px',
                              background: value.gradient,
                              borderRadius: '2px',
                            },
                          }}
                        >
                          {value.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="rgba(255,255,255,0.75)"
                          sx={{
                            lineHeight: 1.6,
                            fontSize: '0.95rem',
                            fontWeight: 300,
                            letterSpacing: '0.2px',
                            mt: 2,
                          }}
                        >
                          {value.description}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </Box>

        {/* Our Team - Premium professional design */}
        <Box
          ref={teamRef}
          sx={{
            mb: 12,
            py: { xs: 10, md: 14 },
            position: 'relative',
            zIndex: 1,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
          }}
        >
          {/* Background elements */}
          <Box
            sx={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              width: '300px',
              height: '300px',
              background:
                'radial-gradient(circle, rgba(255,107,107,0.04) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              zIndex: 0,
              opacity: 0.7,
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              bottom: '15%',
              right: '5%',
              width: '280px',
              height: '280px',
              background:
                'radial-gradient(circle, rgba(78,205,196,0.04) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              zIndex: 0,
              opacity: 0.7,
            }}
          />

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <motion.div
              initial="hidden"
              animate={teamInView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                  },
                },
              }}
            >
              <Box sx={{ mb: 8, textAlign: 'center' }}>
                <Typography
                  variant="overline"
                  sx={{
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    letterSpacing: '0.2em',
                    color: '#4ECDC4',
                    mb: 1.5,
                    display: 'block',
                  }}
                >
                  NUESTROS PROFESIONALES
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    background: 'linear-gradient(45deg, #4ECDC4, #7C3AED)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    position: 'relative',
                    transform: 'translateZ(0)', // Fix for webkit rendering
                  }}
                >
                  Nuestro Equipo
                </Typography>

                <Divider
                  sx={{
                    width: '40px',
                    height: '3px',
                    background: 'linear-gradient(45deg, #4ECDC4, #7C3AED)',
                    borderRadius: '2px',
                    mb: 3,
                    mx: 'auto',
                  }}
                />

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.05rem',
                    lineHeight: 1.6,
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.8)',
                    maxWidth: '700px',
                    mx: 'auto',
                  }}
                >
                  Un equipo multidisciplinar de expertos dedicados a crear
                  soluciones digitales que marcan la diferencia
                </Typography>
              </Box>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.3,
                  },
                },
              }}
              initial="hidden"
              animate={teamInView ? 'visible' : 'hidden'}
            >
              <Grid container spacing={{ xs: 3, md: 4 }}>
                {teamMembers.map((member, index) => (
                  <Grid item key={member.name} xs={12} sm={6} md={4}>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            type: 'spring',
                            stiffness: 70,
                            damping: 20,
                            mass: 1,
                          },
                        },
                      }}
                      whileHover={{ y: -12 }}
                    >
                      <Box
                        sx={{
                          height: '100%',
                          borderRadius: 4,
                          overflow: 'hidden',
                          background: 'rgba(255,255,255,0.02)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.04)',
                          position: 'relative',
                          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                            '& .member-image': {
                              transform: 'scale(1.05)',
                            },
                            '& .social-overlay': {
                              opacity: 1,
                            },
                            '& .member-details': {
                              background: 'rgba(0,0,0,0.7)',
                              transform: 'translateY(0)',
                            },
                            '& .member-role': {
                              opacity: 1,
                              transform: 'translateY(0)',
                            },
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            height: { xs: '280px', md: '320px' },
                            '&:hover .hover-content': {
                              opacity: 1,
                            },
                          }}
                        >
                          <Box
                            component="img"
                            className="member-image"
                            src={member.image}
                            alt={member.name}
                            sx={{
                              height: '100%',
                              width: '100%',
                              objectFit: 'cover',
                              objectPosition: 'center 10%',
                              transition:
                                'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                              filter: 'brightness(0.9)',
                            }}
                          />

                          {/* Hover content with role and bio */}
                          <Box
                            className="hover-content"
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'rgba(0,0,0,0.75)',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 3,
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 600,
                                color: '#7C3AED',
                                fontSize: '1.1rem',
                                textAlign: 'center',
                                mb: 1,
                              }}
                            >
                              {member.role}
                            </Typography>

                            <Typography
                              variant="body1"
                              sx={{
                                fontSize: '0.95rem',
                                lineHeight: 1.6,
                                color: 'rgba(255,255,255,0.9)',
                                textAlign: 'center',
                                maxWidth: '280px',
                                mx: 'auto',
                              }}
                            >
                              {member.bio}
                            </Typography>
                          </Box>

                          {/* Name overlay - always visible */}
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              background:
                                'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
                              padding: '40px 16px 16px',
                              pointerEvents: 'none',
                              zIndex: 1,
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                color: 'white',
                                fontSize: '1.1rem',
                                textAlign: 'center',
                                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                              }}
                            >
                              {member.name}
                            </Typography>
                          </Box>

                          {/* Social icons */}
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                            sx={{
                              position: 'absolute',
                              bottom: 16,
                              left: 0,
                              right: 0,
                              zIndex: 2,
                              opacity: 0,
                              transform: 'translateY(10px)',
                              transition: 'all 0.3s ease',
                              '.MuiCard-root:hover &': {
                                opacity: 1,
                                transform: 'translateY(0)',
                              },
                            }}
                          >
                            {Object.entries(member.social).map(
                              ([platform, url]) => {
                                let Icon;
                                switch (platform) {
                                  case 'linkedin':
                                    Icon = LinkedInIcon;
                                    break;
                                  case 'twitter':
                                    Icon = TwitterIcon;
                                    break;
                                  case 'instagram':
                                    Icon = InstagramIcon;
                                    break;
                                  default:
                                    Icon = LinkedInIcon;
                                }

                                return (
                                  <IconButton
                                    key={platform}
                                    href={url}
                                    size="small"
                                    component={motion.a}
                                    whileHover={{
                                      y: -3,
                                      backgroundColor:
                                        platform === 'linkedin'
                                          ? '#0077B5'
                                          : platform === 'twitter'
                                          ? '#1DA1F2'
                                          : '#E1306C',
                                      color: 'white',
                                    }}
                                    sx={{
                                      bgcolor: 'rgba(255,255,255,0.15)',
                                      backdropFilter: 'blur(5px)',
                                      color: 'white',
                                      width: 30,
                                      height: 30,
                                      transition: 'all 0.3s ease',
                                    }}
                                  >
                                    <Icon fontSize="small" />
                                  </IconButton>
                                );
                              }
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default SobreNosotros;
